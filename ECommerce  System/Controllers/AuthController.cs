using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce__System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthservice _service;
        public AuthController(IAuthservice authservice)
        {
            _service = authservice;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var token = await _service.Register(dto);
            return Ok(token);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _service.Login(dto);
            return Ok(token);
        }

    }
}
