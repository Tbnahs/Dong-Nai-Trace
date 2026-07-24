import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoUrl = import.meta.env.BASE_URL + 'images/logo-skhcn.png';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'admin@htx.vn');
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-6">
          <img src={logoUrl} alt="Logo" className="h-16 w-auto" />
        </Link>
        <h2 className="mt-2 text-3xl font-extrabold text-[#2740BA]">Đăng nhập hệ thống</h2>
        <p className="mt-2 text-sm text-gray-600">Dành cho Doanh nghiệp / HTX / Cơ sở sản xuất</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email / Số điện thoại</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#2740BA] focus:border-[#2740BA] sm:text-sm"
                  placeholder="admin@doanhnghiep.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#2740BA] focus:border-[#2740BA] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-900 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-[#2740BA] focus:ring-[#2740BA] border-gray-300 rounded" />
                Ghi nhớ đăng nhập
              </label>
              <button
                type="button"
                onClick={() => alert('Vui lòng liên hệ Sở KH&CN Đồng Nai: skhcn@dongnai.gov.vn')}
                className="text-sm font-medium text-[#2740BA] hover:text-[#1f339e]"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#E8650A] hover:bg-[#D55C08] transition-colors"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Chưa có tài khoản?</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/dang-ky"
                className="w-full flex justify-center py-2.5 px-4 border border-[#2740BA] rounded-md shadow-sm text-sm font-bold text-[#2740BA] bg-white hover:bg-slate-50"
              >
                Đăng ký doanh nghiệp mới
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
