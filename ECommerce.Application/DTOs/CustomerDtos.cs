using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.DTOs
{
    public class CustomerResponseDto
    {
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string Building { get; set; } = string.Empty;
    }




    public class UpdateCustomerDto
    {
        [MaxLength(100)]
        public string First_Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Last_Name { get; set; } = string.Empty;

        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Street { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Building { get; set; } = string.Empty;
    }
}
