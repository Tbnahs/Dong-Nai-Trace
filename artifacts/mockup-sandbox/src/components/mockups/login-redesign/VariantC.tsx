import { useState } from "react";
import { Eye, EyeOff, Lock, User, Phone, Leaf } from "lucide-react";

export function VariantC() {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 font-sans overflow-hidden">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1440076892464-110978a08473?w=1400&fit=crop"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d0a]/80 via-[#1a5c1a]/70 to-[#0d4f2e]/75" />

      {/* Decorative circles */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-green-400/10 blur-3xl" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-emerald-300/10 blur-3xl" />

      {/* Glassmorphism card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back */}
        <button className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors mb-5">
          ← Về trang chủ
        </button>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-9 pt-9 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center ring-1 ring-white/20">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-extrabold text-base leading-tight">Đồng Nai Trace</div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">Sở KH&CN Đồng Nai</div>
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Đăng nhập hệ thống</h2>
            <p className="text-sm text-white/50 mt-1">Truy xuất nguồn gốc hàng hóa Đồng Nai</p>
          </div>

          {/* Form */}
          <div className="px-9 py-7 space-y-5">
            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Mã DN / CCCD / tài khoản"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/15 focus:ring-0 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Mật khẩu</label>
                <button className="text-xs font-semibold text-emerald-300 hover:text-emerald-200">Quên mật khẩu?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                />
                <button onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/30 bg-white/10" defaultChecked />
                <span className="text-sm text-white/70">Ghi nhớ mật khẩu</span>
              </label>
            </div>

            <button className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/40 transition-all active:scale-[.98]">
              Đăng nhập
            </button>

            {/* Register */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-sm text-white/50">Chưa có tài khoản?</span>
              <button className="text-sm font-bold text-emerald-300 hover:text-emerald-200 transition-colors">
                Đăng ký doanh nghiệp
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-9 pb-7 border-t border-white/10 pt-5 text-center space-y-2">
            <p className="text-xs text-white/40">
              Hướng dẫn đăng ký, cập nhật tài khoản.{" "}
              <button className="font-semibold text-emerald-300">Tại đây</button>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/60">
              <div className="w-6 h-6 rounded-full bg-emerald-500/60 flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <span>Hotline: <strong className="text-emerald-300">0961.042.442</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
