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

            var intent = await _stripePaymentIntents.CreateAsync(options);

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

            return new PaymentIntentResponseDto
            {
                ClientSecret = intent.ClientSecret,
                PaymentIntentId = intent.Id,
                Amount = order.Total_Price
            };
        }

        public async Task<PaymentResponseDto> MarkAsSucceededAsync(string paymentIntentId, string paymentMethodType)
        {
            var payment = await _unitOfWork.Payments.GetByPaymentIntentIdAsync(paymentIntentId)
                ?? throw new InvalidOperationException("Payment not found.");

            payment.Status = PaymentStatus.Succeeded;
            payment.Payment_Method = paymentMethodType;
            payment.Paid_At = DateTime.UtcNow;

            var order = await _unitOfWork.Orders.GetByIdAsync(payment.OId);
            if (order != null)
                order.Status = OrderStatus.Paid;

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
