import React, { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronUp, Save, Upload, Tag } from 'lucide-react';

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const products = [
    { id: 'SP001', name: 'Bưởi Tân Triều', category: 'Nông sản', date: '12/10/2023', status: 'approved' },
    { id: 'SP002', name: 'Rau muống hữu cơ', category: 'Rau củ', date: '15/10/2023', status: 'pending' },
    { id: 'SP003', name: 'Cà chua VietGAP', category: 'Rau củ', date: 'Hôm nay', status: 'draft' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Tìm kiếm sản phẩm..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#1B2A6B] focus:border-[#1B2A6B] w-full sm:w-64" />
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
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
              {products.map(p => (
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-[#1B2A6B] overflow-hidden">
          <div className="bg-[#1B2A6B] text-white p-4 flex justify-between items-center cursor-pointer" onClick={() => setShowForm(false)}>
            <h3 className="font-bold text-lg flex items-center gap-2"><Tag className="w-5 h-5 text-[#E8650A]" /> Khai báo sản phẩm mới</h3>
            <ChevronUp className="w-5 h-5" />
          </div>
          
          <div className="p-0">
            <div className="flex border-b border-gray-200 bg-gray-50 px-6">
              {[
                { id: 'basic', label: 'Thông tin cơ bản' },
                { id: 'ingredients', label: 'Thành phần' },
                { id: 'certs', label: 'Chứng nhận' },
                { id: 'media', label: 'Hình ảnh / Media' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.id ? 'border-[#1B2A6B] text-[#1B2A6B] bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
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
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" placeholder="Nhập tên sản phẩm..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                      <select className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]">
                        <option>Nông sản & Rau củ</option>
                        <option>Thủy sản</option>
                        <option>Thực phẩm chế biến</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mã GTIN (Nếu có)</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" placeholder="Mã vạch quốc tế..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả sản phẩm</label>
                      <textarea rows={4} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" placeholder="Nhập mô tả chi tiết..."></textarea>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'basic' && (
                <div className="py-12 text-center text-gray-500 flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-300 mb-3" />
                  <p>Phần này chưa được triển khai trong bản demo.</p>
                </div>
              )}

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-600 font-bold rounded-md hover:bg-gray-50">Lưu nháp</button>
                <button className="flex items-center gap-2 px-6 py-2 bg-[#E8650A] text-white font-bold rounded-md hover:bg-[#D55C08]">
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
