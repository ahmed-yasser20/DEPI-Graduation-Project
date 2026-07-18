using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly PaymentIntentService _stripePaymentIntents;
        private const string Currency = "egp";

        public PaymentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _stripePaymentIntents = new PaymentIntentService();
        }

        public async Task<PaymentIntentResponseDto> CreatePaymentIntentAsync(Order order)
        {
            var intent = await CreateStripeIntentAsync(order);

            var payment = new Payment
            {
                OId = order.OId,
                Status = PaymentStatus.Pending,
                Amount = order.Total_Price,
                Payment_Method = string.Empty,
                StripePaymentIntentId = intent.Id,
                Created_At = DateTime.UtcNow
            };

            await _unitOfWork.Payments.AddAsync(payment);
            await _unitOfWork.SaveChangesAsync();

            return ToDto(intent, order.Total_Price);
        }

        public async Task<PaymentIntentResponseDto> RefreshPaymentIntentAsync(Order order, Payment existingPayment)
        {
            var intent = await CreateStripeIntentAsync(order);

            existingPayment.StripePaymentIntentId = intent.Id;
            existingPayment.Status = PaymentStatus.Pending;
            existingPayment.Payment_Method = string.Empty;
            existingPayment.FailureReason = null;
            existingPayment.Paid_At = null;

            await _unitOfWork.SaveChangesAsync();

            return ToDto(intent, order.Total_Price);
        }

        private async Task<PaymentIntent> CreateStripeIntentAsync(Order order)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(order.Total_Price * 100),
                Currency = Currency,
                Metadata = new Dictionary<string, string>
                {
                    { "order_id", order.OId.ToString() }
                },
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true
                }
            };

            return await _stripePaymentIntents.CreateAsync(options);
        }

        private static PaymentIntentResponseDto ToDto(PaymentIntent intent, decimal amount) => new()
        {
            ClientSecret = intent.ClientSecret,
            PaymentIntentId = intent.Id,
            Amount = amount,
            Status = intent.Status,
            PaymentMethodType = intent.PaymentMethodTypes?.FirstOrDefault()
        };

        public async Task<PaymentIntentResponseDto> GetPaymentIntentAsync(int orderId)
        {
            var payment = await _unitOfWork.Payments.GetByOrderIdAsync(orderId)
                ?? throw new InvalidOperationException("Payment not found.");

            var intent = await _stripePaymentIntents.GetAsync(payment.StripePaymentIntentId);
            return ToDto(intent, payment.Amount);
        }

        public async Task<PaymentResponseDto> MarkAsSucceededAsync(string paymentIntentId, string paymentMethodType)
        {
            var payment = await _unitOfWork.Payments.GetByPaymentIntentIdAsync(paymentIntentId)
                ?? throw new InvalidOperationException("Payment not found.");

            // Stripe may retry webhook delivery. Do not reduce stock or touch the cart twice.
            if (payment.Status == PaymentStatus.Succeeded)
                return MapToDto(payment);

            payment.Status = PaymentStatus.Succeeded;
            payment.Payment_Method = paymentMethodType;
            payment.Paid_At = DateTime.UtcNow;

            var order = await _unitOfWork.Orders.GetWithDetailsAsync(payment.OId);
            if (order != null)
            {
                order.Status = OrderStatus.Paid;

                foreach (var item in order.OrderProducts)
                {
                    await _unitOfWork.Products.ReduceStockAsync(item.PId, item.Quantity);
                }

                await RemovePurchasedItemsFromCartAsync(order);
            }

            await _unitOfWork.SaveChangesAsync();
            return MapToDto(payment);
        }

        public async Task<PaymentResponseDto> MarkAsFailedAsync(string paymentIntentId, string failureReason)
        {
            var payment = await _unitOfWork.Payments.GetByPaymentIntentIdAsync(paymentIntentId)
                ?? throw new InvalidOperationException("Payment not found.");

            payment.Status = PaymentStatus.Failed;
            payment.FailureReason = failureReason;

            var order = await _unitOfWork.Orders.GetByIdAsync(payment.OId);
            if (order != null)
                order.Status = OrderStatus.Failed;

            await _unitOfWork.SaveChangesAsync();
            return MapToDto(payment);
        }

        private async Task RemovePurchasedItemsFromCartAsync(Order order)
        {
            foreach (var orderItem in order.OrderProducts)
            {
                var cartItem = await _unitOfWork.CartItems
                    .GetByCartAndProductAsync(order.CId, orderItem.PId);

                if (cartItem is null)
                    continue;

                if (cartItem.Quantity <= orderItem.Quantity)
                {
                    _unitOfWork.CartItems.Delete(cartItem);
                }
                else
                {
                    cartItem.Quantity -= orderItem.Quantity;
                    _unitOfWork.CartItems.Update(cartItem);
                }
            }
        }

        public async Task<PaymentResponseDto?> GetByPaymentIntentIdAsync(string paymentIntentId)
        {
            var payment = await _unitOfWork.Payments.GetByPaymentIntentIdAsync(paymentIntentId);
            return payment == null ? null : MapToDto(payment);
        }

        public async Task<PaymentResponseDto?> GetByOrderIdAsync(int orderId)
        {
            var payment = await _unitOfWork.Payments.GetByOrderIdAsync(orderId);
            return payment == null ? null : MapToDto(payment);
        }

        private static PaymentResponseDto MapToDto(Payment payment) => new()
        {
            PayId = payment.PayId,
            OId = payment.OId,
            Status = payment.Status.ToString(),
            Amount = payment.Amount,
            Payment_Method = payment.Payment_Method,
            FailureReason = payment.FailureReason
        };
    }
}
