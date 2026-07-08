using ECommerce.Application.DTOs;
using ECommerce.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentIntentResponseDto> CreatePaymentIntentAsync(Order order);
        Task<PaymentResponseDto> MarkAsSucceededAsync(string paymentIntentId, string paymentMethodType);
        Task<PaymentResponseDto> MarkAsFailedAsync(string paymentIntentId, string failureReason);
        Task<PaymentResponseDto?> GetByPaymentIntentIdAsync(string paymentIntentId);
        Task<PaymentResponseDto?> GetByOrderIdAsync(int orderId);
    }
}
