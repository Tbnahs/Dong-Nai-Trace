import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft, Plus, ShieldCheck, AlertCircle, Eye, Pencil, Trash2, Package,
  X, UploadCloud, CheckCircle2, ImagePlus,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const WITH_TXNG = [
  { id: 'my1', name: 'Bưởi Tân Triều', category: 'Trái cây', cert: 'VietGAP', traceCode: 'TXNG-VCU-001-2024', img: 'https://picsum.photos/seed/buoi/80/80', updatedAt: '15/10/2024', status: 'approved' },
  { id: 'my2', name: 'Rau muống hữu cơ', category: 'Nông sản', cert: 'VietGAP', traceCode: 'TXNG-XL-002-2024', img: 'https://picsum.photos/seed/raumuong/80/80', updatedAt: '10/08/2024', status: 'approved' },
  { id: 'my3', name: 'Mật ong rừng nguyên chất', category: 'Thực phẩm', cert: 'OCOP', traceCode: 'TXNG-VCU-003-2024', img: 'https://picsum.photos/seed/matong/80/80', updatedAt: '01/06/2024', status: 'approved' },
];

const WITHOUT_TXNG_INIT = [
  { id: 'p1', name: 'Xoài cát hòa lộc', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/xoai/80/80', status: 'approved' },
  { id: 'p2', name: 'Sầu riêng Ri6', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/saurieng/80/80', status: 'pending' },
];

const certColor: Record<string, string> = {
  'VietGAP': 'bg-emerald-100 text-emerald-700',
  'OCOP': 'bg-orange-100 text-orange-700',
  'HACCP': 'bg-purple-100 text-purple-700',
};

const PRODUCT_CATS = ['Nông sản & Rau củ', 'Trái cây', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Khác'];
const UNITS = ['kg', 'tấn', 'hộp', 'thùng', 'chai', 'gói', 'cái', 'bó'];
const CERTS_LIST = ['VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000', 'Hữu cơ'];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="w-3 h-3" /> Đã duyệt
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
      <AlertCircle className="w-3 h-3" /> Chờ duyệt
    </span>
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
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 placeholder:text-gray-400 transition-colors ${err ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-300 focus:ring-[#2740BA] focus:border-transparent'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-800">{title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Điền đầy đủ thông tin để đăng ký sản phẩm</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Section: Thông tin cơ bản */}
          <div className="px-6 pt-5 pb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Thông tin cơ bản</p>

            {/* Name — full width */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                className={inputCls(errors.name)}
                placeholder="VD: Bưởi da xanh VietGAP"
                value={form.name}
                onChange={e => { set('name', e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Category + Unit — 2 cols */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục <span className="text-red-500">*</span></label>
                <select className={inputCls() + ' bg-white'} value={form.category} onChange={e => set('category', e.target.value)}>
                  {PRODUCT_CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Đơn vị tính <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
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
                {errors.unit && <p className="mt-1 text-xs text-red-600">{errors.unit}</p>}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Section: Chứng nhận */}
          <div className="px-6 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Chứng nhận chất lượng</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CERTS_LIST.map(c => (
                <label key={c} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm font-medium select-none ${form.certs.includes(c) ? 'bg-[#2740BA]/5 border-[#2740BA]/40 text-[#2740BA]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <input type="checkbox" checked={form.certs.includes(c)} onChange={() => toggleCert(c)}
                    className="rounded text-[#2740BA] focus:ring-[#2740BA] w-4 h-4 shrink-0" />
                  {c}
                </label>
              ))}
              <label className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm font-medium select-none ${form.certOther ? 'bg-[#2740BA]/5 border-[#2740BA]/40 text-[#2740BA]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                <input type="checkbox" checked={form.certOther} onChange={e => set('certOther', e.target.checked)}
                  className="rounded text-[#2740BA] focus:ring-[#2740BA] w-4 h-4 shrink-0" />
                Khác
              </label>
            </div>
            {form.certOther && (
              <input className={inputCls() + ' mt-3'} placeholder="Nhập tên chứng nhận khác..."
                value={form.certOtherText} onChange={e => set('certOtherText', e.target.value)} />
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* Section: Mô tả */}
          <div className="px-6 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Mô tả sản phẩm</p>
            <textarea
              className={inputCls(errors.description) + ' min-h-[96px] resize-y'}
              placeholder="Mô tả ngắn gọn về sản phẩm, vùng trồng, quy trình sản xuất..."
              value={form.description}
              onChange={e => { set('description', e.target.value); setErrors(er => ({ ...er, description: undefined })); }}
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div className="border-t border-gray-100" />

          {/* Section: Hình ảnh */}
          <div className="px-6 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Hình ảnh sản phẩm</p>
            {imagePreview ? (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <label className="cursor-pointer bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    Đổi ảnh
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  <button onClick={() => setImagePreview(null)} className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">
                    Xóa
                  </button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <div className="border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 bg-gray-50 hover:bg-gray-100 hover:border-[#2740BA]/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#2740BA]/10 flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-[#2740BA]" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">Bấm để tải ảnh lên</p>
                  <p className="text-xs text-gray-400">JPG, PNG — tối đa 5 hình</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl shrink-0">
          <button onClick={onClose}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
            Hủy bỏ
          </button>
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e] transition-colors shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Lưu hồ sơ sản phẩm
          </button>
        </div>
      </div>
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

  const addProduct = (name: string, category: string) => {
    setWithoutList(l => [...l, {
      id: `new-${Date.now()}`, name, category, cert: '', status: 'pending',
      img: 'https://picsum.photos/seed/new/80/80',
    }]);
    setActiveTab('without');
  };

  const deleteWithout = (id: string) => {
    setWithoutList(l => l.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm">
            <ArrowLeft className="w-4 h-4" /> Trang chủ
          </Link>
          <span className="text-xs text-gray-400">Hồ sơ sản phẩm</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">Hồ sơ sản phẩm</h1>
            <p className="text-sm text-gray-500 mt-0.5">Quản lý danh sách sản phẩm đã đăng ký</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Thêm sản phẩm
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 mb-6 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('with')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'with' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            Đã có truy xuất nguồn gốc
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'with' ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-500'}`}>
              {withList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('without')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'without' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <AlertCircle className="w-4 h-4" />
            Chưa có truy xuất nguồn gốc
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'without' ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-500'}`}>
              {withoutList.length}
            </span>
          </button>
        </div>

        {/* WITH TXNG list — view only */}
        {activeTab === 'with' && (
          <div className="space-y-3">
            {withList.length === 0 ? (
              <EmptyState msg="Chưa có sản phẩm nào có truy xuất nguồn gốc" />
            ) : withList.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <h3 className="font-bold text-slate-800 truncate">{p.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-1.5">{p.category}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${certColor[p.cert] || 'bg-gray-100 text-gray-600'}`}>{p.cert}</span>
                    <span className="text-[10px] text-gray-400 font-mono bg-slate-50 px-2 py-0.5 rounded">{p.traceCode}</span>
                    <span className="text-[10px] text-gray-400">Cập nhật: {p.updatedAt}</span>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/san-pham/${p.id}`}>
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-500" title="Xem">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WITHOUT TXNG list — with status + edit/view/delete */}
        {activeTab === 'without' && (
          <div className="space-y-3">
            {withoutList.length === 0 ? (
              <EmptyState msg="Tất cả sản phẩm đã có truy xuất nguồn gốc" />
            ) : withoutList.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-amber-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0 opacity-80" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <h3 className="font-bold text-slate-800 truncate">{p.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-1.5">{p.category}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.cert && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${certColor[p.cert] || 'bg-gray-100 text-gray-600'}`}>{p.cert}</span>
                    )}
                    <StatusBadge status={p.status} />
                  </div>
                </div>
                {/* Actions: Edit, View, Delete */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setEditingId(p.id)}
                    className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-[#2740BA]"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <Link href={`/san-pham/${p.id}`}>
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-400 hover:text-gray-700" title="Xem">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAdd && (
        <ProductModal
          title="Tạo hồ sơ sản phẩm mới"
          onClose={() => setShowAdd(false)}
          onSave={addProduct}
        />
      )}

      {/* Edit Product Modal */}
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

      {/* Delete confirm dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Xóa sản phẩm?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Sản phẩm <strong>{withoutList.find(p => p.id === deleteId)?.name}</strong> sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                Hủy
              </button>
              <button onClick={() => deleteWithout(deleteId)}
                className="flex-1 py-2.5 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ msg }: { msg: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-14 text-center">
      <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-sm text-gray-500">{msg}</p>
    </div>
  );
}
