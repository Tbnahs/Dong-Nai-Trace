import React, { useState } from 'react';
import {
  Plus, Search, Pencil, Trash2, Package, X, UploadCloud,
  CheckCircle2, AlertCircle, ShieldCheck, FileText, ImagePlus,
  Check, ChevronDown, Eye, Tag, Ruler, Calendar, QrCode,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────
const PRODUCT_CATS = ['Nông sản & Rau củ', 'Trái cây', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Khác'];
const UNITS = ['kg', 'tấn', 'hộp', 'thùng', 'chai', 'gói', 'cái', 'bó'];
const CERTS_LIST = ['VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000', 'Hữu cơ'];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  certs: string[];
  description: string;
  img: string;
  traceCode?: string;
  status: 'approved' | 'pending';
  updatedAt: string;
}

interface ProductForm {
  name: string;
  category: string;
  unit: string;
  certs: string[];
  description: string;
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Bưởi Tân Triều', category: 'Trái cây', unit: 'kg', certs: ['VietGAP'], description: 'Bưởi da xanh trồng tại Tân Triều, Vĩnh Cửu.', traceCode: 'TXNG-VCU-001-2024', img: 'https://picsum.photos/seed/buoi/400/300', status: 'approved', updatedAt: '15/10/2024' },
  { id: 'p2', name: 'Rau muống hữu cơ', category: 'Nông sản & Rau củ', unit: 'bó', certs: ['VietGAP', 'Hữu cơ'], description: 'Rau muống canh tác hữu cơ, không hóa chất.', traceCode: 'TXNG-XL-002-2024', img: 'https://picsum.photos/seed/raumuong/400/300', status: 'approved', updatedAt: '10/08/2024' },
  { id: 'p3', name: 'Mật ong rừng nguyên chất', category: 'Thực phẩm chế biến', unit: 'chai', certs: ['OCOP'], description: 'Mật ong khai thác từ rừng tự nhiên Vĩnh Cửu.', traceCode: 'TXNG-VCU-003-2024', img: 'https://picsum.photos/seed/matong/400/300', status: 'approved', updatedAt: '01/06/2024' },
  { id: 'p4', name: 'Xoài cát hòa lộc', category: 'Trái cây', unit: 'kg', certs: ['VietGAP'], description: 'Xoài cát Hòa Lộc chất lượng cao, xuất khẩu.', img: 'https://picsum.photos/seed/xoai/400/300', status: 'pending', updatedAt: '20/07/2024' },
  { id: 'p5', name: 'Sầu riêng Ri6', category: 'Trái cây', unit: 'kg', certs: ['VietGAP'], description: 'Sầu riêng Ri6 thu hoạch tháng 5–7 hàng năm.', img: 'https://picsum.photos/seed/saurieng/400/300', status: 'pending', updatedAt: '05/07/2024' },
];

const emptyForm: ProductForm = {
  name: '', category: PRODUCT_CATS[0], unit: '',
  certs: [], description: '',
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
      <AlertCircle className="w-3.5 h-3.5" /> Chờ duyệt
    </span>
  );
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────
function ProductDetailDrawer({ product, onClose, onEdit }: { product: Product; onClose: () => void; onEdit: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1050] bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        key="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed right-0 top-0 bottom-0 z-[1100] w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-base font-extrabold text-slate-800">Chi tiết sản phẩm</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#2740BA] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" /> Chỉnh sửa
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Product image */}
          <div className="relative h-52 w-full bg-slate-100 shrink-0">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow">{product.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <StatusBadge status={product.status} />
                {product.certs.map(c => (
                  <span key={c} className="inline-flex rounded-md bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-0.5 text-[10px] font-bold text-white">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-5">
            {/* Info rows */}
            <div className="grid grid-cols-2 gap-3">
              <InfoRow icon={Tag} label="Danh mục" value={product.category} />
              <InfoRow icon={Ruler} label="Đơn vị tính" value={product.unit || '—'} />
              <InfoRow icon={Calendar} label="Cập nhật" value={product.updatedAt} />
              <InfoRow icon={QrCode} label="Mã TXNG" value={product.traceCode || 'Chưa cấp'} highlight={!!product.traceCode} />
            </div>

            {/* Description */}
            {product.description && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Mô tả
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Certs */}
            {product.certs.length > 0 && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Chứng nhận chất lượng
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.certs.map(c => (
                    <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ID */}
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ID sản phẩm</p>
              <p className="font-mono text-sm text-slate-600">{product.id}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, highlight }: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
        <Icon className="w-3 h-3" /> {label}
      </p>
      <p className={`text-sm font-bold truncate ${highlight ? 'text-emerald-700 font-mono' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
function ProductModal({
  title, initial, onClose, onSave,
}: {
  title: string;
  initial?: Partial<ProductForm>;
  onClose: () => void;
  onSave: (form: ProductForm) => void;
}) {
  const [form, setForm] = useState<ProductForm>({ ...emptyForm, ...initial });
  const [errors, setErrors] = useState<Partial<Record<keyof ProductForm, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [certSearch, setCertSearch] = useState('');
  const [certOpen, setCertOpen] = useState(false);

  const set = <K extends keyof ProductForm>(key: K, val: ProductForm[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const certSuggestions = CERTS_LIST.filter(
    c => c.toLowerCase().includes(certSearch.toLowerCase()) && !form.certs.includes(c)
  );
  const canAddCustom =
    certSearch.trim().length > 0 &&
    !CERTS_LIST.map(c => c.toLowerCase()).includes(certSearch.trim().toLowerCase()) &&
    !form.certs.map(c => c.toLowerCase()).includes(certSearch.trim().toLowerCase());

  const addCert = (c: string) => {
    set('certs', [...form.certs, c]);
    setCertSearch('');
    setCertOpen(false);
  };
  const removeCert = (c: string) => set('certs', form.certs.filter(x => x !== c));

  const validate = () => {
    const e: Partial<Record<keyof ProductForm, string>> = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.unit.trim()) e.unit = 'Vui lòng nhập đơn vị tính';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form);
    onClose();
  };

  const inputCls = (err?: string) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all ${
      err
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/50 text-red-900 placeholder:text-red-300'
        : 'border-slate-200 focus:border-[#2740BA] focus:ring-4 focus:ring-[#2740BA]/10 bg-white text-slate-800 placeholder:text-slate-400 hover:border-slate-300'
    }`;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <Package className="w-5 h-5 text-[#2740BA]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-800">{title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Điền thông tin để lưu hồ sơ sản phẩm</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-7 space-y-7">

          {/* Basic info */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              <FileText className="w-3.5 h-3.5" /> Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  className={inputCls(errors.name)}
                  placeholder="VD: Bưởi da xanh VietGAP"
                  value={form.name}
                  onChange={e => { set('name', e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className={inputCls() + ' appearance-none pr-10 cursor-pointer'}
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                  >
                    {PRODUCT_CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Đơn vị tính <span className="text-red-500">*</span>
                </label>
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
                {errors.unit && (
                  <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.unit}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mô tả sản phẩm</label>
                <textarea
                  className={inputCls() + ' min-h-[90px] resize-y'}
                  placeholder="Mô tả ngắn gọn về sản phẩm, vùng trồng, quy trình sản xuất..."
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                />
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Certs */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Chứng nhận chất lượng
            </h3>

            {/* Selected chips */}
            {form.certs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.certs.map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-[#2740BA]/30 text-xs font-bold text-[#2740BA]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {c}
                    <button type="button" onClick={() => removeCert(c)} className="ml-0.5 hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Search + add */}
            <div className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none focus:border-[#2740BA] focus:ring-4 focus:ring-[#2740BA]/10 transition placeholder:text-slate-400"
                    placeholder="Tìm hoặc nhập tên chứng nhận..."
                    value={certSearch}
                    onChange={e => { setCertSearch(e.target.value); setCertOpen(true); }}
                    onFocus={() => setCertOpen(true)}
                    onBlur={() => setTimeout(() => setCertOpen(false), 150)}
                  />
                </div>
                <button
                  type="button"
                  disabled={!canAddCustom}
                  onClick={() => canAddCustom && addCert(certSearch.trim())}
                  className="flex items-center justify-center w-11 h-11 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-[#2740BA] hover:text-[#2740BA] hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                  title="Thêm chứng nhận mới"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {certOpen && (certSuggestions.length > 0 || canAddCustom) && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-0 right-12 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg z-10 overflow-hidden"
                  >
                    {certSuggestions.map(c => (
                      <button
                        key={c}
                        type="button"
                        onMouseDown={() => addCert(c)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#2740BA] transition-colors text-left"
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" /> {c}
                      </button>
                    ))}
                    {canAddCustom && (
                      <button
                        type="button"
                        onMouseDown={() => addCert(certSearch.trim())}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#2740BA] hover:bg-blue-50 transition-colors text-left border-t border-slate-100"
                      >
                        <Plus className="w-4 h-4 shrink-0" /> Thêm "{certSearch.trim()}"
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Image */}
          <section>
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              <ImagePlus className="w-3.5 h-3.5" /> Hình ảnh sản phẩm
            </h3>
            {imagePreview ? (
              <div className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="cursor-pointer bg-white text-slate-800 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 shadow-md">
                    Đổi ảnh
                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setImagePreview(URL.createObjectURL(f)); }} />
                  </label>
                  <button onClick={() => setImagePreview(null)} className="bg-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-red-600 shadow-md">Xóa</button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block group">
                <div className="border-2 border-dashed border-slate-300 rounded-2xl py-10 flex flex-col items-center gap-3 bg-slate-50 group-hover:bg-blue-50/50 group-hover:border-[#2740BA]/40 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6 text-[#2740BA]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-700 mb-1">Kéo thả hoặc bấm để tải ảnh lên</p>
                    <p className="text-xs text-slate-400">JPG, PNG — tối đa 5MB</p>
                  </div>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setImagePreview(URL.createObjectURL(f)); }} />
              </label>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-7 py-2.5 text-sm font-bold text-white bg-[#E8650A] hover:bg-[#d05a08] rounded-xl transition-all shadow-md shadow-[#E8650A]/20 flex items-center gap-2 hover:-translate-y-0.5"
          >
            <Check className="w-4 h-4" /> Lưu sản phẩm
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductsProfilePage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [catFilter, setCatFilter] = useState('all');

  const withCount = products.filter(p => !!p.traceCode).length;
  const withoutCount = products.filter(p => !p.traceCode).length;

  const tabProducts = products.filter(p => activeTab === 'with' ? !!p.traceCode : !p.traceCode);
  const categories = Array.from(new Set(tabProducts.map(p => p.category)));

  const filtered = tabProducts.filter(p => {
    const q = search.trim().toLowerCase();
    const matchQ = !q || `${p.name} ${p.category} ${p.traceCode ?? ''}`.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || p.status === statusFilter;
    const matchC = catFilter === 'all' || p.category === catFilter;
    return matchQ && matchS && matchC;
  });

  const handleAdd = (form: ProductForm) => {
    setProducts(prev => [{
      id: `p-${Date.now()}`,
      name: form.name,
      category: form.category,
      unit: form.unit,
      certs: form.certs,
      description: form.description,
      img: `https://picsum.photos/seed/${Date.now()}/400/300`,
      status: 'pending',
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    }, ...prev]);
  };

  const handleEdit = (form: ProductForm) => {
    if (!editingId) return;
    setProducts(prev => prev.map(p =>
      p.id === editingId
        ? { ...p, name: form.name, category: form.category, unit: form.unit, certs: form.certs, description: form.description, updatedAt: new Date().toLocaleDateString('vi-VN') }
        : p
    ));
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  const editingProduct = editingId ? products.find(p => p.id === editingId) : null;

  return (
    <div className="min-h-screen bg-[#F4F6FB] font-sans pb-16">

      {/* Page header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Quản lý sản phẩm</h1>
            <p className="text-sm text-slate-500 mt-0.5">{products.length} sản phẩm trong danh sách</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-xl hover:bg-[#1f339e] transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" /> Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tabs */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => { setActiveTab('with'); setSearch(''); setStatusFilter('all'); setCatFilter('all'); }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all border-2 ${activeTab === 'with' ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeTab === 'with' ? 'text-emerald-600' : 'text-slate-400'}`} />
            Đã có truy xuất nguồn gốc
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${activeTab === 'with' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{withCount}</span>
          </button>
          <button
            onClick={() => { setActiveTab('without'); setSearch(''); setStatusFilter('all'); setCatFilter('all'); }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold transition-all border-2 ${activeTab === 'without' ? 'bg-amber-50 border-amber-400 text-amber-800 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
          >
            <AlertCircle className={`w-4 h-4 ${activeTab === 'without' ? 'text-amber-500' : 'text-slate-400'}`} />
            Chưa có truy xuất nguồn gốc
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${activeTab === 'without' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>{withoutCount}</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm theo tên, danh mục, mã truy xuất..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none focus:border-[#2740BA] focus:bg-white focus:ring-4 focus:ring-[#2740BA]/10 transition"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 outline-none focus:border-[#2740BA] focus:bg-white transition w-40"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="approved">Đã duyệt</option>
                  <option value="pending">Chờ duyệt</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={catFilter}
                  onChange={e => setCatFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 outline-none focus:border-[#2740BA] focus:bg-white transition w-44"
                >
                  <option value="all">Tất cả danh mục</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table — desktop */}
          {filtered.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-4 text-slate-400">
              <Package className="w-12 h-12 opacity-40" />
              <p className="text-sm font-semibold">Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
                      <th className="px-6 py-3.5">Sản phẩm</th>
                      <th className="px-4 py-3.5">Danh mục</th>
                      <th className="px-4 py-3.5">Chứng nhận</th>
                      <th className="px-4 py-3.5">Mã TXNG</th>
                      <th className="px-4 py-3.5">Trạng thái</th>
                      <th className="px-4 py-3.5">Cập nhật</th>
                      <th className="px-6 py-3.5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <AnimatePresence initial={false}>
                      {filtered.map((p, i) => (
                        <motion.tr
                          key={p.id}
                          layout
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.18, delay: i * 0.02 }}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3 min-w-[200px]">
                              <img src={p.img} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover border border-slate-200 bg-slate-100" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800 truncate max-w-[180px]">{p.name}</p>
                                <p className="text-[11px] font-mono text-slate-400 mt-0.5">{p.unit && `Đơn vị: ${p.unit}`}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 whitespace-nowrap">{p.category}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {p.certs.length > 0
                                ? p.certs.slice(0, 2).map(c => (
                                  <span key={c} className="inline-flex rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{c}</span>
                                ))
                                : <span className="text-xs text-slate-400">—</span>
                              }
                              {p.certs.length > 2 && <span className="text-[10px] font-bold text-slate-400">+{p.certs.length - 2}</span>}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {p.traceCode
                              ? <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-700 whitespace-nowrap"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{p.traceCode}</span>
                              : <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600 whitespace-nowrap"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Chưa cấp</span>
                            }
                          </td>
                          <td className="px-4 py-4"><StatusBadge status={p.status} /></td>
                          <td className="px-4 py-4 text-xs font-semibold text-slate-500 whitespace-nowrap">{p.updatedAt}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewId(p.id)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                                title="Xem chi tiết"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setEditingId(p.id)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-blue-100 hover:text-[#2740BA] transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(p.id)}
                                className="rounded-lg p-2 text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                                title="Xóa"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile list */}
              <div className="divide-y divide-slate-100 md:hidden">
                <AnimatePresence initial={false}>
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.18, delay: i * 0.02 }}
                      className="p-4"
                    >
                      <div className="flex items-start gap-3">
                        <img src={p.img} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover border border-slate-200 bg-slate-100" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold text-slate-800 leading-tight">{p.name}</p>
                            <StatusBadge status={p.status} />
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">{p.category}</span>
                            {p.certs.slice(0, 2).map(c => (
                              <span key={c} className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{c}</span>
                            ))}
                          </div>
                          {p.traceCode
                            ? <p className="mt-1.5 text-[11px] font-mono font-bold text-emerald-700">{p.traceCode}</p>
                            : <p className="mt-1.5 text-[11px] font-semibold text-amber-600">Chưa cấp mã TXNG</p>
                          }
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-[11px] font-semibold text-slate-400">Cập nhật {p.updatedAt}</span>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setViewId(p.id)} className="rounded-lg bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => setEditingId(p.id)} className="rounded-lg bg-slate-100 p-2 text-slate-500 hover:bg-blue-100 hover:text-[#2740BA] transition-colors">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => setDeleteId(p.id)} className="rounded-lg bg-slate-100 p-2 text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {viewId && (() => {
          const p = products.find(x => x.id === viewId);
          if (!p) return null;
          return (
            <ProductDetailDrawer
              product={p}
              onClose={() => setViewId(null)}
              onEdit={() => { setViewId(null); setEditingId(p.id); }}
            />
          );
        })()}
      </AnimatePresence>

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <ProductModal
            title="Thêm sản phẩm mới"
            onClose={() => setShowAdd(false)}
            onSave={form => { handleAdd(form); setShowAdd(false); }}
          />
        )}
      </AnimatePresence>

      {/* Edit modal */}
      <AnimatePresence>
        {editingProduct && (
          <ProductModal
            title={`Chỉnh sửa: ${editingProduct.name}`}
            initial={{
              name: editingProduct.name,
              category: editingProduct.category,
              unit: editingProduct.unit,
              certs: editingProduct.certs,
              description: editingProduct.description,
            }}
            onClose={() => setEditingId(null)}
            onSave={form => { handleEdit(form); setEditingId(null); }}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 mb-2">Xóa sản phẩm?</h3>
              <p className="text-sm text-slate-500 mb-7 leading-relaxed">
                Sản phẩm <strong className="text-slate-800">{products.find(p => p.id === deleteId)?.name}</strong> sẽ bị xóa vĩnh viễn khỏi danh sách.
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="w-full py-3 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md shadow-red-500/20"
                >
                  Xác nhận xóa
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="w-full py-3 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                >
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
