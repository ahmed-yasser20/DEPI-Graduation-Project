using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class CartItemsRepository : GenericRepository<Cart_Items>, ICartItemsRepository
    {
        public CartItemsRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Cart_Items>> GetByCartAsync(string cartId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(ci => ci.Product)
                .Where(ci => ci.CartId == cartId)
                .ToListAsync();
        }

        public async Task<Cart_Items?> GetByCartAndProductAsync(string cartId, int productId)
        {
            return await _dbSet
                .Include(ci => ci.Product)
                .FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.PId == productId);
        }
    }
}
