import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, Trash2 } from 'lucide-react';

const INITIAL = [
  { id: 1, type: 'success', title: 'Hồ sơ đã được phê duyệt', body: 'Hồ sơ doanh nghiệp HTX Nông nghiệp Xanh đã được Sở KH&CN xét duyệt thành công.', time: '2 giờ trước', read: false },
  { id: 2, type: 'info',    title: 'Sản phẩm mới cần khai báo TXNG', body: 'Sản phẩm "Xoài cát hòa lộc" đã được thêm và đang chờ khai báo truy xuất nguồn gốc.', time: '1 ngày trước', read: false },
  { id: 3, type: 'warning', title: 'Chứng nhận VietGAP sắp hết hạn', body: 'Chứng nhận VietGAP sẽ hết hiệu lực vào ngày 30/09/2025. Vui lòng gia hạn trước thời gian trên.', time: '3 ngày trước', read: true },
  { id: 4, type: 'success', title: 'Mã QR truy xuất đã được tạo', body: 'Mã QR cho sản phẩm "Bưởi Tân Triều" (TXNG-VCU-001-2024) đã sẵn sàng để tải và in.', time: '5 ngày trước', read: true },
];

const iconMap: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  warning: <AlertCircle  className="w-5 h-5 text-amber-500" />,
  info:    <Info         className="w-5 h-5 text-blue-500" />,
};
const bgMap: Record<string, string> = {
  success: 'border-emerald-100',
  warning: 'border-amber-100',
  info:    'border-blue-100',
};

export default function NotificationsPage() {
  const [items, setItems] = useState(INITIAL);

  const unread = items.filter(i => !i.read).length;
  const markAllRead = () => setItems(l => l.map(i => ({ ...i, read: true })));
  const remove = (id: number) => setItems(l => l.filter(i => i.id !== id));
  const markRead = (id: number) => setItems(l => l.map(i => i.id === id ? { ...i, read: true } : i));

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm">
            <ArrowLeft className="w-4 h-4" /> Trang chủ
          </Link>
          <span className="text-xs text-gray-400">Thông báo</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[#2740BA]" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-800">Thông báo</h1>
              {unread > 0 && <p className="text-sm text-gray-500">{unread} chưa đọc</p>}
            </div>
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-sm font-semibold text-[#2740BA] hover:underline">
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Không có thông báo nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => markRead(item.id)}
                className={`bg-white rounded-xl border shadow-sm p-4 flex gap-4 cursor-pointer hover:shadow-md transition-all ${bgMap[item.type]} ${!item.read ? 'ring-1 ring-[#2740BA]/10' : ''}`}
              >
                <div className="mt-0.5 shrink-0">{iconMap[item.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${item.read ? 'text-gray-700' : 'text-slate-900'}`}>{item.title}</p>
                    {!item.read && <span className="w-2 h-2 bg-[#2740BA] rounded-full shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.body}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{item.time}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); remove(item.id); }} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors shrink-0 self-start">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
