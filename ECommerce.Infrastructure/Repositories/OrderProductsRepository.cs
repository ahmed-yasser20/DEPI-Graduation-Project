using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class OrderProductsRepository : GenericRepository<Order_Products>, IOrderProductsRepository
    {
        public OrderProductsRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Order_Products>> GetByOrderAsync(int orderId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(op => op.Product)
                .Where(op => op.OId == orderId)
                .ToListAsync();
        }
    }
}
