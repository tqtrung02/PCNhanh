"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "scheduled":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "pending":
      return "Đang chờ";
    case "confirmed":
      return "Đã xác nhận";
    case "scheduled":
      return "Đã lên lịch";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
}

interface InstallationRequest {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  note: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  components: any; // JSON
  totalPrice: number;
  status: string;
  createdAt: string;
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

export default function AdminInstallationRequestsPage() {
  const [requests, setRequests] = useState<InstallationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] =
    useState<InstallationRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const fetchRequests = async () => {
    try {
      const url =
        statusFilter === "all"
          ? "/api/installation-requests"
          : `/api/installation-requests?status=${statusFilter}`;
      const response = await fetch(url);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching installation requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    requestId: string,
    newStatus: string
  ) => {
    try {
      const response = await fetch(`/api/installation-requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchRequests();
        if (selectedRequest?.id === requestId) {
          const updatedRequest = await response.json();
          setSelectedRequest(updatedRequest);
        }
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái yêu cầu");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quản lý yêu cầu lắp đặt
            </h1>
            <p className="text-gray-600">
              Xem và quản lý tất cả yêu cầu lắp đặt PC
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/products"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Sản phẩm
            </Link>
            <Link
              href="/admin/orders"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Đơn hàng
            </Link>
            <Link
              href="/admin/installation-requests"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium"
            >
              Yêu cầu lắp đặt
            </Link>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "pending"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đang chờ
            </button>
            <button
              onClick={() => setStatusFilter("confirmed")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "confirmed"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đã xác nhận
            </button>
            <button
              onClick={() => setStatusFilter("scheduled")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "scheduled"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đã lên lịch
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "completed"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Hoàn thành
            </button>
            <button
              onClick={() => setStatusFilter("cancelled")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === "cancelled"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Đã hủy
            </button>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã yêu cầu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Không có yêu cầu nào
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.id.substring(0, 8)}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.name}
                        </div>
                        {request.email && (
                          <div className="text-sm text-gray-500">{request.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-primary-600">
                          {formatPrice(request.totalPrice)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusText(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(request.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            setSelectedRequest(
                              selectedRequest?.id === request.id ? null : request
                            )
                          }
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          {selectedRequest?.id === request.id ? "Ẩn" : "Chi tiết"}
                        </button>
                        <select
                          value={request.status}
                          onChange={(e) =>
                            handleStatusChange(request.id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Đang chờ</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="scheduled">Đã lên lịch</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Chi tiết yêu cầu lắp đặt
                  </h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Thông tin khách hàng
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Tên:</span> {selectedRequest.name}
                      </p>
                      <p>
                        <span className="font-medium">SĐT:</span> {selectedRequest.phone}
                      </p>
                      {selectedRequest.email && (
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {selectedRequest.email}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {selectedRequest.address}
                      </p>
                      {selectedRequest.preferredDate && (
                        <p>
                          <span className="font-medium">Ngày mong muốn:</span>{" "}
                          {selectedRequest.preferredDate}
                        </p>
                      )}
                      {selectedRequest.preferredTime && (
                        <p>
                          <span className="font-medium">Giờ mong muốn:</span>{" "}
                          {selectedRequest.preferredTime}
                        </p>
                      )}
                      {selectedRequest.note && (
                        <p>
                          <span className="font-medium">Ghi chú:</span>{" "}
                          {selectedRequest.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Thông tin yêu cầu
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Mã yêu cầu:</span>{" "}
                        {selectedRequest.id}
                      </p>
                      <p>
                        <span className="font-medium">Trạng thái:</span>{" "}
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            selectedRequest.status
                          )}`}
                        >
                          {getStatusText(selectedRequest.status)}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Ngày tạo:</span>{" "}
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                      <p>
                        <span className="font-medium">Tổng tiền:</span>{" "}
                        <span className="text-primary-600 font-semibold">
                          {formatPrice(selectedRequest.totalPrice)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Cấu hình PC
                  </h3>
                  <div className="space-y-3">
                    {selectedRequest.components &&
                      Object.entries(selectedRequest.components).map(
                        ([key, component]: [string, any]) => (
                          <div
                            key={key}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-2xl overflow-hidden">
                              {component.image ? (
                                component.image.startsWith("http://") ||
                                component.image.startsWith("https://") ? (
                                  <img
                                    src={component.image}
                                    alt={component.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : component.image.startsWith("/") ? (
                                  <img
                                    src={component.image}
                                    alt={component.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  component.image
                                )
                              ) : (
                                "💻"
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {component.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {
                                  componentCategories.find((c) => c.id === key)
                                    ?.name
                                }
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary-600">
                                {formatPrice(component.price)}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

