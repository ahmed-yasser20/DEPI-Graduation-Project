using ECommerce.Application.DTOs;
using ECommerce.Application.Exceptions;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Services
{
    public class RatingService : IRatingService
    {
        private readonly IUnitOfWork _unitOfWork;

        public RatingService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<RatingResponseDto> AddOrUpdateRatingAsync(string customerId, CreateRatingDto dto)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(dto.ProductId);
            if (product is null)
                throw new NotFoundException($"Product with ID {dto.ProductId} was not found.");

            var existing = await _unitOfWork.Ratings.GetByProductAndCustomerAsync(dto.ProductId, customerId);

            if (existing is not null)
            {
                existing.Value = dto.Value;
                existing.Comment = dto.Comment;
                existing.Updated_At = DateTime.UtcNow;
                _unitOfWork.Ratings.Update(existing);
                await _unitOfWork.SaveChangesAsync();
                return await MapToDtoAsync(existing.RId);
            }

            var rating = new Rating
            {
                PId = dto.ProductId,
                CId = customerId,
                Value = dto.Value,
                Comment = dto.Comment,
                Created_At = DateTime.UtcNow
            };

            await _unitOfWork.Ratings.AddAsync(rating);
            await _unitOfWork.SaveChangesAsync();

            return await MapToDtoAsync(rating.RId);
        }

        public async Task<ProductRatingSummaryDto> GetProductRatingsAsync(int productId)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(productId);
            if (product is null)
                throw new NotFoundException($"Product with ID {productId} was not found.");

            var ratings = await _unitOfWork.Ratings.GetByProductAsync(productId);
            var (average, count) = await _unitOfWork.Ratings.GetSummaryAsync(productId);

            return new ProductRatingSummaryDto
            {
                ProductId = productId,
                AverageRating = average,
                RatingCount = count,
                Ratings = ratings.Select(MapToDto)
            };
        }

        public async Task DeleteRatingAsync(string customerId, int productId)
        {
            var rating = await _unitOfWork.Ratings.GetByProductAndCustomerAsync(productId, customerId);
            if (rating is null)
                throw new NotFoundException("Rating not found.");

            _unitOfWork.Ratings.Delete(rating);
            await _unitOfWork.SaveChangesAsync();
        }

        private async Task<RatingResponseDto> MapToDtoAsync(int ratingId)
        {
            var rating = await _unitOfWork.Ratings.GetByIdAsync(ratingId);
            return MapToDto(rating!);
        }

        private static RatingResponseDto MapToDto(Rating rating) => new()
        {
            RId = rating.RId,
            ProductId = rating.PId,
            CustomerId = rating.CId,
            CustomerName = rating.Customer is not null
                ? $"{rating.Customer.First_Name} {rating.Customer.Last_Name}".Trim()
                : string.Empty,
            Value = rating.Value,
            Comment = rating.Comment,
            CreatedAt = rating.Created_At,
            UpdatedAt = rating.Updated_At
        };
    }
}
