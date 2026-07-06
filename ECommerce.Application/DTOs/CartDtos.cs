using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs
{
    public class AddToCartDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
    }

    public class UpdateCartItemDto
    {
        [Required]
        public int CartItemId { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity cannot be negative")]
        public int Quantity { get; set; }
    }

    public class CartItemDto
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; } 
        public int Quantity { get; set; }
        public decimal TotalPrice => Price * Quantity;
    }

    public class CartDto
    {
        public string CartId { get; set; } = string.Empty;
        public IEnumerable<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        public decimal TotalPrice { get; set; }  
    }
}
