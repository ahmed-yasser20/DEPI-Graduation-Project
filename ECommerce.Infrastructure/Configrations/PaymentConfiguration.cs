using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Configrations
{
    class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
         public void Configure(EntityTypeBuilder<Payment> builder)
         {
            builder.ToTable("Payment");

            builder.HasKey(p => p.PayId);

            builder.Property(p => p.PayId)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Status)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(20);

            builder.Property(p => p.Amount)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(p => p.Payment_Method)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.StripePaymentIntentId)
                .IsRequired()
                .HasMaxLength(255);

            builder.HasIndex(p => p.StripePaymentIntentId)
                .IsUnique();

            builder.Property(p => p.FailureReason)
                .HasMaxLength(500);

            builder.Property(p => p.Created_At)
                .IsRequired();

            builder.HasOne(p => p.Order)
                .WithOne(o => o.Payment)
                .HasForeignKey<Payment>(p => p.OId)
                .OnDelete(DeleteBehavior.Cascade);
         }
    }
}
