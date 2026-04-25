using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ECommerce.Application.DTOs
{
    public class LoginDto
    {
        [Required, EmailAddress, MaxLength(50)]
        public string  Email { get; set; }

        [Required, MinLength(6)]
        public string Password { get; set; }
    }
}
