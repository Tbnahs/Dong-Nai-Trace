import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import {
  User, Lock, Eye, EyeOff, Phone, X,
  ChevronLeft, ChevronRight, CheckCircle2, UploadCloud, Copy, LogIn,
} from 'lucide-react';
import { useAuth, type FileDoc, type OrgProfile } from '../context/AuthContext';

// ─── Constants ────────────────────────────────────────────────────────────────
const DISTRICTS = ['Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú', 'Trảng Bom', 'Thống Nhất', 'Cẩm Mỹ'];
const ORG_TYPES = ['Doanh nghiệp', 'Hợp tác xã (HTX)', 'Trang trại', 'Cơ sở sản xuất', 'Hộ kinh doanh'];
const REG_STEPS = [{ label: 'Thông tin doanh nghiệp' }, { label: 'Người đại diện' }, { label: 'Xác nhận' }];

interface RegForm {
  orgName: string; taxCode: string; orgType: string; industry: string;
  address: string; district: string; phone: string; email: string;
  repName: string; repPhone: string; repEmail: string; cccd: string;
  password: string; confirmPassword: string;
}
const initReg: RegForm = {
  orgName: '', taxCode: '', orgType: ORG_TYPES[0], industry: '',
  address: '', district: DISTRICTS[0], phone: '', email: '',
  repName: '', repPhone: '', repEmail: '', cccd: '', password: '', confirmPassword: '',
};
type RegErrors = Partial<Record<keyof RegForm, string>>;

function validateStep(step: number, f: RegForm): RegErrors {
  const e: RegErrors = {};
  if (step === 1) {
    if (!f.orgName.trim()) e.orgName = 'Vui lòng nhập tên doanh nghiệp';
    if (!f.taxCode.trim()) e.taxCode = 'Vui lòng nhập mã số thuế';
    if (!f.industry.trim()) e.industry = 'Vui lòng nhập ngành nghề';
    if (!f.address.trim()) e.address = 'Vui lòng nhập địa chỉ';
    if (!f.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    if (!f.email.trim()) e.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email không hợp lệ';
  }
  if (step === 2) {
    if (!f.repName.trim()) e.repName = 'Vui lòng nhập họ và tên';
    if (!f.repPhone.trim()) e.repPhone = 'Vui lòng nhập số điện thoại';
    if (!f.repEmail.trim()) e.repEmail = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.repEmail)) e.repEmail = 'Email không hợp lệ';
    if (!f.password) e.password = 'Vui lòng tạo mật khẩu';
    else if (f.password.length < 8) e.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    if (!f.confirmPassword) e.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (f.password !== f.confirmPassword) e.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }
  return e;
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────
const iCls = (err?: string) =>
  `w-full border rounded-lg px-3 py-3 sm:py-2 text-base sm:text-sm focus:outline-none focus:ring-2 placeholder:text-gray-400 transition-colors ${err ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-300 focus:ring-[#2740BA] focus:border-transparent'}`;

function Field({ label, error, half, children }: { label: string; error?: string; half?: boolean; children: React.ReactNode }) {
  return (
    <div className={half ? '' : 'sm:col-span-2'}>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

function PwField({ label, value, onChange, error, placeholder }: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label} error={error} half>
      <div className="relative">
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} className={iCls(error) + ' pr-10'} />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </Field>
  );
}

function UploadZone({ label, hint, accept = '.pdf,.jpg,.jpeg,.png', onChange }: { label: string; hint: string; accept?: string; onChange?: (doc: FileDoc | null) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    if (onChange) {
      const reader = new FileReader();
      reader.onload = e => {
        onChange({ name: f.name, dataUrl: e.target!.result as string, mimeType: f.type });
      };
      reader.readAsDataURL(f);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
      {file ? (
        <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between bg-blue-50 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <UploadCloud className="w-5 h-5 text-[#2740BA] shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ''; onChange?.(null); }}
            className="shrink-0 p-1 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl py-6 flex flex-col items-center gap-2 transition-colors cursor-pointer
            ${dragging ? 'border-[#2740BA] bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}`}
        >
          <UploadCloud className={`w-6 h-6 ${dragging ? 'text-[#2740BA]' : 'text-gray-400'}`} />
          <p className="text-sm text-gray-500">{hint}</p>
        </div>
      )}
    </div>
  );
}

function CopyRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-[#2740BA]">{icon}</span>
        <div>
          <p className="text-xs text-gray-400 font-medium">{label}</p>
          <p className="font-mono font-semibold text-slate-800 text-sm break-all">{value}</p>
        </div>
      </div>
      <button onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="shrink-0 text-xs text-gray-500 hover:text-[#2740BA] flex items-center gap-1 transition-colors">
        <Copy className="w-3.5 h-3.5" />{copied ? 'Đã chép' : 'Sao chép'}
      </button>
    </div>
  );
}

// ─── PDF Modal ─────────────────────────────────────────────────────────────────
function PdfModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 shrink-0">
          <span className="font-bold text-gray-800 text-sm">Hướng dẫn đăng ký &amp; sử dụng hệ thống</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe src={url} className="flex-1 w-full" title="Hướng dẫn sử dụng" />
      </div>
    </div>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onSwitchToRegister, guideUrl }: { onSwitchToRegister: () => void; guideUrl: string }) {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem('pendingLoginEmail') ?? '';
    if (saved) localStorage.removeItem('pendingLoginEmail');
    return saved;
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'admin@htx.vn');
    setLocation('/');
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Đăng nhập</h2>
      <p className="text-sm text-gray-400 mb-8">Nhập thông tin tài khoản của bạn</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tên đăng nhập</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#2740BA] focus:ring-2 focus:ring-[#2740BA]/20 placeholder:text-gray-300 transition-all"
              placeholder="Mã số doanh nghiệp / CCCD / tài khoản" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mật khẩu</label>
            <button type="button"
              onClick={() => alert('Vui lòng liên hệ Sở KH&CN Đồng Nai: skhcn@dongnai.gov.vn')}
              className="text-xs font-semibold text-[#2740BA] hover:underline">
              Quên mật khẩu?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
            <input type={showPassword ? 'text' : 'password'} required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-base sm:text-sm focus:outline-none focus:border-[#2740BA] focus:ring-2 focus:ring-[#2740BA]/20 placeholder:text-gray-300 transition-all"
              placeholder="Nhập mật khẩu" />
            <button type="button" onClick={() => setShowPassword(s => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#2740BA] focus:ring-[#2740BA]" />
          <span className="text-sm text-gray-600">Ghi nhớ mật khẩu</span>
        </label>

        <button type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2740BA] hover:bg-[#1f339e] text-white font-bold text-sm rounded-lg transition-colors shadow-sm mt-2">
          Đăng nhập <ChevronRight className="w-4 h-4" />
        </button>
      </form>

      {/* Register box */}
      <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">Chưa có tài khoản?</span>
        <button onClick={onSwitchToRegister}
          className="text-sm font-bold text-[#2740BA] flex items-center gap-1 hover:underline">
          Đăng ký cho doanh nghiệp <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5 space-y-2 text-center">
        <p className="text-xs text-gray-400">
          Hướng dẫn đăng ký, cập nhật thông tin tài khoản.{' '}
          <button onClick={() => setShowPdf(true)} className="font-semibold text-[#2740BA] hover:underline">Tại đây</button>
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-6 h-6 rounded-full bg-[#2740BA] flex items-center justify-center shrink-0">
            <Phone className="w-3 h-3 text-white" />
          </div>
          <span>Hotline: <strong className="text-[#2740BA]">0251.3822297</strong></span>
        </div>
      </div>

      {showPdf && <PdfModal url={guideUrl} onClose={() => setShowPdf(false)} />}
    </>
  );
}

// ─── Register Form ─────────────────────────────────────────────────────────────
function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { saveRegistrationProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegForm>(initReg);
  const [errors, setErrors] = useState<RegErrors>({});
  const [touched, setTouched] = useState(false);
  const [licenseDoc, setLicenseDoc] = useState<import('../context/AuthContext').FileDoc | null>(null);
  const [authDoc, setAuthDoc] = useState<import('../context/AuthContext').FileDoc | null>(null);

  const set = (key: keyof RegForm) => (val: string) => setForm(f => ({ ...f, [key]: val }));
  const e = touched ? errors : {};

  const handleNext = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length > 0) { setErrors(errs); setTouched(true); return; }
    setErrors({}); setTouched(false);
    setStep(s => Math.min(3, s + 1));
  };
  const handleBack = () => { setErrors({}); setTouched(false); setStep(s => s - 1); };

  return (
    <div>
      {/* Header */}
      {step < 3 && (
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-gray-800">Đăng ký tài khoản doanh nghiệp</h2>
          <p className="text-xs text-gray-500 mt-0.5">Cung cấp thông tin để tham gia hệ thống truy xuất</p>
        </div>
      )}

      {/* Stepper */}
      {step < 3 && (
        <div className="flex items-start gap-0 mb-4">
          {REG_STEPS.map((s, i) => {
            const num = i + 1;
            const done = step > num;
            const active = step === num;
            return (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${done || active ? 'bg-[#2740BA] border-[#2740BA] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {done ? <CheckCircle2 className="w-4 h-4" /> : num}
                  </div>
                  <span className={`text-[11px] mt-1 text-center font-medium leading-tight max-w-[70px] ${active ? 'text-[#2740BA]' : done ? 'text-gray-600' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {i < REG_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mt-4 transition-colors ${step > num ? 'bg-[#2740BA]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          <Field label="Tên doanh nghiệp / tổ chức *" error={e.orgName} half>
            <input className={iCls(e.orgName)} placeholder="VD: HTX Nông nghiệp Xuân Lộc"
              value={form.orgName} onChange={ev => set('orgName')(ev.target.value)} />
          </Field>
          <Field label="Mã số thuế *" error={e.taxCode} half>
            <input className={iCls(e.taxCode)} placeholder="VD: 3602123456"
              value={form.taxCode} onChange={ev => set('taxCode')(ev.target.value)} />
          </Field>
          <Field label="Loại hình *" half>
            <select className={iCls() + ' bg-white'} value={form.orgType} onChange={ev => set('orgType')(ev.target.value)}>
              {ORG_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Ngành nghề *" error={e.industry} half>
            <input className={iCls(e.industry)} placeholder="VD: Rau củ quả"
              value={form.industry} onChange={ev => set('industry')(ev.target.value)} />
          </Field>
          <Field label="Địa chỉ *" error={e.address} half>
            <input className={iCls(e.address)} placeholder="Số, đường"
              value={form.address} onChange={ev => set('address')(ev.target.value)} />
          </Field>
          <Field label="Huyện / Thị xã *" half>
            <select className={iCls() + ' bg-white'} value={form.district} onChange={ev => set('district')(ev.target.value)}>
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Số điện thoại *" error={e.phone} half>
            <input className={iCls(e.phone)} placeholder="02513..." type="tel"
              value={form.phone} onChange={ev => set('phone')(ev.target.value)} />
          </Field>
          <Field label="Email *" error={e.email} half>
            <input className={iCls(e.email)} placeholder="email@gmail.com" type="email"
              value={form.email} onChange={ev => set('email')(ev.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <UploadZone label="Giấy phép kinh doanh (bản scan)" hint="Kéo thả hoặc bấm để tải lên (PDF, JPG, PNG)" onChange={setLicenseDoc} />
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          <Field label="Họ và tên người đại diện *" error={e.repName} half>
            <input className={iCls(e.repName)} placeholder="VD: Nguyễn Văn A"
              value={form.repName} onChange={ev => set('repName')(ev.target.value)} />
          </Field>
          <Field label="Số điện thoại liên hệ *" error={e.repPhone} half>
            <input className={iCls(e.repPhone)} placeholder="09xx xxx xxx" type="tel"
              value={form.repPhone} onChange={ev => set('repPhone')(ev.target.value)} />
          </Field>
          <Field label="Email đăng nhập *" error={e.repEmail} half>
            <input className={iCls(e.repEmail)} placeholder="email@gmail.com" type="email"
              value={form.repEmail} onChange={ev => set('repEmail')(ev.target.value)} />
          </Field>
          <Field label="CCCD / CMND" half>
            <input className={iCls()} placeholder="Số căn cước công dân"
              value={form.cccd} onChange={ev => set('cccd')(ev.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tạo mật khẩu đăng nhập</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <PwField label="Mật khẩu *" value={form.password} onChange={set('password')} error={e.password} placeholder="Ít nhất 8 ký tự" />
              <PwField label="Xác nhận mật khẩu *" value={form.confirmPassword} onChange={set('confirmPassword')} error={e.confirmPassword} placeholder="Nhập lại mật khẩu" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Email và mật khẩu này sẽ dùng để đăng nhập sau khi được phê duyệt.</p>
          </div>
          <div className="sm:col-span-2">
            <UploadZone label="Giấy ủy quyền (nếu có)" hint="Tải lên giấy ủy quyền (PDF, JPG)" onChange={setAuthDoc} />
          </div>
        </div>
      )}

      {/* Step 3 — Success */}
      {step === 3 && (
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-1">Hồ sơ đã được gửi!</h2>
          <p className="text-sm text-gray-500 mb-5">Sở KH&CN sẽ xét duyệt trong 3–5 ngày làm việc</p>

          <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 text-left shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Thông tin tài khoản đăng nhập</p>
            <CopyRow icon={<User className="w-4 h-4" />} label="Tài khoản (Email)" value={form.repEmail} />
            <CopyRow icon={<Lock className="w-4 h-4" />} label="Mật khẩu" value={form.password} />
          </div>

          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-5 max-w-sm">
            ⚠️ Lưu lại thông tin tài khoản ngay bây giờ. Trang này sẽ không hiển thị lại mật khẩu.
          </p>

          <button
            onClick={() => {
              const profile: OrgProfile = {
                name: form.orgName,
                taxCode: form.taxCode,
                type: form.orgType,
                industry: form.industry,
                address: form.address,
                district: form.district,
                phone: form.phone,
                email: form.email,
                representative: form.repName,
                representativePhone: form.repPhone,
                representativeEmail: form.repEmail,
                cccd: form.cccd,
              };
              saveRegistrationProfile(form.repEmail, profile, {
                ...(licenseDoc ? { businessLicense: licenseDoc } : {}),
                ...(authDoc ? { authorization: authDoc } : {}),
              });
              localStorage.setItem('pendingLoginEmail', form.repEmail);
              onSwitchToLogin();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2740BA] text-white rounded-lg text-sm font-bold hover:bg-[#1f339e] transition-colors shadow-sm">
            <LogIn className="w-4 h-4" /> Xác nhận &amp; Đăng nhập
          </button>
        </div>
      )}

      {/* Nav buttons */}
      {step < 3 && (
        <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
          {step > 1 ? (
            <button onClick={handleBack} className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Quay lại
            </button>
          ) : (
            <button onClick={onSwitchToLogin} className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Đăng nhập
            </button>
          )}
          <button onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e] transition-colors shadow-sm">
            {step === 2 ? 'Hoàn tất đăng ký' : 'Tiếp tục'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Auth Page ────────────────────────────────────────────────────────────
export default function AuthPage({ defaultTab = 'login' }: { defaultTab?: 'login' | 'register' }) {
  const [, setLocation] = useLocation();
  const logoUrl = import.meta.env.BASE_URL + 'images/logo-skhcn.png';
  const guideUrl = import.meta.env.BASE_URL + 'huong-dan.pdf';

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Left panel — ảnh nông nghiệp + overlay ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&fit=crop"
          alt="Nông nghiệp Đồng Nai"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f6b]/92 via-[#1B2A6B]/85 to-[#2740BA]/75" />

        {/* Top — Logo */}
        <div className="relative z-10 p-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-1 ring-white/20">
              <img src={logoUrl} alt="Logo" className="w-11 h-11 object-contain" />
            </div>
            <div>
              <span className="text-white font-extrabold text-2xl tracking-tight block">Đồng Nai Trace</span>
              <span className="text-blue-200/70 text-sm uppercase tracking-widest">Sở KH&CN Đồng Nai</span>
            </div>
          </div>
        </div>

        {/* Bottom — Headline + stats */}
        <div className="relative z-10 px-12 pb-14">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Truy xuất nguồn gốc hàng hóa
          </h2>
          <p className="text-blue-200/75 text-sm leading-relaxed mb-10 max-w-xs">
            Hệ thống truy xuất nguồn gốc tỉnh Đồng Nai — minh bạch, tin cậy, chuẩn quốc tế.
          </p>
          <div className="flex gap-8">
            {[['1.200+', 'Doanh nghiệp'], ['8.500+', 'Sản phẩm'], ['95/95', 'Phường / Xã']].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-extrabold text-white">{n}</div>
                <div className="text-xs text-blue-200/60 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center bg-white overflow-y-auto px-5 sm:px-8 py-6">
        <div className={`w-full ${defaultTab === 'register' ? 'max-w-xl' : 'max-w-sm'}`}>
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#2740BA] transition-colors mb-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Về trang chủ
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src={logoUrl} alt="Logo" className="h-12 sm:h-14 w-auto" />
            <div>
              <span className="text-xl font-extrabold text-[#2740BA] block">Đồng Nai Trace</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Sở KH&CN Đồng Nai</span>
            </div>
          </div>

          {defaultTab === 'login' ? (
            <LoginForm onSwitchToRegister={() => setLocation('/dang-ky')} guideUrl={guideUrl} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setLocation('/dang-nhap')} />
          )}
        </div>
      </div>
    </div>
  );
}
