import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Edit, Plus, Trash2, ArrowUp, ArrowDown, ArrowUpDown, Search } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/Loader";
import { StatusBadge } from "@/components/StatusBadge";
import { getStatusMeta, getStatusRank } from "@/lib/orderStatus";
import { useAuth } from "@/context/AuthContext";
import { fmt, formatDate } from "@/lib/format";
import { adminService, type ProductPayload } from "@/services/adminService";
import type { CategoryResponse, OrderResponse, ProductResponse } from "@/types/api";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const emptyProduct: ProductPayload = {
  pName: "",
  price: 0,
  description: "",
  stock: 0,
  categoryId: null,
};

function AdminPage() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [busy, setBusy] = useState(true);
  const [productForm, setProductForm] = useState<ProductPayload>(emptyProduct);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editingProductImageUrl, setEditingProductImageUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageDeleting, setImageDeleting] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [markingPaidId, setMarkingPaidId] = useState<number | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<"all" | "card" | "cod">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"none" | "total" | "status">("none");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");
  const [productStockFilter, setProductStockFilter] = useState<"all" | "in" | "out">("all");
  type ProductSortField = "none" | "name" | "price" | "stock" | "sold" | "revenue";
  const [productSortField, setProductSortField] = useState<ProductSortField>("none");
  const [productSortDir, setProductSortDir] = useState<"asc" | "desc">("asc");

  const [categorySearch, setCategorySearch] = useState("");
  type CategorySortField = "none" | "name" | "products" | "sold" | "revenue";
  const [categorySortField, setCategorySortField] = useState<CategorySortField>("none");
  const [categorySortDir, setCategorySortDir] = useState<"asc" | "desc">("asc");

  const load = async () => {
    setBusy(true);
    try {
      const [nextProducts, nextCategories, nextOrders] = await Promise.all([
        adminService.listProducts(),
        adminService.listCategories(),
        adminService.listOrders(),
      ]);
      setProducts(nextProducts);
      setCategories(nextCategories);
      setOrders(nextOrders);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't load the dashboard");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) navigate({ to: "/" });
  }, [isAuthenticated, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin]);

  const salesByProduct = useMemo(() => {
    const sales = new Map<number, number>();
    orders
      .filter((order) => order.status === "Paid" || order.payment?.status === "Succeeded")
      .forEach((order) => {
        order.items.forEach((item) =>
          sales.set(item.pId, (sales.get(item.pId) || 0) + item.quantity),
        );
      });
    return sales;
  }, [orders]);

  const revenueByProduct = useMemo(() => {
    const revenue = new Map<number, number>();
    orders
      .filter((order) => order.status === "Paid" || order.payment?.status === "Succeeded")
      .forEach((order) => {
        order.items.forEach((item) =>
          revenue.set(item.pId, (revenue.get(item.pId) || 0) + item.quantity * item.unitPrice),
        );
      });
    return revenue;
  }, [orders]);

  const salesByCategory = useMemo(() => {
    const sales = new Map<number, number>();
    products.forEach((product) => {
      if (product.categoryId == null) return;
      sales.set(
        product.categoryId,
        (sales.get(product.categoryId) || 0) + (salesByProduct.get(product.pId) || 0),
      );
    });
    return sales;
  }, [products, salesByProduct]);

  const revenueByCategory = useMemo(() => {
    const revenue = new Map<number, number>();
    products.forEach((product) => {
      if (product.categoryId == null) return;
      revenue.set(
        product.categoryId,
        (revenue.get(product.categoryId) || 0) + (revenueByProduct.get(product.pId) || 0),
      );
    });
    return revenue;
  }, [products, revenueByProduct]);

  const orderStatusOptions = useMemo(() => {
    const seen = new Set(orders.map((o) => o.status));
    return Array.from(seen).sort((a, b) => getStatusRank(a) - getStatusRank(b));
  }, [orders]);

  const visibleOrders = useMemo(() => {
    let result = orders.filter((order) => {
      const isCod = order.payment?.payment_Method === "CashOnDelivery";
      if (paymentFilter === "card" && isCod) return false;
      if (paymentFilter === "cod" && !isCod) return false;
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      return true;
    });

    if (sortField !== "none") {
      result = [...result].sort((a, b) => {
        const diff =
          sortField === "total"
            ? a.total_Price - b.total_Price
            : getStatusRank(a.status) - getStatusRank(b.status);
        return sortDir === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [orders, paymentFilter, statusFilter, sortField, sortDir]);

  const toggleSort = (field: "total" | "status") => {
    if (sortField !== field) {
      setSortField(field);
      setSortDir("asc");
    } else {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    }
  };

  const toggleProductSort = (field: ProductSortField) => {
    if (productSortField !== field) {
      setProductSortField(field);
      setProductSortDir("asc");
    } else {
      setProductSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    }
  };

  const toggleCategorySort = (field: CategorySortField) => {
    if (categorySortField !== field) {
      setCategorySortField(field);
      setCategorySortDir("asc");
    } else {
      setCategorySortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (
        productSearch.trim() &&
        !product.pName.toLowerCase().includes(productSearch.trim().toLowerCase())
      )
        return false;
      if (
        productCategoryFilter !== "all" &&
        String(product.categoryId ?? "none") !== productCategoryFilter
      )
        return false;
      if (productStockFilter === "in" && product.stock <= 0) return false;
      if (productStockFilter === "out" && product.stock > 0) return false;
      return true;
    });

    if (productSortField !== "none") {
      result = [...result].sort((a, b) => {
        const diff =
          productSortField === "name"
            ? a.pName.localeCompare(b.pName)
            : productSortField === "price"
              ? a.price - b.price
              : productSortField === "stock"
                ? a.stock - b.stock
                : productSortField === "sold"
                  ? (salesByProduct.get(a.pId) || 0) - (salesByProduct.get(b.pId) || 0)
                  : (revenueByProduct.get(a.pId) || 0) - (revenueByProduct.get(b.pId) || 0);
        return productSortDir === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [
    products,
    productSearch,
    productCategoryFilter,
    productStockFilter,
    productSortField,
    productSortDir,
    salesByProduct,
    revenueByProduct,
  ]);

  const filteredCategories = useMemo(() => {
    let result = categories.filter((category) => {
      if (
        categorySearch.trim() &&
        !category.category_Name.toLowerCase().includes(categorySearch.trim().toLowerCase())
      )
        return false;
      return true;
    });

    if (categorySortField !== "none") {
      result = [...result].sort((a, b) => {
        const diff =
          categorySortField === "name"
            ? a.category_Name.localeCompare(b.category_Name)
            : categorySortField === "products"
              ? (a.productCount ?? 0) - (b.productCount ?? 0)
              : categorySortField === "sold"
                ? (salesByCategory.get(a.categoryId) || 0) - (salesByCategory.get(b.categoryId) || 0)
                : (revenueByCategory.get(a.categoryId) || 0) - (revenueByCategory.get(b.categoryId) || 0);
        return categorySortDir === "asc" ? diff : -diff;
      });
    }

    return result;
  }, [categories, categorySearch, categorySortField, categorySortDir, salesByCategory, revenueByCategory]);

  // Reset to page 1 whenever the product search/filter/sort criteria change,
  // so the user isn't stranded on a now-empty or out-of-range page.
  useEffect(() => {
    setPage(1);
  }, [productSearch, productCategoryFilter, productStockFilter, productSortField, productSortDir]);

  const productPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pagedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const openProduct = (product?: ProductResponse) => {
    setEditingProduct(product?.pId ?? null);
    setEditingProductImageUrl(product?.imageUrl ?? null);
    setProductForm(
      product
        ? {
            pName: product.pName,
            price: product.price,
            description: product.description,
            stock: product.stock,
            categoryId: product.categoryId ?? null,
          }
        : emptyProduct,
    );
    setProductDialog(true);
  };

  const saveProduct = async () => {
    if (!productForm.pName.trim() || productForm.price < 0 || productForm.stock < 0) {
      toast.error("Enter a product name, price, and valid stock amount");
      return;
    }
    try {
      const saved = await adminService.saveProduct(productForm, editingProduct ?? undefined);
      const wasNew = editingProduct === null;
      toast.success(wasNew ? "Product created" : "Product updated");
      if (wasNew) {
        // Keep the dialog open and switch into "editing" mode using the newly
        // created product's id, so the admin can immediately attach an image
        // without closing and reopening the dialog.
        setEditingProduct(saved.pId);
        setEditingProductImageUrl(saved.imageUrl ?? null);
      } else {
        setProductDialog(false);
      }
      await load();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't save product");
    }
  };

  const uploadImage = async (file: File) => {
    if (!editingProduct) return;
    setImageUploading(true);
    try {
      const updated = await adminService.uploadProductImage(editingProduct, file);
      setEditingProductImageUrl(updated.imageUrl ?? null);
      toast.success("Image uploaded");
      await load();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const deleteImage = async () => {
    if (!editingProduct) return;
    setImageDeleting(true);
    try {
      const updated = await adminService.deleteProductImage(editingProduct);
      setEditingProductImageUrl(updated.imageUrl ?? null);
      toast.success("Image removed");
      await load();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't remove image");
    } finally {
      setImageDeleting(false);
    }
  };

  const saveCategory = async () => {
    if (!categoryName.trim()) return toast.error("Category name is required");
    try {
      await adminService.saveCategory(categoryName.trim(), editingCategory ?? undefined);
      toast.success(editingCategory ? "Category updated" : "Category created");
      setCategoryName("");
      setEditingCategory(null);
      await load();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't save category");
    }
  };

  const markOrderPaid = async (orderId: number) => {
    setMarkingPaidId(orderId);
    try {
      await adminService.markOrderPaid(orderId);
      toast.success(`Order ORD-${orderId} marked as paid`);
      await load();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Couldn't mark order as paid");
    } finally {
      setMarkingPaidId(null);
    }
  };

  const remove = async (kind: "product" | "category", id: number) => {
    if (!window.confirm(`Delete this ${kind}? This cannot be undone.`)) return;
    try {
      if (kind === "product") await adminService.deleteProduct(id);
      else await adminService.deleteCategory(id);
      toast.success(`${kind === "product" ? "Product" : "Category"} deleted`);
      await load();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : `Couldn't delete ${kind}`);
    }
  };

  if (loading || !isAdmin)
    return (
      <Layout>
        <div className="container-page py-16">
          <Loader label="Loading dashboard..." />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <main className="container-page py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Administration</p>
        <h1 className="mt-2 text-4xl font-display font-semibold">Admin dashboard</h1>
        {busy ? (
          <div className="mt-10">
            <Loader label="Loading data..." />
          </div>
        ) : (
          <Tabs defaultValue="products" className="mt-10">
            <TabsList className="h-auto flex-wrap justify-start gap-1 bg-muted p-1">
              <TabsTrigger value="products">Products & sales</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="orders">All orders</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="mt-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Search products..."
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">Category</Label>
                  <Select value={productCategoryFilter} onValueChange={setProductCategoryFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="none">No category</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.categoryId} value={String(category.categoryId)}>
                          {category.category_Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">Stock</Label>
                  <Select
                    value={productStockFilter}
                    onValueChange={(v) => setProductStockFilter(v as typeof productStockFilter)}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="in">In stock</SelectItem>
                      <SelectItem value="out">Out of stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(productSearch.trim() !== "" ||
                  productCategoryFilter !== "all" ||
                  productStockFilter !== "all" ||
                  productSortField !== "none") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setProductSearch("");
                      setProductCategoryFilter("all");
                      setProductStockFilter("all");
                      setProductSortField("none");
                      setProductSortDir("asc");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
                <p className="ml-auto text-sm text-muted-foreground">
                  Showing {filteredProducts.length === 0 ? 0 : (page - 1) * pageSize + 1}
                  –{Math.min(page * pageSize, filteredProducts.length)} of {filteredProducts.length}
                  {filteredProducts.length !== products.length ? ` (filtered from ${products.length})` : ""}
                </p>
                <Button onClick={() => openProduct()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add product
                </Button>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                Sales count includes paid orders only.
              </p>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-muted-foreground">
                    <tr>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleProductSort("name")}
                        >
                          Product
                          {productSortField === "name" ? (
                            productSortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">Category</th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleProductSort("price")}
                        >
                          Price
                          {productSortField === "price" ? (
                            productSortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleProductSort("stock")}
                        >
                          Stock
                          {productSortField === "stock" ? (
                            productSortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleProductSort("sold")}
                        >
                          Units sold
                          {productSortField === "sold" ? (
                            productSortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleProductSort("revenue")}
                        >
                          Sales revenue
                          {productSortField === "revenue" ? (
                            productSortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {pagedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-muted-foreground">
                          No products match these filters.
                        </td>
                      </tr>
                    ) : (
                      pagedProducts.map((product) => (
                        <tr key={product.pId} className="border-t">
                          <td className="p-3 font-medium">{product.pName}</td>
                          <td className="p-3">{product.category_Name || "—"}</td>
                          <td className="p-3">{fmt(product.price)}</td>
                          <td className="p-3">{product.stock}</td>
                          <td className="p-3">{salesByProduct.get(product.pId) || 0}</td>
                          <td className="p-3">{fmt(revenueByProduct.get(product.pId) || 0)}</td>
                          <td className="p-3 text-right">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => openProduct(product)}
                              aria-label={`Edit ${product.pName}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => remove("product", product.pId)}
                              aria-label={`Delete ${product.pName}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((value) => value - 1)}
                >
                  Previous
                </Button>
                <span className="py-2 text-sm text-muted-foreground">
                  Page {page} of {productPages}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === productPages}
                  onClick={() => setPage((value) => value + 1)}
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="categories" className="mt-6">
              <div className="rounded-xl border p-5">
                <h2 className="font-semibold">
                  {editingCategory ? "Edit category" : "Add category"}
                </h2>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                    placeholder="Category name"
                  />
                  <Button onClick={saveCategory}>
                    {editingCategory ? "Save changes" : "Add category"}
                  </Button>
                  {editingCategory && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(null);
                        setCategoryName("");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-6 mb-3 flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={categorySearch}
                    onChange={(event) => setCategorySearch(event.target.value)}
                    placeholder="Search categories..."
                    className="pl-9"
                  />
                </div>
                {(categorySearch.trim() !== "" || categorySortField !== "none") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCategorySearch("");
                      setCategorySortField("none");
                      setCategorySortDir("asc");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
                <p className="ml-auto text-sm text-muted-foreground">
                  {filteredCategories.length} of {categories.length} categories
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-muted-foreground">
                    <tr>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleCategorySort("name")}
                        >
                          Name
                          {categorySortField === "name" ? (
                            categorySortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleCategorySort("products")}
                        >
                          Products
                          {categorySortField === "products" ? (
                            categorySortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleCategorySort("sold")}
                        >
                          Units sold
                          {categorySortField === "sold" ? (
                            categorySortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleCategorySort("revenue")}
                        >
                          Sales revenue
                          {categorySortField === "revenue" ? (
                            categorySortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-muted-foreground">
                          No categories match this search.
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category) => (
                        <tr key={category.categoryId} className="border-t">
                          <td className="p-3 font-medium">{category.category_Name}</td>
                          <td className="p-3">{category.productCount ?? 0}</td>
                          <td className="p-3">{salesByCategory.get(category.categoryId) || 0}</td>
                          <td className="p-3">
                            {fmt(revenueByCategory.get(category.categoryId) || 0)}
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setEditingCategory(category.categoryId);
                                setCategoryName(category.category_Name);
                              }}
                              aria-label={`Edit ${category.category_Name}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => remove("category", category.categoryId)}
                              aria-label={`Delete ${category.category_Name}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">Payment</Label>
                  <Select value={paymentFilter} onValueChange={(v) => setPaymentFilter(v as typeof paymentFilter)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="cod">Pay on delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[170px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {orderStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {getStatusMeta(status).label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {(paymentFilter !== "all" || statusFilter !== "all" || sortField !== "none") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPaymentFilter("all");
                      setStatusFilter("all");
                      setSortField("none");
                      setSortDir("asc");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
                <p className="text-sm text-muted-foreground ml-auto">
                  {visibleOrders.length} of {orders.length} orders
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-muted-foreground">
                    <tr>
                      <th className="p-3">Order</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleSort("total")}
                        >
                          Total
                          {sortField === "total" ? (
                            sortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          className="inline-flex items-center gap-1 hover:text-foreground"
                          onClick={() => toggleSort("status")}
                        >
                          Status
                          {sortField === "status" ? (
                            sortDir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">Payment</th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-muted-foreground">
                          No orders match these filters.
                        </td>
                      </tr>
                    ) : (
                      visibleOrders.map((order) => {
                        const isCod = order.payment?.payment_Method === "CashOnDelivery";
                        const canMarkPaid = isCod && order.status === "AwaitingDelivery";
                        return (
                          <tr key={order.oId} className="border-t align-top">
                            <td className="p-3 font-medium">ORD-{order.oId}</td>
                            <td className="p-3 font-mono text-xs text-muted-foreground">{order.cId}</td>
                            <td className="p-3 whitespace-nowrap">{formatDate(order.created_At)}</td>
                            <td className="p-3">
                              {order.items.map((item) => (
                                <div key={item.pId}>
                                  {item.productName} × {item.quantity}
                                </div>
                              ))}
                            </td>
                            <td className="p-3 whitespace-nowrap">{fmt(order.total_Price)}</td>
                            <td className="p-3">
                              <StatusBadge status={order.status} />
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              {isCod ? (
                                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                                  Pay on delivery
                                </span>
                              ) : (
                                <span className="text-xs text-muted-foreground">Card</span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              {canMarkPaid && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled={markingPaidId === order.oId}
                                  onClick={() => markOrderPaid(order.oId)}
                                >
                                  {markingPaidId === order.oId ? "Marking…" : "Mark paid"}
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Dialog
        open={productDialog}
        onOpenChange={(open) => {
          setProductDialog(open);
          if (!open) {
            setEditingProductImageUrl(null);
            setImageUploading(false);
            setImageDeleting(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit product" : "Add product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="product-name">Name</Label>
              <Input
                id="product-name"
                value={productForm.pName}
                onChange={(event) => setProductForm({ ...productForm, pName: event.target.value })}
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={productForm.price}
                  onChange={(event) =>
                    setProductForm({ ...productForm, price: Number(event.target.value) })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="product-stock">Stock</Label>
                <Input
                  id="product-stock"
                  type="number"
                  min="0"
                  value={productForm.stock}
                  onChange={(event) =>
                    setProductForm({ ...productForm, stock: Number(event.target.value) })
                  }
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={productForm.categoryId?.toString() || "none"}
                onValueChange={(value) =>
                  setProductForm({
                    ...productForm,
                    categoryId: value === "none" ? null : Number(value),
                  })
                }
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="No category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.categoryId} value={String(category.categoryId)}>
                      {category.category_Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                value={productForm.description}
                onChange={(event) =>
                  setProductForm({ ...productForm, description: event.target.value })
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Image</Label>
              {!editingProduct ? (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Save the product first - you'll be able to add an image right after.
                </p>
              ) : (
                <div className="mt-1.5 space-y-3">
                  {editingProductImageUrl && (
                    <img
                      src={editingProductImageUrl}
                      alt={productForm.pName || "Product image"}
                      className="h-32 w-32 rounded-lg border object-cover"
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={imageUploading}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadImage(file);
                        event.target.value = "";
                      }}
                      className="max-w-xs"
                    />
                    {imageUploading && (
                      <span className="text-sm text-muted-foreground">Uploading…</span>
                    )}
                    {editingProductImageUrl && !imageUploading && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={imageDeleting}
                        onClick={deleteImage}
                      >
                        {imageDeleting ? "Removing…" : "Remove image"}
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">JPG, PNG, or WebP, up to 5MB.</p>
                </div>
              )}
            </div>
            <Button onClick={saveProduct}>
              {editingProduct ? "Save changes" : "Create product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
