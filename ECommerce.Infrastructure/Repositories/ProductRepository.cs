using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetInStockAsync()
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Category)
                .Where(p => p.Stock > 0)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> SearchByNameAsync(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return await GetAllAsync();

            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Category)
                .Where(p => p.PName.Contains(keyword))
                .ToListAsync();
        }

        public async Task<Product?> GetWithCategoryAsync(int productId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.PId == productId);
        }
    }
}
