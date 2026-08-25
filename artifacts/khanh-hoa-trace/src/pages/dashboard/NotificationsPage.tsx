import React, { useState } from 'react';
import { Link } from 'wouter';
import { Bell, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'alerts'>('all');

  const notifications = [
    { id: 1, type: 'alert', title: 'Yêu cầu bổ sung tài liệu', desc: 'Sở KH&CN yêu cầu bổ sung bản scan màu của Giấy phép ĐKKD. Bản hiện tại bị mờ.', time: '2 giờ trước', read: false },
    { id: 2, type: 'success', title: 'Phê duyệt sản phẩm', desc: 'Sản phẩm "Bưởi Tân Triều" đã được phê duyệt thành công.', time: 'Hôm qua, 14:30', read: false },
    { id: 3, type: 'info', title: 'Cập nhật hệ thống', desc: 'Hệ thống sẽ bảo trì từ 22:00 - 24:00 ngày 20/10/2023.', time: '12/10/2023', read: true },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'all' ? 'border-[#2740BA] text-[#2740BA]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Thông báo chung <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">2</span>
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'alerts' ? 'border-[#E8650A] text-[#E8650A]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Yêu cầu bổ sung <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full">1</span>
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'all' ? (
          notifications.map(notif => (
            <div key={notif.id} className={`p-5 rounded-xl border flex gap-4 ${notif.read ? 'bg-white border-slate-200' : 'bg-blue-50 border-blue-100'}`}>
              <div className="shrink-0 mt-1">
                {notif.type === 'alert' && <AlertTriangle className="w-6 h-6 text-amber-500" />}
                {notif.type === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                {notif.type === 'info' && <Info className="w-6 h-6 text-blue-500" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-bold ${notif.read ? 'text-gray-800' : 'text-[#2740BA]'}`}>{notif.title}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className={`text-sm ${notif.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>{notif.desc}</p>
                
                {notif.type === 'alert' && !notif.read && (
                  <button className="mt-3 text-sm font-bold text-[#E8650A] hover:underline flex items-center gap-1">
                    Cập nhật ngay <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl flex gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Hồ sơ cần bổ sung</h3>
              <p className="text-amber-800 mb-4">Sở KH&CN yêu cầu bổ sung bản scan màu của Giấy phép ĐKKD. Bản hiện tại bị mờ, không thể xác minh thông tin.</p>
              <Link href="/dashboard/chung-nhan" className="inline-block px-6 py-2.5 bg-[#E8650A] text-white font-bold rounded-md hover:bg-[#D55C08] transition-colors shadow-sm">
                Đến trang Hồ sơ tài liệu
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
