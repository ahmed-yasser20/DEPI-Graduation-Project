using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<Order?> GetWithDetailsAsync(int orderId);
        Task<IEnumerable<Order>> GetByCustomerAsync(string customerId);
        Task<IEnumerable<Order>> GetAllWithDetailsAsync();
        Task<IEnumerable<Order>> GetUnpaidWithDetailsByCustomerAsync(string customerId);
    }
}
