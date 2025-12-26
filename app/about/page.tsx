export default function AboutPage() {
  const teamMembers = [
    "Đặng Việt Thành",
    "Trần Bá Toản",
    "Trần Quang Trung",
    "Trương Đức Huy",
  ];

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Về chúng tôi
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Nhóm 8 - PCNhanh
        </p>

        {/* About PCNhanh */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            PCNhanh là gì?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            PCNhanh là mô hình B2C kết hợp bán hàng online (PC + linh kiện,
            laptop, phụ kiện, …) với dịch vụ tại nhà (lắp ráp PC, cài đặt, sửa
            chữa, bảo trì, hỗ trợ kỹ thuật). Người dùng không chỉ đặt hàng mà
            còn được hỗ trợ toàn diện — từ chọn linh kiện phù hợp, lắp ráp máy,
            tới cấu hình, kiểm tra và hướng dẫn sử dụng.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Hình thức phù hợp với người ít am hiểu kỹ thuật, người muốn mua máy
            đã cài đặt sẵn về hoặc cài đặt tại nhà; người dùng cần cấu hình máy
            tính mạnh cho công việc cụ thể như lập trình, thiết kế đồ họa, dựng
            phim, ...
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
            Đội ngũ
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-primary-50 p-4 rounded-lg text-center"
              >
                <div className="text-2xl mb-2">👤</div>
                <div className="font-semibold text-gray-800">{member}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Đối tượng khách hàng
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary-700">
                Người dùng phổ thông
              </h3>
              <p className="text-gray-700">
                PC Nhanh hướng đến tệp khách hàng là người dùng phổ thông muốn
                lắp đặt hoặc sửa chữa máy tính tại nhà.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary-700">
                Người dùng chuyên nghiệp
              </h3>
              <p className="text-gray-700">
                PC Nhanh cũng hướng đến nhóm người dùng có nhu cầu build máy tính
                cho công việc hoặc giải trí như lập trình viên, thiết kế đồ họa,
                game thủ và streamer.
              </p>
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Kênh phân phối
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            PC Nhanh tiếp cận khách hàng thông qua cửa hàng địa phương, website
            bán hàng và các nền tảng truyền thông xã hội như Facebook, YouTube
            và TikTok.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Bên cạnh đó, PC Nhanh duy trì các kênh hotline, Zalo và chat trực
            tuyến để hỗ trợ khách hàng nhanh chóng.
          </p>
        </div>

        {/* Customer Relationships */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Mối quan hệ với khách hàng
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            PC Nhanh xây dựng quan hệ khách hàng bằng cách cung cấp dịch vụ tư
            vấn người dùng thân thiện, triển khai các chương trình ưu đãi định
            kỳ, và chia sẻ review minh bạch về chất lượng sản phẩm.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Đồng thời, PC Nhanh luôn duy trì dịch vụ hỗ trợ sau bán hàng để tăng
            sự tin tưởng và hài lòng.
          </p>
        </div>
      </div>
    </div>
  );
}

