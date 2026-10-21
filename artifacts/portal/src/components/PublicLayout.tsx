import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import { MapPin, Phone, Mail, ChevronRight, User, Package, Bell, LogOut, ChevronDown, Menu, X, Globe, Check } from "lucide-react";
import headerArtwork from "@assets/banner_san_bay_long_thanh_no_text_1792564692783.png";
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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );

  const languageRef = useRef<HTMLDivElement>(null);

  const LANGUAGES = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
    { code: "ko", label: "한국어" },
  ];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoUrl = import.meta.env.BASE_URL + "images/logo-skhcn.png";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAvatarOpen(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(e.target as Node)
      ) {
        setLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full flex flex-col sticky top-0 bg-white shadow-sm" style={{ zIndex: 1001 }}>
        {/* Brand band */}
        <div className="relative isolate overflow-visible bg-[#0b3e77]">
          <img
            src={headerArtwork}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#082f5a]/55 via-[#0a3e70]/35 to-[#062c52]/30"
          />
          <div className="relative z-10 mx-auto flex min-h-[108px] max-w-[1280px] items-center justify-between gap-4 px-4 py-3 md:min-h-[122px] md:px-6 lg:px-10">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-sm md:h-12 md:w-12">
                <img src={logoUrl} alt="Biểu trưng Đồng Nai" className="h-full w-full rounded-full object-cover" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-extrabold leading-tight text-white sm:text-base md:text-lg">TRUY XUẤT ĐỒNG NAI</span>
                <span className="mt-1 block max-w-[220px] truncate text-[8px] font-medium leading-tight text-white/75 sm:max-w-none sm:text-[10px] md:text-xs">
                  HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM
                </span>
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="hidden items-center gap-5 lg:flex">
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-white transition hover:bg-white/10"
                aria-label="Chọn ngôn ngữ"
                aria-expanded={languageOpen}
              >
                <Globe className="h-5 w-5" />
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    languageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[1002]">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        localStorage.setItem("language", lang.code);
                        setLanguageOpen(false);

                        // Nếu dùng react-i18next
                        // i18n.changeLanguage(lang.code);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-3 hover:bg-blue-50 ${
                        language === lang.code
                          ? "bg-blue-50 text-[#2740BA] font-semibold"
                          : ""
                      }`}
                    >
                      <span>{lang.label}</span>

                      {language === lang.code && (
                        <Check className="w-4 h-4 text-[#2740BA]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isLoggedIn && user ? (
              /* ── Avatar dropdown (logged in) ── */
              (<>
                <Link
                  href="/thong-bao"
                  aria-label="Thông báo"
                  title="Thông báo"
                  className="relative flex items-center justify-center rounded-xl p-2.5 text-white transition-colors hover:bg-white/10"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute right-1.5 top-1.5 min-w-4 h-4 px-1 rounded-full bg-[#E8650A] text-white text-[9px] font-bold leading-4 text-center border-2 border-white">
                    2
                  </span>
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setAvatarOpen((o) => !o)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-white/10"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#2740BA] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {user.initials}
                    </div>
                    <div className="text-left hidden xl:block">
                      <p className="text-sm font-bold leading-tight text-white">{user.name}</p>
                      <p className="text-xs text-white/70">{user.type}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-white/70 transition-transform ${avatarOpen ? "rotate-180" : ""}`} />
                  </button>
                  {avatarOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 overflow-hidden" style={{ zIndex: 1002 }}>
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                      </div>
                      {[
                        { icon: User,    label: "Hồ sơ doanh nghiệp", href: "/ho-so-doanh-nghiep" },
                        { icon: Package, label: "Dòng sản phẩm",     href: "/ho-so-san-pham" },
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
              </>)
            ) : (
              /* ── Guest: register / login buttons ── */
              (<>
                <div className="text-right">
                  <Link
                    href="/dang-ky"
                    className="block text-sm font-bold text-white hover:underline"
                  >
                    Đăng ký tài khoản doanh nghiệp
                  </Link>
                  <span className="text-xs text-white/70">
                    Quản lý thông tin sản phẩm của doanh nghiệp
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/dang-nhap"
                    className="rounded-md border border-white/70 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-[#2740BA] transition-colors hover:bg-blue-50"
                  >
                    Đăng ký
                  </Link>
                </div>
              </>)
            )}
          </div>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden border-b border-slate-200 bg-white lg:block">
          <ul className="mx-auto flex max-w-[1280px] items-center gap-1 px-4 text-[13px] font-semibold md:px-6 lg:px-10">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = location === href || (href !== "/" && location.startsWith(href));
              return (
                <li key={label} className="py-1">
                  <Link
                    href={href}
                    className={`block rounded-md px-4 py-3 transition-colors ${
                      isActive
                        ? "bg-[#eef2ff] text-[#2740BA]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#2740BA]"
                    }`}
                  >
                    {label}
                  </Link>
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
                    { icon: Package, label: "Sản phẩm",     href: "/ho-so-san-pham" },
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
      <footer className="bg-[#2740BA] text-white pt-6 md:pt-16 pb-5 md:pb-8 px-4 md:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 lg:gap-12 mb-5 md:mb-12">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-1.5 mb-3 md:mb-6 bg-white p-1.5 md:p-2.5 rounded-lg md:rounded-xl shadow-sm w-fit">
                <img src={logoUrl} alt="Logo" className="h-6 md:h-10 w-auto object-contain" />
                <span className="font-bold text-[#2740BA] text-[10px] md:text-lg pr-1 md:pr-3 leading-tight">ĐỒNG NAI<br className="md:hidden" /> TRACE</span>
              </div>
              <p className="text-blue-100/80 text-[11px] md:text-sm leading-relaxed max-w-xl hidden md:block">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai.
                Nền tảng kết nối doanh nghiệp, cơ quan quản lý và người tiêu dùng
                nhằm minh bạch hóa thông tin chuỗi cung ứng.
              </p>
              {/* Short version on mobile */}
              <p className="text-blue-100/80 text-[11px] leading-relaxed md:hidden">Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai.</p>
            </div>

            {/* Col 2 */}
            <div className="lg:pl-12">
              <h4 className="text-[11px] md:text-base font-bold uppercase mb-2 md:mb-6 tracking-wide text-white">
                Liên kết nhanh
              </h4>
              <ul className="space-y-2 md:space-y-3.5">
                {[
                  { label: "Trang chủ",            href: "/" },
                  { label: "Tin tức",               href: "/tin-tuc" },
                  { label: "Liên hệ",               href: "/lien-he" },
                  { label: "Đăng ký DN",            href: "/dang-ky" },
                  { label: "Đăng nhập",             href: "/dang-nhap" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] md:text-sm"
                    >
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — desktop only */}
            <div className="hidden lg:block">
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

          <div className="pt-3 md:pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-4 text-[10px] md:text-xs leading-relaxed text-blue-200/60">
            <p>© 2024 Sở KH&CN Thành phố Đồng Nai. Tất cả quyền được bảo lưu.</p>
            <p className="md:text-right hidden md:block">Nền tảng vận hành bởi đơn vị được ủy quyền</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
