import React from "react";
import { useState } from "react";
import hero3d from "../assets/hero-3d.png";
import heroGuide from "../assets/hero-guide.png";
import MapSection from "../components/MapSection";
import { Link, useLocation } from "wouter";
import { lookupByTraceCode, lookupByGtin } from "../lib/productLookup";
import {
  CheckCircle2,
  Search,
  Barcode,
  Package,
  Building2,
  Link as LinkIcon,
  ShieldCheck,
  FileEdit,
  FolderOpen,
  CheckSquare,
  Tag,
  ArrowRight,
  MapPin,
} from "lucide-react";

// ─── Featured demo data (subset from danh mục) ───────────────────────────────
const FEATURED_BUSINESSES = [
  {
    id: "b1",
    name: "HTX Nông nghiệp Xanh",
    type: "Hợp tác xã",
    district: "Vĩnh Cửu",
    products: 5,
    cert: "VietGAP",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=260&fit=crop",
  },
  {
    id: "b4",
    name: "Trang trại Sạch Đồng Nai",
    type: "Trang trại",
    district: "Biên Hòa",
    products: 12,
    cert: "VietGAP",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=260&fit=crop",
  },
  {
    id: "b2",
    name: "Công ty Thủy sản Đồng Nai",
    type: "Doanh nghiệp",
    district: "Long Thành",
    products: 8,
    cert: "HACCP",
    img: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=260&fit=crop",
  },
  {
    id: "b6",
    name: "Công ty TNHH Thủy sản Nam Phát",
    type: "Doanh nghiệp",
    district: "Nhơn Trạch",
    products: 7,
    cert: "GlobalGAP",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=260&fit=crop",
  },
  {
    id: "b5",
    name: "HTX Hồ Tiêu Long Khánh",
    type: "Hợp tác xã",
    district: "Long Khánh",
    products: 4,
    cert: "OCOP",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=260&fit=crop",
  },
  {
    id: "b10",
    name: "Công ty TNHH Thực phẩm Bình An",
    type: "Doanh nghiệp",
    district: "Biên Hòa",
    products: 9,
    cert: "ISO 22000",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=260&fit=crop",
  },
];

const FEATURED_PRODUCTS = [
  {
    id: "sp001",
    name: "Bưởi Tân Triều",
    org: "HTX Nông nghiệp Xanh",
    district: "Vĩnh Cửu",
    cert: "VietGAP",
    img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&h=260&fit=crop",
  },
  {
    id: "sp003",
    name: "Tôm sú đông lạnh",
    org: "Công ty Thủy sản Đồng Nai",
    district: "Long Thành",
    cert: "HACCP",
    img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=260&fit=crop",
  },
  {
    id: "sp006",
    name: "Dưa hấu không hạt",
    org: "HTX Dưa hấu Định Quán",
    district: "Định Quán",
    cert: "OCOP",
    img: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=260&fit=crop",
  },
  {
    id: "sp007",
    name: "Mật ong rừng nguyên chất",
    org: "Trang trại Ong Rừng Đồng Nai",
    district: "Tân Phú",
    cert: "OCOP",
    img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=260&fit=crop",
  },
  {
    id: "sp010",
    name: "Tiêu sọ Long Khánh",
    org: "HTX Hồ Tiêu Long Khánh",
    district: "Long Khánh",
    cert: "OCOP",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=260&fit=crop",
  },
  {
    id: "sp005",
    name: "Nước mắm truyền thống",
    org: "Cơ sở Nước mắm Hương Đồng",
    district: "Xuân Lộc",
    cert: "ISO 22000",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=260&fit=crop",
  },
];

const certColor: Record<string, string> = {
  VietGAP: "bg-emerald-100 text-emerald-700",
  GlobalGAP: "bg-blue-100 text-blue-700",
  OCOP: "bg-orange-100 text-orange-700",
  HACCP: "bg-purple-100 text-purple-700",
  "ISO 22000": "bg-sky-100 text-sky-700",
};
const typeColor: Record<string, string> = {
  "Hợp tác xã": "bg-blue-100 text-[#2740BA]",
  "Doanh nghiệp": "bg-green-100 text-green-700",
  "Trang trại": "bg-lime-100 text-lime-700",
};

export default function LandingPage() {
  const [searchType, setSearchType] = useState("trace");

  const [traceCode, setTraceCode] = useState("");
  const [gtin, setGtin] = useState("");
  const [lot, setLot] = useState("");
  const [, setLocation] = useLocation();

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchType === "trace" && traceCode.trim()) {
      const id = lookupByTraceCode(traceCode.trim());
      if (id) { setLocation(`/san-pham/${id}`); return; }
      // No exact match → go to search results with the typed code as query
      setLocation(`/tra-cuu?q=${encodeURIComponent(traceCode.trim())}`);
      return;
    }

    if (searchType === "gtin" && gtin.trim()) {
      const id = lookupByGtin(gtin.trim(), lot.trim() || undefined);
      if (id) { setLocation(`/san-pham/${id}`); return; }
      setLocation(`/tra-cuu?q=${encodeURIComponent(gtin.trim())}`);
      return;
    }

    // Fallback: general text search
    setLocation(
      "/tra-cuu" +
        (searchQuery.trim()
          ? `?q=${encodeURIComponent(searchQuery.trim())}`
          : ""),
    );
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-8 md:gap-10">
          {/* Cột trái */}
          <div className="lg:w-[48%] flex flex-col items-start space-y-7">
            <h1 className="w-full text-[clamp(1.15rem,5.5vw,2.75rem)] font-extrabold uppercase leading-[1.15]">
              <span className="block whitespace-nowrap text-[#2740BA]">
                TRUY XUẤT NGUỒN GỐC
              </span>
              <span className="mt-1 block whitespace-nowrap text-[#2740BA]">
                SẢN PHẨM ĐỒNG NAI
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Nhờ ứng dụng công nghệ tiên tiến, hệ thống cho phép định danh,
              truy vết nguồn gốc sản phẩm hàng hóa tại Thành phố Đồng Nai.
            </p>

            <form onSubmit={handleSearch} className="w-full">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                {searchType === "trace" ? (
                  <>
                    <div className="flex-1 min-h-[56px] sm:h-[62px] bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md flex items-center px-4 sm:px-6">
                      <Barcode className="w-5 h-5 sm:w-6 sm:h-6 text-[#2740BA] shrink-0" />

                      <input
                        type="text"
                        value={traceCode}
                        onChange={(e) => setTraceCode(e.target.value)}
                        placeholder="Nhập mã truy xuất sản phẩm"
                        className="ml-3 sm:ml-4 w-full bg-transparent outline-none text-base sm:text-lg text-gray-700 placeholder:text-gray-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="min-h-[48px] sm:h-[62px] w-fit lg:w-auto px-5 sm:px-10 rounded-xl sm:rounded-2xl bg-[#e8650a] text-white text-base sm:text-lg font-semibold transition"
                    >
                      Tra cứu
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-h-[56px] sm:h-[62px] bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md flex items-center px-4 sm:px-6">
                      <Barcode className="w-5 h-5 sm:w-6 sm:h-6 text-[#2740BA] shrink-0" />

                      <input
                        type="text"
                        value={gtin}
                        onChange={(e) => setGtin(e.target.value)}
                        placeholder="Nhập mã GTIN"
                        className="ml-3 sm:ml-4 w-full bg-transparent outline-none text-base sm:text-lg text-gray-700 placeholder:text-gray-400"
                      />
                    </div>

                    <div className="flex-1 min-h-[56px] sm:h-[62px] bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-md flex items-center px-4 sm:px-6">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#2740BA] shrink-0" />

                      <input
                        type="text"
                        value={lot}
                        onChange={(e) => setLot(e.target.value)}
                        placeholder="Nhập số lô / mẻ"
                        className="ml-3 sm:ml-4 w-full bg-transparent outline-none text-base sm:text-lg text-gray-700 placeholder:text-gray-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="min-h-[48px] sm:h-[62px] w-fit lg:w-auto px-5 sm:px-10 rounded-xl sm:rounded-2xl hover:bg-[#1d3396] text-white text-base sm:text-lg font-semibold transition bg-[#e8650a]"
                    >
                      Tra cứu
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-3 mt-4 sm:mt-6 pl-0 sm:pl-2">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                  <input
                    type="radio"
                    name="searchType"
                    checked={searchType === "trace"}
                    onChange={() => setSearchType("trace")}
                    className="w-5 h-5 accent-[#2740BA] shrink-0"
                  />
                  Mã truy xuất sản phẩm
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                  <input
                    type="radio"
                    name="searchType"
                    checked={searchType === "gtin"}
                    onChange={() => setSearchType("gtin")}
                    className="w-5 h-5 accent-[#2740BA] shrink-0"
                  />
                  Mã GTIN &amp; Số lô đóng gói
                </label>
              </div>
            </form>
          </div>

          {/* Cột phải */}
          <div className="lg:w-[52%] flex justify-center">
            <img
              src={heroGuide}
              alt="Đồng Nai Trace"
              loading="lazy"
              className="w-full max-h-[420px] object-contain
                         hover:scale-[1.03]
                         transition-transform duration-700
                         animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </section>
      {/* STATS SECTION */}
      <section className="bg-white pb-12 -mt-2">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="bg-[#F5F7FA] rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
            <div className="grid grid-cols-3 gap-4 md:gap-10">
              {/* Sản phẩm */}
              <div className="flex flex-col items-center text-center">
                <Package className="w-7 h-7 md:w-10 md:h-10 text-[#E8650A] mb-2 md:mb-4" />
                <span className="text-2xl md:text-5xl font-extrabold text-[#E8650A]">
                  4.892
                </span>
                <span className="mt-1 md:mt-2 text-[10px] md:text-sm font-semibold text-gray-500 uppercase leading-tight">
                  Sản phẩm đã đăng ký
                </span>
              </div>

              {/* Doanh nghiệp */}
              <div className="flex flex-col items-center text-center">
                <Building2 className="w-7 h-7 md:w-10 md:h-10 text-[#E8650A] mb-2 md:mb-4" />
                <span className="text-2xl md:text-5xl font-extrabold text-[#E8650A]">
                  1.247
                </span>
                <span className="mt-1 md:mt-2 text-[10px] md:text-sm font-semibold text-gray-500 uppercase leading-tight">
                  Doanh nghiệp tham gia
                </span>
              </div>

              {/* Mã định danh */}
              <div className="flex flex-col items-center text-center">
                <LinkIcon className="w-7 h-7 md:w-10 md:h-10 text-[#E8650A] mb-2 md:mb-4" />
                <span className="text-2xl md:text-5xl font-extrabold text-[#E8650A]">
                  23.104
                </span>
                <span className="mt-1 md:mt-2 text-[10px] md:text-sm font-semibold text-gray-500 uppercase leading-tight">
                  Cấp mã định danh
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* BẢN ĐỒ SECTION */}
      <MapSection />
      {/* DANH MỤC NGÀNH HÀNG */}
      <section className="py-16 px-4 md:px-6 lg:px-10 bg-white">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                Danh mục
              </p>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#2740BA] uppercase">
                Danh mục đáng chú ý
              </h2>
            </div>
            <Link
              href="/tra-cuu"
              className="px-3 py-1 md:px-5 md:py-2 border border-[#E8650A] text-[#E8650A] text-xs md:text-sm font-semibold rounded hover:bg-[#E8650A] hover:text-white transition-colors whitespace-nowrap"
            >
              Xem thêm
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {[
              {
                name: "Nông sản & Rau củ",
                img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=360&fit=crop",
              },
              {
                name: "Phân bón & Vật tư nông nghiệp",
                img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=360&fit=crop",
              },
              {
                name: "Thủy sản",
                img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=360&fit=crop",
              },
              {
                name: "Thịt & Chăn nuôi",
                img: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=360&fit=crop",
              },
              {
                name: "Thực phẩm chế biến",
                img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=360&fit=crop",
              },
              {
                name: "Dược liệu",
                img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=360&fit=crop",
              },
              {
                name: "Thủ công mỹ nghệ",
                img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=360&fit=crop",
              },
              {
                name: "Công nghiệp chế biến",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=360&fit=crop",
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={`/tra-cuu?category=${encodeURIComponent(cat.name)}`}
                className="group cursor-pointer rounded overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white block"
              >
                {/* Photo */}
                <div className="overflow-hidden h-[90px] md:h-[160px] lg:h-[200px]">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Label */}
                <div className="px-2 py-1.5 md:px-4 md:py-3 bg-white flex items-center justify-between gap-1">
                  <span className="text-[10px] md:text-sm font-semibold text-slate-800 group-hover:text-[#2740BA] transition-colors leading-tight line-clamp-2">
                    {cat.name}
                  </span>
                  <span className="text-[#E8650A] font-bold text-sm md:text-lg leading-none shrink-0">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* HƯỚNG DẪN DOANH NGHIỆP */}
      <section className="py-16 md:py-20 px-4 md:px-6 lg:px-10 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#2740BA] mb-5 md:mb-8 uppercase">
              Hướng dẫn doanh nghiệp
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 min-w-6 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[#E8650A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">
                    Đăng ký hồ sơ pháp lý và thông tin tổ chức
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Cập nhật đầy đủ giấy phép kinh doanh và chứng nhận vệ sinh
                    an toàn thực phẩm.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 min-w-6 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[#E8650A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">
                    Khai báo thông tin sản phẩm và tải lên chứng nhận
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Gắn kết thông tin chứng nhận OCOP, VietGAP, GlobalGAP cho
                    từng lô hàng.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 min-w-6 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[#E8650A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">
                    Kết nối đơn vị cung cấp giải pháp TXNG để đồng bộ dữ liệu
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Tích hợp API hoặc import dữ liệu tự động từ các giải pháp
                    bên thứ ba vào cổng chung.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="huong-dan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 font-bold text-[#E8650A] hover:text-[#D55C08] flex items-center gap-2 group transition-colors"
            >
              Hướng dẫn đăng ký tại đây{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="lg:w-1/2 relative w-full flex justify-center overflow-hidden md:overflow-visible">
            <div className="absolute inset-0 bg-[#F8FAFC] rounded-[3rem] -rotate-3 transform z-0"></div>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-xl w-full max-w-md p-6 relative z-10 mt-8 mb-8">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="font-bold text-[#2740BA] text-lg">
                  Đăng ký doanh nghiệp
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Hoàn thiện thông tin để bắt đầu
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
                    Tên doanh nghiệp / HTX
                  </label>
                  <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-sm text-gray-400">
                    Nhập tên tổ chức...
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
                    Mã số thuế
                  </label>
                  <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-sm text-gray-400">
                    Nhập MST...
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
                    Tải lên Giấy phép ĐKKD
                  </label>
                  <div className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <FolderOpen className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">
                      Click để tải file (.pdf, .png)
                    </span>
                  </div>
                </div>
                <Link
                  href="/dang-ky"
                  className="w-full h-11 bg-[#2740BA] text-white rounded font-bold text-sm mt-4 hover:bg-[#1f339e] transition-colors flex items-center justify-center"
                >
                  Tiếp tục
                </Link>
              </div>
            </div>

            <div className="hidden md:flex absolute top-10 -left-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-20 items-center gap-3 animate-[bounce_4s_infinite]">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2740BA]">
                <FileEdit className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">
                  Xét duyệt nhanh
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  3-5 ngày làm việc
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
