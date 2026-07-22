import React from "react";
import {
  Bell,
  Search,
  QrCode,
  Scan,
  Leaf,
  Fish,
  Beef,
  Cake,
  Hammer,
  Pill,
  Factory,
  MoreHorizontal,
  Home,
  User,
  ArrowLeft,
  Flashlight,
  Keyboard,
  CheckCircle2,
  Share,
  MapPin,
  Package,
  Calendar,
  Award,
  Sprout,
  TestTube,
  Box,
  ChevronRight,
  Battery,
  Wifi,
  Signal,
  Check,
  Barcode
} from "lucide-react";

export default function AppMobile() {
  const categories = [
    { name: "Nông sản", icon: <Leaf className="w-5 h-5" /> },
    { name: "Thủy sản", icon: <Fish className="w-5 h-5" /> },
    { name: "Thịt", icon: <Beef className="w-5 h-5" /> },
    { name: "Chế biến", icon: <Cake className="w-5 h-5" /> },
    { name: "Thủ công", icon: <Hammer className="w-5 h-5" /> },
    { name: "Dược liệu", icon: <Pill className="w-5 h-5" /> },
    { name: "CN", icon: <Factory className="w-5 h-5" /> },
    { name: "Khác", icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-8 font-be-vietnam-pro flex flex-row justify-center items-start gap-8 overflow-x-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');
        .font-be-vietnam-pro {
          font-family: 'Be Vietnam Pro', sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes scan-line {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* SCREEN 1: TRANG CHỦ */}
      <div className="flex flex-col items-center">
        <div className="relative w-[390px] h-[844px] rounded-[44px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden bg-[#F7F9FC] flex flex-col flex-shrink-0 border-[10px] border-slate-900">
          
          {/* Status Bar */}
          <div className="absolute top-0 w-full h-[44px] bg-[#1B2A6B] z-20 flex justify-between items-center px-6 text-white text-[13px] font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-5 h-5" />
            </div>
          </div>

          {/* Header */}
          <div className="bg-[#1B2A6B] pt-[52px] pb-6 px-4 rounded-b-3xl shadow-sm z-10 relative">
            <div className="flex justify-between items-center mb-5 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  <img src="/__mockup/images/logo-skhcn.png" alt="Logo" className="w-6 h-6 object-contain" />
                </div>
                <span className="text-white font-bold text-lg tracking-wide">Đồng Nai Trace</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="text-white w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1B2A6B]"></span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white/20 overflow-hidden flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-500 mt-1" />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-[18px] w-[18px] text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 border-transparent rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-[14px] shadow-md"
                placeholder="Tìm kiếm sản phẩm, doanh nghiệp..."
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto pb-[100px] hide-scrollbar relative">
            <div className="p-4 space-y-7">
              {/* Main QR Button */}
              <button className="w-full bg-gradient-to-r from-[#E8650A] to-[#f58d42] rounded-[20px] p-5 text-white shadow-xl shadow-[#E8650A]/20 flex items-center gap-4 relative overflow-hidden group active:scale-[0.98] transition-transform border border-white/10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/30 shadow-inner">
                  <Scan className="w-9 h-9 text-white drop-shadow-md" />
                </div>
                <div className="text-left flex-1 z-10">
                  <h3 className="text-[22px] font-bold mb-0.5 tracking-tight drop-shadow-sm">Quét mã QR</h3>
                  <p className="text-white/90 text-[13px] font-medium">Xác thực nguồn gốc tức thì</p>
                </div>
                <ChevronRight className="w-6 h-6 text-white/70" />
              </button>

              {/* Categories */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3.5 px-1 text-[15px]">Danh mục sản phẩm</h4>
                <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                  {categories.map((cat, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                      <div className="w-[52px] h-[52px] rounded-[16px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-center text-[#1B2A6B] group-hover:bg-blue-50 transition-colors">
                        {cat.icon}
                      </div>
                      <span className="text-[12px] text-gray-600 font-medium text-center leading-tight">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Products */}
              <div>
                <div className="flex justify-between items-center mb-3.5 px-1">
                  <h4 className="font-bold text-gray-800 text-[15px]">Sản phẩm nổi bật</h4>
                  <span className="text-[13px] text-[#E8650A] font-semibold cursor-pointer">Xem tất cả</span>
                </div>
                <div className="flex gap-3.5 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
                  {[
                    { name: "Rau muống hữu cơ", farm: "HTX Bình Lợi", img: "https://images.unsplash.com/photo-1596484552993-9c884249a5b3?w=300&q=80" },
                    { name: "Bưởi Tân Triều", farm: "Vườn Bưởi Ba Tèo", img: "https://images.unsplash.com/photo-1590005354167-6da9782046c5?w=300&q=80" },
                    { name: "Nấm bào ngư", farm: "Trại Nấm Long Thành", img: "https://images.unsplash.com/photo-1611077543329-843818e11a39?w=300&q=80" },
                  ].map((item, i) => (
                    <div key={i} className="w-[150px] shrink-0 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden snap-start">
                      <div className="h-[110px] bg-gray-100 relative">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-1.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span className="text-[10px] font-bold text-[#16A34A]">Đã XT</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h5 className="text-[14px] font-bold text-gray-800 leading-tight mb-1 line-clamp-2">{item.name}</h5>
                        <p className="text-[11px] text-gray-500 font-medium line-clamp-1">{item.farm}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tab Bar */}
          <div className="absolute bottom-0 w-full h-[88px] bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] px-6 pb-6 pt-2 flex justify-between items-center z-20">
            <div className="flex flex-col items-center gap-1 text-[#E8650A] w-12 cursor-pointer">
              <Home className="w-6 h-6 stroke-[2.5]" />
              <span className="text-[10px] font-semibold">Trang chủ</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-400 mt-2 w-12 cursor-pointer">
              <Search className="w-6 h-6" />
              <span className="text-[10px] font-medium">Tra cứu</span>
            </div>
            
            {/* Floating QR Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 cursor-pointer active:scale-95 transition-transform">
              <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-tr from-[#E8650A] to-[#f58d42] border-[6px] border-[#F7F9FC] shadow-lg shadow-orange-500/30 flex items-center justify-center text-white">
                <QrCode className="w-7 h-7 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 text-gray-400 mt-2 ml-10 w-12 cursor-pointer relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              <span className="text-[10px] font-medium">Thông báo</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-400 w-12 cursor-pointer">
              <User className="w-6 h-6" />
              <span className="text-[10px] font-medium">Tài khoản</span>
            </div>
          </div>
        </div>
        <p className="text-center mt-5 text-[15px] font-semibold text-gray-600">Màn 1 — Trang chủ</p>
      </div>


      {/* SCREEN 2: QUÉT MÃ QR */}
      <div className="flex flex-col items-center">
        <div className="relative w-[390px] h-[844px] rounded-[44px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden bg-[#111111] flex flex-col flex-shrink-0 border-[10px] border-slate-900">
          
          {/* Status Bar */}
          <div className="absolute top-0 w-full h-[44px] bg-gradient-to-b from-black/50 to-transparent z-30 flex justify-between items-center px-6 text-white text-[13px] font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-5 h-5" />
            </div>
          </div>

          {/* Header */}
          <div className="absolute top-[44px] w-full px-4 pt-2 flex items-center z-30">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-white font-semibold flex-1 text-center pr-10 text-[17px]">Quét mã QR</h2>
          </div>

          {/* Scanner View */}
          <div className="flex-1 relative flex flex-col items-center justify-center">
            {/* Background Camera Mockup */}
            <div className="absolute inset-0 w-full h-full bg-[#1c1c1e]">
              <img src="https://images.unsplash.com/photo-1596484552993-9c884249a5b3?w=800&q=80" alt="Camera view" className="w-full h-full object-cover opacity-30 blur-[4px]" />
            </div>
            
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

            {/* Clear cut area (mocked with borders) */}
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col">
              <div className="flex-1 bg-black/40"></div>
              <div className="flex w-full h-[280px]">
                <div className="flex-1 bg-black/40"></div>
                <div className="w-[280px] h-[280px] relative">
                  {/* Inner cut-out is transparent */}
                </div>
                <div className="flex-1 bg-black/40"></div>
              </div>
              <div className="flex-1 bg-black/40"></div>
            </div>

            <p className="text-white font-medium text-[15px] mb-8 z-20 drop-shadow-md">Đưa mã QR vào khung hình</p>
            
            <div className="relative w-[280px] h-[280px] z-20">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-[5px] border-l-[5px] border-[#E8650A] rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-[5px] border-r-[5px] border-[#E8650A] rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[5px] border-l-[5px] border-[#E8650A] rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[5px] border-r-[5px] border-[#E8650A] rounded-br-xl"></div>
              
              {/* Scan border */}
              <div className="absolute inset-1.5 border border-white/20 rounded-xl"></div>
              
              {/* Scan line */}
              <div className="absolute left-2 right-2 h-[2px] bg-[#E8650A] shadow-[0_0_20px_4px_#E8650A] animate-scan-line rounded-full z-30"></div>
            </div>

            {/* Controls */}
            <div className="flex gap-10 mt-14 z-20">
              <button className="flex flex-col items-center gap-3">
                <div className="w-[60px] h-[60px] rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                  <Flashlight className="w-7 h-7" />
                </div>
                <span className="text-white/90 text-[13px] font-medium">Bật đèn</span>
              </button>
              <button className="flex flex-col items-center gap-3">
                <div className="w-[60px] h-[60px] rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                  <Keyboard className="w-7 h-7" />
                </div>
                <span className="text-white/90 text-[13px] font-medium">Nhập tay</span>
              </button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-30 pb-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/15 transition-colors">
              <span className="text-white text-[15px] font-medium">Không quét được? Nhập mã thủ công</span>
              <ArrowLeft className="w-5 h-5 text-white rotate-180" />
            </div>
            <p className="text-center text-white/50 text-[12px] font-medium mt-6">Hỗ trợ: QR Code, Barcode 1D/2D, Mã GTIN</p>
          </div>
        </div>
        <p className="text-center mt-5 text-[15px] font-semibold text-gray-600">Màn 2 — Quét mã QR</p>
      </div>


      {/* SCREEN 3: CHI TIẾT SẢN PHẨM */}
      <div className="flex flex-col items-center">
        <div className="relative w-[390px] h-[844px] rounded-[44px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden bg-[#F7F9FC] flex flex-col flex-shrink-0 border-[10px] border-slate-900">
          
          {/* Status Bar */}
          <div className="absolute top-0 w-full h-[44px] bg-[#1B2A6B] z-30 flex justify-between items-center px-6 text-white text-[13px] font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-5 h-5" />
            </div>
          </div>

          {/* Header */}
          <div className="bg-[#1B2A6B] pt-[52px] pb-4 px-4 shadow-sm z-20 relative flex items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white -ml-2 hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-white font-semibold flex-1 text-center pr-8 text-[17px]">Kết quả tra cứu</h2>
          </div>

          <div className="flex-1 overflow-y-auto pb-[100px] hide-scrollbar bg-white">
            {/* Success Banner */}
            <div className="bg-[#f0fdf4] border-b border-[#16A34A]/20 px-5 py-4 flex items-start gap-3.5 shadow-sm relative z-10">
              <div className="mt-0.5 w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-md shadow-green-600/20">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-[#15803d] font-bold text-[16px] mb-1">Đã xác thực nguồn gốc</h3>
                <p className="text-[13px] text-[#166534] leading-snug font-medium">Thông tin đã được Sở Khoa học và Công nghệ Thành phố Đồng Nai xác nhận</p>
              </div>
            </div>

            {/* Product Image */}
            <div className="h-[240px] w-full relative bg-blue-50">
              <img src="https://images.unsplash.com/photo-1596484552993-9c884249a5b3?w=800&q=80" alt="Rau muống hữu cơ" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Main Info */}
            <div className="px-5 -mt-8 relative z-10">
              <div className="bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5 mb-5">
                <div className="flex flex-wrap gap-2.5 mb-3">
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">VietGAP</span>
                  <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">OCOP 3★</span>
                </div>
                <h1 className="text-[22px] font-bold text-gray-900 mb-1.5 leading-tight">Rau muống hữu cơ Đồng Nai</h1>
                <p className="text-[15px] font-bold text-[#1B2A6B] mb-4">HTX Rau sạch Bình Lợi</p>
                
                <div className="flex items-start gap-2.5 text-gray-600 pt-3 border-t border-gray-100">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#E8650A]" />
                  <p className="text-[13px] leading-relaxed font-medium">Xã Bình Lợi, Huyện Vĩnh Cửu, Thành phố Đồng Nai</p>
                </div>
              </div>

              {/* Quick Info */}
              <h3 className="font-bold text-gray-800 mb-3 px-1 text-[16px]">Thông tin truy xuất</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Barcode className="w-4 h-4 text-[#1B2A6B]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-0.5">Mã GTIN</p>
                    <p className="text-[13px] font-bold text-gray-900 truncate">8938507561023</p>
                  </div>
                </div>
                <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Package className="w-4 h-4 text-[#1B2A6B]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-0.5">Số lô</p>
                    <p className="text-[13px] font-bold text-gray-900">LOT-2024-0892</p>
                  </div>
                </div>
                <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar className="w-4 h-4 text-[#1B2A6B]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-0.5">Hạn sử dụng</p>
                    <p className="text-[13px] font-bold text-gray-900">31/03/2024</p>
                  </div>
                </div>
                <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-gray-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-4 h-4 text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium mb-0.5">Chứng nhận</p>
                    <p className="text-[13px] font-bold text-[#16A34A]">Hợp lệ</p>
                  </div>
                </div>
              </div>

              {/* Traceability Timeline */}
              <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] border border-gray-100 p-5 mb-5">
                <h3 className="font-bold text-gray-800 mb-6 text-[16px]">Hành trình truy xuất</h3>
                <div className="flex justify-between items-start relative mb-2">
                  <div className="absolute left-6 right-6 top-5 h-[3px] bg-gray-100 z-0"></div>
                  <div className="absolute left-6 w-[45%] top-5 h-[3px] bg-[#16A34A] z-0"></div>
                  
                  <div className="flex flex-col items-center gap-2.5 z-10 w-[70px]">
                    <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <span className="text-[12px] font-bold text-gray-900 text-center leading-tight">Gieo trồng</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2.5 z-10 w-[70px]">
                    <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                      <TestTube className="w-5 h-5" />
                    </div>
                    <span className="text-[12px] font-bold text-gray-900 text-center leading-tight">Kiểm nghiệm</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2.5 z-10 w-[70px]">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 border-2 border-gray-200 flex items-center justify-center ring-4 ring-white">
                      <Box className="w-5 h-5" />
                    </div>
                    <span className="text-[12px] font-medium text-gray-500 text-center leading-tight">Đóng gói</span>
                  </div>
                </div>
                <button className="w-full text-center text-[14px] font-bold text-[#E8650A] mt-5 py-2.5 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                  Xem đầy đủ hành trình &rarr;
                </button>
              </div>

              {/* Share */}
              <button className="w-full bg-white border-2 border-[#E8650A] text-[#E8650A] rounded-xl py-4 flex justify-center items-center gap-2.5 font-bold text-[15px] mb-8 active:bg-orange-50 transition-colors shadow-sm">
                <Share className="w-5 h-5" />
                Chia sẻ thông tin sản phẩm
              </button>

            </div>
          </div>

          {/* Bottom Tab Bar (Same) */}
          <div className="absolute bottom-0 w-full h-[88px] bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] px-6 pb-6 pt-2 flex justify-between items-center z-30">
            <div className="flex flex-col items-center gap-1 text-gray-400 w-12 cursor-pointer mt-2">
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-medium">Trang chủ</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-[#E8650A] mt-0 w-12 cursor-pointer">
              <Search className="w-6 h-6 stroke-[2.5]" />
              <span className="text-[10px] font-semibold">Tra cứu</span>
            </div>
            
            {/* Floating QR Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 cursor-pointer active:scale-95 transition-transform">
              <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-tr from-[#E8650A] to-[#f58d42] border-[6px] border-white shadow-lg shadow-orange-500/30 flex items-center justify-center text-white">
                <QrCode className="w-7 h-7 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 text-gray-400 mt-2 ml-10 w-12 cursor-pointer relative">
              <Bell className="w-6 h-6" />
              <span className="text-[10px] font-medium">Thông báo</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-gray-400 mt-2 w-12 cursor-pointer">
              <User className="w-6 h-6" />
              <span className="text-[10px] font-medium">Tài khoản</span>
            </div>
          </div>
        </div>
        <p className="text-center mt-5 text-[15px] font-semibold text-gray-600">Màn 3 — Chi tiết sản phẩm</p>
      </div>

    </div>
  );
}
