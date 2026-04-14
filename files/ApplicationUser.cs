using Microsoft.AspNetCore.Identity;

namespace YourProject.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string First_Name { get; set; };
        public string Last_Name { get; set; };
        public string City { get; set; };
        public string Street { get; set; };
        public string Building { get; set; };

        // Navigation properties
        public string? CartId { get; set; }
        public Shopping_Cart? Cart { get; set; }

        public ICollection<CustomerProduct> CustomerProducts { get; set; } = new List<CustomerProduct>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
