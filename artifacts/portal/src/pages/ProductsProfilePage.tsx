import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowLeft, Plus, ShieldCheck, AlertCircle, Eye, Package,
  X, UploadCloud, CheckCircle2,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
const WITH_TXNG = [
  { id: 'my1', name: 'Bưởi Tân Triều', category: 'Trái cây', cert: 'VietGAP', traceCode: 'TXNG-VCU-001-2024', img: 'https://picsum.photos/seed/buoi/80/80', updatedAt: '15/10/2024', status: 'approved' },
  { id: 'my2', name: 'Rau muống hữu cơ', category: 'Nông sản', cert: 'VietGAP', traceCode: 'TXNG-XL-002-2024', img: 'https://picsum.photos/seed/raumuong/80/80', updatedAt: '10/08/2024', status: 'approved' },
  { id: 'my3', name: 'Mật ong rừng nguyên chất', category: 'Thực phẩm', cert: 'OCOP', traceCode: 'TXNG-VCU-003-2024', img: 'https://picsum.photos/seed/matong/80/80', updatedAt: '01/06/2024', status: 'approved' },
];

const WITHOUT_TXNG = [
  { id: 'p1', name: 'Xoài cát hòa lộc', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/xoai/80/80', note: 'Chờ phê duyệt hồ sơ', status: 'pending' },
  { id: 'p2', name: 'Sầu riêng Ri6', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/saurieng/80/80', note: 'Đang bổ sung tài liệu', status: 'pending' },
];

const certColor: Record<string, string> = {
  'VietGAP': 'bg-emerald-100 text-emerald-700',
  'OCOP': 'bg-orange-100 text-orange-700',
  'HACCP': 'bg-purple-100 text-purple-700',
};

const PRODUCT_CATS = ['Nông sản & Rau củ', 'Trái cây', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Khác'];
const CERTS_LIST = ['VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000', 'Hữu cơ'];

// ─── Add Product Modal ────────────────────────────────────────────────────────
interface AddProductForm {
  name: string;
  category: string;
  unit: string;
  certs: string[];
  certOther: boolean;
  certOtherText: string;
  description: string;
}

const emptyForm: AddProductForm = {
  name: '', category: PRODUCT_CATS[0], unit: '',
  certs: [], certOther: false, certOtherText: '',
  description: '',
};

function AddProductModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (name: string, category: string) => void;
}) {
  const [form, setForm] = useState<AddProductForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof AddProductForm, string>>>({});

  const set = <K extends keyof AddProductForm>(key: K, value: AddProductForm[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const toggleCert = (c: string) =>
    setForm(f => ({
      ...f,
      certs: f.certs.includes(c) ? f.certs.filter(x => x !== c) : [...f.certs, c],
    }));

  const validate = () => {
    const e: Partial<Record<keyof AddProductForm, string>> = {};
    if (!form.name.trim()) e.name = 'Vui lòng nhập tên sản phẩm';
    if (!form.unit.trim()) e.unit = 'Vui lòng nhập đơn vị tính';
    if (!form.description.trim()) e.description = 'Vui lòng nhập mô tả sản phẩm';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onAdd(form.name.trim(), form.category);
    onClose();
  };

  const inputCls = (err?: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 placeholder:text-gray-400 transition-colors ${err ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-300 focus:ring-[#2740BA] focus:border-transparent'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-800">Sản phẩm đăng ký truy xuất</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Row: name + category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên sản phẩm *</label>
              <input
                className={inputCls(errors.name)}
                placeholder="VD: Rau muống VietGAP"
                value={form.name}
                onChange={e => { set('name', e.target.value); setErrors(er => ({ ...er, name: undefined })); }}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục *</label>
              <select
                className={inputCls() + ' bg-white'}
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {PRODUCT_CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Row: unit + certs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Đơn vị tính *</label>
              <input
                className={inputCls(errors.unit)}
                placeholder="VD: kg, hộp, thùng"
                value={form.unit}
                onChange={e => { set('unit', e.target.value); setErrors(er => ({ ...er, unit: undefined })); }}
              />
              {errors.unit && <p className="mt-1 text-xs text-red-600">{errors.unit}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Chứng nhận (chọn nhiều)</label>
              <div className="flex flex-wrap gap-x-3 gap-y-2 pt-0.5">
                {CERTS_LIST.map(c => (
                  <label key={c} className="flex items-center gap-1.5 cursor-pointer text-sm">
                    <input type="checkbox" checked={form.certs.includes(c)} onChange={() => toggleCert(c)}
                      className="rounded text-[#2740BA] focus:ring-[#2740BA]" />
                    {c}
                  </label>
                ))}
                {/* Khác */}
                <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                  <input type="checkbox" checked={form.certOther} onChange={e => set('certOther', e.target.checked)}
                    className="rounded text-[#2740BA] focus:ring-[#2740BA]" />
                  Khác
                </label>
              </div>
              {form.certOther && (
                <input
                  className={inputCls() + ' mt-2'}
                  placeholder="Nhập tên chứng nhận..."
                  value={form.certOtherText}
                  onChange={e => set('certOtherText', e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả sản phẩm *</label>
            <textarea
              className={inputCls(errors.description) + ' min-h-[96px] resize-y'}
              placeholder="Mô tả ngắn gọn về sản phẩm, quy trình sản xuất..."
              value={form.description}
              onChange={e => { set('description', e.target.value); setErrors(er => ({ ...er, description: undefined })); }}
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hình ảnh sản phẩm</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-gray-300" />
              <p className="text-sm text-gray-400">Tải lên 1-5 hình ảnh sản phẩm (JPG, PNG)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Quay lại
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e] transition-colors shadow-sm"
          >
            Hoàn tất đăng ký →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="w-3 h-3" /> Đã được duyệt
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
      <AlertCircle className="w-3 h-3" /> Chưa được duyệt
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProductsProfilePage() {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');
  const [withList, setWithList] = useState(WITH_TXNG);
  const [withoutList, setWithoutList] = useState(WITHOUT_TXNG);
  const [showAdd, setShowAdd] = useState(false);

  const addProduct = (name: string, category: string) => {
    setWithoutList(l => [...l, {
      id: `new-${Date.now()}`, name, category, cert: '', status: 'pending',
      img: 'https://picsum.photos/seed/new/80/80', note: 'Đang xử lý hồ sơ',
    }]);
    setActiveTab('without');
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
                {/* View only — no edit/delete */}
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

        {/* WITHOUT TXNG list */}
        {activeTab === 'without' && (
          <div className="space-y-3">
            {withoutList.length === 0 ? (
              <EmptyState msg="Tất cả sản phẩm đã có truy xuất nguồn gốc" />
            ) : withoutList.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-amber-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0 opacity-70" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <h3 className="font-bold text-slate-800 truncate">{p.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-1.5">{p.category}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium">{p.note}</span>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAdd && (
        <AddProductModal
          onClose={() => setShowAdd(false)}
          onAdd={addProduct}
        />
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
