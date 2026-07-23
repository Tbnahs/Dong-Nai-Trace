import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

export default function OrgProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'id'>('info');

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
            <div className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên tổ chức</label>
                  <input type="text" defaultValue="HTX Nông nghiệp Xanh" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã số thuế</label>
                  <input type="text" defaultValue="3601234567" disabled className="w-full border border-gray-200 bg-gray-50 rounded-md p-2.5 text-gray-500 cursor-not-allowed" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ trụ sở</label>
                  <input type="text" defaultValue="Xã Bình Lộc, Huyện Vĩnh Cửu, Tỉnh Đồng Nai" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Người đại diện</label>
                  <input type="text" defaultValue="Nguyễn Văn A" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input type="tel" defaultValue="0901234567" className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#1B2A6B] focus:border-[#1B2A6B]" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#E8650A] text-white font-bold rounded-md hover:bg-[#D55C08] transition-colors">
                  <Save className="w-4 h-4" /> Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {activeTab === 'id' && (
            <div className="max-w-2xl">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">Chờ cấp mã định danh</h3>
                <p className="text-amber-700 text-sm mb-6">
                  Hồ sơ của bạn đang được Sở Khoa học & Công nghệ thẩm định. Mã định danh chính thức sẽ được cấp sau khi hồ sơ được phê duyệt.
                </p>
                <button disabled className="px-6 py-2.5 bg-gray-300 text-gray-500 font-bold rounded-md cursor-not-allowed">
                  Yêu cầu cấp mã
                </button>
                <p className="text-xs text-gray-500 mt-4 italic">Nút này sẽ khả dụng khi hồ sơ được duyệt (100%)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
