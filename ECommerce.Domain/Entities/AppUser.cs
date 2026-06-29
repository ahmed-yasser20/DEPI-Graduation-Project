using Microsoft.AspNetCore.Identity;

namespace ECommerce.Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string Building { get; set; } = string.Empty;

        public string? CartId { get; set; }
        public Shopping_Cart? Cart { get; set; }
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
