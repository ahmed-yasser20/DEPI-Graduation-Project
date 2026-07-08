using ECommerce.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces
{
    public interface IAuthservice
    {
        public Task<AuthDto> Register(RegisterDto dto);
        public Task<AuthDto> Login(LoginDto dto);

    }
}
