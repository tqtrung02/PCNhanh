"use client";

import { Product } from "@/app/data/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  showBrand?: boolean;
  columns?: string; // Tailwind grid classes, e.g., "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  onAddToCart: (product: Product) => void;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  showBrand = false,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  onAddToCart,
  emptyMessage = "Không tìm thấy sản phẩm",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {emptyMessage}
        </h3>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showBrand={showBrand}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

