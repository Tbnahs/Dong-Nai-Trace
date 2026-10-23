import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  User,
  Package,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Globe,
  Check,
} from "lucide-react";
import headerArtwork from "@assets/banner_san_bay_long_thanh_no_text_1792564692783.png";

const NAV_LINKS = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "DANH MỤC", href: "/tra-cuu" },
  { label: "HƯỚNG DẪN DOANH NGHIỆP", href: "/dang-ky" },
  { label: "TIN TỨC", href: "/tin-tuc" },
  { label: "LIÊN HỆ", href: "/lien-he" },
];

const QUICK_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
  { label: "Đăng ký DN", href: "/dang-ky" },
  { label: "Đăng nhập", href: "/dang-nhap" },
];

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

const ACCOUNT_LINKS = [
  {
    icon: User,
    label: "Hồ sơ doanh nghiệp",
    href: "/ho-so-doanh-nghiep",
  },
  {
    icon: Package,
    label: "Dòng sản phẩm",
    href: "/ho-so-san-pham",
  },
  {
    icon: Bell,
    label: "Thông báo",
    href: "/thong-bao",
  },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location] = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "vi"
      : "vi",
  );

  const languageRef = useRef<HTMLDivElement>(null);
  const mobileLanguageRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logoUrl = import.meta.env.BASE_URL + "images/logo-skhcn.png";
  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setAvatarOpen(false);
      }

      if (languageRef.current && !languageRef.current.contains(target)) {
        setLanguageOpen(false);
      }

      if (
        mobileLanguageRef.current &&
        !mobileLanguageRef.current.contains(target)
      ) {
        setMobileLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectLanguage = (code: string) => {
    setLanguage(code);
    localStorage.setItem("language", code);
    setLanguageOpen(false);
    setMobileLanguageOpen(false);
  };

  const isActiveLink = (href: string) =>
    location === href || (href !== "/" && location.startsWith(href));

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-[1001] flex w-full flex-col bg-white shadow-sm">
        {/* TOP BRAND BANNER */}
        <div className="relative isolate overflow-hidden bg-[#0b3e77]">
          <img
            src={headerArtwork}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#082f5a]/60 via-[#0a3e70]/35 to-[#062c52]/30"
          />

          <div className="relative z-10 mx-auto flex min-h-[108px] w-full max-w-[1280px] items-center gap-3 px-4 py-3 md:min-h-[122px] md:px-6 lg:px-10">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full md:h-12 md:w-12">
                <img
                  src={logoUrl}
                  alt="Biểu trưng Đồng Nai"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>

              {/* Header title: increase line spacing to prevent overlap */}
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-xs font-extrabold leading-relaxed text-white sm:text-sm md:text-lg">
                  HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM, HÀNG HÓA
                </span>
                <span className="text-xs font-extrabold leading-relaxed text-white sm:text-sm md:text-lg">
                  THÀNH PHỐ ĐỒNG NAI
                </span>
                <span className="text-xs font-normal leading-relaxed text-white sm:text-sm md:text-base">
                  txng.dongnai.gov.vn
                </span>
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="ml-auto shrink-0 rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden border-b border-slate-200 bg-white lg:block">
          <div className="mx-auto flex min-h-[56px] w-full max-w-[1280px] items-center justify-between gap-3 px-4 md:px-6 lg:px-6 xl:px-10">
            <ul className="flex min-w-0 items-center gap-0.5 text-[12px] font-semibold xl:gap-1 xl:text-[13px]">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label} className="shrink-0 py-1">
                  <Link
                    href={href}
                    className={`block whitespace-nowrap rounded-md px-2.5 py-3 transition-colors xl:px-3 ${
                      isActiveLink(href)
                        ? "bg-[#eef2ff] text-[#2740BA]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#2740BA]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right-side actions */}
            <div className="flex shrink-0 items-center gap-2 xl:gap-3">
              {isLoggedIn && user ? (
                <>
                  <Link
                    href="/thong-bao"
                    aria-label="Thông báo"
                    title="Thông báo"
                    className="relative flex shrink-0 items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-blue-50 hover:text-[#2740BA]"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E8650A] px-1 text-[9px] font-bold leading-none text-white">
                      2
                    </span>
                  </Link>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setAvatarOpen((open) => !open)}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-blue-50"
                      aria-label="Tài khoản"
                      aria-expanded={avatarOpen}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2740BA] text-sm font-bold text-white">
                        {user.initials}
                      </span>
                      <span className="hidden max-w-[110px] truncate text-sm font-semibold text-slate-700 xl:block">
                        {user.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${
                          avatarOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {avatarOpen && (
                      <div className="absolute right-0 top-full z-[1002] mt-2 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                        <div className="border-b border-gray-100 px-4 py-3">
                          <p className="text-sm font-bold text-slate-800">
                            {user.name}
                          </p>
                          <p className="mt-0.5 break-all text-xs text-gray-400">
                            {user.email}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {user.type}
                          </p>
                        </div>

                        {ACCOUNT_LINKS.map(({ icon: Icon, label, href }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setAvatarOpen(false)}
                          >
                            <div className="flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-blue-50">
                              <Icon className="h-4 w-4 text-[#2740BA]" />
                              <span className="text-sm font-medium text-slate-700">
                                {label}
                              </span>
                            </div>
                          </Link>
                        ))}

                        <div className="mt-1 border-t border-gray-100 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              setAvatarOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-red-500">
                              Đăng xuất
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/dang-nhap"
                    className="whitespace-nowrap rounded-md bg-[#2740BA] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1f339e] xl:px-4 xl:text-sm"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="whitespace-nowrap rounded-md border border-[#2740BA] bg-white px-3 py-2 text-xs font-semibold text-[#2740BA] transition-colors hover:bg-blue-50 xl:px-4 xl:text-sm"
                  >
                    Đăng ký
                  </Link>
                </>
              )}

              {/* Language selector */}
              <div className="relative ml-1 shrink-0" ref={languageRef}>
                <button
                  type="button"
                  onClick={() => setLanguageOpen((open) => !open)}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-slate-700 transition-colors hover:bg-blue-50 hover:text-[#2740BA] xl:gap-2 xl:px-2.5"
                  aria-label="Chọn ngôn ngữ"
                  aria-expanded={languageOpen}
                >
                  <Globe className="h-[18px] w-[18px] shrink-0 text-[#2740BA]" />
                  <span className="text-xs font-medium xl:text-sm">
                    {currentLanguage.label}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform ${
                      languageOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {languageOpen && (
                  <div className="absolute right-0 top-full z-[1002] mt-2 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                    {LANGUAGES.map((lang) => (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => selectLanguage(lang.code)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-blue-50 ${
                          language === lang.code
                            ? "bg-blue-50 font-semibold text-[#2740BA]"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {language === lang.code && (
                          <Check className="h-4 w-4 text-[#2740BA]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="drawer-enter border-t border-gray-100 bg-white shadow-lg lg:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block border-l-4 px-6 py-3.5 text-sm font-semibold transition-colors ${
                      isActiveLink(href)
                        ? "border-[#2740BA] bg-blue-50 text-[#2740BA]"
                        : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-[#2740BA]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4">
              {/* Mobile language selector */}
              <div className="relative" ref={mobileLanguageRef}>
                <button
                  type="button"
                  onClick={() => setMobileLanguageOpen((open) => !open)}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-slate-700 transition-colors hover:bg-blue-50"
                  aria-label="Chọn ngôn ngữ"
                  aria-expanded={mobileLanguageOpen}
                >
                  <Globe className="h-5 w-5 text-[#2740BA]" />
                  <span className="flex-1 text-left text-sm font-medium">
                    {currentLanguage.label}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileLanguageOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileLanguageOpen && (
                  <div className="mt-1 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    {LANGUAGES.map((lang) => (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => selectLanguage(lang.code)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-blue-50 ${
                          language === lang.code
                            ? "bg-blue-50 font-semibold text-[#2740BA]"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {language === lang.code && (
                          <Check className="h-4 w-4 text-[#2740BA]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isLoggedIn && user ? (
                <>
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2740BA] text-sm font-bold text-white">
                      {user.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">{user.type}</p>
                    </div>
                  </div>

                  {ACCOUNT_LINKS.map(({ icon: Icon, label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3 py-2 text-slate-700">
                        <Icon className="h-4 w-4 text-[#2740BA]" />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    </Link>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-2 text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Đăng xuất</span>
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/dang-nhap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-lg bg-[#2740BA] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1f339e]"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-lg border border-[#2740BA] py-2.5 text-center text-sm font-semibold text-[#2740BA] transition-colors hover:bg-blue-50"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[1000] bg-black/10 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Đóng menu"
        />
      )}

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="relative mt-auto bg-gradient-to-br from-[#0B3E77] via-[#1D4EAA] to-[#2740BA] text-white">
        <div className="mx-auto max-w-[1280px] px-4 pb-5 pt-8 md:px-6 md:pb-8 md:pt-14 lg:px-10">
          <div className="mb-7 grid grid-cols-2 gap-5 md:mb-12 md:gap-10 lg:grid-cols-[1.2fr_0.8fr_1.1fr] lg:gap-12">
            {/* Column 1: system information */}
            <div className="min-w-0">
              <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-xl bg-white p-2 shadow-sm md:mb-5 md:gap-3 md:p-3">
                <img
                  src={logoUrl}
                  alt="Logo hệ thống"
                  className="h-8 w-8 shrink-0 object-contain md:h-11 md:w-11"
                />

                {/* Footer title: split into exactly two lines */}
                <span className="pr-1 text-left text-[12px] font-extrabold leading-snug text-[#2740BA] sm:text-xs md:max-w-[290px] md:text-sm lg:text-base">
                  <span className="block">
                  HỆ THỐNG TRUY XUẤT NGUỒN GỐC
                  </span>
                  <span className="block">
                    SẢN PHẨM, HÀNG HÓA THÀNH PHỐ ĐỒNG NAI
                  </span>
                </span>
              </div>

              <div className="mb-3 h-1 w-10 rounded-full bg-[#E8650A] md:mb-4 md:w-12" />

              <p className="hidden max-w-xl text-sm leading-7 text-blue-100/90 md:block">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng
                Nai. Nền tảng kết nối doanh nghiệp, cơ quan quản lý và người
                tiêu dùng nhằm minh bạch hóa thông tin chuỗi cung ứng.
              </p>

              <p className="text-[11px] leading-relaxed text-blue-100/90 md:hidden">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng
                Nai.
              </p>
            </div>

            {/* Column 2: quick links */}
            <div className="min-w-0 lg:pl-8">
              <h4 className="text-[11px] font-bold uppercase tracking-wide text-white md:text-base">
                Liên kết nhanh
              </h4>
              <div className="mb-4 mt-3 h-1 w-10 rounded-full bg-[#E8650A] md:mb-5" />

              <ul className="space-y-2.5 md:space-y-3.5">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1.5 text-[11px] text-blue-100/90 transition-colors hover:text-white md:gap-2 md:text-sm"
                    >
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-blue-200 transition-transform group-hover:translate-x-1 group-hover:text-[#FF8A24] md:h-4 md:w-4" />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: contact information */}
            <div className="col-span-2 min-w-0 md:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wide text-white md:text-base">
                Liên hệ
              </h4>
              <div className="mb-4 mt-3 h-1 w-10 rounded-full bg-[#E8650A] md:mb-5" />

              <ul className="space-y-3 text-xs leading-6 text-blue-100/90 md:space-y-4 md:text-sm">
                <li className="flex items-start gap-2.5 md:gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#FF8A24] md:h-5 md:w-5" />
                  <span className="min-w-0 leading-relaxed">
                    Sở Khoa học và Công nghệ Thành phố Đồng Nai
                    <br />
                    1592 Nguyễn Ái Quốc, KP6, P. Trung Dũng, Biên Hòa, Đồng Nai
                  </span>
                </li>

                <li className="flex items-center gap-2.5 md:gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[#FF8A24] md:h-5 md:w-5" />
                  <a
                    href="tel:02513822297"
                    className="transition-colors hover:text-white"
                  >
                    0251.3822297
                  </a>
                </li>

                <li className="flex items-start gap-2.5 md:gap-3">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-[#FF8A24] md:h-5 md:w-5" />
                  <a
                    href="mailto:skhcn@dongnai.gov.vn"
                    className="min-w-0 break-all transition-colors hover:text-white"
                  >
                    skhcn@dongnai.gov.vn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="flex flex-col items-start gap-2 border-t border-white/20 pt-4 text-[10px] leading-relaxed text-blue-100/75 sm:flex-row sm:items-center sm:justify-between md:gap-4 md:pt-6 md:text-xs">
            <p>
              © 2026 Sở KH&CN Thành phố Đồng Nai. Tất cả quyền được bảo lưu.
            </p>
            <p className="sm:text-right">
              Nền tảng vận hành bởi đơn vị được ủy quyền
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}