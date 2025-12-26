# PCNhanh Website

Website giới thiệu về mô hình kinh doanh PCNhanh - Dịch vụ PC & Linh kiện tại nhà.

## Công nghệ sử dụng

- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy development server:

```bash
npm run dev
```

3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## Cấu trúc dự án

```
├── app/
│   ├── about/              # Trang về chúng tôi
│   ├── business-model/     # Trang Business Model Canvas
│   ├── market-analysis/    # Trang phân tích thị trường
│   ├── services/          # Trang dịch vụ
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Trang chủ
├── components/
│   ├── Footer.tsx         # Footer component
│   └── Navigation.tsx     # Navigation component
└── package.json
```

## Tính năng

- ✅ Trang chủ với hero section và giới thiệu
- ✅ Business Model Canvas đầy đủ với tất cả các thành phần
- ✅ Phân tích thị trường chi tiết
- ✅ Trang dịch vụ với giá cả
- ✅ Trang về chúng tôi với thông tin nhóm
- ✅ Navigation responsive
- ✅ Design đơn giản nhưng tinh tế với màu xanh lá (primary)

## Build cho production

```bash
npm run build
npm start
```

## Nhóm phát triển

- Đặng Việt Thành
- Trần Bá Toản
- Trần Quang Trung
- Trương Đức Huy
