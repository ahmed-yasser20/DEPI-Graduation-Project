using ECommerce.Application.DTOs;
using ECommerce.Application.Exceptions;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.Services
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CartService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CartDto> GetCartAsync(string userId)
        {
            var cart = await _unitOfWork.ShoppingCarts.GetWithItemsAsync(userId);

            if (cart is null)
                return new CartDto { CartId = userId };

            return MapToDto(cart);
        }

        public async Task<CartDto> AddToCartAsync(string userId, AddToCartDto dto)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(dto.ProductId);
            if (product is null)
                throw new NotFoundException($"Product with ID {dto.ProductId} was not found.");

            var cart = await _unitOfWork.ShoppingCarts.FindFirstOrDefaultAsync(c => c.CartId == userId);

            if (cart is null)
            {
                cart = new Shopping_Cart { CartId = userId };
                await _unitOfWork.ShoppingCarts.AddAsync(cart);
            }

            var existingItem = await _unitOfWork.CartItems.GetByCartAndProductAsync(userId, dto.ProductId);

            if (existingItem is not null)
            {
                existingItem.Quantity += dto.Quantity;
                _unitOfWork.CartItems.Update(existingItem);
            }
            else
            {
                var newItem = new Cart_Items
                {
                    CartId = userId,
                    PId = dto.ProductId,
                    Quantity = dto.Quantity
                };
                await _unitOfWork.CartItems.AddAsync(newItem);
            }

            await _unitOfWork.SaveChangesAsync();

            var updatedCart = await _unitOfWork.ShoppingCarts.GetWithItemsAsync(userId);
            return MapToDto(updatedCart!);
        }

        public async Task UpdateCartItemAsync(string userId, UpdateCartItemDto dto)
        {
            var item = await _unitOfWork.CartItems.GetByIdAsync(dto.CartItemId);
            if (item is null || item.CartId != userId)
                throw new NotFoundException($"Cart item with ID {dto.CartItemId} was not found.");

            if (dto.Quantity == 0)
            {
                _unitOfWork.CartItems.Delete(item);
            }
            else
            {
                item.Quantity = dto.Quantity;
                _unitOfWork.CartItems.Update(item);
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(string userId, int productId)
        {
            var item = await _unitOfWork.CartItems.GetByCartAndProductAsync(userId, productId);
            if (item is null)
                throw new NotFoundException($"Product with ID {productId} was not found in the cart.");

            _unitOfWork.CartItems.Delete(item);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ClearCartAsync(string userId)
        {
            var items = await _unitOfWork.CartItems.GetByCartAsync(userId);
            _unitOfWork.CartItems.DeleteRange(items);
            await _unitOfWork.SaveChangesAsync();
        }

        private static CartDto MapToDto(Shopping_Cart cart)
        {
            var itemDtos = cart.CartItems.Select(ci => new CartItemDto
            {
                CartItemId = ci.CIId,
                ProductId = ci.PId,
                ProductName = ci.Product?.PName ?? string.Empty,
                Price = ci.Product?.Price ?? 0,
                Quantity = ci.Quantity
            }).ToList();

            return new CartDto
            {
                CartId = cart.CartId,
                Items = itemDtos,
                TotalPrice = itemDtos.Sum(i => i.TotalPrice)
            };
        }
    }
}
