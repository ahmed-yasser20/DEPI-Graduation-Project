using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public class CreateOrderDto
    {
        public List<CreateOrderItemDto> Items { get; set; } = new();
    }

    public class CreateOrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CreateOrderResponseDto
    {
        public int OId { get; set; }
        public string ClientSecret { get; set; } = string.Empty;
    }

    public class OrderResponseDto
    {
        public int OId { get; set; }
        public string CId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public decimal Total_Price { get; set; }
        public DateTime Created_At { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
        public PaymentResponseDto? Payment { get; set; }
    }

    public class OrderItemDto
    {
        public int PId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }


}
