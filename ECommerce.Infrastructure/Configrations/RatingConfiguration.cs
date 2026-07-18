using ECommerce.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.Configrations
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.ToTable("Rating");

            builder.HasKey(r => r.RId);

            builder.Property(r => r.RId)
                .ValueGeneratedOnAdd();

            builder.Property(r => r.Value)
                .IsRequired();

            builder.Property(r => r.Comment)
                .HasMaxLength(1000);

            builder.Property(r => r.Created_At)
                .IsRequired();

            // One rating per customer per product
            builder.HasIndex(r => new { r.PId, r.CId })
                .IsUnique();

            builder.HasOne(r => r.Product)
                .WithMany(p => p.Ratings)
                .HasForeignKey(r => r.PId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            builder.HasOne(r => r.Customer)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.CId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        }
    }
}
