using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public class CategoryResponseDto
    {
        public int CategoryId { get; set; }
        public string Category_Name { get; set; } = string.Empty;
        public int ProductCount { get; set; }
    }

    public class CategoryWithProductsDto
    {
        public int CategoryId { get; set; }
        public string Category_Name { get; set; } = string.Empty;
        public IEnumerable<CategoryProductItemDto> Products { get; set; } = new List<CategoryProductItemDto>();
    }

    public class CategoryProductItemDto
    {
        public int PId { get; set; }
        public string PName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }

    public class CreateCategoryDto
    {
        [Required, MaxLength(100)]
        public string Category_Name { get; set; } = string.Empty;
    }

    public class UpdateCategoryDto
    {
        [Required, MaxLength(100)]
        public string Category_Name { get; set; } = string.Empty;
    }
}
