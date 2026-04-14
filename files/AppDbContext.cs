using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using YourProject.Data.Configurations;
using YourProject.Models;

namespace YourProject.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // ── DbSets ──────────────────────────────────────────────────────────
        public DbSet<Category>         Categories      { get; set; }
        public DbSet<Product>          Products        { get; set; }
        public DbSet<CustomerProduct>  CustomerProducts { get; set; }
        public DbSet<Payment>          Payments        { get; set; }
        public DbSet<Order>            Orders          { get; set; }
        public DbSet<Order_Products>   OrderProducts   { get; set; }
        public DbSet<Shopping_Cart>    ShoppingCarts   { get; set; }
        public DbSet<Cart_Items>       CartItems       { get; set; }

        // ── Fluent API ───────────────────────────────────────────────────────
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Must call base first — applies all Identity table mappings
            base.OnModelCreating(modelBuilder);

            // Apply every IEntityTypeConfiguration from the Configurations folder
            modelBuilder.ApplyConfiguration(new ApplicationUserConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerProductConfiguration());
            modelBuilder.ApplyConfiguration(new PaymentConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new OrderProductsConfiguration());
            modelBuilder.ApplyConfiguration(new ShoppingCartConfiguration());
            modelBuilder.ApplyConfiguration(new CartItemsConfiguration());
        }
    }
}
