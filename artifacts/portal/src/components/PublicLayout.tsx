import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MapPin, Phone, Mail, ChevronRight, User, Package, Bell, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "TRANG CHỦ",              href: "/" },
  { label: "DANH MỤC",               href: "/tra-cuu" },
  { label: "HƯỚNG DẪN DOANH NGHIỆP", href: "/dang-ky" },
  { label: "TIN TỨC",                href: "/tin-tuc" },
  { label: "LIÊN HỆ",               href: "/lien-he" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoUrl = import.meta.env.BASE_URL + "images/logo-skhcn.png";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full flex flex-col sticky top-0 bg-white shadow-sm" style={{ zIndex: 1001 }}>
        {/* Tầng 1 */}
        <div className="flex justify-between items-center py-3 px-4 md:px-6 lg:px-10 border-b border-gray-100">
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

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#2740BA]" /> : <Menu className="w-6 h-6 text-[#2740BA]" />}
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {isLoggedIn && user ? (
              /* ── Avatar dropdown (logged in) ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAvatarOpen((o) => !o)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#2740BA] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {user.initials}
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.type}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${avatarOpen ? "rotate-180" : ""}`} />
                </button>

                {avatarOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 overflow-hidden" style={{ zIndex: 1002 }}>
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                    </div>
                    {[
                      { icon: User,    label: "Hồ sơ doanh nghiệp", href: "/ho-so-doanh-nghiep" },
                      { icon: Package, label: "Hồ sơ sản phẩm",     href: "/ho-so-san-pham" },
                      { icon: Bell,    label: "Thông báo",           href: "/thong-bao" },
                    ].map(({ icon: Icon, label, href }) => (
                      <Link key={href} href={href} onClick={() => setAvatarOpen(false)}>
                        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors cursor-pointer">
                          <Icon className="w-4 h-4 text-[#2740BA]" />
                          <span className="text-sm text-slate-700 font-medium">{label}</span>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setAvatarOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-500 font-medium">Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Guest: register / login buttons ── */
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Tầng 2 – nav (desktop only) */}
        <nav className="hidden lg:block bg-[#2740BA] text-white px-4 md:px-6 lg:px-10">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase">
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

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg drawer-enter">
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = location === href || (href !== "/" && location.startsWith(href));
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-6 py-4 text-sm font-semibold border-l-4 transition-colors ${
                        isActive
                          ? "border-[#2740BA] text-[#2740BA] bg-blue-50"
                          : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-[#2740BA]"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Mobile auth buttons */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col gap-3">
              {isLoggedIn && user ? (
                <>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-full bg-[#2740BA] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {user.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.type}</p>
                    </div>
                  </div>
                  {[
                    { icon: User,    label: "Hồ sơ doanh nghiệp", href: "/ho-so-doanh-nghiep" },
                    { icon: Package, label: "Hồ sơ sản phẩm",     href: "/ho-so-san-pham" },
                    { icon: Bell,    label: "Thông báo",           href: "/thong-bao" },
                  ].map(({ icon: Icon, label, href }) => (
                    <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center gap-3 py-2 text-slate-700">
                        <Icon className="w-4 h-4 text-[#2740BA]" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 py-2 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Đăng xuất</span>
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/dang-ky"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2.5 border border-[#2740BA] text-[#2740BA] font-semibold text-sm rounded-lg text-center hover:bg-blue-50 transition-colors"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    href="/dang-nhap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2.5 bg-[#2740BA] text-white font-semibold text-sm rounded-lg text-center hover:bg-[#1f339e] transition-colors"
                  >
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Backdrop — closes mobile menu on outside click */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent lg:hidden"
          style={{ zIndex: 1000 }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#2740BA] text-white pt-12 md:pt-16 pb-8 px-4 md:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            {/* Col 1 */}
            <div>
              <div className="flex max-w-full items-center gap-2 sm:gap-3 mb-5 sm:mb-6 bg-white p-2 sm:p-2.5 rounded-xl inline-flex shadow-sm">
                <img src={logoUrl} alt="Logo" className="h-9 sm:h-10 w-auto object-contain" />
                <span className="font-bold text-[#2740BA] text-base sm:text-lg pr-1 sm:pr-3">ĐỒNG NAI TRACE</span>
              </div>
              <p className="text-blue-100/80 text-sm leading-relaxed mb-5 sm:mb-6 max-w-xl">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai.
                Nền tảng kết nối doanh nghiệp, cơ quan quản lý và người tiêu dùng
                nhằm minh bạch hóa thông tin chuỗi cung ứng.
              </p>
            </div>

            {/* Col 2 */}
            <div className="lg:pl-12">
                <h4 className="text-base font-bold uppercase mb-4 sm:mb-6 tracking-wide text-white">
                Liên kết nhanh
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: "Trang chủ",            href: "/" },
                  { label: "Tin tức",               href: "/tin-tuc" },
                  { label: "Liên hệ",               href: "/lien-he" },
                  { label: "Đăng ký doanh nghiệp",  href: "/dang-ky" },
                  { label: "Đăng nhập hệ thống",    href: "/dang-nhap" },
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
                <h4 className="text-base font-bold uppercase mb-4 sm:mb-6 tracking-wide text-white">
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

          <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 sm:gap-4 text-xs leading-relaxed text-blue-200/60">
            <p>© 2024 Sở Khoa học và Công nghệ Thành phố Đồng Nai. Tất cả quyền được bảo lưu.</p>
            <p className="md:text-right">Nền tảng vận hành bởi đơn vị được ủy quyền</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
