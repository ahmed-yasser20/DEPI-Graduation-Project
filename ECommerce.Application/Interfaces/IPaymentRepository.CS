using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Repositories
{
    public interface IPaymentRepository : IGenericRepository<Payment>
    {
        Task<IEnumerable<Payment>> GetByCustomerAsync(string customerId);
        Task<Payment?> GetWithOrdersAsync(int paymentId);
    }
}
