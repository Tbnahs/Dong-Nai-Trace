import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { User, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const logoUrl = import.meta.env.BASE_URL + 'images/logo-khanh-hoa.jpg';
  const guideUrl = import.meta.env.BASE_URL + 'huong-dan.pdf';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'admin@htx.vn');
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 bg-gradient-to-br from-[#1B2A6B] via-[#2740BA] to-[#1e3a8a] relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full border border-white/10" />
        {/* Decorative glowing orb */}
        <div className="absolute bottom-1/3 right-8 w-32 h-32 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute top-1/3 left-8 w-48 h-48 rounded-full bg-indigo-300/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-white/20">
            <img src={logoUrl} alt="Logo" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-white font-extrabold text-2xl leading-tight mb-2">
            Khánh Hòa Trace
          </h1>
          <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-4">
            Hệ thống truy xuất nguồn gốc hàng hóa
          </p>
          <p className="text-blue-200/70 text-sm max-w-xs leading-relaxed">
            Sở Khoa học và Công nghệ tỉnh Khánh Hòa
          </p>
        </div>

        {/* QR / tech decorative icon at bottom */}
        <div className="relative z-10 mt-12 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-white">
            <rect x="5" y="5" width="42" height="42" rx="4" stroke="currentColor" strokeWidth="3"/>
            <rect x="16" y="16" width="20" height="20" rx="2" fill="currentColor"/>
            <rect x="73" y="5" width="42" height="42" rx="4" stroke="currentColor" strokeWidth="3"/>
            <rect x="84" y="16" width="20" height="20" rx="2" fill="currentColor"/>
            <rect x="5" y="73" width="42" height="42" rx="4" stroke="currentColor" strokeWidth="3"/>
            <rect x="16" y="84" width="20" height="20" rx="2" fill="currentColor"/>
            <line x1="73" y1="73" x2="115" y2="73" stroke="currentColor" strokeWidth="3"/>
            <line x1="73" y1="85" x2="95" y2="85" stroke="currentColor" strokeWidth="3"/>
            <line x1="103" y1="85" x2="115" y2="85" stroke="currentColor" strokeWidth="3"/>
            <line x1="73" y1="97" x2="85" y2="97" stroke="currentColor" strokeWidth="3"/>
            <line x1="93" y1="97" x2="115" y2="97" stroke="currentColor" strokeWidth="3"/>
            <line x1="73" y1="109" x2="115" y2="109" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={logoUrl} alt="Logo" className="h-14 w-auto mx-auto mb-2" />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-800">Đăng nhập</h2>
              <p className="text-sm text-gray-500 mt-1">Nhập thông tin đăng nhập hệ thống</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span className="text-red-500 mr-0.5">*</span>Tên đăng nhập
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2740BA]/30 focus:border-[#2740BA] placeholder:text-gray-400 transition-colors"
                    placeholder="Nhập mã số doanh nghiệp/CCCD/tài khoản"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span className="text-red-500 mr-0.5">*</span>Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2740BA]/30 focus:border-[#2740BA] placeholder:text-gray-400 transition-colors"
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#2740BA] focus:ring-[#2740BA]"
                  />
                  <span className="text-sm text-gray-700">Ghi nhớ mật khẩu</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Vui lòng liên hệ Sở KH&CN Khánh Hòa: skhcn@khanhhoa.gov.vn')}
                  className="text-sm font-semibold text-[#2740BA] hover:text-[#1f339e] transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2740BA] hover:bg-[#1f339e] text-white font-bold text-sm rounded-lg shadow-sm transition-colors"
              >
                Đăng nhập
              </button>
            </form>

            {/* Register link */}
            <div className="mt-5 text-center text-sm text-gray-500">
              Chưa có tài khoản?{' '}
              <Link href="/dang-ky" className="font-semibold text-[#2740BA] hover:text-[#1f339e] transition-colors">
                Đăng ký cho doanh nghiệp
              </Link>
            </div>

            <div className="my-5 border-t border-gray-100" />

            {/* Guide link */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Hướng dẫn đăng ký, cập nhật thông tin tài khoản doanh nghiệp.{' '}
              <a
                href={guideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2740BA] hover:underline"
              >
                Tại đây
              </a>
            </p>

            {/* Hotline */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-7 h-7 rounded-full bg-[#2740BA] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Hotline: <strong className="text-[#2740BA]">0961.042.442</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
