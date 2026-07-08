using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface ICartItemsRepository : IGenericRepository<Cart_Items>
    {
        Task<IEnumerable<Cart_Items>> GetByCartAsync(string cartId);
        Task<Cart_Items?> GetByCartAndProductAsync(string cartId, int productId);
    }
}
