import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle2, Fingerprint, QrCode, Download } from 'lucide-react';

export default function OrgProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'id'>('info');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'HTX Nông nghiệp Xanh',
    mst: '3601234567',
    address: 'Xã Bình Lộc, Huyện Vĩnh Cửu, Tỉnh Đồng Nai',
    representative: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'htxnongnghi@dongnai.gov.vn',
    sector: 'Nông sản & Rau củ',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'info' ? 'border-[#1B2A6B] text-[#1B2A6B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Thông tin pháp lý
          </button>
          <button
            onClick={() => setActiveTab('id')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'id' ? 'border-[#1B2A6B] text-[#1B2A6B]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Mã định danh
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'info' && (
            <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
              {saved && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Đã lưu thay đổi thành công!
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên tổ chức</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã số thuế</label>
                  <input
                    type="text"
                    value={form.mst}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded-md p-2.5 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">MST không thể thay đổi. Liên hệ Sở KH&CN nếu cần.</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ trụ sở</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => handleChange('address', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Người đại diện</label>
                  <input
                    type="text"
                    value={form.representative}
                    onChange={e => handleChange('representative', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email liên hệ</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhóm ngành hàng</label>
                  <select
                    value={form.sector}
                    onChange={e => handleChange('sector', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]"
                  >
                    <option>Nông sản & Rau củ</option>
                    <option>Thủy sản</option>
                    <option>Thực phẩm chế biến</option>
                    <option>Thủ công mỹ nghệ</option>
                    <option>Dược liệu</option>
                    <option>Công nghiệp chế biến</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#E8650A] text-white font-bold rounded-md hover:bg-[#D55C08] transition-colors"
                >
                  <Save className="w-4 h-4" /> Lưu thay đổi
                </button>
              </div>
            </form>
          )}

          {activeTab === 'id' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Chờ cấp mã định danh</h3>
                <p className="text-amber-700 text-sm mb-6">
                  Hồ sơ của bạn đang được Sở Khoa học & Công nghệ thẩm định. Mã định danh chính thức sẽ được cấp sau khi hồ sơ được phê duyệt 100%.
                </p>
                <button
                  disabled
                  className="px-6 py-2.5 bg-gray-300 text-gray-500 font-bold rounded-md cursor-not-allowed"
                >
                  Yêu cầu cấp mã
                </button>
                <p className="text-xs text-gray-500 mt-4 italic">Nút này sẽ khả dụng khi hồ sơ được duyệt (100%)</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-[#1B2A6B]" /> Mã định danh sẽ bao gồm
                </h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3"><QrCode className="w-5 h-5 text-gray-400 shrink-0" /> QR Code chính thức gắn với sản phẩm</li>
                  <li className="flex items-center gap-3"><Download className="w-5 h-5 text-gray-400 shrink-0" /> File QR có thể tải về và in ấn</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" /> Mã số định danh duy nhất trên hệ thống</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
