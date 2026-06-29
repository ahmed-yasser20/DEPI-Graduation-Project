using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IShoppingCartRepository : IGenericRepository<Shopping_Cart>
    {
        Task<Shopping_Cart?> GetWithItemsAsync(string cartId);
    }
}
