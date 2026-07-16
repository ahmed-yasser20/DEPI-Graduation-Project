using ECommerce.Application.DTOs;
using ECommerce.Application.Exceptions;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CustomerResponseDto> GetProfileAsync(string userId)
        {
            var user = await _unitOfWork.Customers.GetByIdAsync(userId);
            if (user is null)
                throw new NotFoundException("Customer not found");

            return Map(user);
        }

        public async Task<CustomerResponseDto> UpdateProfileAsync(string userId, UpdateCustomerDto dto)
        {
            var user = await _unitOfWork.Customers.GetByIdAsync(userId);
            if (user is null)
                throw new NotFoundException("Customer not found");

            user.First_Name = dto.First_Name;
            user.Last_Name = dto.Last_Name;
            user.PhoneNumber = dto.PhoneNumber;
            user.City = dto.City;
            user.Street = dto.Street;
            user.Building = dto.Building;

            _unitOfWork.Customers.Update(user);
            await _unitOfWork.SaveChangesAsync();

            return Map(user);
        }

        private static CustomerResponseDto Map(AppUser user) => new()
        {
            First_Name = user.First_Name,
            Last_Name = user.Last_Name,
            Email = user.Email ?? string.Empty,
            Phone = user.PhoneNumber ?? string.Empty,
            City = user.City,
            Street = user.Street,
            Building = user.Building
        };
    }
}
