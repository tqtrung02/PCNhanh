"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BuildComponents } from "@/app/build-pc/page";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

const componentCategories = [
  { id: "cpu", name: "Bộ Vi Xử Lý" },
  { id: "gpu", name: "Card Đồ Họa" },
  { id: "motherboard", name: "Bo Mạch Chủ" },
  { id: "ram", name: "Bộ Nhớ (RAM)" },
  { id: "storage", name: "Ổ Cứng" },
  { id: "psu", name: "Nguồn" },
  { id: "case", name: "Thùng Máy" },
  { id: "cooling", name: "Tản Nhiệt" },
];

export default function InstallationRequestPage() {
  const router = useRouter();
  const [buildData, setBuildData] = useState<{
    components: BuildComponents;
    totalPrice: number;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    preferredDate: "",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("installationRequest");
    if (saved) {
      setBuildData(JSON.parse(saved));
    } else {
      router.push("/build-pc");
    }
  }, [router]);

  if (!buildData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save request
    const requestData = {
      ...formData,
      buildData,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("installationRequests", JSON.stringify([
      ...(JSON.parse(localStorage.getItem("installationRequests") || "[]")),
      requestData,
    ]));

    // Clear build data
    localStorage.removeItem("installationRequest");

    alert("Yêu cầu lắp đặt đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    router.push("/");
  };

  const getTotalPrice = () => {
    return buildData.totalPrice + 500000; // Thêm phí lắp đặt
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/build-pc"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
          >
            ← Quay lại Build PC
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yêu Cầu Lắp Đặt PC
          </h1>
          <p className="text-gray-600">
            Điền thông tin để chúng tôi có thể liên hệ và lắp đặt PC cho bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Build Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Cấu hình PC của bạn
              </h2>
              <div className="space-y-3">
                {Object.entries(buildData.components).map(([key, component]) => (
                  <div key={key} className="flex items-center gap-4 pb-3 border-b">
                    <div className="text-3xl"><Image src={component.image} alt={component.name} width={100} height={100} /></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{component.name}</p>
                      <p className="text-sm text-gray-600">
                        {componentCategories.find((c) => c.id === key)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-600">
                        {formatPrice(component.price)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Tổng giá linh kiện:</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(buildData.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Thông tin liên hệ
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập email (tùy chọn)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ lắp đặt *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập địa chỉ chi tiết"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Thời gian mong muốn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày mong muốn
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredDate: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ mong muốn
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTime: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Chọn giờ</option>
                    <option value="08:00-10:00">08:00 - 10:00</option>
                    <option value="10:00-12:00">10:00 - 12:00</option>
                    <option value="13:00-15:00">13:00 - 15:00</option>
                    <option value="15:00-17:00">15:00 - 17:00</option>
                    <option value="17:00-19:00">17:00 - 19:00</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Ghi chú</h2>
              <textarea
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Tóm tắt đơn hàng
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giá linh kiện:</span>
                  <span className="font-medium">{formatPrice(buildData.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí lắp đặt:</span>
                  <span className="font-medium">{formatPrice(500000)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Tổng cộng:</span>
                    <span className="text-primary-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Dịch vụ bao gồm:
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Lắp ráp chuyên nghiệp</li>
                  <li>✓ Quản lý cáp gọn gàng</li>
                  <li>✓ Kiểm tra kỹ lưỡng</li>
                  <li>✓ Cài đặt Windows + Office</li>
                  <li>✓ Bảo hành toàn diện</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                } text-white`}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi Yêu Cầu"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

