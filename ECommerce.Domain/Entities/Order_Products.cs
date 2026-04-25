using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Order_Products
    {
        public int OPId { get; set; }
        public int OId { get; set; }
        public int PId { get; set; }
        public int Quantity { get; set; }

        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }

}
