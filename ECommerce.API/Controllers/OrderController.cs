using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ECommerce.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<CreateOrderResponseDto>> CreateOrder([FromBody] CreateOrderDto dto)
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _orderService.CreateOrderAsync(customerId, dto);
            return CreatedAtAction(nameof(GetOrder), new { orderId = result.OId }, result);
        }

        [HttpPost("from-cart")]
        public async Task<ActionResult<CreateOrderResponseDto>> CreateOrderFromCart()
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _orderService.CreateOrderFromCartAsync(customerId);
            return CreatedAtAction(nameof(GetOrder), new { orderId = result.OId }, result);
        }

        [HttpPost("cash-on-delivery")]
        public async Task<ActionResult<CreateCashOnDeliveryOrderResponseDto>> CreateCashOnDeliveryOrder(
            [FromBody] CreateOrderDto dto)
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _orderService.CreateCashOnDeliveryOrderAsync(customerId, dto);
            return CreatedAtAction(nameof(GetOrder), new { orderId = result.OId }, result);
        }

        [HttpPost("from-cart/cash-on-delivery")]
        public async Task<ActionResult<CreateCashOnDeliveryOrderResponseDto>> CreateCashOnDeliveryOrderFromCart()
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await _orderService.CreateCashOnDeliveryOrderFromCartAsync(customerId);
            return CreatedAtAction(nameof(GetOrder), new { orderId = result.OId }, result);
        }

        [HttpGet("{orderId}")]
        public async Task<ActionResult<OrderResponseDto>> GetOrder(int orderId)
        {
            var order = await _orderService.GetOrderAsync(orderId);
            if (order == null) return NotFound();

            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (order.CId != customerId) return Forbid();

            return Ok(order);
        }

        [HttpGet("{orderId}/status")]
        public async Task<ActionResult<OrderStatus>> GetOrderStatus(int orderId)
        {
            var status = await _orderService.GetOrderStatusAsync(orderId);
            return Ok(status);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetMyOrders()
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var orders = await _orderService.GetOrdersByCustomerAsync(customerId);
            return Ok(orders);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpPatch("{orderId}/mark-paid")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<OrderResponseDto>> MarkOrderAsPaid(int orderId)
        {
            var result = await _orderService.MarkOrderAsPaidAsync(orderId);
            return Ok(result);
        }
    }
}
