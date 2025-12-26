export default function BusinessModelPage() {
  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Business Model Canvas
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Mô hình kinh doanh của PCNhanh
        </p>

        {/* Business Model Canvas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Top Row */}
          <div className="md:col-span-1 space-y-4">
            {/* Key Partners */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Key Partners
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Các hãng công nghệ lớn</li>
                <li>• Nhà phân phối linh kiện trong nước</li>
                <li>• Đơn vị vận chuyển</li>
                <li>• Nền tảng mạng xã hội (Facebook, YouTube, TikTok)</li>
                <li>
                  • Các sàn thương mại điện tử (Shopee, Lazada, TikTok Shop)
                </li>
                <li>• Tiktoker, YouTuber chuyên review công nghệ</li>
              </ul>
            </div>

            {/* Key Activities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Key Activities
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Bán máy tính, linh kiện điện tử trực tiếp và trực tuyến
                </li>
                <li>
                  • Dịch vụ tại gia cho khách hàng như lắp đặt và sửa chữa máy
                </li>
              </ul>
            </div>

            {/* Key Resources */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Key Resources
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Hệ thống Website, mạng xã hội</li>
                <li>• Hàng hóa</li>
                <li>
                  • Kỹ thuật viên tay nghề cao để phục vụ khách hàng tại gia
                </li>
              </ul>
            </div>
          </div>

          {/* Center Column */}
          <div className="md:col-span-1 space-y-4">
            {/* Value Propositions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-600">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Value Propositions
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Dịch vụ lắp ráp, sửa chữa, vệ sinh máy tính tại nhà khách
                  hàng
                </li>
                <li>
                  • Build phần cứng theo nhu cầu khách hàng & cài đặt sẵn phần
                  mềm cơ bản, Windows, Microsoft Office
                </li>
              </ul>
            </div>

            {/* Customer Relationships */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Customer Relationships
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Cung cấp dịch vụ tư vấn người dùng</li>
                <li>• Chương trình ưu đãi</li>
                <li>
                  • Chức năng đánh giá, review chất lượng sản phẩm, dịch vụ hỗ
                  trợ
                </li>
              </ul>
            </div>

            {/* Channels */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Channels
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Cửa hàng địa phương</li>
                <li>• Website bán hàng</li>
                <li>• Phương tiện truyền thông</li>
                <li>• Hotline, Zalo hỏi đáp</li>
                <li>• Đội ngũ hỗ trợ tại gia</li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-1 space-y-4">
            {/* Customer Segments */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-500">
              <h2 className="text-xl font-bold mb-4 text-primary-700">
                Customer Segments
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Người dùng phổ thông muốn lắp đặt hay sửa chữa máy tính
                </li>
                <li>
                  • Người dùng có nhu cầu build máy tính cho công việc (lập
                  trình, thiết kế đồ họa, game thủ, streamer, ...)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row - Cost Structure and Revenue Streams */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Cost Structure */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <h2 className="text-xl font-bold mb-4 text-red-700">
              Cost Structure
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Chi phí nhập hàng, vận chuyển hàng, dự trữ hàng tồn kho</li>
              <li>• Chi phí thuê mặt bằng cho cửa hàng, vận hành website</li>
              <li>
                • Tiền lương của nhân viên và tiền marketing (quảng cáo,
                reviewer, fanpage)
              </li>
            </ul>
          </div>

          {/* Revenue Streams */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Revenue Streams
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Doanh thu từ việc bán linh kiện điện tử, máy tính</li>
              <li>• Các dịch vụ tại gia như lắp ráp PC, vệ sinh, sửa chữa</li>
              <li>• Hoa hồng từ các đối tác</li>
            </ul>
          </div>
        </div>

        {/* Detailed Financial Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Chi phí chi tiết
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">
                  1. Chi phí vận hành và phát triển nền tảng
                </h4>
                <p className="text-gray-600">
                  Phát triển nền tảng, vận hành và bảo trì website trong năm đầu
                  tiên: <strong>500 triệu</strong>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">
                  2. Chi phí vận hành kinh doanh
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• CSKH và nhân viên: 60-80 triệu/tháng</li>
                  <li>• Thuê mặt bằng, kho: 40 triệu/tháng</li>
                  <li>• Vận chuyển: 10-50 nghìn/đơn</li>
                  <li>• Nhập hàng: 100-300 triệu/tháng</li>
                  <li>• Chi phí phát sinh: 50 triệu/tháng</li>
                </ul>
                <p className="mt-2 font-semibold">→ 3 tỷ/năm</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">
                  3. Chi phí Marketing
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Quảng cáo: 5-10 triệu/tháng</li>
                  <li>• Affiliate: 15 triệu/tháng</li>
                  <li>• KOL/KOC: 10-15 triệu/video</li>
                </ul>
                <p className="mt-2 font-semibold">→ 500 triệu/năm</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-bold text-lg">Chi phí ban đầu: 4 tỷ</p>
                <p className="font-bold text-lg">
                  Chi phí hàng tháng: 400 triệu
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Doanh thu chi tiết
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">
                  1. Bán sản phẩm
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Phí giao dịch: 5-8%/đơn</li>
                  <li>• Giá trị mỗi đơn: 1-15 triệu</li>
                  <li>• 5-15 đơn/ngày → 200-400 sản phẩm/tháng</li>
                </ul>
                <p className="mt-2 font-semibold">→ 600 triệu/tháng</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">
                  2. Dịch vụ tại gia
                </h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Lắp đặt, build PC: 200-500 nghìn/lần</li>
                  <li>• Sửa chữa, bảo dưỡng: 500 nghìn - 1 triệu/lần</li>
                  <li>• 100-200 lần/tháng</li>
                </ul>
                <p className="mt-2 font-semibold">→ 100 triệu/tháng</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">
                  3. Hoa hồng đối tác
                </h4>
                <p className="text-gray-600">
                  Các hãng linh kiện trả phí để spotlight và review sản phẩm
                </p>
                <p className="mt-2 font-semibold">→ 50 triệu/tháng</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="font-bold text-lg text-green-700">
                  Lợi nhuận hàng tháng: 750 - 400 = 350 triệu/tháng
                </p>
                <p className="font-bold text-lg text-green-700 mt-2">
                  Thời gian hòa vốn: 4 tỷ / 350 triệu ~ 1 Năm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
