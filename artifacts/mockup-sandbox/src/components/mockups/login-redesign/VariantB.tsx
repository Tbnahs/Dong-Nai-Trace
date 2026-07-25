import { useState } from "react";
import { Eye, EyeOff, Lock, User, Phone, ChevronRight } from "lucide-react";

export function VariantB() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex w-[52%] relative flex-col justify-between overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&fit=crop"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f6b]/90 via-[#1B2A6B]/80 to-[#2740BA]/70" />

        {/* Content */}
        <div className="relative z-10 p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center ring-1 ring-white/20">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="10" height="10" rx="2" stroke="white" strokeWidth="2"/>
                <rect x="5" y="5" width="4" height="4" fill="white"/>
                <rect x="16" y="2" width="10" height="10" rx="2" stroke="white" strokeWidth="2"/>
                <rect x="19" y="5" width="4" height="4" fill="white"/>
                <rect x="2" y="16" width="10" height="10" rx="2" stroke="white" strokeWidth="2"/>
                <rect x="5" y="19" width="4" height="4" fill="white"/>
                <line x1="16" y1="16" x2="26" y2="16" stroke="white" strokeWidth="2"/>
                <line x1="16" y1="20" x2="22" y2="20" stroke="white" strokeWidth="2"/>
                <line x1="16" y1="24" x2="26" y2="24" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">Đồng Nai Trace</span>
          </div>
        </div>

        <div className="relative z-10 px-12 pb-12">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Truy xuất<br/>nguồn gốc<br/>hàng hóa
          </h2>
          <p className="text-blue-200/80 text-sm leading-relaxed mb-8 max-w-xs">
            Hệ thống truy xuất nguồn gốc tỉnh Đồng Nai — minh bạch, tin cậy, chuẩn quốc tế.
          </p>

          {/* Stats */}
          <div className="flex gap-6">
            {[["1.200+", "Doanh nghiệp"], ["8.500+", "Sản phẩm"], ["18/18", "Huyện/TP"]].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-extrabold text-white">{n}</div>
                <div className="text-xs text-blue-200/70 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-10 py-12">
        <div className="w-full max-w-sm">
          {/* Back */}
          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#2740BA] transition-colors mb-10">
            ← Về trang chủ
          </button>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Đăng nhập</h2>
          <p className="text-sm text-gray-400 mb-8">Nhập thông tin tài khoản của bạn</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5">TÊN ĐĂNG NHẬP</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  placeholder="Mã DN / CCCD / tài khoản"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2740BA] focus:ring-2 focus:ring-[#2740BA]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-400">MẬT KHẨU</label>
                <button className="text-xs font-semibold text-[#2740BA]">Quên mật khẩu?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2740BA] focus:ring-2 focus:ring-[#2740BA]/20 transition-all"
                />
                <button onClick={() => setShowPw(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2740BA]" defaultChecked />
                <span className="text-sm text-gray-600">Ghi nhớ mật khẩu</span>
              </label>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2740BA] hover:bg-[#1f339e] text-white font-bold text-sm rounded-lg transition-colors mt-2">
              Đăng nhập <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Chưa có tài khoản?</span>
            <button className="text-sm font-bold text-[#2740BA] flex items-center gap-1 hover:underline">
              Đăng ký doanh nghiệp <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-gray-400">
              Hướng dẫn đăng ký.{" "}
              <button className="font-semibold text-[#2740BA]">Tại đây</button>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-6 h-6 rounded-full bg-[#2740BA] flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <span>Hotline: <strong className="text-[#2740BA]">0961.042.442</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
