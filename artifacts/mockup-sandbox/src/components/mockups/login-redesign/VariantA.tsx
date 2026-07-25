import { useState } from "react";
import { Eye, EyeOff, Lock, User, Phone, ArrowLeft } from "lucide-react";

export function VariantA() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center p-6 font-sans">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-900/10 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#2740BA] via-[#4B6BF5] to-[#2740BA]" />

        <div className="px-10 py-10">
          {/* Back */}
          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#2740BA] transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Về trang chủ
          </button>

          {/* Logo + Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
              {/* QR icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="10" height="10" rx="2" stroke="#2740BA" strokeWidth="2"/>
                <rect x="5" y="5" width="4" height="4" fill="#2740BA"/>
                <rect x="16" y="2" width="10" height="10" rx="2" stroke="#2740BA" strokeWidth="2"/>
                <rect x="19" y="5" width="4" height="4" fill="#2740BA"/>
                <rect x="2" y="16" width="10" height="10" rx="2" stroke="#2740BA" strokeWidth="2"/>
                <rect x="5" y="19" width="4" height="4" fill="#2740BA"/>
                <line x1="16" y1="16" x2="26" y2="16" stroke="#2740BA" strokeWidth="2"/>
                <line x1="16" y1="20" x2="21" y2="20" stroke="#2740BA" strokeWidth="2"/>
                <line x1="23" y1="20" x2="26" y2="20" stroke="#2740BA" strokeWidth="2"/>
                <line x1="16" y1="24" x2="26" y2="24" stroke="#2740BA" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#2740BA] leading-tight">Đồng Nai Trace</h1>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Hệ thống truy xuất nguồn gốc</p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Đăng nhập</h2>
          <p className="text-sm text-gray-500 mb-8">Nhập thông tin tài khoản doanh nghiệp của bạn</p>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  placeholder="Mã số doanh nghiệp / CCCD / tài khoản"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-[#2740BA] focus:bg-white focus:ring-4 focus:ring-[#2740BA]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mật khẩu</label>
                <button className="text-xs font-semibold text-[#2740BA] hover:underline">Quên mật khẩu?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-[#2740BA] focus:bg-white focus:ring-4 focus:ring-[#2740BA]/10 transition-all"
                />
                <button onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2740BA]" defaultChecked />
              <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
            </label>

            <button className="w-full py-3.5 bg-[#2740BA] hover:bg-[#1f339e] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 active:scale-[.98]">
              Đăng nhập
            </button>
          </div>

          {/* Register link */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-400">Chưa có tài khoản?</span>
            <button className="text-sm font-bold text-[#2740BA] hover:underline">Đăng ký cho doanh nghiệp</button>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-100" />

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-400">
              Hướng dẫn đăng ký, cập nhật tài khoản.{" "}
              <button className="font-semibold text-[#2740BA] hover:underline">Tại đây</button>
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
