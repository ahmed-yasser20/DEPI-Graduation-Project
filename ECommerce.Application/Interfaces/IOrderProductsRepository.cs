using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface IOrderProductsRepository : IGenericRepository<Order_Products>
    {
        Task<IEnumerable<Order_Products>> GetByOrderAsync(int orderId);
    }
}
