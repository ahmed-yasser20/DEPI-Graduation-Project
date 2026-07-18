using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class RatingRepository : GenericRepository<Rating>, IRatingRepository
    {
        public RatingRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Rating?> GetByProductAndCustomerAsync(int productId, string customerId)
        {
            return await _dbSet
                .FirstOrDefaultAsync(r => r.PId == productId && r.CId == customerId);
        }

        public async Task<IEnumerable<Rating>> GetByProductAsync(int productId)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(r => r.Customer)
                .Where(r => r.PId == productId)
                .OrderByDescending(r => r.Created_At)
                .ToListAsync();
        }

        public async Task<(double Average, int Count)> GetSummaryAsync(int productId)
        {
            var query = _dbSet.AsNoTracking().Where(r => r.PId == productId);

            var count = await query.CountAsync();
            if (count == 0)
                return (0, 0);

            var average = await query.AverageAsync(r => r.Value);
            return (Math.Round(average, 2), count);
        }
        public async Task<Dictionary<int, (double Average, int Count)>> GetSummariesAsync(IEnumerable<int> productIds)
        {
            var summaries = await _dbSet
                .AsNoTracking()
                .Where(r => productIds.Contains(r.PId))
                .GroupBy(r => r.PId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    Average = g.Average(r => r.Value),
                    Count = g.Count()
                })
                .ToListAsync();

            return summaries.ToDictionary(
                s => s.ProductId,
                s => (Math.Round(s.Average, 2), s.Count));
        }
    }
}
