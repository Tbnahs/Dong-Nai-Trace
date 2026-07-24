import { Link, useLocation } from "wouter";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "TRANG CHỦ",             href: "/" },
  { label: "DANH MỤC",              href: "/tra-cuu" },
  { label: "HƯỚNG DẪN DOANH NGHIỆP", href: "/dang-ky" },
  { label: "GỬI TIN BÁO",           href: "/dashboard/ho-tro" },
  { label: "KÊNH HỖ TRỢ",           href: "/dashboard/ho-tro" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const logoUrl = import.meta.env.BASE_URL + "images/logo-skhcn.png";

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col">
      {/* HEADER */}
      <header className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
        {/* Tầng 1 */}
        <div className="flex justify-between items-center py-3 px-6 lg:px-12 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-[#2740BA] text-lg leading-tight">
                ĐỒNG NAI TRACE
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <Link
                href="/dang-ky"
                className="font-bold text-[#2740BA] text-sm hover:underline block"
              >
                Đăng ký tài khoản doanh nghiệp
              </Link>
              <span className="text-xs text-gray-500">
                Quản lý thông tin sản phẩm của doanh nghiệp
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dang-ky"
                className="px-5 py-2 border border-[#2740BA] text-[#2740BA] font-semibold text-sm rounded-md hover:bg-slate-50 transition-colors"
              >
                Đăng ký
              </Link>
              <Link
                href="/dang-nhap"
                className="px-5 py-2 bg-[#2740BA] text-white font-semibold text-sm rounded-md hover:bg-[#1f339e] transition-colors"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>

        {/* Tầng 2 – nav */}
        <nav className="bg-[#2740BA] text-white px-6 lg:px-12">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase overflow-x-auto whitespace-nowrap">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = location === href || (href !== "/" && location.startsWith(href));
              return (
                <li
                  key={label}
                  className={`py-3 border-b-2 cursor-pointer transition-colors ${
                    isActive
                      ? "border-white text-white"
                      : "border-transparent text-white/80 hover:text-white"
                  }`}
                >
                  <Link href={href}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#2740BA] text-white pt-16 pb-6 px-6 lg:px-12 border-t-[6px] border-[#E8650A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-3 mb-6 bg-white p-2.5 rounded-xl inline-flex shadow-sm">
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                <span className="font-bold text-[#2740BA] text-lg pr-3">ĐỒNG NAI TRACE</span>
              </div>
              <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai.
                Nền tảng kết nối doanh nghiệp, cơ quan quản lý và người tiêu dùng
                nhằm minh bạch hóa thông tin chuỗi cung ứng.
              </p>
            </div>

            {/* Col 2 */}
            <div className="lg:pl-12">
              <h4 className="text-base font-bold uppercase mb-6 tracking-wide text-white">
                Liên kết nhanh
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: "Trang chủ",           href: "/" },
                  { label: "Đăng ký doanh nghiệp", href: "/dang-ky" },
                  { label: "Đăng nhập hệ thống",   href: "/dang-nhap" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      <ChevronRight className="w-4 h-4" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-base font-bold uppercase mb-6 tracking-wide text-white">
                Liên hệ
              </h4>
              <ul className="space-y-4 text-blue-100/80 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E8650A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Sở Khoa học và Công nghệ Thành phố Đồng Nai
                    <br />
                    1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Đồng Nai
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E8650A] shrink-0" />
                  <span>0251.3822297</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#E8650A] shrink-0" />
                  <span>skhcn@dongnai.gov.vn</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/60">
            <p>© 2024 Sở Khoa học và Công nghệ Thành phố Đồng Nai. Tất cả quyền được bảo lưu.</p>
            <p>Nền tảng vận hành bởi đơn vị được ủy quyền</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
