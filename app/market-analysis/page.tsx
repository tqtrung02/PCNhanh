export default function MarketAnalysisPage() {
  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Phân tích thị trường
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Hiểu rõ thị trường và cơ hội kinh doanh
        </p>

        <div className="space-y-8">
          {/* Market Demand */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📊</div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Nhu cầu thị trường
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Hiện nay, nhu cầu sử dụng máy tính cho công việc và sinh hoạt
                  hàng ngày là rất cao. Từ người dùng phổ thông như phụ huynh
                  tìm mua máy tính cho con em đến khách hàng cần tiếp xúc nhiều
                  với máy tính cho công việc, hầu hết họ đều cảm thấy rắc rối
                  trong việc tự tìm hiểu, so sánh giá linh kiện, máy tính.
                </p>
              </div>
            </div>
          </div>

          {/* Market Opportunity */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Cơ hội thị trường
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Việc có một nền tảng bán linh kiện, build PC đảm bảo chất
                  lượng, minh bạch, uy tín và cung cấp dịch vụ tư vấn theo yêu
                  cầu khách hàng là phù hợp với thị trường.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ngoài ra việc nâng cấp linh kiện cũng phổ biến hơn. Khách hàng
                  có nhu cầu thay thế, bảo trì, vệ sinh thiết bị tại gia sẽ xuất
                  hiện nhiều. Cần một nền tảng cung cấp dịch vụ định kỳ, an toàn,
                  uy tín để đem lại sự tiện lợi cho khách hàng.
                </p>
              </div>
            </div>
          </div>

          {/* Market Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                Cao
              </div>
              <div className="text-gray-700">Nhu cầu sử dụng máy tính</div>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                Tăng
              </div>
              <div className="text-gray-700">Nhu cầu nâng cấp linh kiện</div>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                Lớn
              </div>
              <div className="text-gray-700">Cơ hội thị trường</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

