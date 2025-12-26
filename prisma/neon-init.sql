-- SQL Script để tạo database và tables trong NeonDB
-- Chạy script này trong NeonDB SQL Editor hoặc psql

-- Tạo database (nếu chưa có, NeonDB thường tự tạo)
-- CREATE DATABASE pcnhanh;

-- Kết nối vào database
-- \c pcnhanh;

-- Tạo extension nếu cần (UUID, etc.)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Xóa các bảng nếu đã tồn tại (cẩn thận khi dùng trong production!)
DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "InstallationRequest" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;

-- Tạo bảng Product
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "originalPrice" INTEGER,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT,
    "description" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specs" JSONB,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- Tạo bảng Order
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "note" TEXT,
    "paymentMethod" TEXT NOT NULL DEFAULT 'cod',
    "totalPrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- Tạo bảng OrderItem
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- Tạo bảng InstallationRequest
CREATE TABLE "InstallationRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "note" TEXT,
    "preferredDate" TEXT,
    "preferredTime" TEXT,
    "components" JSONB NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstallationRequest_pkey" PRIMARY KEY ("id")
);

-- Tạo indexes cho Product
CREATE INDEX "Product_category_idx" ON "Product"("category");
CREATE INDEX "Product_brand_idx" ON "Product"("brand");
CREATE INDEX "Product_inStock_idx" ON "Product"("inStock");

-- Tạo indexes cho Order
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- Tạo indexes cho OrderItem
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- Tạo indexes cho InstallationRequest
CREATE INDEX "InstallationRequest_status_idx" ON "InstallationRequest"("status");
CREATE INDEX "InstallationRequest_createdAt_idx" ON "InstallationRequest"("createdAt");

-- Tạo Foreign Key constraints
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Tạo function để tự động cập nhật updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tạo triggers để tự động cập nhật updatedAt
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_installation_request_updated_at BEFORE UPDATE ON "InstallationRequest"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert dữ liệu mẫu (tùy chọn)
-- INSERT INTO "Product" ("id", "name", "price", "originalPrice", "image", "category", "brand", "description", "inStock", "createdAt", "updatedAt", "specs")
-- VALUES 
-- ('1', 'PC Gaming RTX 4060 - Intel i5 12400F', 18990000, 21990000, '💻', 'PC Gaming', 'PCNhanh', 'Cấu hình mạnh mẽ cho game thủ', true, NOW(), NOW(), '{"cpu": "Intel Core i5-12400F", "ram": "16GB DDR4", "storage": "512GB SSD NVMe", "gpu": "RTX 4060 8GB"}'::jsonb);

