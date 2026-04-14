using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourProject.Models;

namespace YourProject.Data.Configurations
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

            // FK → Shopping_Cart
            builder.HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            // FK → Product
            builder.HasOne(ci => ci.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(ci => ci.PId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
