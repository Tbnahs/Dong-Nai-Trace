import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Building, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  
  const logoUrl = import.meta.env.BASE_URL + 'images/logo-skhcn.png';

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleComplete = () => {
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm py-4 px-6 sm:px-12 flex justify-between items-center border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-[#2740BA] hidden sm:block">ĐỒNG NAI TRACE</span>
        </Link>
        <Link href="/dang-nhap" className="text-sm font-medium text-gray-600 hover:text-[#2740BA]">
          Đã có tài khoản? Đăng nhập
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#2740BA] -z-10 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              
              {[1, 2, 3, 4].map(num => (
                <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step >= num ? 'bg-[#2740BA] text-white border-[#2740BA]' : 'bg-white text-gray-400 border-gray-300'}`}>
                  {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
              <span className={step >= 1 ? 'text-[#2740BA]' : ''}>Thông tin tổ chức</span>
              <span className={step >= 2 ? 'text-[#2740BA]' : ''}>Thông tin pháp lý</span>
              <span className={step >= 3 ? 'text-[#2740BA]' : ''}>Tải tài liệu</span>
              <span className={step >= 4 ? 'text-[#2740BA]' : ''}>Xác nhận</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 sm:p-10">
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#2740BA] flex items-center gap-2">
                    <Building className="w-6 h-6 text-[#E8650A]" /> Bước 1: Thông tin tổ chức
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình tổ chức *</label>
                      <select className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]">
                        <option>Doanh nghiệp</option>
                        <option>Hợp tác xã (HTX)</option>
                        <option>Cơ sở sản xuất</option>
                        <option>Hộ kinh doanh</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên tổ chức (Đầy đủ theo GPKD) *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="VD: Công ty TNHH Nông Sản Sạch Đồng Nai" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mã số thuế / Mã số ĐKKD *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="Nhập mã số thuế" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#2740BA] flex items-center gap-2">
                    <Building className="w-6 h-6 text-[#E8650A]" /> Bước 2: Thông tin pháp lý & Liên hệ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ trụ sở chính *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="Số nhà, đường, phường/xã, quận/huyện, Đồng Nai" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Người đại diện pháp luật *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="Họ và tên" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="Giám đốc, Chủ nhiệm..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại liên hệ *</label>
                      <input type="tel" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="SĐT" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email đăng nhập *</label>
                      <input type="email" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]" placeholder="Email nhận thông báo" />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#2740BA] flex items-center gap-2">
                    <UploadCloud className="w-6 h-6 text-[#E8650A]" /> Bước 3: Tải tài liệu chứng minh
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giấy phép đăng ký kinh doanh (Bắt buộc) *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                      <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-700">Kéo thả file vào đây hoặc <span className="text-[#E8650A]">chọn file</span></p>
                      <p className="text-xs text-gray-500 mt-1">Hỗ trợ PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Các chứng nhận đã đạt (Không bắt buộc)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['VietGAP', 'GlobalGAP', 'OCOP', 'ISO 9001', 'ISO 22000', 'HACCP'].map(cert => (
                        <label key={cert} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input type="checkbox" className="text-[#2740BA] rounded focus:ring-[#2740BA]" />
                          <span className="text-sm font-medium">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2740BA]">Xác nhận thông tin</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Hồ sơ của bạn sẽ được gửi tới Sở Khoa học và Công nghệ tỉnh Đồng Nai để xét duyệt. Thời gian phản hồi dự kiến từ 3-5 ngày làm việc.
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-lg text-left text-sm mt-6 border border-slate-200">
                    <h4 className="font-bold text-gray-800 mb-3 uppercase text-xs tracking-wider">Tóm tắt hồ sơ</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li><span className="font-medium text-gray-800">Tổ chức:</span> Công ty TNHH Nông Sản Mẫu</li>
                      <li><span className="font-medium text-gray-800">MST:</span> 3601234567</li>
                      <li><span className="font-medium text-gray-800">Đại diện:</span> Nguyễn Văn A</li>
                      <li><span className="font-medium text-gray-800">Tài liệu:</span> Đã đính kèm GPKD</li>
                    </ul>
                  </div>

                  <div className="flex items-start gap-3 text-left mt-4">
                    <input type="checkbox" id="terms" className="mt-1 text-[#2740BA] rounded focus:ring-[#2740BA]" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Tôi cam kết các thông tin khai báo là hoàn toàn chính xác và chịu trách nhiệm trước pháp luật về tính hợp pháp của các tài liệu đã tải lên.
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 sm:px-10 border-t border-gray-200 flex justify-between items-center">
              {step > 1 ? (
                <button onClick={prevStep} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Quay lại
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 4 ? (
                <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2 bg-[#2740BA] text-white text-sm font-bold rounded-md hover:bg-[#1f339e] transition-colors shadow-sm">
                  Tiếp tục <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleComplete} className="flex items-center gap-2 px-6 py-2.5 bg-[#E8650A] text-white text-sm font-bold rounded-md hover:bg-[#D55C08] transition-colors shadow-sm">
                  Hoàn tất đăng ký <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
