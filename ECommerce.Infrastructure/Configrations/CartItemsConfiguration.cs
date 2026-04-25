using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Configrations
{
    public class CartItemsConfiguration : IEntityTypeConfiguration<Cart_Items>
    {
        public void Configure(EntityTypeBuilder<Cart_Items> builder)
        {
            builder.ToTable("Cart_Items");

            builder.HasKey(ci => ci.CIId);

            builder.Property(ci => ci.CIId)
                .ValueGeneratedOnAdd();

            builder.Property(ci => ci.Quantity)
                .IsRequired();

            builder.HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ci => ci.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(ci => ci.PId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
