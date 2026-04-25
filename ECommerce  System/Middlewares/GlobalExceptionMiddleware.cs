using ECommerce.Application.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;

namespace ECommerce__System.Middlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var statusCode = ex switch
            {
                NotFoundException => HttpStatusCode.NotFound,
                ECommerce.Application.Exceptions.ValidationException => HttpStatusCode.BadRequest,
                UnauthorizedException => HttpStatusCode.Unauthorized,
                _ => HttpStatusCode.InternalServerError
            };

            var response = new
            {
                StatusCode = (int)statusCode,
                Message = ex.Message
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
