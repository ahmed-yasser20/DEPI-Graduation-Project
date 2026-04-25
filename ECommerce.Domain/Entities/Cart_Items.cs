using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Cart_Items
    {
        public int CIId { get; set; }
        public string CartId { get; set; } = string.Empty;
        public int PId { get; set; }
        public int Quantity { get; set; }

        public Shopping_Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
