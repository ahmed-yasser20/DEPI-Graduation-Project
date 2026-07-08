using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Configrations
{
    public class ShoppingCartConfiguration : IEntityTypeConfiguration<Shopping_Cart>
    {
        public void Configure(EntityTypeBuilder<Shopping_Cart> builder)
        {
            builder.ToTable("Shopping_Cart");

            builder.HasKey(c => c.CartId);

            builder.Property(c => c.CartId)
                .IsRequired()
                .HasMaxLength(450);
        }
    }
}
