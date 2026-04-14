using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourProject.Models;

namespace YourProject.Data.Configurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.ToTable("Customer");

            builder.Property(u => u.First_Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Last_Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.City)
                .HasMaxLength(100);

            builder.Property(u => u.Street)
                .HasMaxLength(200);

            builder.Property(u => u.Building)
                .HasMaxLength(100);

            // FK → Shopping_Cart (1-to-1: one customer owns one cart)
            builder.HasOne(u => u.Cart)
                .WithOne(c => c.Customer)
                .HasForeignKey<ApplicationUser>(u => u.CartId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
        }
    }
}
