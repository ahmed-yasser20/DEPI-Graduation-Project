import { api } from "./api";
import type { ProductResponse, CategoryResponse } from "@/types/api";
import type { Product } from "@/components/ProductCard";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

export function mapProduct(p: ProductResponse): Product {
  return {
    id: String(p.pId),
    name: p.pName,
    price: p.price,
    category: p.category_Name || "",
    categoryId: p.categoryId ?? undefined,
    stock: p.stock,
    image: p.imageUrl || FALLBACK_IMAGE,
    description: p.description || "",
  };
}

export interface Category {
  id: string; // category name, used as the filter key
  name: string;
  categoryId: number;
  blurb: string;
}

function mapCategory(c: CategoryResponse): Category {
  return {
    id: c.category_Name,
    name: c.category_Name,
    categoryId: c.categoryId,
    blurb: c.productCount != null ? `${c.productCount} item${c.productCount === 1 ? "" : "s"}` : "",
  };
}

export const productService = {
  async list(): Promise<Product[]> {
    const { data } = await api.get<ProductResponse[]>("/Product");
    return data.map(mapProduct);
  },

  async getById(id: string): Promise<Product> {
    const { data } = await api.get<ProductResponse>(`/Product/${id}`);
    return mapProduct(data);
  },

  async search(keyword: string): Promise<Product[]> {
    const { data } = await api.get<ProductResponse[]>("/Product/search", { params: { keyword } });
    return data.map(mapProduct);
  },

  async categories(): Promise<Category[]> {
    const { data } = await api.get<CategoryResponse[]>("/Category");
    return data.map(mapCategory);
  },
};
