"use client";

import { useState } from "react";

export default function TestDBPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test 1: Fetch products
      const productsResponse = await fetch("/api/products");
      if (!productsResponse.ok) {
        throw new Error(`API returned ${productsResponse.status}`);
      }
      const products = await productsResponse.json();

      // Test 2: Fetch single product (if available)
      let singleProduct = null;
      if (products.length > 0) {
        const productResponse = await fetch(`/api/products/${products[0].id}`);
        if (productResponse.ok) {
          singleProduct = await productResponse.json();
        }
      }

      setResult({
        success: true,
        productCount: products.length,
        products: products.slice(0, 5), // First 5 products
        singleProduct,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setResult({
        success: false,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Database Connection Test
          </h1>

          <button
            onClick={testConnection}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors mb-6 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700"
            } text-white`}
          >
            {loading ? "Đang kiểm tra..." : "Kiểm tra kết nối Database"}
          </button>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-red-800 font-semibold mb-2">❌ Lỗi:</h3>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {result.success ? (
                <>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-green-800 font-semibold mb-2">
                      ✅ Kết nối thành công!
                    </h3>
                    <p className="text-green-600">
                      Tìm thấy {result.productCount} sản phẩm trong database
                    </p>
                    <p className="text-sm text-green-500 mt-2">
                      Thời gian: {new Date(result.timestamp).toLocaleString("vi-VN")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Danh sách sản phẩm (5 đầu tiên):
                    </h3>
                    <div className="space-y-3">
                      {result.products.map((product: any) => (
                        <div
                          key={product.id}
                          className="p-4 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {product.description}
                              </p>
                              <div className="mt-2 flex gap-4 text-sm">
                                <span className="text-gray-600">
                                  Category: <strong>{product.category}</strong>
                                </span>
                                {product.brand && (
                                  <span className="text-gray-600">
                                    Brand: <strong>{product.brand}</strong>
                                  </span>
                                )}
                                <span className="text-gray-600">
                                  Price:{" "}
                                  <strong>
                                    {product.price.toLocaleString("vi-VN")} VNĐ
                                  </strong>
                                </span>
                                <span
                                  className={
                                    product.inStock
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {product.inStock ? "✓ Còn hàng" : "✗ Hết hàng"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.singleProduct && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Chi tiết sản phẩm đầu tiên:
                      </h3>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <pre className="text-sm overflow-auto">
                          {JSON.stringify(result.singleProduct, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-red-800 font-semibold mb-2">
                    ❌ Kết nối thất bại
                  </h3>
                  <p className="text-red-600">{result.error}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Hướng dẫn kiểm tra:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Click nút "Kiểm tra kết nối Database"</li>
              <li>Nếu thành công: Sẽ hiển thị số lượng sản phẩm và danh sách</li>
              <li>Nếu thất bại: Kiểm tra DATABASE_URL trong file .env</li>
              <li>Đảm bảo đã chạy migration: <code className="bg-gray-200 px-1 rounded">npx prisma migrate dev</code></li>
              <li>Đảm bảo đã seed data: <code className="bg-gray-200 px-1 rounded">npx prisma db seed</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

