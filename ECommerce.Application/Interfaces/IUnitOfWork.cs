using System;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRepository Categories { get; }
        IProductRepository Products { get; }
        IOrderRepository Orders { get; }
        IOrderProductsRepository OrderProducts { get; }
        IShoppingCartRepository ShoppingCarts { get; }
        ICartItemsRepository CartItems { get; }
        ICustomerRepository Customers { get; }

        Task<int> SaveChangesAsync();
    }
}
