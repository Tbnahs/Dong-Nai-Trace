import React, { useState } from 'react';
import { MessageSquare, Send, Clock, CheckCircle2, ChevronDown, ChevronUp, X } from 'lucide-react';

interface Ticket { id: string; title: string; status: 'open' | 'closed'; date: string; }

const INITIAL_TICKETS: Ticket[] = [
  { id: '#SP-1042', title: 'Lỗi không tải được file PDF', status: 'open', date: 'Hôm nay' },
  { id: '#SP-0988', title: 'Hỏi về quy trình cấp mã', status: 'closed', date: '10/10/2023' },
  { id: '#SP-0841', title: 'Xin đổi tên hiển thị HTX', status: 'closed', date: '01/10/2023' },
];

const FAQS = [
  { q: 'Hồ sơ đăng ký xét duyệt trong bao lâu?', a: 'Thông thường, hồ sơ đăng ký doanh nghiệp sẽ được Sở KH&CN xét duyệt trong vòng 3-5 ngày làm việc kể từ khi nộp đầy đủ giấy tờ hợp lệ.' },
  { q: 'Làm sao để được cấp mã định danh?', a: 'Sau khi hồ sơ tổ chức được phê duyệt (100% profile), chức năng "Yêu cầu cấp mã" sẽ được kích hoạt tại tab "Mã định danh" trong phần Hồ sơ tổ chức.' },
  { q: 'Sản phẩm đã cấp mã nhưng muốn thay đổi thông tin thì làm thế nào?', a: 'Bạn cần tạo một phiên bản nháp mới từ sản phẩm cũ, cập nhật thông tin và gửi duyệt lại. Mã định danh gốc vẫn được giữ nguyên.' },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [form, setForm] = useState({ topic: 'Lỗi kỹ thuật hệ thống', title: '', content: '' });
  const [toast, setToast] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const now = new Date();
    const newTicket: Ticket = {
      id: `#SP-${String(Math.floor(1000 + Math.random() * 9000))}`,
      title: form.title,
      status: 'open',
      date: 'Vừa xong',
    };
    setTickets(prev => [newTicket, ...prev]);
    setForm({ topic: 'Lỗi kỹ thuật hệ thống', title: '', content: '' });
    showToast();
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold text-white bg-emerald-600 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          Yêu cầu hỗ trợ đã được gửi! Chúng tôi sẽ phản hồi trong vòng 1 ngày làm việc.
          <button onClick={() => setToast(false)}><X className="w-4 h-4 opacity-70 hover:opacity-100" /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Tickets */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-bold text-[#2740BA] mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Yêu cầu của tôi
            </h3>
            <div className="space-y-3">
              {tickets.map(t => (
                <div key={t.id} className="p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-gray-400">{t.id}</span>
                    {t.status === 'open' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Đang xử lý
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã đóng
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{t.title}</h4>
                  <div className="text-xs text-gray-500 mt-2">{t.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: New Ticket Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Gửi yêu cầu hỗ trợ mới</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề cần hỗ trợ</label>
                <select
                  value={form.topic}
                  onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]"
                >
                  <option>Lỗi kỹ thuật hệ thống</option>
                  <option>Tư vấn quy trình cấp mã</option>
                  <option>Thay đổi thông tin tổ chức</option>
                  <option>Khiếu nại về hồ sơ</option>
                  <option>Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]"
                  placeholder="Ví dụ: Không thể tải lên chứng nhận VietGAP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung chi tiết *</label>
                <textarea
                  rows={5}
                  required
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-[#2740BA] focus:border-[#2740BA]"
                  placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#E8650A] text-white font-bold rounded-md hover:bg-[#D55C08] transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" /> Gửi yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-[#2740BA] mb-6">Câu hỏi thường gặp (FAQ)</h3>
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left font-semibold text-gray-800 transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-gray-600 text-sm border-t border-gray-200 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
