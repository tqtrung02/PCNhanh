export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
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
    description: "Tư vấn và build PC theo nhu cầu, cài đặt Windows + Office",
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

