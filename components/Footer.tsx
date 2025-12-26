import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PCNhanh</h3>
            <p className="text-gray-400">
              Dịch vụ PC & Linh kiện tại nhà chuyên nghiệp
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/business-model"
                  className="hover:text-white transition-colors"
                >
                  Business Model
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Dịch vụ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/market-analysis"
                  className="hover:text-white transition-colors"
                >
                  Phân tích thị trường
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <p className="text-gray-400">Hotline: 1900-xxxx</p>
            <p className="text-gray-400">Email: info@pcnhanh.vn</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PCNhanh. Nhóm 8 - Đặng Việt Thành, Trần Bá Toản, Trần Quang Trung, Trương Đức Huy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

