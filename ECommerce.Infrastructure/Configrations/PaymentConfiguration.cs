using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Configrations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Payment");

            builder.HasKey(p => p.PayId);

            builder.Property(p => p.PayId)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Status)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.Amount)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(p => p.Payment_Method)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasOne(p => p.Customer)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.CId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
