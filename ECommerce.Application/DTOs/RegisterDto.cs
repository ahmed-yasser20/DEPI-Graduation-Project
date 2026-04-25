using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ECommerce.Application.DTOs
{
    public class RegisterDto
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, EmailAddress, MaxLength(50)]
        public string Email { get; set; }

        [Required, MinLength(6)]
        public string Password { get; set; }
        public string City { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string Building { get; set; } = string.Empty;

    }
}
