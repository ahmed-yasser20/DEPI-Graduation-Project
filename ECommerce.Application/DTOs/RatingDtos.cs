using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public class CreateRatingDto
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Value { get; set; }

        [MaxLength(1000)]
        public string? Comment { get; set; }
    }

    public class UpdateRatingDto
    {
        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Value { get; set; }

        [MaxLength(1000)]
        public string? Comment { get; set; }
    }

    public class RatingResponseDto
    {
        public int RId { get; set; }
        public int ProductId { get; set; }
        public string CustomerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public int Value { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class ProductRatingSummaryDto
    {
        public int ProductId { get; set; }
        public double AverageRating { get; set; }
        public int RatingCount { get; set; }
        public IEnumerable<RatingResponseDto> Ratings { get; set; } = new List<RatingResponseDto>();
    }
}
