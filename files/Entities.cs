namespace YourProject.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Category_Name { get; set; } = string.Empty;

        // Navigation
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }

    public class Product
    {
        public int PId { get; set; }
        public int CategoryId { get; set; }
        public string PName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Stock { get; set; }

        // Navigation
        public Category? Category { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; } = new List<CustomerProduct>();
        public ICollection<Order_Products> OrderProducts { get; set; } = new List<Order_Products>();
        public ICollection<Cart_Items> CartItems { get; set; } = new List<Cart_Items>();
    }

    public class CustomerProduct
    {
        public int PId { get; set; }
        public string CId { get; set; } = string.Empty;

        // Navigation
        public Product? Product { get; set; }
        public ApplicationUser? Customer { get; set; }
    }

    public class Payment
    {
        public int PayId { get; set; }
        public string CId { get; set; } = string.Empty;
        public string Statues { get; set; } = string.Empty;
        public int Amount { get; set; }
        public string Payment_Method { get; set; } = string.Empty;

        // Navigation
        public ApplicationUser? Customer { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

    public enum oo
    {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Cancelled
    };

    public class Order
    {
        public int OId { get; set; }
        public int PayId { get; set; }
        public string CId { get; set; } = string.Empty;
        public oo Statues { get; set; } = oo.Pending;
        public decimal Total_Price { get; set; }
        public DateTime Created_At { get; set; }

        // Navigation
        public Payment? Payment { get; set; }
        public ApplicationUser? Customer { get; set; }
        public ICollection<Order_Products> OrderProducts { get; set; } = new List<Order_Products>();
    }

    public class Order_Products
    {
        public int OPId { get; set; }
        public int OId { get; set; }
        public int PId { get; set; }
        public int Quantity { get; set; }

        // Navigation
        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }

    public class Shopping_Cart
    {
        public string CartId { get; set; } = string.Empty;

        // Navigation
        public ApplicationUser? Customer { get; set; }
        public ICollection<Cart_Items> CartItems { get; set; } = new List<Cart_Items>();
    }

    public class Cart_Items
    {
        public int CIId { get; set; }
        public string CartId { get; set; } = string.Empty;
        public int PId { get; set; }
        public int Quantity { get; set; }

        // Navigation
        public Shopping_Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
