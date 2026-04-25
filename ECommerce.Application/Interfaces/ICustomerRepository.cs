using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface ICustomerRepository : IGenericRepository<AppUser>
    {
        Task<AppUser?> GetByEmailAsync(string email);
        Task<AppUser?> GetWithCartAsync(string customerId);
        Task<AppUser?> GetWithOrdersAsync(string customerId);
    }

}
