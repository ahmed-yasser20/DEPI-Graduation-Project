using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class CustomerRepository : GenericRepository<AppUser>, ICustomerRepository
    {
        public CustomerRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<AppUser?> GetByEmailAsync(string email)
        {
            return await _dbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<AppUser?> GetWithCartAsync(string customerId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(u => u.Cart)
                    .ThenInclude(c => c!.CartItems)
                        .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(u => u.Id == customerId);
        }

        public async Task<AppUser?> GetWithOrdersAsync(string customerId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(u => u.Orders)
                    .ThenInclude(o => o.OrderProducts)
                        .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(u => u.Id == customerId);
        }
    }
}
