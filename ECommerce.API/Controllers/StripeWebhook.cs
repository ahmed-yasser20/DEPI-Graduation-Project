using ECommerce.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/webhooks/stripe")]
    [AllowAnonymous]
    public class StripeWebhookController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly string _webhookSecret;

        public StripeWebhookController(IPaymentService paymentService, IConfiguration config)
        {
            _paymentService = paymentService;
            _webhookSecret = config["Stripe:WebhookSecret"]!;
        }

        [HttpPost]
        public async Task<IActionResult> HandleWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    _webhookSecret);
            }
            catch (StripeException)
            {
                return BadRequest();
            }

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    var succeeded = (PaymentIntent)stripeEvent.Data.Object;
                    var methodType = succeeded.PaymentMethodTypes?.FirstOrDefault() ?? "card";
                    await _paymentService.MarkAsSucceededAsync(succeeded.Id, methodType);
                    break;

                case "payment_intent.payment_failed":
                    var failed = (PaymentIntent)stripeEvent.Data.Object;
                    await _paymentService.MarkAsFailedAsync(
                        failed.Id, failed.LastPaymentError?.Message ?? "Unknown error");
                    break;
            }

            return Ok();
        }
    }
}
