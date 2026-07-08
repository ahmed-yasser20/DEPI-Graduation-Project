using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IOrderProductsRepository : IGenericRepository<Order_Products>
    {
        Task<IEnumerable<Order_Products>> GetByOrderAsync(int orderId);
    }
}
