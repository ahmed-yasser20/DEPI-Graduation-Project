using ECommerce.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IRatingService
    {
        Task<RatingResponseDto> AddOrUpdateRatingAsync(string customerId, CreateRatingDto dto);
        Task<ProductRatingSummaryDto> GetProductRatingsAsync(int productId);
        Task DeleteRatingAsync(string customerId, int productId);
    }
}
