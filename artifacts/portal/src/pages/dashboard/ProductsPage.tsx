import React, { useState } from 'react';
import { Plus, Search, ChevronUp, Save, Upload, Tag, CheckCircle2, X } from 'lucide-react';

interface Product {
  id: string; name: string; category: string; date: string; status: 'approved' | 'pending' | 'draft';
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 'SP001', name: 'Bưởi Tân Triều', category: 'Nông sản', date: '12/10/2023', status: 'approved' },
  { id: 'SP002', name: 'Rau muống hữu cơ', category: 'Rau củ', date: '15/10/2023', status: 'pending' },
  { id: 'SP003', name: 'Cà chua VietGAP', category: 'Rau củ', date: 'Hôm nay', status: 'draft' },
];

const EMPTY_FORM = {
  name: '', category: 'Nông sản & Rau củ', gtin: '', description: '',
  ingredients: '', weight: '', packaging: '', expiry: '',
  certs: [] as string[],
  imageNote: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'info' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveDraft = () => {
    if (!form.name.trim()) { showToast('Vui lòng nhập tên sản phẩm', 'info'); return; }
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()}`;
    setProducts(prev => [...prev, {
      id: `SP${String(prev.length + 1).padStart(3, '0')}`,
      name: form.name, category: form.category,
      date: dateStr, status: 'draft',
    }]);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    showToast('Đã lưu nháp sản phẩm thành công');
  };

  const handleSubmit = () => {
    if (!form.name.trim()) { showToast('Vui lòng nhập tên sản phẩm', 'info'); return; }
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()}`;
    setProducts(prev => [...prev, {
      id: `SP${String(prev.length + 1).padStart(3, '0')}`,
      name: form.name, category: form.category,
      date: dateStr, status: 'pending',
    }]);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    showToast('Đã gửi duyệt sản phẩm thành công! Sở KH&CN sẽ phản hồi trong 3-5 ngày làm việc.');
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCert = (cert: string) => {
    setForm(f => ({
      ...f,
      certs: f.certs.includes(cert) ? f.certs.filter(c => c !== cert) : [...f.certs, cert],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold text-white animate-in slide-in-from-top-2 ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-amber-500'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
          {toast.msg}
          <button onClick={() => setToast(null)}><X className="w-4 h-4 opacity-70 hover:opacity-100" /></button>
        </div>
      )}

      {/* Header & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#1B2A6B] focus:border-[#1B2A6B] w-full sm:w-64"
            />
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setActiveTab('basic'); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#E8650A] text-white text-sm font-bold rounded-md hover:bg-[#D55C08] transition-colors"
          >
            <Plus className="w-4 h-4" /> Khai báo sản phẩm mới
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Mã nội bộ</th>
                <th className="px-6 py-3">Tên sản phẩm</th>
                <th className="px-6 py-3">Danh mục</th>
                <th className="px-6 py-3">Ngày cập nhật</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500 font-medium">{p.id}</td>
                  <td className="px-6 py-4 font-bold text-[#1B2A6B]">{p.name}</td>
                  <td className="px-6 py-4 text-gray-600">{p.category}</td>
                  <td className="px-6 py-4 text-gray-600">{p.date}</td>
                  <td className="px-6 py-4">
                    {p.status === 'approved' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">✅ Đã duyệt</span>}
                    {p.status === 'pending' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">⏳ Chờ duyệt</span>}
                    {p.status === 'draft' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">📝 Nháp</span>}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#1B2A6B] font-semibold hover:underline text-sm">Chi tiết</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">Không tìm thấy sản phẩm nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-[#1B2A6B] overflow-hidden">
          <div
            className="bg-[#1B2A6B] text-white p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#E8650A]" /> Khai báo sản phẩm mới
            </h3>
            <ChevronUp className="w-5 h-5" />
          </div>

          <div>
            <div className="flex border-b border-gray-200 bg-gray-50 px-6 overflow-x-auto">
              {[
                { id: 'basic', label: 'Thông tin cơ bản' },
                { id: 'ingredients', label: 'Thành phần & Quy cách' },
                { id: 'certs', label: 'Chứng nhận' },
                { id: 'media', label: 'Hình ảnh / Media' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-[#1B2A6B] text-[#1B2A6B] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="Nhập tên sản phẩm..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                      <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                      >
                        <option>Nông sản & Rau củ</option>
                        <option>Thủy sản</option>
                        <option>Thực phẩm chế biến</option>
                        <option>Thủ công mỹ nghệ</option>
                        <option>Dược liệu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mã GTIN (Nếu có)</label>
                      <input
                        type="text"
                        value={form.gtin}
                        onChange={e => setForm(f => ({ ...f, gtin: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="Mã vạch quốc tế..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả sản phẩm</label>
                      <textarea
                        rows={4}
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="Nhập mô tả chi tiết..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thành phần / Nguyên liệu</label>
                      <textarea
                        rows={3}
                        value={form.ingredients}
                        onChange={e => setForm(f => ({ ...f, ingredients: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="VD: Bưởi 100% tự nhiên, không chất bảo quản..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Khối lượng / Quy cách</label>
                      <input
                        type="text"
                        value={form.weight}
                        onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="VD: 500g, 1kg, 24 quả/thùng..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hạn sử dụng</label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="VD: 7 ngày (bảo quản lạnh)..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bao bì đóng gói</label>
                      <input
                        type="text"
                        value={form.packaging}
                        onChange={e => setForm(f => ({ ...f, packaging: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                        placeholder="VD: Túi lưới có nhãn TXNG, hộp carton..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'certs' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Chọn các chứng nhận mà sản phẩm đã đạt được:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['VietGAP', 'GlobalGAP', 'OCOP', 'ISO 9001', 'ISO 22000', 'HACCP', 'Hữu cơ Việt Nam', 'Organic'].map(cert => (
                      <label key={cert} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${form.certs.includes(cert) ? 'border-[#1B2A6B] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          checked={form.certs.includes(cert)}
                          onChange={() => toggleCert(cert)}
                          className="text-[#1B2A6B] rounded focus:ring-[#1B2A6B]"
                        />
                        <span className="text-sm font-medium">{cert}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tải lên file chứng nhận (PDF/ảnh)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-gray-700">Kéo thả file hoặc <span className="text-[#E8650A]">chọn file</span></p>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (max 5MB)</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Thêm hình ảnh và video giới thiệu sản phẩm:</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="text-base font-semibold text-gray-700">Tải lên hình ảnh sản phẩm</p>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG (tối đa 5MB / ảnh, tối đa 10 ảnh)</p>
                    <p className="text-xs text-gray-400 mt-3">Ảnh đầu tiên sẽ là ảnh đại diện trên trang tra cứu</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link video giới thiệu (YouTube/Vimeo)</label>
                    <input
                      type="url"
                      value={form.imageNote}
                      onChange={e => setForm(f => ({ ...f, imageNote: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 border border-gray-300 text-gray-600 font-bold rounded-md hover:bg-gray-50 transition-colors"
                >
                  Lưu nháp
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2 bg-[#E8650A] text-white font-bold rounded-md hover:bg-[#D55C08] transition-colors"
                >
                  <Save className="w-4 h-4" /> Gửi duyệt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
