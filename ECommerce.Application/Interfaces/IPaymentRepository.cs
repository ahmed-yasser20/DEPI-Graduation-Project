using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IPaymentRepository : IGenericRepository<Payment>
    {
        Task<Payment?> GetByPaymentIntentIdAsync(string paymentIntentId);
        Task<Payment?> GetByOrderIdAsync(int orderId);
    }
}
