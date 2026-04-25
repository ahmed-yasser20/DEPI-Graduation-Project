using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Order
    {
        public int OId { get; set; }
        public int PayId { get; set; }
        public string CId { get; set; } = string.Empty;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public decimal Total_Price { get; set; }
        public DateTime Created_At { get; set; }

        public Payment? Payment { get; set; }
        public AppUser? Customer { get; set; }
        public ICollection<Order_Products> OrderProducts { get; set; } = new List<Order_Products>();
    }
    public enum OrderStatus
    {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Cancelled
    }
}
