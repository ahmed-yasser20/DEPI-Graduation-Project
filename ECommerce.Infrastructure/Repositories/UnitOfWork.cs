using ECommerce.Application.Interfaces;
using ECommerce.Infrastructure.Data;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        private ICategoryRepository? _categories;
        private IProductRepository? _products;
        private IOrderRepository? _orders;
        private IOrderProductsRepository? _orderProducts;
        private IShoppingCartRepository? _shoppingCarts;
        private ICartItemsRepository? _cartItems;
        private ICustomerRepository? _customers;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public ICategoryRepository Categories =>
            _categories ??= new CategoryRepository(_context);

        public IProductRepository Products =>
            _products ??= new ProductRepository(_context);

        public IOrderRepository Orders =>
            _orders ??= new OrderRepository(_context);

        public IOrderProductsRepository OrderProducts =>
            _orderProducts ??= new OrderProductsRepository(_context);

        public IShoppingCartRepository ShoppingCarts =>
            _shoppingCarts ??= new ShoppingCartRepository(_context);

        public ICartItemsRepository CartItems =>
            _cartItems ??= new CartItemsRepository(_context);

        public ICustomerRepository Customers =>
            _customers ??= new CustomerRepository(_context);

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
