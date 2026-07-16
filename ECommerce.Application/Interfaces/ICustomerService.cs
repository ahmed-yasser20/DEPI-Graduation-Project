using ECommerce.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerResponseDto> GetProfileAsync(string userId);
        Task<CustomerResponseDto> UpdateProfileAsync(string userId, UpdateCustomerDto dto);
    }
}
