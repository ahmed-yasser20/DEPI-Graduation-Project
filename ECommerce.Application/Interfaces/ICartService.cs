using System.Threading.Tasks;
using ECommerce.Application.DTOs;

namespace ECommerce.Application.Interfaces
{
    public interface ICartService
    {
        Task<CartDto> GetCartAsync(string userId);

        Task<CartDto> AddToCartAsync(string userId, AddToCartDto dto);

        Task UpdateCartItemAsync(string userId, UpdateCartItemDto dto);

        Task RemoveFromCartAsync(string userId, int productId);

        Task ClearCartAsync(string userId);
    }
}
