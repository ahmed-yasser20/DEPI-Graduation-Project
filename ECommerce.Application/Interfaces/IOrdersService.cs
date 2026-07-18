using ECommerce.Application.DTOs;
using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IOrderService
    {
        Task<CreateOrderResponseDto> CreateOrderAsync(string customerId, CreateOrderDto dto);
        Task<CreateOrderResponseDto> CreateOrderFromCartAsync(string customerId);
        Task<CreateCashOnDeliveryOrderResponseDto> CreateCashOnDeliveryOrderAsync(string customerId, CreateOrderDto dto);
        Task<CreateCashOnDeliveryOrderResponseDto> CreateCashOnDeliveryOrderFromCartAsync(string customerId);
        Task<OrderResponseDto?> GetOrderAsync(int orderId);
        Task<IEnumerable<OrderResponseDto>> GetOrdersByCustomerAsync(string customerId);
        Task<IEnumerable<OrderResponseDto>> GetAllOrdersAsync();
        Task<OrderStatus> GetOrderStatusAsync(int orderId);
        Task<OrderResponseDto> MarkOrderAsPaidAsync(int orderId);
    }
}
