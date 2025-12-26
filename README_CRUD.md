# Hướng dẫn triển khai CRUD với Database

## Bước 1: Cài đặt Dependencies

```bash
npm install
# hoặc
pnpm install
# hoặc
yarn install
```

## Bước 2: Cấu hình Database

1. Tạo file `.env` trong thư mục root (copy từ `.env.example` nếu có)

2. Cấu hình `DATABASE_URL` trong `.env`:

### PostgreSQL (khuyến nghị)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pcnhanh?schema=public"
```

### MySQL
```env
DATABASE_URL="mysql://user:password@localhost:3306/pcnhanh"
```

### SQLite (cho development)
```env
DATABASE_URL="file:./dev.db"
```

### MongoDB
```env
DATABASE_URL="mongodb://user:password@localhost:27017/pcnhanh"
```

**Lưu ý:** Nếu dùng MongoDB, cần thay đổi `provider` trong `prisma/schema.prisma` thành `"mongodb"`

## Bước 3: Chạy Migration

```bash
# Tạo migration
npx prisma migrate dev --name init

# Hoặc nếu chỉ muốn tạo schema mà không migrate
npx prisma db push
```

## Bước 4: Generate Prisma Client

```bash
npx prisma generate
```

## Bước 5: Seed Database (Tùy chọn)

Nếu muốn import dữ liệu mẫu từ `app/data/products.ts`, tạo file `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import { products } from '../app/data/products'

const prisma = new PrismaClient()

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || null,
        image: product.image,
        category: product.category,
        brand: product.brand || null,
        description: product.description,
        inStock: product.inStock,
        specs: product.specs || null,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Sau đó chạy:
```bash
npx prisma db seed
```

## Bước 6: Chạy Development Server

```bash
npm run dev
```

## API Endpoints

### Products

- `GET /api/products` - Lấy danh sách sản phẩm
  - Query params: `category`, `brand`, `search`, `inStock`, `minPrice`, `maxPrice`
  
- `GET /api/products/[id]` - Lấy chi tiết sản phẩm

- `POST /api/products` - Tạo sản phẩm mới
  ```json
  {
    "name": "Tên sản phẩm",
    "price": 1000000,
    "originalPrice": 1200000,
    "image": "/image.jpg",
    "category": "Linh kiện",
    "brand": "Brand name",
    "description": "Mô tả",
    "inStock": true,
    "specs": {}
  }
  ```

- `PUT /api/products/[id]` - Cập nhật sản phẩm

- `DELETE /api/products/[id]` - Xóa sản phẩm

## Admin Page

Truy cập `/admin/products` để quản lý sản phẩm:
- Xem danh sách sản phẩm
- Thêm sản phẩm mới
- Sửa sản phẩm
- Xóa sản phẩm

## Lưu ý

1. **Bảo mật:** Admin page hiện tại chưa có authentication. Nên thêm middleware để bảo vệ route `/admin/*`

2. **Cloud Storage:** Nếu muốn upload ảnh lên cloud (AWS S3, Cloudinary), cần:
   - Cài đặt SDK tương ứng
   - Tạo API route `/api/upload`
   - Cập nhật form upload trong admin page

3. **Validation:** Có thể thêm validation library như `zod` để validate dữ liệu tốt hơn

4. **Error Handling:** Có thể cải thiện error handling và logging

