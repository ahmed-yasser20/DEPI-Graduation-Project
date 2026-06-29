using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Configrations
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.ToTable("Customer");

            builder.Property(u => u.First_Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(u => u.Last_Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(u => u.City)
                .HasMaxLength(50);

            builder.Property(u => u.Street)
                .HasMaxLength(50);

            builder.Property(u => u.Building)
                .HasMaxLength(50);

            builder.HasOne(u => u.Cart)
                .WithOne(c => c.Customer)
                .HasForeignKey<AppUser>(u => u.CartId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
        }
    }
}
