import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] bg-[#F5F7FA]">
      {/* Hero */}
      <div className="bg-[#2740BA] text-white py-10 md:py-12 px-4 md:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">
            Liên hệ
          </p>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold uppercase">
            Kênh Hỗ Trợ & Liên Hệ
          </h1>
          <p className="mt-3 text-blue-100/80 max-w-xl">
            Liên hệ với Sở Khoa học và Công nghệ Thành phố Đồng Nai để được hỗ
            trợ về hệ thống truy xuất nguồn gốc sản phẩm.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          <div className="lg:col-span-1 space-y-5">
            {[
              {
                icon: MapPin,
                label: "Địa chỉ",
                value: "1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Đồng Nai",
                color: "text-[#E8650A]",
                href: "https://maps.google.com/?q=1592+Nguy%E1%BB%85n+%C3%81i+Qu%E1%BB%91c+Bi%C3%AAn+Ho%C3%A0+%C4%90%E1%BB%93ng+Nai",
              },
              {
                icon: Phone,
                label: "Điện thoại",
                value: "0251.3822297",
                color: "text-[#2740BA]",
                href: "tel:02513822297",
              },
              {
                icon: Mail,
                label: "Email",
                value: "skhcn@dongnai.gov.vn",
                color: "text-[#2740BA]",
                href: "mailto:skhcn@dongnai.gov.vn",
              },
              {
                icon: Clock,
                label: "Giờ làm việc",
                value: "Thứ 2 – Thứ 6: 7:30 – 11:30 & 13:30 – 17:00",
                color: "text-[#2740BA]",
                href: null,
              },
            ].map(({ icon: Icon, label, value, color, href }) => {
              const inner = (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                      {label}
                    </p>
                    <p className={`text-sm font-medium leading-relaxed ${href ? "text-[#2740BA] hover:underline" : "text-slate-800"}`}>
                      {value}
                    </p>
                  </div>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start">
                  {inner}
                </div>
              );
            })}

            <a
              href="https://dongnai.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#2740BA] font-semibold hover:underline mt-2"
            >
              <ExternalLink className="w-4 h-4" />
              Cổng thông tin điện tử tỉnh Đồng Nai
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
            <h2 className="text-xl font-bold text-[#2740BA] mb-6">
              Gửi yêu cầu hỗ trợ
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full h-12 sm:h-11 px-4 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    className="w-full h-12 sm:h-11 px-4 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full h-12 sm:h-11 px-4 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Chủ đề
                </label>
                <select className="w-full h-12 sm:h-11 px-4 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors text-gray-700 bg-white">
                  <option value="">Chọn chủ đề...</option>
                  <option>Hỗ trợ đăng ký doanh nghiệp</option>
                  <option>Hỗ trợ khai báo sản phẩm</option>
                  <option>Tra cứu mã truy xuất</option>
                  <option>Báo lỗi hệ thống</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nội dung
                </label>
                <textarea
                  rows={5}
                  placeholder="Mô tả chi tiết nội dung cần hỗ trợ..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#2740BA] transition-colors resize-none"
                />
              </div>
              <button className="w-full h-11 sm:h-12 bg-[#2740BA] text-white font-bold rounded-xl hover:bg-[#1f339e] transition-colors text-sm">
                Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
