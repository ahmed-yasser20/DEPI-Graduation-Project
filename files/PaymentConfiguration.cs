using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourProject.Models;

namespace YourProject.Data.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Payment");

            builder.HasKey(p => p.PayId);

            builder.Property(p => p.PayId)
                .ValueGeneratedOnAdd();

            builder.Property(p => p.Statues)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.Amount)
                .IsRequired();

            builder.Property(p => p.Payment_Method)
                .IsRequired()
                .HasMaxLength(100);

            // FK → Customer (ApplicationUser)
            builder.HasOne(p => p.Customer)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.CId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
