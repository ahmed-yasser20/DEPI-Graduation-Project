using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourProject.Models;

namespace YourProject.Data.Configurations
{
    public class OrderProductsConfiguration : IEntityTypeConfiguration<Order_Products>
    {
        public void Configure(EntityTypeBuilder<Order_Products> builder)
        {
            builder.ToTable("Order_Products");

            builder.HasKey(op => op.OPId);

            builder.Property(op => op.OPId)
                .ValueGeneratedOnAdd();

            builder.Property(op => op.Quantity)
                .IsRequired();

            // FK → Order
            builder.HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OId)
                .OnDelete(DeleteBehavior.Cascade);

            // FK → Product
            builder.HasOne(op => op.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(op => op.PId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
