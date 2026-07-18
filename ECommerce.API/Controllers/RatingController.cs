using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetProductRatings(int productId)
        {
            var result = await _ratingService.GetProductRatingsAsync(productId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> RateProduct([FromBody] CreateRatingDto dto)
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _ratingService.AddOrUpdateRatingAsync(customerId, dto);
            return Ok(result);
        }

        [Authorize]
        [HttpDelete("product/{productId}")]
        public async Task<IActionResult> DeleteRating(int productId)
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            await _ratingService.DeleteRatingAsync(customerId, productId);
            return NoContent();
        }
    }
}
