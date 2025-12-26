import { Product } from "@/app/data/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchProducts(params?: {
  category?: string;
  brand?: string;
  search?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.category && params.category !== "Tất cả") {
      searchParams.append("category", params.category);
    }
    if (params?.brand && params.brand !== "Tất cả") {
      searchParams.append("brand", params.brand);
    }
    if (params?.search) {
      searchParams.append("search", params.search);
    }
    if (params?.inStock) {
      searchParams.append("inStock", "true");
    }
    if (params?.minPrice) {
      searchParams.append("minPrice", params.minPrice.toString());
    }
    if (params?.maxPrice) {
      searchParams.append("maxPrice", params.maxPrice.toString());
    }

    const url = `/api/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const response = await fetch(url, {
      cache: "no-store", // Đảm bảo luôn fetch data mới nhất
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback về empty array nếu có lỗi
    return [];
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

