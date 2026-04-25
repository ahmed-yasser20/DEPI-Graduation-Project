using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Infrastructure.Configrations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order");

            builder.HasKey(o => o.OId);

            builder.Property(o => o.OId)
                .ValueGeneratedOnAdd();

            builder.Property(o => o.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(o => o.Total_Price)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(o => o.Created_At)
                .IsRequired()
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(o => o.Payment)
                .WithMany(p => p.Orders)
                .HasForeignKey(o => o.PayId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(o => o.Customer)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.CId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
