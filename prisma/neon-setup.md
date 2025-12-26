# Hướng dẫn setup NeonDB cho PCNhanh

## Bước 1: Tạo NeonDB Project

1. Truy cập [NeonDB Console](https://console.neon.tech/)
2. Đăng nhập hoặc tạo tài khoản
3. Click "Create Project"
4. Đặt tên project: `pcnhanh` (hoặc tên bạn muốn)
5. Chọn region gần nhất (ví dụ: Singapore cho Việt Nam)
6. Click "Create Project"

## Bước 2: Lấy Connection String

1. Sau khi tạo project, bạn sẽ thấy connection string
2. Copy connection string, có dạng:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

## Bước 3: Cấu hình .env

Tạo file `.env` trong thư mục root với nội dung:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

**Lưu ý:** Thay thế `username`, `password`, và connection string bằng thông tin thực tế từ NeonDB.

## Bước 4: Chạy SQL Script

Có 2 cách:

### Cách 1: Sử dụng NeonDB SQL Editor (Khuyến nghị)

1. Vào NeonDB Console
2. Chọn project của bạn
3. Click vào tab "SQL Editor"
4. Copy toàn bộ nội dung file `prisma/neon-init.sql`
5. Paste vào SQL Editor
6. Click "Run" để chạy script

### Cách 2: Sử dụng Prisma Migrate

```bash
# Cài đặt dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Tạo và chạy migration
npx prisma migrate dev --name init

# Seed database (tùy chọn)
npx prisma db seed
```

## Bước 5: Verify Database

Chạy query sau trong SQL Editor để kiểm tra:

```sql
-- Kiểm tra các bảng đã được tạo
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Kiểm tra số lượng products
SELECT COUNT(*) FROM "Product";
```

## Bước 6: Seed Data (Tùy chọn)

Nếu muốn import dữ liệu mẫu:

```bash
npx prisma db seed
```

Hoặc chạy SQL script seed trong SQL Editor (nếu có).

## Troubleshooting

### Lỗi connection
- Kiểm tra connection string trong `.env`
- Đảm bảo `sslmode=require` được thêm vào connection string
- Kiểm tra firewall/network settings

### Lỗi permission
- Đảm bảo user có quyền CREATE TABLE
- NeonDB thường tự động cấp quyền cho user chính

### Lỗi schema
- Xóa các bảng cũ nếu cần: `DROP TABLE IF EXISTS "Product" CASCADE;`
- Chạy lại script từ đầu

## Cấu trúc Database

Sau khi setup, bạn sẽ có các bảng:

1. **Product** - Sản phẩm
   - id, name, price, originalPrice, image, category, brand, description, inStock, specs, createdAt, updatedAt

2. **Order** - Đơn hàng
   - id, name, phone, email, address, note, paymentMethod, totalPrice, status, createdAt, updatedAt

3. **OrderItem** - Chi tiết đơn hàng
   - id, orderId, productId, quantity, price

4. **InstallationRequest** - Yêu cầu lắp đặt
   - id, name, phone, email, address, note, preferredDate, preferredTime, components, totalPrice, status, createdAt, updatedAt

## Next Steps

1. Cập nhật code để sử dụng API routes thay vì static data
2. Test CRUD operations qua admin page: `/admin/products`
3. Thêm authentication cho admin routes
4. Setup backup và monitoring

