using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs
{
    public class CreatePaymentDto
    {
        [Required]
        public int OrderId { get; set; }
    }

    public class PaymentIntentResponseDto
    {
        public string ClientSecret { get; set; } = string.Empty;
        public string PaymentIntentId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }

    public class PaymentResponseDto
    {
        public int PayId { get; set; }
        public int OId { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Payment_Method { get; set; } = string.Empty;
        public string? FailureReason { get; set; }
    }
}
