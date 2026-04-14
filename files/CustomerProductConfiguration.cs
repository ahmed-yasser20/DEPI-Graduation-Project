using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourProject.Models;

namespace YourProject.Data.Configurations
{
    public class CustomerProductConfiguration : IEntityTypeConfiguration<CustomerProduct>
    {
        public void Configure(EntityTypeBuilder<CustomerProduct> builder)
        {
            builder.ToTable("CustomerProduct");

            // Composite PK
            builder.HasKey(cp => new { cp.PId, cp.CId });

            // FK → Product
            builder.HasOne(cp => cp.Product)
                .WithMany(p => p.CustomerProducts)
                .HasForeignKey(cp => cp.PId)
                .OnDelete(DeleteBehavior.Cascade);

            // FK → Customer (ApplicationUser)
            builder.HasOne(cp => cp.Customer)
                .WithMany(u => u.CustomerProducts)
                .HasForeignKey(cp => cp.CId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
