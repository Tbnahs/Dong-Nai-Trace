import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Plus, ShieldCheck, AlertCircle, Edit2, Trash2, Eye, Package } from 'lucide-react';

const WITH_TXNG = [
  { id: 'my1', name: 'Bưởi Tân Triều', category: 'Trái cây', cert: 'VietGAP', traceCode: 'TXNG-VCU-001-2024', img: 'https://picsum.photos/seed/buoi/80/80', updatedAt: '15/10/2024' },
  { id: 'my2', name: 'Rau muống hữu cơ', category: 'Nông sản', cert: 'VietGAP', traceCode: 'TXNG-XL-002-2024', img: 'https://picsum.photos/seed/raumuong/80/80', updatedAt: '10/08/2024' },
  { id: 'my3', name: 'Mật ong rừng nguyên chất', category: 'Thực phẩm', cert: 'OCOP', traceCode: 'TXNG-VCU-003-2024', img: 'https://picsum.photos/seed/matong/80/80', updatedAt: '01/06/2024' },
];

const WITHOUT_TXNG = [
  { id: 'p1', name: 'Xoài cát hòa lộc', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/xoai/80/80', note: 'Chờ phê duyệt hồ sơ' },
  { id: 'p2', name: 'Sầu riêng Ri6', category: 'Trái cây', cert: 'VietGAP', img: 'https://picsum.photos/seed/saurieng/80/80', note: 'Đang bổ sung tài liệu' },
];

const certColor: Record<string, string> = {
  'VietGAP': 'bg-emerald-100 text-emerald-700',
  'OCOP':    'bg-orange-100 text-orange-700',
  'HACCP':   'bg-purple-100 text-purple-700',
};

export default function ProductsProfilePage() {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');
  const [withList, setWithList] = useState(WITH_TXNG);
  const [withoutList, setWithoutList] = useState(WITHOUT_TXNG);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  const removeWith = (id: string) => setWithList(l => l.filter(x => x.id !== id));
  const removeWithout = (id: string) => setWithoutList(l => l.filter(x => x.id !== id));
  const addProduct = () => {
    if (!newName.trim()) return;
    setWithoutList(l => [...l, { id: `new-${Date.now()}`, name: newName.trim(), category: 'Khác', cert: '', img: 'https://picsum.photos/seed/new/80/80', note: 'Đang xử lý hồ sơ' }]);
    setNewName('');
    setShowAdd(false);
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

        {/* Add product inline */}
        {showAdd && (
          <div className="bg-blue-50 border border-[#2740BA]/20 rounded-xl p-4 mb-5 flex gap-3 items-center">
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addProduct()}
              placeholder="Nhập tên sản phẩm..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2740BA]"
            />
            <button onClick={addProduct} className="px-4 py-2 bg-[#2740BA] text-white text-sm font-bold rounded-lg hover:bg-[#1f339e]">Thêm</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-white">Hủy</button>
          </div>
        )}

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

        {/* WITH TXNG list */}
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
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/san-pham/${p.id}`}>
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-500" title="Xem">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-500" title="Sửa">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeWith(p.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-400" title="Xóa">
                    <Trash2 className="w-4 h-4" />
                  </button>
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
                  <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-medium">{p.note}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="px-3 py-1.5 bg-[#2740BA] text-white text-xs font-bold rounded-lg hover:bg-[#1f339e] transition-colors" title="Khai báo TXNG">
                    Khai báo TXNG
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-500" title="Sửa">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeWithout(p.id)} className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-400" title="Xóa">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
