using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class ShoppingCartRepository : GenericRepository<Shopping_Cart>, ICartRepository
    {
        public ShoppingCartRepository(AppDbContext context) : base(context)
        {
        }

        public void ClearItems(Shopping_Cart cart)
        {
            foreach (var item in cart.CartItems)
                item.Product = null;

            _context.CartItems.RemoveRange(cart.CartItems);
        }

        public async Task<Shopping_Cart?> GetWithItemsAsync(string cartId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.CartId == cartId);
        }
    }
}
