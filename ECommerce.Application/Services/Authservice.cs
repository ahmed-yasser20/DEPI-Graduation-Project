using ECommerce.Application.DTOs;
using ECommerce.Application.Exceptions;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.Application.Services
{
    public class AuthService : IAuthservice
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<AuthDto> Register(RegisterDto dto)
        {

            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
                throw new ValidationException("Email is already registered");

            var user = new AppUser
            {
                First_Name = dto.FirstName,
                Last_Name = dto.LastName,
                Email = dto.Email,
                UserName = dto.Email,
                City = dto.City,
                Street = dto.Street,
                Building = dto.Building
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            return await GenerateTokenAsync(user);
        }

        public async Task<AuthDto> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new NotFoundException("Email not found");

            var isValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!isValid)
                throw new UnauthorizedException("Invalid password");

            return await GenerateTokenAsync(user);
        }

        private async Task<AuthDto> GenerateTokenAsync(AppUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]!));
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.GivenName, user.First_Name),
            new Claim(ClaimTypes.Surname, user.Last_Name)
        };
            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }


            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new AuthDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }
    }
}