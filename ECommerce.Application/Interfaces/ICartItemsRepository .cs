using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface ICartItemsRepository : IGenericRepository<Cart_Items>
    {
        Task<IEnumerable<Cart_Items>> GetByCartAsync(string cartId);
        Task<Cart_Items?> GetByCartAndProductAsync(string cartId, int productId);
    }
}
