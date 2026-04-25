using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Shopping_Cart
    {
        public string CartId { get; set; } = string.Empty;

        public AppUser? Customer { get; set; }
        public ICollection<Cart_Items> CartItems { get; set; } = new List<Cart_Items>();
    }
}
