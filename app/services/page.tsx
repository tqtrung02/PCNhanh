export default function ServicesPage() {
  const services = [
    {
      title: "Lắp ráp PC tại nhà",
      description:
        "Dịch vụ lắp ráp máy tính tận nơi, build phần cứng theo nhu cầu khách hàng",
      price: "200.000 - 500.000 VNĐ",
      icon: "🔧",
    },
    {
      title: "Sửa chữa & Bảo dưỡng",
      description:
        "Sửa chữa, bảo dưỡng, vệ sinh máy tính tại nhà khách hàng",
      price: "500.000 - 1.000.000 VNĐ",
      icon: "🛠️",
    },
    {
      title: "Cài đặt phần mềm",
      description:
        "Cài đặt Windows, Microsoft Office và các phần mềm cơ bản",
      price: "Theo yêu cầu",
      icon: "💻",
    },
    {
      title: "Tư vấn cấu hình",
      description:
        "Tư vấn chọn linh kiện phù hợp với nhu cầu và ngân sách",
      price: "Miễn phí",
      icon: "🎯",
    },
    {
      title: "Bán linh kiện & PC",
      description:
        "Bán máy tính, linh kiện điện tử trực tiếp và trực tuyến",
      price: "Theo sản phẩm",
      icon: "🖥️",
    },
    {
      title: "Hỗ trợ kỹ thuật",
      description:
        "Hỗ trợ kỹ thuật 24/7 qua hotline, Zalo và chat trực tuyến",
      price: "Miễn phí",
      icon: "📞",
    },
  ];

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Dịch vụ của chúng tôi
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Dịch vụ PC & Linh kiện tại nhà chuyên nghiệp
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="text-primary-600 font-semibold">
                {service.price}
              </div>
            </div>
          ))}
        </div>

        {/* Value Propositions Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Giá trị cung cấp
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Dịch vụ tại nhà tiện lợi
              </h3>
              <p className="text-gray-700">
                PC Nhanh cung cấp dịch vụ lắp ráp, sửa chữa và vệ sinh máy tính
                tận nơi, mang lại sự tiện lợi và tiết kiệm thời gian cho khách
                hàng.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Giải pháp trọn gói
              </h3>
              <p className="text-gray-700">
                Ngoài ra, PC Nhanh còn đề xuất build cấu hình tối ưu theo nhu
                cầu, cài đặt phần mềm cơ bản như Windows và Microsoft Office,
                giúp khách hàng có trải nghiệm trọn gói từ phần cứng đến phần
                mềm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

