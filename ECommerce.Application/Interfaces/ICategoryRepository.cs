using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<Category?> GetByNameAsync(string name);
        Task<IEnumerable<Category>> GetAllWithProductsAsync();
    }
}
