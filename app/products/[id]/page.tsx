"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
          <Link href="/" className="text-primary-600 hover:underline">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 text-gray-600 hover:text-primary-600"
        >
          ← Quay lại
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-9xl">
              {product.image}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    %
                  </span>
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specs && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    Thông số kỹ thuật
                  </h3>
                  <div className="space-y-2">
                    {product.specs.cpu && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">CPU:</span>
                        <span className="font-medium">{product.specs.cpu}</span>
                      </div>
                    )}
                    {product.specs.ram && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">RAM:</span>
                        <span className="font-medium">{product.specs.ram}</span>
                      </div>
                    )}
                    {product.specs.storage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ổ cứng:</span>
                        <span className="font-medium">
                          {product.specs.storage}
                        </span>
                      </div>
                    )}
                    {product.specs.gpu && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Card đồ họa:</span>
                        <span className="font-medium">{product.specs.gpu}</span>
                      </div>
                    )}
                    {product.specs.screen && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Màn hình:</span>
                        <span className="font-medium">
                          {product.specs.screen}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-center"
                >
                  Mua ngay
                </Link>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-900">
                  Dịch vụ đi kèm
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Miễn phí vận chuyển nội thành</li>
                  <li>✓ Bảo hành chính hãng</li>
                  <li>✓ Hỗ trợ lắp đặt tại nhà</li>
                  <li>✓ Tư vấn kỹ thuật 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
