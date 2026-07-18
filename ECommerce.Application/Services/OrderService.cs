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
            return await GetOrCreateOrderAndIntentAsync(customerId, orderProducts, totalPrice);
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
            
            return await GetOrCreateOrderAndIntentAsync(customerId, orderProducts, totalPrice);
        }

        public async Task<CreateCashOnDeliveryOrderResponseDto> CreateCashOnDeliveryOrderAsync(
            string customerId, CreateOrderDto dto)
        {
            if (dto.Items == null || !dto.Items.Any())
                throw new ArgumentException("Order must contain at least one item.");

            var (orderProducts, totalPrice) = await BuildOrderItemsAsync(dto.Items);
            return await CreateCashOnDeliveryOrderAsync(customerId, orderProducts, totalPrice);
        }

        public async Task<CreateCashOnDeliveryOrderResponseDto> CreateCashOnDeliveryOrderFromCartAsync(string customerId)
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
            var result = await CreateCashOnDeliveryOrderAsync(customerId, orderProducts, totalPrice);

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
            var orders = await _unitOfWork.Orders.GetAllWithDetailsAsync();
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

        public async Task<OrderResponseDto> MarkOrderAsPaidAsync(int orderId)
        {
            var order = await _unitOfWork.Orders.GetWithDetailsAsync(orderId)
                ?? throw new InvalidOperationException("Order not found.");

            var payment = await _unitOfWork.Payments.GetByOrderIdAsync(orderId)
                ?? throw new InvalidOperationException("Payment not found for this order.");

            if (payment.Payment_Method != "CashOnDelivery")
                throw new InvalidOperationException("Only cash-on-delivery orders can be marked paid this way.");

            if (order.Status == OrderStatus.Paid)
                return await MapToDtoAsync(order);

            if (order.Status != OrderStatus.AwaitingDelivery)
                throw new InvalidOperationException(
                    $"Order must be awaiting delivery to mark as paid (current status: {order.Status}).");

            order.Status = OrderStatus.Paid;
            payment.Status = PaymentStatus.Succeeded;
            payment.Paid_At = DateTime.UtcNow;

            foreach (var item in order.OrderProducts)
            {
                await _unitOfWork.Products.ReduceStockAsync(item.PId, item.Quantity);
            }

            await _unitOfWork.SaveChangesAsync();

            return await MapToDtoAsync(order);
        }


        private async Task<(List<Order_Products> items, decimal total)> BuildOrderItemsAsync(
            List<CreateOrderItemDto> items)
        {
            var orderProducts = new List<Order_Products>();
            decimal totalPrice = 0;

            foreach (var item in items.GroupBy(i => i.ProductId).Select(g => new CreateOrderItemDto
            {
                ProductId = g.Key,
                Quantity = g.Sum(i => i.Quantity)
            }))
            {
                if (item.ProductId <= 0 || item.Quantity <= 0)
                    throw new ArgumentException("Every order item must have a valid product and a quantity greater than zero.");

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

        private async Task<CreateOrderResponseDto> GetOrCreateOrderAndIntentAsync(
            string customerId, List<Order_Products> orderProducts, decimal totalPrice)
        {
            var existingOrder = await FindReusableOrderAsync(customerId, orderProducts, totalPrice);
            if (existingOrder is not null)
            {
                var existingPayment = await _unitOfWork.Payments.GetByOrderIdAsync(existingOrder.OId);
                if (existingPayment is not null)
                {
                    var existingIntent = await _paymentService.GetPaymentIntentAsync(existingOrder.OId);

                    if (existingIntent.Status == "succeeded")
                    {
                        await _paymentService.MarkAsSucceededAsync(
                            existingIntent.PaymentIntentId, existingIntent.PaymentMethodType ?? "card");
                        throw new InvalidOperationException(
                            $"Order {existingOrder.OId} was already paid. Check your order history.");
                    }

                   
                    if (existingIntent.Status is "requires_payment_method" or "requires_confirmation" or "requires_action")
                    {
                        return new CreateOrderResponseDto
                        {
                            OId = existingOrder.OId,
                            ClientSecret = existingIntent.ClientSecret
                        };
                    }

                    
                    var refreshed = await _paymentService.RefreshPaymentIntentAsync(existingOrder, existingPayment);
                    return new CreateOrderResponseDto
                    {
                        OId = existingOrder.OId,
                        ClientSecret = refreshed.ClientSecret
                    };
                }
            }

            var order = existingOrder ?? new Order
            {
                CId = customerId,
                Status = OrderStatus.Pending,
                Total_Price = totalPrice,
                Created_At = DateTime.UtcNow,
                OrderProducts = orderProducts
            };

            if (existingOrder is null)
            {
                await _unitOfWork.Orders.AddAsync(order);
                await _unitOfWork.SaveChangesAsync();
            }

            var intentResult = await _paymentService.CreatePaymentIntentAsync(order);

            order.Status = OrderStatus.AwaitingPayment;
            await _unitOfWork.SaveChangesAsync();

            return new CreateOrderResponseDto
            {
                OId = order.OId,
                ClientSecret = intentResult.ClientSecret
            };
        }

        private async Task<CreateCashOnDeliveryOrderResponseDto> CreateCashOnDeliveryOrderAsync(
            string customerId, List<Order_Products> orderProducts, decimal totalPrice)
        {
            var order = new Order
            {
                CId = customerId,
                Status = OrderStatus.AwaitingDelivery,
                Total_Price = totalPrice,
                Created_At = DateTime.UtcNow,
                OrderProducts = orderProducts,
                Payment = new Payment
                {
                    Status = PaymentStatus.Pending,
                    Amount = totalPrice,
                    Payment_Method = "CashOnDelivery",
                    // The current schema requires a unique non-null value even for non-Stripe payments.
                    StripePaymentIntentId = $"cod_{Guid.NewGuid():N}",
                    Created_At = DateTime.UtcNow
                }
            };

            await _unitOfWork.Orders.AddAsync(order);
            await _unitOfWork.SaveChangesAsync();

            return new CreateCashOnDeliveryOrderResponseDto { OId = order.OId };
        }

        private async Task<Order?> FindReusableOrderAsync(
            string customerId, List<Order_Products> requestedItems, decimal totalPrice)
        {
            var candidateOrders = await _unitOfWork.Orders.GetUnpaidWithDetailsByCustomerAsync(customerId);
            var requestedByProduct = requestedItems.OrderBy(i => i.PId)
                .Select(i => (i.PId, i.Quantity));

            return candidateOrders.FirstOrDefault(order =>
                order.Total_Price == totalPrice &&
                order.OrderProducts.OrderBy(i => i.PId).Select(i => (i.PId, i.Quantity))
                    .SequenceEqual(requestedByProduct));
        }

        private async Task<OrderResponseDto> MapToDtoAsync(Order order)
        {
            var payment = await _paymentService.GetByOrderIdAsync(order.OId);

            return new OrderResponseDto
            {
                OId = order.OId,
                CId = order.CId,

                CustomerName = order.Customer is null
                    ? string.Empty
                    : $"{order.Customer.First_Name} {order.Customer.Last_Name}".Trim(),
                CustomerEmail = order.Customer?.Email ?? string.Empty,

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
