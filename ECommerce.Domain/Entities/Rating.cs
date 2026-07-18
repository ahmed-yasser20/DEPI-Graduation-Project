using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.Entities
{
    public class Rating
    {
        public int RId { get; set; }
        public int PId { get; set; }
        public string CId { get; set; } = string.Empty;

        public int Value { get; set; } // 1-5
        public string? Comment { get; set; }

        public DateTime Created_At { get; set; }
        public DateTime? Updated_At { get; set; }

        public Product? Product { get; set; }
        public AppUser? Customer { get; set; }
    }
}
