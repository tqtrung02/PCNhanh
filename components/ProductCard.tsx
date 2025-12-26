"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/data/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// Helper component to render product image
function ProductImage({ image, alt, className = "" }: { image: string; alt: string; className?: string }) {
  // Check if image is a file path (starts with /) or emoji
  if (image.startsWith("/")) {
    return (
      <Image
        src={image}
        alt={alt}
        width={400}
        height={400}
        className={`object-cover ${className}`}
        unoptimized
      />
    );
  }
  // Render emoji
  return <div className={className}>{image}</div>;
}

interface ProductCardProps {
  product: Product;
  showBrand?: boolean;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, showBrand = false, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          <ProductImage
            image={product.image}
            alt={product.name}
            className="w-full h-full text-6xl"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        {showBrand && product.brand && (
          <span className="text-xs font-medium text-primary-600 mb-1 block">
            {product.brand}
          </span>
        )}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-2 rounded-lg font-semibold transition-colors mt-auto ${
            product.inStock
              ? "bg-primary-600 text-white hover:bg-primary-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
      </div>
    </div>
  );
}

