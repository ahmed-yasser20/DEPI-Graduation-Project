using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Domain.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Category_Name { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
