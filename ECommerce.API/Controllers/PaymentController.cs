using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/payments")]
    [Authorize]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("{paymentIntentId}/status")]
        public async Task<ActionResult<PaymentResponseDto>> GetStatus(string paymentIntentId)
        {
            var payment = await _paymentService.GetByPaymentIntentIdAsync(paymentIntentId);
            if (payment == null) return NotFound();
            return Ok(payment);
        }
    }
}
