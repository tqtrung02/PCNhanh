"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { categories, brands, Product } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { ProductGrid } from "@/components/ProductGrid";
import { fetchProducts } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [selectedBrand, setSelectedBrand] = useState<string>("Tất cả");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await fetchProducts({
        category: selectedCategory !== "Tất cả" ? selectedCategory : undefined,
        brand: selectedBrand !== "Tất cả" ? selectedBrand : undefined,
        search: searchQuery || undefined,
        inStock: inStockOnly || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [selectedCategory, selectedBrand, searchQuery, inStockOnly, priceRange]);

  // Sort products (filtering đã được xử lý ở API)
  const filteredProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sortBy]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 50000000;
    return Math.max(...products.map((p) => p.price), 50000000);
  }, [products]);

  const handlePriceRangeChange = (value: number, index: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    if (newRange[0] > newRange[1]) {
      if (index === 0) newRange[1] = value;
      else newRange[0] = value;
    }
    setPriceRange(newRange);
  };

  const resetFilters = () => {
    setSelectedCategory("Tất cả");
    setSelectedBrand("Tất cả");
    setPriceRange([0, maxPrice]);
    setInStockOnly(false);
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Tất cả sản phẩm
          </h1>
          <p className="text-gray-600 mb-4">
            Tìm thấy {filteredProducts.length} sản phẩm
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
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
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Bộ lọc</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Đặt lại
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Thương hiệu</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Khoảng giá</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Từ: {formatPrice(priceRange[0])}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceRangeChange(Number(e.target.value), 0)
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Đến: {formatPrice(priceRange[1])}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange(Number(e.target.value), 1)
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span className="mx-auto">-</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Stock Status Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Tình trạng</h3>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                    Chỉ hiển thị sản phẩm còn hàng
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Mobile Filter Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Bộ lọc
                </button>
                <span className="text-sm text-gray-600 sm:hidden">
                  {filteredProducts.length} sản phẩm
                </span>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <label className="text-sm text-gray-600 font-medium">Sắp xếp:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Sidebar */}
            {isFilterOpen && (
              <div className="lg:hidden mb-6 bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Bộ lọc</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
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

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category-mobile"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Thương hiệu</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="brand-mobile"
                          value={brand}
                          checked={selectedBrand === brand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Khoảng giá</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Từ: {formatPrice(priceRange[0])}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) =>
                          handlePriceRangeChange(Number(e.target.value), 0)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Đến: {formatPrice(priceRange[1])}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          handlePriceRangeChange(Number(e.target.value), 1)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                    </div>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span className="mx-auto">-</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Stock Status Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Tình trạng</h3>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                      Chỉ hiển thị sản phẩm còn hàng
                    </span>
                  </label>
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ProductGrid
                  products={filteredProducts}
                  showBrand={true}
                  columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  onAddToCart={addToCart}
                  emptyMessage="Không tìm thấy sản phẩm"
                />
                {filteredProducts.length === 0 && !loading && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

