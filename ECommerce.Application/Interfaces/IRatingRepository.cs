using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IRatingRepository : IGenericRepository<Rating>
    {
        Task<Rating?> GetByProductAndCustomerAsync(int productId, string customerId);
        Task<IEnumerable<Rating>> GetByProductAsync(int productId);
        Task<(double Average, int Count)> GetSummaryAsync(int productId);
        Task<Dictionary<int, (double Average, int Count)>> GetSummariesAsync(IEnumerable<int> productIds);
    }
}
