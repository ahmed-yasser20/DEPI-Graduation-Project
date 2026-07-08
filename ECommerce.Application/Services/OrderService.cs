using ECommerce.Application.DTOs;
using ECommerce.Application.Exceptions;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;

        public OrderService(IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _paymentService = paymentService;
        }

        public async Task<CreateOrderResponseDto> CreateOrderAsync(string customerId, CreateOrderDto dto)
        {
            if (dto.Items == null || !dto.Items.Any())
                throw new ArgumentException("Order must contain at least one item.");

            var (orderProducts, totalPrice) = await BuildOrderItemsAsync(dto.Items);
            return await PersistOrderAndCreateIntentAsync(customerId, orderProducts, totalPrice);
        }

        public async Task<CreateOrderResponseDto> CreateOrderFromCartAsync(string customerId)
        {
           
            var cart = await _unitOfWork.ShoppingCarts.GetWithItemsAsync(customerId)
                ?? throw new InvalidOperationException("Cart does not exist.");

            if (!cart.CartItems.Any())
                throw new InvalidOperationException("Cart is empty.");

            var items = cart.CartItems.Select(ci => new CreateOrderItemDto
            {
                ProductId = ci.PId,
                Quantity = ci.Quantity
            }).ToList();

            var (orderProducts, totalPrice) = await BuildOrderItemsAsync(items);
            var result = await PersistOrderAndCreateIntentAsync(customerId, orderProducts, totalPrice);

            _unitOfWork.ShoppingCarts.ClearItems(cart);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<OrderResponseDto?> GetOrderAsync(int orderId)
        {
            var order = await _unitOfWork.Orders.GetWithDetailsAsync(orderId);
            return order == null ? null : await MapToDtoAsync(order);
        }

        public async Task<IEnumerable<OrderResponseDto>> GetOrdersByCustomerAsync(string customerId)
        {
            var orders = await _unitOfWork.Orders.GetByCustomerAsync(customerId);
            var dtos = new List<OrderResponseDto>();
            foreach (var order in orders)
                dtos.Add(await MapToDtoAsync(order));
            return dtos;
        }

        public async Task<IEnumerable<OrderResponseDto>> GetAllOrdersAsync()
        {
            var orders = await _unitOfWork.Orders.GetAllAsync();
            var dtos = new List<OrderResponseDto>();
            foreach (var order in orders)
                dtos.Add(await MapToDtoAsync(order));
            return dtos;
        }

        public async Task<OrderStatus> GetOrderStatusAsync(int orderId)
        {
            var order = await _unitOfWork.Orders.GetByIdAsync(orderId)
                ?? throw new InvalidOperationException("Order not found.");
            return order.Status;
        }

        // --- shared helpers ---

        private async Task<(List<Order_Products> items, decimal total)> BuildOrderItemsAsync(
            List<CreateOrderItemDto> items)
        {
            var orderProducts = new List<Order_Products>();
            decimal totalPrice = 0;

            foreach (var item in items)
            {
                var product = await _unitOfWork.Products.GetByIdAsync(item.ProductId)
                    ?? throw new InvalidOperationException($"Product {item.ProductId} not found.");

                if (product.Stock < item.Quantity)
                    throw new InvalidOperationException($"Insufficient stock for {product.PName}.");

                orderProducts.Add(new Order_Products
                {
                    PId = product.PId,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });

                totalPrice += product.Price * item.Quantity;
            }

            return (orderProducts, totalPrice);
        }

        private async Task<CreateOrderResponseDto> PersistOrderAndCreateIntentAsync(
            string customerId, List<Order_Products> orderProducts, decimal totalPrice)
        {
            var order = new Order
            {
                CId = customerId,
                Status = OrderStatus.Pending,
                Total_Price = totalPrice,
                Created_At = DateTime.UtcNow,
                OrderProducts = orderProducts
            };

            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.SaveChangesAsync();

            var intentResult = await _paymentService.CreatePaymentIntentAsync(order);

            order.Status = OrderStatus.AwaitingPayment;
            await _unitOfWork.SaveChangesAsync();

            return new CreateOrderResponseDto
            {
                OId = order.OId,
                ClientSecret = intentResult.ClientSecret
            };
        }

        private async Task<OrderResponseDto> MapToDtoAsync(Order order)
        {
            var payment = await _paymentService.GetByOrderIdAsync(order.OId);

            return new OrderResponseDto
            {
                OId = order.OId,
                CId = order.CId,
                Status = order.Status.ToString(),
                Total_Price = order.Total_Price,
                Created_At = order.Created_At,
                Items = order.OrderProducts.Select(op => new OrderItemDto
                {
                    PId = op.PId,
                    ProductName = op.Product?.PName ?? string.Empty,
                    Quantity = op.Quantity,
                    UnitPrice = op.UnitPrice
                }).ToList(),
                Payment = payment
            };
        }
    }
}
