using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetByCustomerAsync(string customerId);
        Task<Order?> GetWithItemsAsync(int orderId);
        Task<IEnumerable<Order>> GetByStatusAsync(OrderStatus status);
    }
}
