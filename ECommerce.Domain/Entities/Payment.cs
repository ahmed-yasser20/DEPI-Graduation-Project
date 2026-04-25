using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Payment
    {
        public int PayId { get; set; }
        public string CId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Payment_Method { get; set; } = string.Empty;

        public AppUser? Customer { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
