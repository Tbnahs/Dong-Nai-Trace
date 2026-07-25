import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Edit2, CheckCircle2, Save, X, FileText, Download, UploadCloud,
  ImageIcon, Building2, MapPin, Phone, Mail, 
  ShieldCheck, Briefcase, FileSignature, Map, UserRound, CreditCard
} from 'lucide-react';
import { useAuth, type FileDoc, type OrgProfile } from '../context/AuthContext';

const DISTRICTS = ['Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú', 'Trảng Bom', 'Thống Nhất', 'Cẩm Mỹ'];
const ORG_TYPES = ['Doanh nghiệp', 'Hợp tác xã (HTX)', 'Trang trại', 'Cơ sở sản xuất', 'Hộ kinh doanh'];

function DocCard({ doc, label }: { doc: FileDoc; label: string }) {
  const isImage = doc.mimeType.startsWith('image/');
  return (
    <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200">
      {isImage ? (
        <div className="w-full h-40 bg-slate-100 overflow-hidden">
          <img src={doc.dataUrl} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      ) : (
        <div className="w-full h-40 bg-slate-50 flex flex-col items-center justify-center gap-3 transition-colors group-hover:bg-slate-100">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#2740BA]" />
          </div>
          <p className="text-xs text-slate-500 px-4 text-center truncate max-w-full font-medium">{doc.name}</p>
        </div>
      )}
      <div className="px-4 py-3.5 flex items-center justify-between gap-3 border-t border-slate-100 bg-white relative z-10">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-800 truncate">{label}</p>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.name}</p>
        </div>
        <a
          href={doc.dataUrl}
          download={doc.name}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-[#2740BA] hover:bg-[#2740BA] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2740BA]"
          title="Tải về"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function UploadField({
  label,
  doc,
  onChange,
}: {
  label: string;
  doc?: FileDoc;
  onChange: (doc: FileDoc | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = event => {
      onChange({
        name: file.name,
        dataUrl: event.target?.result as string,
        mimeType: file.type || 'application/octet-stream',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={event => {
          const file = event.target.files?.[0];
          if (file) readFile(file);
          event.target.value = '';
        }}
      />
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-sm font-bold text-slate-700">{label}</p>
        {doc && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-xs font-semibold text-red-500 hover:text-red-700"
          >
            Xóa file
          </button>
        )}
      </div>
      {doc ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-100 bg-white px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-5 w-5 shrink-0 text-[#2740BA]" />
            <span className="truncate text-sm font-medium text-slate-700">{doc.name}</span>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 rounded-lg border border-[#2740BA] px-3 py-1.5 text-xs font-bold text-[#2740BA] hover:bg-blue-50"
          >
            Thay file
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white px-4 py-5 text-center hover:border-[#2740BA] hover:bg-blue-50/40"
        >
          <UploadCloud className="h-6 w-6 text-[#2740BA]" />
          <span className="text-sm font-semibold text-slate-600">Tải file lên</span>
          <span className="text-xs text-slate-400">PDF, JPG, PNG</span>
        </button>
      )}
    </div>
  );
}

function Field({ 
  label, 
  value, 
  editValue, 
  onChange, 
  isEditing, 
  icon: Icon, 
  fullWidth = false 
}: {
  label: string;
  value: string;
  editValue: string;
  onChange: (val: string) => void;
  isEditing: boolean;
  icon: React.ElementType;
  fullWidth?: boolean;
  options?: string[];
}) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'sm:col-span-2' : ''}`}>
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        <Icon className="w-3.5 h-3.5" /> {label}
      </label>
      <div className="relative h-11">
        <AnimatePresence mode="popLayout" initial={false}>
          {isEditing ? (
            <motion.input
              key="input"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              type="text"
              value={editValue}
              onChange={e => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full border-slate-300 rounded-lg px-3.5 text-sm font-medium text-slate-900 focus:border-[#2740BA] focus:ring-1 focus:ring-[#2740BA] shadow-sm transition-colors bg-white outline-none border"
            />
          ) : (
            <motion.div
              key="text"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 w-full h-full flex items-center px-3.5 text-sm font-semibold text-slate-800 bg-slate-50/80 border border-transparent rounded-lg"
            >
              {value}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  icon: Icon,
  fullWidth = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon: React.ElementType;
  fullWidth?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'sm:col-span-2' : ''}`}>
      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        <Icon className="w-3.5 h-3.5" /> {label}
      </label>
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-900 shadow-sm outline-none focus:border-[#2740BA] focus:ring-1 focus:ring-[#2740BA]"
      >
        {options.map(option => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}

export default function OrgProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const fallbackProfile: OrgProfile = {
    name: user?.name ?? 'HTX Nông nghiệp Xanh',
    taxCode: '3601234567',
    type: 'Hợp tác xã (HTX)',
    industry: 'Nông sản & Rau củ',
    address: 'Xã Tân Triều, Vĩnh Cửu',
    district: 'Vĩnh Cửu',
    phone: '0251 890 123',
    email: user?.email ?? 'admin@htx.vn',
    representative: 'Nguyễn Văn A',
    representativePhone: '0901234567',
    representativeEmail: user?.email ?? 'admin@htx.vn',
    cccd: '',
  };
  const [form, setForm] = useState<OrgProfile>(() => ({ ...fallbackProfile, ...user?.profile }));
  const [documents, setDocuments] = useState(user?.documents ?? {});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ ...fallbackProfile, ...user.profile });
      setDocuments(user.documents);
    }
  }, [user]);

  const handleSave = () => {
    updateProfile(form, documents);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const legalFields = [
    { label: 'Tên doanh nghiệp / tổ chức', key: 'name', icon: Building2, fullWidth: true },
    { label: 'Mã số thuế', key: 'taxCode', icon: FileSignature },
    { label: 'Loại hình', key: 'type', icon: Briefcase, options: ORG_TYPES },
    { label: 'Ngành nghề', key: 'industry', icon: ShieldCheck, fullWidth: true },
  ];

  const contactFields = [
    { label: 'Địa chỉ', key: 'address', icon: MapPin, fullWidth: true },
    { label: 'Huyện / Thị xã', key: 'district', icon: Map, options: DISTRICTS },
    { label: 'Số điện thoại', key: 'phone', icon: Phone },
    { label: 'Email', key: 'email', icon: Mail },
  ];

  const representativeFields = [
    { label: 'Họ và tên người đại diện', key: 'representative', icon: UserRound },
    { label: 'Số điện thoại liên hệ', key: 'representativePhone', icon: Phone },
    { label: 'Email đăng nhập', key: 'representativeEmail', icon: Mail },
    { label: 'CCCD / CMND', key: 'cccd', icon: CreditCard },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const }
    })
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-sans pb-20 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-slate-200/50 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Floating Notification */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-6 right-1/2 translate-x-1/2 sm:right-8 sm:translate-x-0 z-50 flex items-center gap-2.5 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl border border-emerald-200 shadow-lg font-semibold text-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Đã lưu hồ sơ thành công
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} custom={0}>
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm mb-8">
            {/* Header background pattern/gradient */}
            <div className="h-28 bg-gradient-to-r from-[#2740BA] to-[#1a2d8f]">
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            </div>
            
            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-12">
                <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-md flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#2740BA] to-[#3a56df] flex items-center justify-center text-white font-black text-3xl shadow-inner tracking-tight">
                      {form.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="pb-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{form.name}</h1>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wide font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <Briefcase className="w-3.5 h-3.5" />
                        {form.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wide font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã duyệt
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Sticky or inline save/edit controls */}
                <div className="flex items-center justify-center sm:justify-end gap-3 pb-1 w-full sm:w-auto">
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#2740BA] hover:border-[#2740BA] transition-all shadow-sm w-full sm:w-auto justify-center"
                    >
                      <Edit2 className="w-4 h-4" />
                      Cập nhật hồ sơ
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditing(false)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#E8650A] hover:bg-[#d45a08] shadow-sm hover:shadow transition-all"
                      >
                        <Save className="w-4 h-4" />
                        Lưu thay đổi
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Legal Info Card */}
          <motion.section 
            custom={1} initial="hidden" animate="visible" variants={sectionVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#2740BA]">
                <FileSignature className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Thông tin pháp lý</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Dữ liệu đăng ký kinh doanh chính thức</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {legalFields.map(f => f.options ? (
                editing ? (
                  <SelectField
                    key={f.key}
                    label={f.label}
                    value={(form as any)[f.key]}
                    options={f.options}
                    onChange={(val) => setForm(prev => ({ ...prev, [f.key]: val }))}
                    icon={f.icon}
                    fullWidth={f.fullWidth}
                  />
                ) : (
                  <Field
                    key={f.key}
                    label={f.label}
                    value={(form as any)[f.key]}
                    editValue={(form as any)[f.key]}
                    onChange={() => {}}
                    isEditing={false}
                    icon={f.icon}
                    fullWidth={f.fullWidth}
                  />
                )
              ) : (
                <Field 
                  key={f.key}
                  label={f.label}
                  value={(form as any)[f.key]}
                  editValue={(form as any)[f.key]}
                  onChange={(val) => setForm(prev => ({ ...prev, [f.key]: val }))}
                  isEditing={editing}
                  icon={f.icon}
                  fullWidth={f.fullWidth}
                />
              ))}
            </div>
          </motion.section>

          {/* Contact Info Card */}
          <motion.section
            custom={2} initial="hidden" animate="visible" variants={sectionVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#E8650A]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Thông tin liên hệ</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Địa chỉ trụ sở và phương thức liên lạc</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {contactFields.map(f => f.options ? (
                editing ? (
                  <SelectField
                    key={f.key}
                    label={f.label}
                    value={(form as any)[f.key]}
                    options={f.options}
                    onChange={(val) => setForm(prev => ({ ...prev, [f.key]: val }))}
                    icon={f.icon}
                    fullWidth={f.fullWidth}
                  />
                ) : (
                  <Field
                    key={f.key}
                    label={f.label}
                    value={(form as any)[f.key]}
                    editValue={(form as any)[f.key]}
                    onChange={() => {}}
                    isEditing={false}
                    icon={f.icon}
                    fullWidth={f.fullWidth}
                  />
                )
              ) : (
                <Field 
                  key={f.key}
                  label={f.label}
                  value={(form as any)[f.key]}
                  editValue={(form as any)[f.key]}
                  onChange={(val) => setForm(prev => ({ ...prev, [f.key]: val }))}
                  isEditing={editing}
                  icon={f.icon}
                  fullWidth={f.fullWidth}
                />
              ))}
            </div>
          </motion.section>

          {/* Representative Info Card */}
          <motion.section
            custom={3} initial="hidden" animate="visible" variants={sectionVariants}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2740BA]">
                <UserRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Người đại diện</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Thông tin liên hệ và định danh người đại diện</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {representativeFields.map(f => (
                <Field
                  key={f.key}
                  label={f.label}
                  value={(form as any)[f.key] || 'Chưa cập nhật'}
                  editValue={(form as any)[f.key]}
                  onChange={(val) => setForm(prev => ({ ...prev, [f.key]: val }))}
                  isEditing={editing}
                  icon={f.icon}
                />
              ))}
            </div>
          </motion.section>

          {/* Certifications and Docs inside a grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.section 
              custom={4} initial="hidden" animate="visible" variants={sectionVariants}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 lg:col-span-1 flex flex-col"
            >
               <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Chứng nhận</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Tiêu chuẩn chất lượng</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 flex-1">
                {['VietGAP', 'OCOP 3 Sao'].map(c => (
                  <div key={c} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                    <span className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {c}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-md tracking-wider">Hợp lệ</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {(editing || documents.businessLicense || documents.authorization) && (
              <motion.section 
                custom={5} initial="hidden" animate="visible" variants={sectionVariants}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 lg:col-span-2"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Tài liệu đính kèm</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Bản sao số hóa của hồ sơ gốc</p>
                  </div>
                </div>
                
                {editing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <UploadField
                      label="Giấy phép kinh doanh"
                      doc={documents.businessLicense}
                      onChange={doc => setDocuments(current => ({ ...current, businessLicense: doc }))}
                    />
                    <UploadField
                      label="Giấy ủy quyền"
                      doc={documents.authorization}
                      onChange={doc => setDocuments(current => ({ ...current, authorization: doc }))}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {documents.businessLicense && <DocCard doc={documents.businessLicense} label="Giấy phép kinh doanh" />}
                    {documents.authorization && <DocCard doc={documents.authorization} label="Giấy ủy quyền" />}
                  </div>
                )}
              </motion.section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
