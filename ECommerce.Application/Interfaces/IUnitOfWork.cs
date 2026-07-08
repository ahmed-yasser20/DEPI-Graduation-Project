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
        ICartRepository ShoppingCarts { get; }
        ICartItemsRepository CartItems { get; }
        ICustomerRepository Customers { get; }
        IPaymentRepository Payments { get; }

        Task<int> SaveChangesAsync();
    }
}
