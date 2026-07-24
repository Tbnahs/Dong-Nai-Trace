import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ChevronLeft, ChevronRight, CheckCircle2, UploadCloud,
  Eye, EyeOff, Copy, LogIn, User, Lock,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const DISTRICTS = ['Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú', 'Trảng Bom', 'Thống Nhất', 'Cẩm Mỹ'];
const ORG_TYPES = ['Doanh nghiệp', 'Hợp tác xã (HTX)', 'Trang trại', 'Cơ sở sản xuất', 'Hộ kinh doanh'];

const STEPS = [
  { label: 'Thông tin doanh nghiệp' },
  { label: 'Người đại diện' },
  { label: 'Xác nhận' },
];

// ─── Form state ───────────────────────────────────────────────────────────────
interface FormData {
  // Step 1
  orgName: string;
  taxCode: string;
  orgType: string;
  industry: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  // Step 2
  repName: string;
  repPhone: string;
  repEmail: string;
  cccd: string;
  password: string;
  confirmPassword: string;
}

const initialForm: FormData = {
  orgName: '', taxCode: '', orgType: ORG_TYPES[0], industry: '',
  address: '', district: DISTRICTS[0], phone: '', email: '',
  repName: '', repPhone: '', repEmail: '', cccd: '',
  password: '', confirmPassword: '',
};

// ─── Validation rules per step ────────────────────────────────────────────────
type Errors = Partial<Record<keyof FormData, string>>;

function validateStep(step: number, form: FormData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!form.orgName.trim())   e.orgName  = 'Vui lòng nhập tên doanh nghiệp';
    if (!form.taxCode.trim())   e.taxCode  = 'Vui lòng nhập mã số thuế';
    if (!form.industry.trim())  e.industry = 'Vui lòng nhập ngành nghề';
    if (!form.address.trim())   e.address  = 'Vui lòng nhập địa chỉ';
    if (!form.phone.trim())     e.phone    = 'Vui lòng nhập số điện thoại';
    if (!form.email.trim())     e.email    = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email không hợp lệ';
  }
  if (step === 2) {
    if (!form.repName.trim())   e.repName  = 'Vui lòng nhập họ và tên';
    if (!form.repPhone.trim())  e.repPhone = 'Vui lòng nhập số điện thoại';
    if (!form.repEmail.trim())  e.repEmail = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.repEmail)) e.repEmail = 'Email không hợp lệ';
    if (!form.password)         e.password = 'Vui lòng tạo mật khẩu';
    else if (form.password.length < 8) e.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    if (!form.confirmPassword)  e.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }
  return e;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
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

interface FieldProps {
  label: string;
  error?: string;
  half?: boolean;
  children: React.ReactNode;
}
function Field({ label, error, half, children }: FieldProps) {
  return (
    <div className={half ? '' : 'sm:col-span-2'}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 placeholder:text-gray-400 transition-colors ${
    err
      ? 'border-red-400 focus:ring-red-300 bg-red-50'
      : 'border-gray-300 focus:ring-[#2740BA] focus:border-transparent'
  }`;
const selectCls = (err?: string) => `${inputCls(err)} bg-white`;

// ─── Password field ───────────────────────────────────────────────────────────
function PasswordField({ label, value, onChange, error, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputCls(error) + ' pr-10'}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </Field>
  );
}

// ─── Credential display card ──────────────────────────────────────────────────
function CredentialRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-[#2740BA]">{icon}</span>
        <div>
          <p className="text-xs text-gray-400 font-medium">{label}</p>
          <p className="font-mono font-semibold text-slate-800 text-sm break-all">{value}</p>
        </div>
      </div>
      <button onClick={copy} className="shrink-0 text-xs text-gray-500 hover:text-[#2740BA] flex items-center gap-1 transition-colors">
        <Copy className="w-3.5 h-3.5" />
        {copied ? 'Đã chép' : 'Sao chép'}
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState<FormData>(initialForm);
  const [errors, setErrors]   = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const set = (key: keyof FormData) => (val: string | string[]) =>
    setForm(f => ({ ...f, [key]: val }));

  const handleNext = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(true);
      return;
    }
    setErrors({});
    setTouched(false);
    setStep(s => Math.min(3, s + 1));
  };

  const handleBack = () => {
    setErrors({});
    setTouched(false);
    setStep(s => s - 1);
  };

  const e = touched ? errors : {};

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl">

          {/* Title */}
          {step < 3 && (
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-gray-800">Đăng ký tài khoản doanh nghiệp</h1>
              <p className="text-sm text-gray-500 mt-1">Cung cấp thông tin doanh nghiệp để tham gia hệ thống</p>
            </div>
          )}

          {/* Stepper */}
          {step < 3 && (
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
                    <Field label="Tên doanh nghiệp / tổ chức *" error={e.orgName} half>
                      <input className={inputCls(e.orgName)} placeholder="VD: HTX Nông nghiệp Xuân Lộc"
                        value={form.orgName} onChange={ev => set('orgName')(ev.target.value)} />
                    </Field>
                    <Field label="Mã số thuế *" error={e.taxCode} half>
                      <input className={inputCls(e.taxCode)} placeholder="VD: 3602123456"
                        value={form.taxCode} onChange={ev => set('taxCode')(ev.target.value)} />
                    </Field>
                    <Field label="Loại hình *" half>
                      <select className={selectCls()} value={form.orgType} onChange={ev => set('orgType')(ev.target.value)}>
                        {ORG_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Ngành nghề *" error={e.industry} half>
                      <input className={inputCls(e.industry)} placeholder="VD: Rau củ quả"
                        value={form.industry} onChange={ev => set('industry')(ev.target.value)} />
                    </Field>
                    <Field label="Địa chỉ *" error={e.address} half>
                      <input className={inputCls(e.address)} placeholder="Số, đường"
                        value={form.address} onChange={ev => set('address')(ev.target.value)} />
                    </Field>
                    <Field label="Huyện / Thị xã *" half>
                      <select className={selectCls()} value={form.district} onChange={ev => set('district')(ev.target.value)}>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </Field>
                    <Field label="Số điện thoại *" error={e.phone} half>
                      <input className={inputCls(e.phone)} placeholder="02513..." type="tel"
                        value={form.phone} onChange={ev => set('phone')(ev.target.value)} />
                    </Field>
                    <Field label="Email *" error={e.email} half>
                      <input className={inputCls(e.email)} placeholder="email@gmail.com" type="email"
                        value={form.email} onChange={ev => set('email')(ev.target.value)} />
                    </Field>
                    <div className="sm:col-span-2">
                      <UploadZone label="Giấy phép kinh doanh / Hợp tác xã (bản scan)" hint="Kéo thả file hoặc bấm để tải lên (PDF, JPG, PNG)" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Người đại diện + Tạo mật khẩu ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-6">Thông tin người đại diện</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Họ và tên người đại diện *" error={e.repName} half>
                      <input className={inputCls(e.repName)} placeholder="VD: Nguyễn Văn A"
                        value={form.repName} onChange={ev => set('repName')(ev.target.value)} />
                    </Field>
                    <Field label="Số điện thoại liên hệ *" error={e.repPhone} half>
                      <input className={inputCls(e.repPhone)} placeholder="09xx xxx xxx" type="tel"
                        value={form.repPhone} onChange={ev => set('repPhone')(ev.target.value)} />
                    </Field>
                    <Field label="Email đăng nhập *" error={e.repEmail} half>
                      <input className={inputCls(e.repEmail)} placeholder="email@gmail.com" type="email"
                        value={form.repEmail} onChange={ev => set('repEmail')(ev.target.value)} />
                    </Field>
                    <Field label="CCCD / CMND" half>
                      <input className={inputCls()} placeholder="Số căn cước công dân"
                        value={form.cccd} onChange={ev => set('cccd')(ev.target.value)} />
                    </Field>

                    {/* Divider */}
                    <div className="sm:col-span-2 pt-2">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tạo mật khẩu đăng nhập</span>
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <PasswordField
                          label="Mật khẩu *"
                          value={form.password}
                          onChange={val => set('password')(val)}
                          error={e.password}
                          placeholder="Ít nhất 8 ký tự"
                        />
                        <PasswordField
                          label="Xác nhận mật khẩu *"
                          value={form.confirmPassword}
                          onChange={val => set('confirmPassword')(val)}
                          error={e.confirmPassword}
                          placeholder="Nhập lại mật khẩu"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Email và mật khẩu này sẽ dùng để đăng nhập hệ thống sau khi được phê duyệt.
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <UploadZone label="Giấy ủy quyền (nếu có)" hint="Tải lên giấy ủy quyền (PDF, JPG)" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Xác nhận ── */}
              {step === 3 && (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Hồ sơ đã được gửi!</h2>

                  {/* Process timeline */}
                  <div className="w-full max-w-sm text-left mb-6">
                    {[
                      { step: '1', label: 'Hồ sơ gửi về Sở xét duyệt', sub: 'Thông qua hệ thống quản lý nội bộ', done: true },
                      { step: '2', label: 'Sở phê duyệt hồ sơ', sub: 'Thời gian xử lý: 3–5 ngày làm việc', done: false },
                      { step: '3', label: 'Cấp mã doanh nghiệp', sub: 'Mã dùng để tra cứu sản phẩm trên hệ thống', done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-start mb-4 last:mb-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${item.done ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                          {item.done ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${item.done ? 'text-gray-800' : 'text-gray-400'}`}>{item.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Credentials card */}
                  <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4 text-left shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Thông tin tài khoản đăng nhập</p>
                    <CredentialRow icon={<User className="w-4 h-4" />} label="Tài khoản (Email)" value={form.repEmail} />
                    <CredentialRow icon={<Lock className="w-4 h-4" />} label="Mật khẩu" value={form.password} />
                  </div>

                  <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-6 max-w-sm">
                    ⚠️ Lưu lại thông tin tài khoản ngay bây giờ. Trang này sẽ không hiển thị lại mật khẩu của bạn.
                  </p>

                  <button
                    onClick={() => setLocation('/dang-nhap')}
                    className="flex items-center gap-2 px-8 py-3 bg-[#2740BA] text-white rounded-lg text-sm font-bold hover:bg-[#1f339e] transition-colors shadow-sm"
                  >
                    <LogIn className="w-4 h-4" /> Xác nhận &amp; Đăng nhập
                  </button>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            {step < 3 && (
              <div className="bg-gray-50 border-t border-gray-200 px-6 sm:px-8 py-4 flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={handleBack} className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Quay lại
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e] transition-colors shadow-sm"
                >
                  {step === 2 ? 'Hoàn tất đăng ký' : 'Tiếp tục'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
