import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft, Plus, ShieldCheck, AlertCircle, Eye, Pencil, Trash2, Package,
  X, UploadCloud, CheckCircle2, ImagePlus, FileText, Check, LayoutGrid, Search,
  ListFilter, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────
const WITH_TXNG = [
  { id: 'my1', name: 'Bưởi Tân Triều', category: 'Trái cây', cert: 'VietGAP', traceCode: 'TXNG-VCU-001-2024', img: 'https://picsum.photos/seed/buoi/400/300', updatedAt: '15/10/2024', status: 'approved' },
  { id: 'my2', name: 'Rau muống hữu cơ', category: 'Nông sản', cert: 'VietGAP', traceCode: 'TXNG-XL-002-2024', img: 'https://picsum.photos/seed/raumuong/400/300', updatedAt: '10/08/2024', status: 'approved' },
  { id: 'my3', name: 'Mật ong rừng nguyên chất', category: 'Thực phẩm', cert: 'OCOP', traceCode: 'TXNG-VCU-003-2024', img: 'https://picsum.photos/seed/matong/400/300', updatedAt: '01/06/2024', status: 'approved' },
];

const WITHOUT_TXNG_INIT = [
  { id: 'p1', name: 'Xoài cát hòa lộc', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/xoai/400/300', status: 'approved' },
  { id: 'p2', name: 'Sầu riêng Ri6', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/saurieng/400/300', status: 'pending' },
];

const certColor: Record<string, string> = {
  'VietGAP': 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
  'OCOP': 'bg-orange-100/90 text-orange-800 border-orange-200',
  'HACCP': 'bg-purple-100/90 text-purple-800 border-purple-200',
  'GlobalGAP': 'bg-blue-100/90 text-blue-800 border-blue-200',
  'ISO 22000': 'bg-rose-100/90 text-rose-800 border-rose-200',
  'Hữu cơ': 'bg-lime-100/90 text-lime-800 border-lime-200',
};

const PRODUCT_CATS = ['Nông sản & Rau củ', 'Trái cây', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Khác'];
const UNITS = ['kg', 'tấn', 'hộp', 'thùng', 'chai', 'gói', 'cái', 'bó'];
const CERTS_LIST = ['VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000', 'Hữu cơ'];

type ProductListItem = {
  id: string;
  name: string;
  category: string;
  cert?: string;
  traceCode?: string;
  img: string;
  updatedAt?: string;
  status: string;
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 backdrop-blur-md">
        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500 text-white shadow-sm shadow-amber-500/20 backdrop-blur-md">
      <AlertCircle className="w-3.5 h-3.5" /> Chờ duyệt
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ p, tab, index, onEdit, onDelete }: { p: any, tab: 'with'|'without', index: number, onEdit: () => void, onDelete: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-white rounded-2xl overflow-hidden border-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col ${tab === 'with' ? 'border-transparent hover:border-emerald-100' : 'border-transparent hover:border-amber-100'}`}
      style={{ boxShadow: tab === 'without' ? '0 4px 20px -5px rgba(245, 158, 11, 0.1)' : '0 4px 20px -5px rgba(16, 185, 129, 0.05)' }}
    >
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <StatusBadge status={p.status} />
          {p.cert && (
            <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-md shadow-sm border backdrop-blur-sm ${certColor[p.cert] || 'bg-white/90 text-slate-700 border-slate-200'}`}>
              {p.cert}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
           <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
             {p.category}
           </span>
        </div>
        {p.updatedAt && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-[11px] font-medium">
            <Search className="w-3.5 h-3.5" />
            Cập nhật: {p.updatedAt}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-slate-800 mb-3 line-clamp-1" title={p.name}>{p.name}</h3>
        
        {p.traceCode ? (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              {p.traceCode}
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 font-mono text-xs px-3 py-1.5 rounded-lg border border-amber-200 border-dashed">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-sm shadow-amber-500/50"></span>
              Chưa cấp mã TXNG
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2 justify-end">
          {tab === 'without' && (
            <>
              <button
                onClick={onEdit}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#2740BA] hover:text-white transition-colors text-slate-500 cursor-pointer"
                title="Chỉnh sửa"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-red-500 hover:text-white transition-colors text-slate-500 cursor-pointer"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <Link href={`/san-pham/${p.id}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-200 transition-colors text-slate-700 text-sm font-bold ml-1 cursor-pointer">
            <Eye className="w-4 h-4" /> Chi tiết
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ProductList({
  products,
  tab,
  onEdit,
  onDelete,
}: {
  products: any[];
  tab: 'with' | 'without';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50/90 border-b border-slate-200">
            <tr className="text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-extrabold">Sản phẩm</th>
              <th className="px-4 py-4 font-extrabold">Danh mục</th>
              <th className="px-4 py-4 font-extrabold">Mã truy xuất</th>
              <th className="px-4 py-4 font-extrabold">Trạng thái</th>
              <th className="px-4 py-4 font-extrabold">Cập nhật</th>
              <th className="px-6 py-4 text-right font-extrabold">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p, index) => (
              <motion.tr
                layout
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group hover:bg-blue-50/35 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3.5 min-w-[220px]">
                    <img
                      src={p.img}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-xl object-cover border border-slate-200 bg-slate-100"
                    />
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-800 truncate max-w-[230px]">{p.name}</p>
                      <p className="mt-1 text-xs font-mono text-slate-400">{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {p.traceCode ? (
                    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-xs font-mono font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.traceCode}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-dashed border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Chưa cấp mã
                    </span>
                  )}
                </td>
                <td className="px-4 py-4"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-4 text-xs font-semibold text-slate-500">{p.updatedAt || 'Chưa cập nhật'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {tab === 'without' && (
                      <>
                        <button
                          onClick={() => onEdit(p.id)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-100 hover:text-[#2740BA]"
                          title="Chỉnh sửa"
                          aria-label={`Chỉnh sửa ${p.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500"
                          title="Xóa"
                          aria-label={`Xóa ${p.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <Link
                      href={`/san-pham/${p.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700 transition-colors hover:bg-[#2740BA] hover:text-white"
                    >
                      <Eye className="h-3.5 w-3.5" /> Chi tiết
                    </Link>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="divide-y divide-slate-100 md:hidden">
        {products.map((p, index) => (
          <motion.div
            layout
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="p-4"
          >
            <div className="flex items-start gap-3">
              <img src={p.img} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover border border-slate-200 bg-slate-100" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-extrabold text-slate-800 leading-tight">{p.name}</p>
                    <p className="mt-1 text-xs font-mono text-slate-400">{p.id}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{p.category}</span>
                  {p.traceCode ? (
                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-mono font-bold text-emerald-700">{p.traceCode}</span>
                  ) : (
                    <span className="rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700">Chưa cấp mã</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-[11px] font-semibold text-slate-400">{p.updatedAt ? `Cập nhật ${p.updatedAt}` : 'Chưa cập nhật'}</span>
              <div className="flex items-center gap-1.5">
                {tab === 'without' && (
                  <>
                    <button onClick={() => onEdit(p.id)} className="rounded-lg bg-slate-100 p-2 text-slate-500 hover:bg-blue-100 hover:text-[#2740BA]" aria-label={`Chỉnh sửa ${p.name}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(p.id)} className="rounded-lg bg-slate-100 p-2 text-slate-500 hover:bg-red-100 hover:text-red-500" aria-label={`Xóa ${p.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
                <Link href={`/san-pham/${p.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-[#2740BA] hover:text-white">
                  <Eye className="h-3.5 w-3.5" /> Chi tiết
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Add / Edit Product Modal ─────────────────────────────────────────────────
interface ProductForm {
  name: string;
  category: string;
  unit: string;
  certs: string[];
  certOther: boolean;
  certOtherText: string;
  description: string;
}

const emptyForm: ProductForm = {
  name: '', category: PRODUCT_CATS[0], unit: '',
  certs: [], certOther: false, certOtherText: '', description: '',
};

function ProductModal({
  onClose, onSave, initial, title,
}: {
  onClose: () => void;
  onSave: (name: string, category: string) => void;
  initial?: Partial<ProductForm>;
  title: string;
}) {
  const [form, setForm] = useState<ProductForm>({ ...emptyForm, ...initial });
  const [errors, setErrors] = useState<Partial<Record<keyof ProductForm, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const set = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const toggleCert = (c: string) =>
    setForm(f => ({ ...f, certs: f.certs.includes(c) ? f.certs.filter(x => x !== c) : [...f.certs, c] }));

  const validate = () => {
    const e: Partial<Record<keyof ProductForm, string>> = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.unit.trim()) e.unit = 'Vui lòng nhập đơn vị tính';
    if (!form.description.trim()) e.description = 'Vui lòng nhập mô tả sản phẩm';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form.name.trim(), form.category);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const inputCls = (err?: string) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all ${err ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/50 text-red-900 placeholder:text-red-300' : 'border-slate-200 focus:border-[#2740BA] focus:ring-4 focus:ring-[#2740BA]/10 bg-white text-slate-800 placeholder:text-slate-400 hover:border-slate-300'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
               <Package className="w-6 h-6 text-[#2740BA]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Điền đầy đủ thông tin để hoàn tất hồ sơ</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8">
          <div className="space-y-8">
            {/* Section: Basic Info */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-4 h-4 text-[#2740BA]" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Thông tin cơ bản</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputCls(errors.name)}
                    placeholder="VD: Bưởi da xanh VietGAP"
                    value={form.name}
                    onChange={e => { set('name', e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
                  />
                  {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Danh mục <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className={inputCls() + ' appearance-none pr-10 cursor-pointer'} value={form.category} onChange={e => set('category', e.target.value)}>
                      {PRODUCT_CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                       <LayoutGrid className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Đơn vị tính <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      className={inputCls(errors.unit)}
                      placeholder="kg, hộp, thùng..."
                      value={form.unit}
                      list="unit-suggestions"
                      onChange={e => { set('unit', e.target.value); setErrors(er => ({ ...er, unit: undefined })); }}
                    />
                    <datalist id="unit-suggestions">
                      {UNITS.map(u => <option key={u} value={u} />)}
                    </datalist>
                  </div>
                  {errors.unit && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.unit}</p>}
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Section: Certs */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck className="w-4 h-4 text-[#2740BA]" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Chứng nhận chất lượng</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CERTS_LIST.map(c => (
                  <label key={c} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${form.certs.includes(c) ? 'border-[#2740BA] bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'}`}>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${form.certs.includes(c) ? 'bg-[#2740BA] border-[#2740BA]' : 'border-slate-300 bg-white'}`}>
                       {form.certs.includes(c) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className={`text-sm font-semibold ${form.certs.includes(c) ? 'text-[#2740BA]' : 'text-slate-600'}`}>{c}</span>
                  </label>
                ))}
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${form.certOther ? 'border-[#2740BA] bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'}`}>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${form.certOther ? 'bg-[#2740BA] border-[#2740BA]' : 'border-slate-300 bg-white'}`}>
                     {form.certOther && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm font-semibold ${form.certOther ? 'text-[#2740BA]' : 'text-slate-600'}`}>Khác</span>
                </label>
              </div>
              {form.certOther && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                  <input className={inputCls()} placeholder="Nhập tên chứng nhận khác..."
                    value={form.certOtherText} onChange={e => set('certOtherText', e.target.value)} />
                </motion.div>
              )}
            </section>

            <hr className="border-slate-100" />

            {/* Section: Description */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-4 h-4 text-[#2740BA]" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mô tả sản phẩm</h3>
              </div>
              <textarea
                className={inputCls(errors.description) + ' min-h-[120px] resize-y'}
                placeholder="Mô tả ngắn gọn về sản phẩm, vùng trồng, quy trình sản xuất..."
                value={form.description}
                onChange={e => { set('description', e.target.value); setErrors(er => ({ ...er, description: undefined })); }}
              />
              {errors.description && <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.description}</p>}
            </section>

            <hr className="border-slate-100" />

            {/* Section: Image */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <ImagePlus className="w-4 h-4 text-[#2740BA]" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Hình ảnh sản phẩm</h3>
              </div>
              
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <label className="cursor-pointer bg-white text-slate-800 text-sm font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all transform hover:scale-105 shadow-lg">
                      Đổi ảnh khác
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    <button onClick={() => setImagePreview(null)} className="bg-red-500 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg">
                      Xóa ảnh
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block group">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl py-14 flex flex-col items-center gap-4 bg-slate-50 group-hover:bg-blue-50/50 group-hover:border-[#2740BA]/40 transition-all">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-7 h-7 text-[#2740BA]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-700 mb-1.5">Kéo thả hoặc bấm để tải ảnh lên</p>
                      <p className="text-xs font-medium text-slate-400">Định dạng JPG, PNG — tối đa 5MB</p>
                    </div>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50 shrink-0">
          <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
            Hủy bỏ
          </button>
          <button onClick={handleSave} className="px-8 py-3 text-sm font-bold text-white bg-[#E8650A] hover:bg-[#d05a08] rounded-xl transition-all shadow-md shadow-[#E8650A]/20 flex items-center gap-2 hover:-translate-y-0.5">
            <Check className="w-4 h-4" /> Lưu hồ sơ sản phẩm
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductsProfilePage() {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');
  const [withList, setWithList] = useState(WITH_TXNG);
  const [withoutList, setWithoutList] = useState(WITHOUT_TXNG_INIT);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const addProduct = (name: string, category: string) => {
    setWithoutList(l => [...l, {
      id: `new-${Date.now()}`, name, category, cert: '', status: 'pending',
      img: `https://picsum.photos/seed/${Date.now()}/400/300`,
    }]);
    setActiveTab('without');
  };

  const deleteWithout = (id: string) => {
    setWithoutList(l => l.filter(p => p.id !== id));
    setDeleteId(null);
  };

  const activeProducts: ProductListItem[] = activeTab === 'with' ? withList : withoutList;
  const categories = Array.from(new Set(activeProducts.map(p => p.category)));
  const filteredProducts = activeProducts.filter(p => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query || `${p.name} ${p.id} ${p.category} ${p.traceCode || ''}`.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesQuery && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-sans pb-24">
      {/* Header Area */}
      <div className="bg-[#2740BA] px-6 lg:px-12 pt-6 pb-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 text-blue-200 text-sm font-medium mb-8">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Trang chủ
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-white">Hồ sơ sản phẩm</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Hồ sơ sản phẩm</h1>
              <p className="text-blue-100 font-medium">Quản lý danh mục sản phẩm nông nghiệp và truy xuất nguồn gốc</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8650A] text-white text-sm font-bold rounded-xl hover:bg-[#d05a08] transition-all shadow-lg shadow-[#E8650A]/20 hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" /> Thêm sản phẩm mới
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-16 relative z-10">
        
        {/* Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/40 border border-slate-100 flex items-center gap-5 transform hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Package className="w-7 h-7 text-[#2740BA]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng sản phẩm</p>
              <p className="text-3xl font-black text-slate-800">{withList.length + withoutList.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-emerald-200/40 border border-emerald-50 flex items-center gap-5 transform hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Đã có TXNG</p>
              <p className="text-3xl font-black text-slate-800">{withList.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-amber-200/40 border border-amber-50 flex items-center gap-5 transform hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <AlertCircle className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Chưa có TXNG</p>
              <p className="text-3xl font-black text-slate-800">{withoutList.length}</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setActiveTab('with')}
            className={`flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${activeTab === 'with' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-md shadow-emerald-100' : 'bg-white border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 shadow-sm'}`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className={`w-5 h-5 ${activeTab === 'with' ? 'text-emerald-600' : 'text-slate-400'}`} />
              Đã có truy xuất nguồn gốc
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs ${activeTab === 'with' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {withList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('without')}
            className={`flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${activeTab === 'without' ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-md shadow-amber-100' : 'bg-white border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 shadow-sm'}`}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className={`w-5 h-5 ${activeTab === 'without' ? 'text-amber-500' : 'text-slate-400'}`} />
              Chưa có truy xuất nguồn gốc
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs ${activeTab === 'without' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {withoutList.length}
            </span>
          </button>
        </div>

        {/* List management */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-800">
                  <ListFilter className="h-5 w-5 text-[#2740BA]" /> Danh sách sản phẩm
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {filteredProducts.length} sản phẩm đang hiển thị trong {activeTab === 'with' ? 'nhóm đã có TXNG' : 'nhóm chưa có TXNG'}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên, mã sản phẩm..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#2740BA] focus:bg-white focus:ring-4 focus:ring-[#2740BA]/10"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-sm font-bold text-slate-600 outline-none transition focus:border-[#2740BA] focus:bg-white sm:w-36"
                    aria-label="Lọc theo trạng thái"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="pending">Chờ duyệt</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-9 text-sm font-bold text-slate-600 outline-none transition focus:border-[#2740BA] focus:bg-white sm:w-40"
                    aria-label="Lọc theo danh mục"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              msg={activeTab === 'with' ? 'Không tìm thấy sản phẩm đã có mã truy xuất nguồn gốc.' : 'Không tìm thấy sản phẩm trong danh sách.'}
              tab={activeTab}
            />
          ) : (
            <ProductList
              products={filteredProducts}
              tab={activeTab}
              onEdit={id => setEditingId(id)}
              onDelete={id => setDeleteId(id)}
            />
          )}
        </section>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAdd && (
          <ProductModal
            title="Tạo hồ sơ sản phẩm mới"
            onClose={() => setShowAdd(false)}
            onSave={addProduct}
          />
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {editingId && (() => {
          const p = withoutList.find(x => x.id === editingId);
          if (!p) return null;
          return (
            <ProductModal
              title={`Chỉnh sửa: ${p.name}`}
              initial={{ name: p.name, category: p.category }}
              onClose={() => setEditingId(null)}
              onSave={(name, category) => {
                setWithoutList(l => l.map(x => x.id === editingId ? { ...x, name, category } : x));
                setEditingId(null);
              }}
            />
          );
        })()}
      </AnimatePresence>

      {/* Delete confirm dialog */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border-[8px] border-red-50/50">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-2">Xóa sản phẩm?</h3>
              <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
                Sản phẩm <strong className="text-slate-800">{withoutList.find(p => p.id === deleteId)?.name}</strong> sẽ bị xóa khỏi danh sách. Hành động này không thể hoàn tác.
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => deleteWithout(deleteId)}
                  className="w-full py-3.5 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md shadow-red-500/20 hover:-translate-y-0.5">
                  Xác nhận xóa
                </button>
                <button onClick={() => setDeleteId(null)}
                  className="w-full py-3.5 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                  Hủy bỏ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ msg, tab }: { msg: string; tab: 'with' | 'without' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white rounded-3xl border border-slate-200 border-dashed p-12 sm:p-16 text-center flex flex-col items-center justify-center min-h-[300px]"
    >
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${tab === 'with' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
        {tab === 'with' ? (
          <ShieldCheck className="w-12 h-12 text-emerald-400" />
        ) : (
          <Package className="w-12 h-12 text-amber-400" />
        )}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Không có sản phẩm nào</h3>
      <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto">{msg}</p>
    </motion.div>
  );
}
