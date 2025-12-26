export default function ContactPage() {
  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Thông tin liên hệ
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Hotline</h3>
                <p className="text-gray-600">1900-xxxx</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">info@pcnhanh.vn</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Zalo</h3>
                <p className="text-gray-600">Hỗ trợ trực tuyến 24/7</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Cửa hàng địa phương
                </h3>
                <p className="text-gray-600">
                  Liên hệ để biết địa chỉ gần nhất
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Gửi tin nhắn
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Nhập tin nhắn của bạn"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>

        {/* Channels Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Kênh liên hệ
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🌐</div>
              <h3 className="font-semibold mb-2">Website</h3>
              <p className="text-gray-600 text-sm">www.pcnhanh.vn</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📱</div>
              <h3 className="font-semibold mb-2">Mạng xã hội</h3>
              <p className="text-gray-600 text-sm">Facebook, YouTube, TikTok</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💬</div>
              <h3 className="font-semibold mb-2">Chat trực tuyến</h3>
              <p className="text-gray-600 text-sm">Hỗ trợ 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
