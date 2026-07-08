using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface ICustomerRepository : IGenericRepository<AppUser>
    {
        Task<AppUser?> GetByEmailAsync(string email);
        Task<AppUser?> GetWithCartAsync(string customerId);
        Task<AppUser?> GetWithOrdersAsync(string customerId);
    }
}
