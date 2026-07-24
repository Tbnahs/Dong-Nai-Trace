import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, CheckCircle2, UploadCloud, Home, LogIn } from 'lucide-react';

const DISTRICTS = ['Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú', 'Trảng Bom', 'Thống Nhất', 'Cẩm Mỹ'];
const ORG_TYPES = ['Doanh nghiệp', 'Hợp tác xã (HTX)', 'Trang trại', 'Cơ sở sản xuất', 'Hộ kinh doanh'];
const PRODUCT_CATS = ['Nông sản & Rau củ', 'Trái cây', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Khác'];
const CERTS_LIST = ['VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000', 'Hữu cơ'];

const STEPS = [
  { label: 'Thông tin doanh nghiệp' },
  { label: 'Người đại diện' },
  { label: 'Sản phẩm đăng ký' },
  { label: 'Xác nhận' },
];

function UploadZone({ label, hint }: { label: string; hint: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <UploadCloud className="w-7 h-7 text-gray-400" />
        <p className="text-sm text-gray-500">{hint}</p>
      </div>
    </div>
  );
}

function Field({ label, children, half }: { label: string; children: React.ReactNode; half?: boolean }) {
  return (
    <div className={half ? '' : 'sm:col-span-2 lg:col-span-2'}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2740BA] focus:border-transparent placeholder:text-gray-400";
const selectCls = `${inputCls} bg-white`;

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [regCode] = useState(() => `TXNG-REG-${Math.floor(10000000 + Math.random() * 90000000)}`);

  const logoUrl = import.meta.env.BASE_URL + 'images/logo-skhcn.png';
  const isLastStep = step === 4;

  const toggleCert = (c: string) => {
    setSelectedCerts(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 sm:px-12 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-[#2740BA] hidden sm:block text-lg">ĐỒNG NAI TRACE</span>
        </Link>
        <Link href="/dang-nhap" className="text-sm font-medium text-gray-600 hover:text-[#2740BA] transition-colors">
          Đã có tài khoản? Đăng nhập
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl">
          {/* Title */}
          {step < 4 && (
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-gray-800">Đăng ký hồ sơ truy xuất</h1>
              <p className="text-sm text-gray-500 mt-1">Cung cấp thông tin doanh nghiệp và sản phẩm để tham gia hệ thống</p>
            </div>
          )}

          {/* Stepper */}
          {step < 4 && (
            <div className="flex items-start gap-0 mb-8 relative">
              {STEPS.map((s, i) => {
                const num = i + 1;
                const done = step > num;
                const active = step === num;
                return (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center flex-1 relative z-10">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${done ? 'bg-[#2740BA] border-[#2740BA] text-white' : active ? 'bg-[#2740BA] border-[#2740BA] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                        {done ? <CheckCircle2 className="w-5 h-5" /> : num}
                      </div>
                      <span className={`text-xs mt-1.5 text-center font-medium leading-tight max-w-[80px] ${active ? 'text-[#2740BA]' : done ? 'text-gray-600' : 'text-gray-400'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mt-4 transition-colors ${step > num ? 'bg-[#2740BA]' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">

              {/* ── STEP 1: Thông tin doanh nghiệp ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-6">Thông tin doanh nghiệp / tổ chức</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Tên doanh nghiệp / tổ chức *" half>
                      <input className={inputCls} placeholder="VD: HTX Nông nghiệp Xuân Lộc" />
                    </Field>
                    <Field label="Mã số thuế *" half>
                      <input className={inputCls} placeholder="VD: 3602123456" />
                    </Field>
                    <Field label="Loại hình *" half>
                      <select className={selectCls}>
                        {ORG_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Ngành nghề *" half>
                      <input className={inputCls} placeholder="VD: Rau củ quả" />
                    </Field>
                    <Field label="Địa chỉ *" half>
                      <input className={inputCls} placeholder="Số, đường" />
                    </Field>
                    <Field label="Huyện / Thị xã *" half>
                      <select className={selectCls}>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </Field>
                    <Field label="Số điện thoại *" half>
                      <input className={inputCls} placeholder="02513..." type="tel" />
                    </Field>
                    <Field label="Email *" half>
                      <input className={inputCls} placeholder="email@gmail.com" type="email" />
                    </Field>
                    <div className="sm:col-span-2">
                      <UploadZone label="Giấy phép kinh doanh / Hợp tác xã (bản scan)" hint="Kéo thả file hoặc bấm để tải lên (PDF, JPG, PNG)" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Người đại diện ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-6">Thông tin người đại diện</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Họ và tên người đại diện *" half>
                      <input className={inputCls} placeholder="VD: Nguyễn Văn A" />
                    </Field>
                    <Field label="Số điện thoại liên hệ *" half>
                      <input className={inputCls} placeholder="09xx xxx xxx" type="tel" />
                    </Field>
                    <Field label="Email liên hệ *" half>
                      <input className={inputCls} placeholder="email@gmail.com" type="email" />
                    </Field>
                    <Field label="CCCD / CMND" half>
                      <input className={inputCls} placeholder="Số căn cước công dân" />
                    </Field>
                    <div className="sm:col-span-2">
                      <UploadZone label="Giấy ủy quyền (nếu có)" hint="Tải lên giấy ủy quyền (PDF, JPG)" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Sản phẩm đăng ký ── */}
              {step === 3 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-6">Sản phẩm đăng ký truy xuất</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Tên sản phẩm *" half>
                      <input className={inputCls} placeholder="VD: Rau muống VietGAP" />
                    </Field>
                    <Field label="Danh mục *" half>
                      <select className={selectCls}>
                        {PRODUCT_CATS.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Đơn vị tính *" half>
                      <input className={inputCls} placeholder="kg" />
                    </Field>
                    <Field label="" half>
                      <p className="text-sm font-medium text-gray-700 mb-2">Chứng nhận (chọn nhiều)</p>
                      <div className="flex flex-wrap gap-2">
                        {CERTS_LIST.map(c => (
                          <label key={c} className="flex items-center gap-1.5 cursor-pointer text-sm">
                            <input
                              type="checkbox"
                              checked={selectedCerts.includes(c)}
                              onChange={() => toggleCert(c)}
                              className="rounded text-[#2740BA] focus:ring-[#2740BA]"
                            />
                            {c}
                          </label>
                        ))}
                      </div>
                    </Field>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả sản phẩm *</label>
                      <textarea className={`${inputCls} min-h-[96px] resize-y`} placeholder="Mô tả ngắn gọn về sản phẩm, quy trình sản xuất..." />
                    </div>
                    <div className="sm:col-span-2">
                      <UploadZone label="Hình ảnh sản phẩm" hint="Tải lên 1-5 hình ảnh sản phẩm (JPG, PNG)" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Success ── */}
              {step === 4 && (
                <div className="flex flex-col items-center text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Đăng ký thành công!</h2>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-sm mb-5">
                    Hồ sơ của <strong>doanh nghiệp</strong> đã được gửi. Cơ quan chức năng sẽ kiểm tra và phản hồi trong vòng 3–5 ngày làm việc.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 mb-8 text-left w-full max-w-xs">
                    <p className="text-xs text-gray-500 mb-1">Mã hồ sơ tạm</p>
                    <p className="font-mono font-bold text-[#2740BA] text-lg">{regCode}</p>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center">
                    <Link href="/" className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Home className="w-4 h-4" /> Về trang chủ
                    </Link>
                    <Link href="/dang-nhap" className="flex items-center gap-2 px-5 py-2.5 bg-[#2740BA] text-white rounded-lg text-sm font-bold hover:bg-[#1f339e] transition-colors shadow-sm">
                      <LogIn className="w-4 h-4" /> Đăng nhập quản lý
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            {step < 4 && (
              <div className="bg-gray-50 border-t border-gray-200 px-6 sm:px-8 py-4 flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Quay lại
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={() => setStep(s => Math.min(4, s + 1))}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e] transition-colors shadow-sm"
                >
                  Tiếp tục <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
