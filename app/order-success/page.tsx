import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600 mb-8">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian
            sớm nhất để xác nhận đơn hàng.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
            <div>
              <Link
                href="/contact"
                className="text-primary-600 hover:underline"
              >
                Liên hệ hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

