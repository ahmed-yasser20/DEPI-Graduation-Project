using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourProject.Models;

namespace YourProject.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order");

            builder.HasKey(o => o.OId);

            builder.Property(o => o.OId)
                .ValueGeneratedOnAdd();

            builder.Property(o => o.Statues)
                .IsRequired()

            builder.Property(o => o.Total_Price)
                .HasColumnType("decimal(22,2)")
                .IsRequired();

            builder.Property(o => o.Created_At)
                .IsRequired()
                .HasDefaultValueSql("GETUTCDATE()");

            // FK → Payment
            builder.HasOne(o => o.Payment)
                .WithMany(p => p.Orders)
                .HasForeignKey(o => o.PayId)
                .OnDelete(DeleteBehavior.Restrict);

            // FK → Customer (ApplicationUser)
            builder.HasOne(o => o.Customer)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.CId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
