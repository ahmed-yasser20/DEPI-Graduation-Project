using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface IShoppingCartRepository : IGenericRepository<Shopping_Cart>
    {
        Task<Shopping_Cart?> GetWithItemsAsync(string cartId);
    }
}
