using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Product
    {
        public int PId { get; set; }
        public int? CategoryId { get; set; }
        public string PName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Stock { get; set; }
        public int Amount { get; set; }
        //public byte[] Image { get; set; }

        public Category? Category { get; set; }
        public List<AppUser> Customers { get; set; }
        public ICollection<Order_Products> OrderProducts { get; set; } = new List<Order_Products>();
        public ICollection<Cart_Items> CartItems { get; set; } = new List<Cart_Items>();
    }
}
