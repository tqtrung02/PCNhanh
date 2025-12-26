-- SQL Script để seed dữ liệu mẫu vào NeonDB
-- Chạy script này sau khi đã tạo các bảng

-- Xóa dữ liệu cũ (cẩn thận!)
-- DELETE FROM "Product";

-- Insert sản phẩm mẫu
INSERT INTO "Product" ("id", "name", "price", "originalPrice", "image", "category", "brand", "description", "inStock", "createdAt", "updatedAt", "specs")
VALUES
('1', 'PC Gaming RTX 4060 - Intel i5 12400F', 18990000, 21990000, '💻', 'PC Gaming', 'PCNhanh', 'Cấu hình mạnh mẽ cho game thủ, build sẵn Windows và phần mềm cơ bản', true, NOW(), NOW(), '{"cpu": "Intel Core i5-12400F", "ram": "16GB DDR4", "storage": "512GB SSD NVMe", "gpu": "RTX 4060 8GB"}'::jsonb),

('2', 'PC Workstation - AMD Ryzen 7 5700X', 22990000, NULL, '🖥️', 'PC Workstation', 'PCNhanh', 'Phù hợp cho lập trình viên, thiết kế đồ họa, dựng phim', true, NOW(), NOW(), '{"cpu": "AMD Ryzen 7 5700X", "ram": "32GB DDR4", "storage": "1TB SSD NVMe", "gpu": "RTX 3060 12GB"}'::jsonb),

('3', 'Laptop Gaming ASUS TUF F15', 24990000, 27990000, '💻', 'Laptop', 'ASUS', 'Laptop gaming mạnh mẽ, màn hình 15.6 inch 144Hz', true, NOW(), NOW(), '{"cpu": "Intel Core i7-12700H", "ram": "16GB DDR4", "storage": "512GB SSD", "gpu": "RTX 4060 8GB", "screen": "15.6 inch 144Hz"}'::jsonb),

('4', 'Card đồ họa RTX 4070 Super', 18990000, NULL, '🎮', 'Linh kiện', 'NVIDIA', 'Card đồ họa cao cấp cho gaming và render', true, NOW(), NOW(), '{"gpu": "RTX 4070 Super 12GB"}'::jsonb),

('5', 'RAM DDR4 16GB (2x8GB) 3200MHz', 1890000, NULL, '💾', 'Linh kiện', 'Corsair', 'Bộ nhớ RAM tốc độ cao, phù hợp cho gaming và workstation', true, NOW(), NOW(), '{"ram": "16GB DDR4 3200MHz"}'::jsonb),

('6', 'SSD NVMe 1TB Gen4', 2490000, NULL, '💿', 'Linh kiện', 'Samsung', 'Ổ cứng SSD tốc độ cao, đọc/ghi nhanh', true, NOW(), NOW(), '{"storage": "1TB NVMe Gen4"}'::jsonb),

('7', 'PC Văn phòng - Intel i3 12100', 8990000, NULL, '🖥️', 'PC Văn phòng', 'PCNhanh', 'PC văn phòng giá rẻ, đủ mạnh cho công việc hàng ngày', true, NOW(), NOW(), '{"cpu": "Intel Core i3-12100", "ram": "8GB DDR4", "storage": "256GB SSD"}'::jsonb),

('8', 'Dịch vụ Build PC theo yêu cầu', 500000, NULL, '🔧', 'Dịch vụ', 'PCNhanh', 'Tư vấn và build PC theo nhu cầu, cài đặt Windows + Office', true, NOW(), NOW(), NULL),

('9', 'Intel Core i9-14900K', 14750000, 15750000, '/intel-processor-i9.jpg', 'Linh kiện', 'Intel', 'Bộ vi xử lý Intel Core i9-14900K thế hệ 14, hiệu năng cao cấp cho gaming và workstation', true, NOW(), NOW(), '{"cpu": "Intel Core i9-14900K"}'::jsonb),

('10', 'NVIDIA RTX 4090', 40000000, 42500000, '/nvidia-rtx-4090-graphics-card.jpg', 'Linh kiện', 'NVIDIA', 'Card đồ họa NVIDIA RTX 4090 flagship, hiệu năng đỉnh cao cho gaming 4K và AI rendering', true, NOW(), NOW(), '{"gpu": "RTX 4090 24GB GDDR6X"}'::jsonb),

('11', 'Samsung 990 PRO 2TB', 4500000, 5000000, '/samsung-nvme-ssd.jpg', 'Linh kiện', 'Samsung', 'Ổ cứng SSD NVMe Samsung 990 PRO 2TB, tốc độ đọc/ghi cực nhanh, PCIe 4.0', true, NOW(), NOW(), '{"storage": "2TB NVMe Gen4"}'::jsonb),

('12', 'Corsair Vengeance 32GB DDR5', 3000000, 3250000, '/corsair-ram-memory-modules.jpg', 'Linh kiện', 'Corsair', 'Bộ nhớ RAM Corsair Vengeance 32GB (2x16GB) DDR5, tốc độ cao cho gaming và workstation', true, NOW(), NOW(), '{"ram": "32GB DDR5 (2x16GB)"}'::jsonb),

('13', 'AMD Ryzen 9 7950X', 13750000, 15000000, '/amd-ryzen-9-processor.jpg', 'Linh kiện', 'AMD', 'Bộ vi xử lý AMD Ryzen 9 7950X, 16 lõi 32 luồng, hiệu năng đa nhiệm vượt trội', true, NOW(), NOW(), '{"cpu": "AMD Ryzen 9 7950X"}'::jsonb),

('14', 'ASUS ROG MAXIMUS Z790 HERO', 15750000, 17000000, '/asus-rog-motherboard.jpg', 'Linh kiện', 'ASUS', 'Bo mạch chủ ASUS ROG MAXIMUS Z790 HERO, hỗ trợ Intel Gen 13/14, DDR5, PCIe 5.0', true, NOW(), NOW(), NULL),

('15', 'Corsair RM1000x 1000W 80+ Gold', 4750000, 5250000, '/corsair-power-supply.jpg', 'Linh kiện', 'Corsair', 'Nguồn máy tính Corsair RM1000x 1000W 80+ Gold, fully modular, hiệu suất cao và ổn định', true, NOW(), NOW(), NULL),

('16', 'Lian Li O11 Dynamic EVO', 4250000, 4750000, '/lian-li-pc-case.jpg', 'Linh kiện', 'Lian Li', 'Thùng máy Lian Li O11 Dynamic EVO, thiết kế đẹp, hỗ trợ tản nhiệt nước, RGB', true, NOW(), NOW(), NULL);

-- Verify data
SELECT COUNT(*) as total_products FROM "Product";
SELECT "category", COUNT(*) as count FROM "Product" GROUP BY "category";

