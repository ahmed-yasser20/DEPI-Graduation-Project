using ECommerce.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Application.Interfaces
{
   public interface IAuthservice
    {
        public Task<AuthDto> Register(RegisterDto dto);
        public Task<AuthDto> Login (LoginDto dto);

    }
}
