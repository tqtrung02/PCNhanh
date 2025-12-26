export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand?: string;
  description: string;
  inStock: boolean;
  specs?: {
    cpu?: string;
    ram?: string;
    storage?: string;
    gpu?: string;
    screen?: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "PC Gaming RTX 4060 - Intel i5 12400F",
    price: 18990000,
    originalPrice: 21990000,
    image: "💻",
    category: "PC Gaming",
    brand: "PCNhanh",
    description: "Cấu hình mạnh mẽ cho game thủ, build sẵn Windows và phần mềm cơ bản",
    inStock: true,
    specs: {
      cpu: "Intel Core i5-12400F",
      ram: "16GB DDR4",
      storage: "512GB SSD NVMe",
      gpu: "RTX 4060 8GB",
    },
  },
  {
    id: "2",
    name: "PC Workstation - AMD Ryzen 7 5700X",
    price: 22990000,
    image: "🖥️",
    category: "PC Workstation",
    brand: "PCNhanh",
    description: "Phù hợp cho lập trình viên, thiết kế đồ họa, dựng phim",
    inStock: true,
    specs: {
      cpu: "AMD Ryzen 7 5700X",
      ram: "32GB DDR4",
      storage: "1TB SSD NVMe",
      gpu: "RTX 3060 12GB",
    },
  },
  {
    id: "3",
    name: "Laptop Gaming ASUS TUF F15",
    price: 24990000,
    originalPrice: 27990000,
    image: "💻",
    category: "Laptop",
    brand: "ASUS",
    description: "Laptop gaming mạnh mẽ, màn hình 15.6 inch 144Hz",
    inStock: true,
    specs: {
      cpu: "Intel Core i7-12700H",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      gpu: "RTX 4060 8GB",
      screen: "15.6 inch 144Hz",
    },
  },
  {
    id: "4",
    name: "Card đồ họa RTX 4070 Super",
    price: 18990000,
    image: "🎮",
    category: "Linh kiện",
    brand: "NVIDIA",
    description: "Card đồ họa cao cấp cho gaming và render",
    inStock: true,
    specs: {
      gpu: "RTX 4070 Super 12GB",
    },
  },
  {
    id: "5",
    name: "RAM DDR4 16GB (2x8GB) 3200MHz",
    price: 1890000,
    image: "💾",
    category: "Linh kiện",
    brand: "Corsair",
    description: "Bộ nhớ RAM tốc độ cao, phù hợp cho gaming và workstation",
    inStock: true,
    specs: {
      ram: "16GB DDR4 3200MHz",
    },
  },
  {
    id: "6",
    name: "SSD NVMe 1TB Gen4",
    price: 2490000,
    image: "💿",
    category: "Linh kiện",
    brand: "Samsung",
    description: "Ổ cứng SSD tốc độ cao, đọc/ghi nhanh",
    inStock: true,
    specs: {
      storage: "1TB NVMe Gen4",
    },
  },
  {
    id: "7",
    name: "PC Văn phòng - Intel i3 12100",
    price: 8990000,
    image: "🖥️",
    category: "PC Văn phòng",
    brand: "PCNhanh",
    description: "PC văn phòng giá rẻ, đủ mạnh cho công việc hàng ngày",
    inStock: true,
    specs: {
      cpu: "Intel Core i3-12100",
      ram: "8GB DDR4",
      storage: "256GB SSD",
    },
  },
  {
    id: "8",
    name: "Dịch vụ Build PC theo yêu cầu",
    price: 500000,
    image: "🔧",
    category: "Dịch vụ",
    brand: "PCNhanh",
    description: "Tư vấn và build PC theo nhu cầu, cài đặt Windows + Office",
    inStock: true,
  },
  {
    id: "9",
    name: "Intel Core i9-14900K",
    price: 14750000, // 589.99 * 25000
    originalPrice: 15750000,
    image: "/intel-processor-i9.jpg",
    category: "Linh kiện",
    brand: "Intel",
    description: "Bộ vi xử lý Intel Core i9-14900K thế hệ 14, hiệu năng cao cấp cho gaming và workstation",
    inStock: true,
    specs: {
      cpu: "Intel Core i9-14900K",
    },
  },
  {
    id: "10",
    name: "NVIDIA RTX 4090",
    price: 40000000, // 1599.99 * 25000
    originalPrice: 42500000,
    image: "/nvidia-rtx-4090-graphics-card.jpg",
    category: "Linh kiện",
    brand: "NVIDIA",
    description: "Card đồ họa NVIDIA RTX 4090 flagship, hiệu năng đỉnh cao cho gaming 4K và AI rendering",
    inStock: true,
    specs: {
      gpu: "RTX 4090 24GB GDDR6X",
    },
  },
  {
    id: "11",
    name: "Samsung 990 PRO 2TB",
    price: 4500000, // 179.99 * 25000
    originalPrice: 5000000,
    image: "/samsung-nvme-ssd.jpg",
    category: "Linh kiện",
    brand: "Samsung",
    description: "Ổ cứng SSD NVMe Samsung 990 PRO 2TB, tốc độ đọc/ghi cực nhanh, PCIe 4.0",
    inStock: true,
    specs: {
      storage: "2TB NVMe Gen4",
    },
  },
  {
    id: "12",
    name: "Corsair Vengeance 32GB DDR5",
    price: 3000000, // 119.99 * 25000
    originalPrice: 3250000,
    image: "/corsair-ram-memory-modules.jpg",
    category: "Linh kiện",
    brand: "Corsair",
    description: "Bộ nhớ RAM Corsair Vengeance 32GB (2x16GB) DDR5, tốc độ cao cho gaming và workstation",
    inStock: true,
    specs: {
      ram: "32GB DDR5 (2x16GB)",
    },
  },
  {
    id: "13",
    name: "AMD Ryzen 9 7950X",
    price: 13750000, // 549.99 * 25000
    originalPrice: 15000000,
    image: "/amd-ryzen-9-processor.jpg",
    category: "Linh kiện",
    brand: "AMD",
    description: "Bộ vi xử lý AMD Ryzen 9 7950X, 16 lõi 32 luồng, hiệu năng đa nhiệm vượt trội",
    inStock: true,
    specs: {
      cpu: "AMD Ryzen 9 7950X",
    },
  },
  {
    id: "14",
    name: "ASUS ROG MAXIMUS Z790 HERO",
    price: 15750000, // 629.99 * 25000
    originalPrice: 17000000,
    image: "/asus-rog-motherboard.jpg",
    category: "Linh kiện",
    brand: "ASUS",
    description: "Bo mạch chủ ASUS ROG MAXIMUS Z790 HERO, hỗ trợ Intel Gen 13/14, DDR5, PCIe 5.0",
    inStock: true,
  },
  {
    id: "15",
    name: "Corsair RM1000x 1000W 80+ Gold",
    price: 4750000, // 189.99 * 25000
    originalPrice: 5250000,
    image: "/corsair-power-supply.jpg",
    category: "Linh kiện",
    brand: "Corsair",
    description: "Nguồn máy tính Corsair RM1000x 1000W 80+ Gold, fully modular, hiệu suất cao và ổn định",
    inStock: true,
  },
  {
    id: "16",
    name: "Lian Li O11 Dynamic EVO",
    price: 4250000, // 169.99 * 25000
    originalPrice: 4750000,
    image: "/lian-li-pc-case.jpg",
    category: "Linh kiện",
    brand: "Lian Li",
    description: "Thùng máy Lian Li O11 Dynamic EVO, thiết kế đẹp, hỗ trợ tản nhiệt nước, RGB",
    inStock: true,
  },
];

export const categories = [
  "Tất cả",
  "PC Gaming",
  "PC Workstation",
  "PC Văn phòng",
  "Laptop",
  "Linh kiện",
  "Dịch vụ",
];

// Extract unique brands from products
export const brands = [
  "Tất cả",
  "PCNhanh",
  "NVIDIA",
  "Corsair",
  "Samsung",
  "ASUS",
  "AMD",
  "Intel",
  "Kingston",
  "Crucial",
  "Lian Li",
];

