"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { fetchProducts } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// Helper component to render product image
function ProductImage({ image, alt, className = "" }: { image: string; alt: string; className?: string }) {
  // Check if image is an external URL (starts with http:// or https://)
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return (
      <img
        src={image}
        alt={alt}
        className={`object-cover ${className}`}
      />
    );
  }
  // Check if image is a file path (starts with /)
  if (image.startsWith("/")) {
    return (
      <Image
        src={image}
        alt={alt}
        width={200}
        height={200}
        className={`object-cover ${className}`}
        unoptimized
      />
    );
  }
  // Render emoji
  return <div className={className}>{image}</div>;
}

export interface BuildComponent extends Product {
  componentType: string;
}

export interface BuildComponents {
  cpu?: BuildComponent;
  gpu?: BuildComponent;
  motherboard?: BuildComponent;
  ram?: BuildComponent;
  storage?: BuildComponent;
  psu?: BuildComponent;
  case?: BuildComponent;
  cooling?: BuildComponent;
}

const componentCategories = [
  { id: "cpu", name: "Bộ Vi Xử Lý", icon: "💻", required: true },
  { id: "gpu", name: "Card Đồ Họa", icon: "🎮", required: true },
  { id: "motherboard", name: "Bo Mạch Chủ", icon: "🔌", required: true },
  { id: "ram", name: "Bộ Nhớ (RAM)", icon: "💾", required: true },
  { id: "storage", name: "Ổ Cứng", icon: "💿", required: true },
  { id: "psu", name: "Nguồn", icon: "⚡", required: true },
  { id: "case", name: "Thùng Máy", icon: "🖥️", required: true },
  { id: "cooling", name: "Tản Nhiệt", icon: "❄️", required: false },
];

// Map component types to search keywords
const componentKeywords: Record<string, string[]> = {
  cpu: ["cpu", "intel", "amd", "ryzen", "core i", "processor", "bộ vi xử lý"],
  gpu: ["gpu", "card đồ họa", "rtx", "gtx", "radeon", "graphics", "nvidia"],
  motherboard: ["motherboard", "bo mạch", "mainboard", "main"],
  ram: ["ram", "ddr", "memory", "bộ nhớ", "vengeance", "trident"],
  storage: ["ssd", "hdd", "ổ cứng", "nvme", "storage", "hard drive"],
  psu: ["psu", "nguồn", "power supply", "watt", "80+", "corsair rm"],
  case: ["case", "thùng máy", "chassis", "tower", "pc case"],
  cooling: ["cooling", "tản nhiệt", "cooler", "fan", "aio", "liquid"],
};

export default function BuildPCPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<BuildComponents>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  // Get available products for each component type
  const getAvailableProducts = (componentType: string): Product[] => {
    const keywords = componentKeywords[componentType] || [];
    const searchLower = searchQuery.toLowerCase();
    
    return products.filter((product) => {
      if (!product.inStock) return false;
      
      // Check if product matches component type keywords
      const productText = `${product.name} ${product.description} ${product.brand || ""}`.toLowerCase();
      const matchesComponentType = keywords.some((keyword) =>
        productText.includes(keyword)
      );
      
      // If search query exists, filter by it
      if (searchQuery.trim()) {
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower);
        return matchesComponentType && matchesSearch;
      }
      
      return matchesComponentType;
    });
  };

  const handleSelectComponent = (category: string, product: Product) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [category]: { ...product, componentType: category },
    }));
    setActiveCategory(null);
    setSearchQuery("");
  };

  const handleRemoveComponent = (category: string) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };
      delete newComponents[category as keyof BuildComponents];
      return newComponents;
    });
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce(
      (sum, component) => sum + (component?.price || 0),
      0
    );
  };

  const getCompletionPercentage = () => {
    const requiredCategories = componentCategories.filter((cat) => cat.required);
    const selectedRequired = requiredCategories.filter(
      (cat) => selectedComponents[cat.id as keyof BuildComponents]
    );
    return Math.round((selectedRequired.length / requiredCategories.length) * 100);
  };

  const handleAddToCart = () => {
    Object.values(selectedComponents).forEach((component) => {
      if (component) {
        addToCart(component);
      }
    });
    alert("Đã thêm tất cả linh kiện vào giỏ hàng!");
    router.push("/cart");
  };

  const handleRequestInstallation = () => {
    const buildData = {
      components: selectedComponents,
      totalPrice: getTotalPrice(),
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("installationRequest", JSON.stringify(buildData));
    router.push("/installation-request");
  };

  const isBuildComplete = () => {
    const requiredCategories = componentCategories.filter((cat) => cat.required);
    return requiredCategories.every(
      (cat) => selectedComponents[cat.id as keyof BuildComponents]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tạo PC</h1>
          <p className="text-gray-600 text-lg">
            Cấu hình PC mơ ước của bạn từng bước
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Tiến Độ Tạo PC
            </span>
            <span className="text-sm text-gray-600">
              {getCompletionPercentage()}% Hoàn Thành
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2 space-y-4">
            {componentCategories.map((category) => {
              const selected = selectedComponents[category.id as keyof BuildComponents];

              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-lg shadow-sm p-6 ${
                    selected ? "border-2 border-primary-500" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {category.name}
                      </h3>
                      {category.required && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                          Bắt Buộc
                        </span>
                      )}
                    </div>
                    {selected && (
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 font-semibold rounded">
                        {formatPrice(selected.price)}
                      </span>
                    )}
                  </div>

                  {selected ? (
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <ProductImage
                          image={selected.image}
                          alt={selected.name}
                          className="w-full h-full text-4xl"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{selected.name}</p>
                        <p className="text-sm text-gray-600">{selected.brand}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
                        >
                          Thay Đổi
                        </button>
                        <button
                          onClick={() => handleRemoveComponent(category.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors font-medium text-gray-700"
                    >
                      Chọn {category.name}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Build Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🛒</span>
                Tóm Tắt PC
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Linh Kiện</span>
                  <span className="font-medium text-gray-900">
                    {Object.keys(selectedComponents).length} đã chọn
                  </span>
                </div>

                <div className="border-t pt-4 space-y-2">
                  {Object.entries(selectedComponents).map(([key, component]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600 capitalize">
                        {componentCategories.find((c) => c.id === key)?.name || key}
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatPrice(component.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {Object.keys(selectedComponents).length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Tổng Cộng
                      </span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {Object.keys(selectedComponents).length > 0 && (
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Thêm Vào Giỏ
                  </button>
                  <button
                    onClick={handleRequestInstallation}
                    disabled={!isBuildComplete()}
                    className={`w-full py-3 border-2 rounded-lg font-semibold transition-colors ${
                      isBuildComplete()
                        ? "border-primary-600 text-primary-600 hover:bg-primary-50"
                        : "border-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    🔧 Yêu Cầu Lắp Đặt
                  </button>
                </div>
              )}

              {!isBuildComplete() && Object.keys(selectedComponents).length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Vui lòng chọn đầy đủ các linh kiện bắt buộc để yêu cầu lắp đặt
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Component Selector Modal */}
        {activeCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Chọn {componentCategories.find((c) => c.id === activeCategory)?.name}
                  </h2>
                  <button
                    onClick={() => {
                      setActiveCategory(null);
                      setSearchQuery("");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm linh kiện..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {getAvailableProducts(activeCategory).map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                          <ProductImage
                            image={product.image}
                            alt={product.name}
                            className="w-full h-full text-4xl"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                          <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                          {product.specs && (
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key}>
                                  <span className="text-gray-600">{key}:</span>{" "}
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-primary-600">
                              {formatPrice(product.price)}
                            </div>
                            <button
                              onClick={() => handleSelectComponent(activeCategory, product)}
                              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                            >
                              Chọn
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {getAvailableProducts(activeCategory).length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      Không tìm thấy linh kiện phù hợp
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

