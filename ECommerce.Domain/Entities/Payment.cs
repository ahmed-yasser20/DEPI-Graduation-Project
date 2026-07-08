using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.Entities
{
    public class Payment
    {
        public int PayId { get; set; }
        public int OId { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        public decimal Amount { get; set; }
        public string Payment_Method { get; set; } = string.Empty;
        public string StripePaymentIntentId { get; set; } = string.Empty;
        public string? FailureReason { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime? Paid_At { get; set; }

        public Order? Order { get; set; }
    }

    public enum PaymentStatus
    {
        Pending,
        Succeeded,
        Failed
    }
}
