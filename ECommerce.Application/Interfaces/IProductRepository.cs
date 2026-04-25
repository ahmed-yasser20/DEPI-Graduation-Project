using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
        Task<IEnumerable<Product>> GetInStockAsync();
        Task<IEnumerable<Product>> SearchByNameAsync(string keyword);
        Task<Product?> GetWithCategoryAsync(int productId);
    }
}
