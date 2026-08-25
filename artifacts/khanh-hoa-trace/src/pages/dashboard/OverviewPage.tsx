import React from 'react';
import { Package, FileText, Fingerprint, Bell, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2740BA]">Xin chào, HTX Nông nghiệp Xanh!</h2>
          <p className="text-sm text-gray-500 mt-1">Hôm nay là một ngày tuyệt vời để cập nhật thông tin sản phẩm.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-full font-semibold text-sm">
          <Clock className="w-4 h-4" />
          Hồ sơ chờ duyệt
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: 'Sản phẩm đã khai báo', value: '3', color: 'text-blue-600', bg: 'bg-blue-100' },
          { icon: FileText, label: 'Tài liệu đã tải lên', value: '5', color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { icon: Fingerprint, label: 'Mã định danh', value: 'Chờ cấp', color: 'text-amber-600', bg: 'bg-amber-100' },
          { icon: Bell, label: 'Thông báo chưa đọc', value: '2', color: 'text-red-600', bg: 'bg-red-100' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${kpi.bg}`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">{kpi.label}</div>
              <div className="text-xl font-bold text-[#2740BA]">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Hoàn thiện hồ sơ</h3>
                <p className="text-sm text-gray-500">Cần hoàn thành các bước để được cấp mã định danh</p>
              </div>
              <div className="text-2xl font-bold text-[#E8650A]">60%</div>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
              <div className="bg-[#E8650A] h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Thông tin tổ chức', status: 'done' },
                { label: 'Người đại diện pháp luật', status: 'done' },
                { label: 'Upload Giấy phép kinh doanh', status: 'done' },
                { label: 'Xác minh Email liên hệ', status: 'pending' },
                { label: 'Phê duyệt từ Sở KH&CN', status: 'blocked' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  {item.status === 'done' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {item.status === 'pending' && <Clock className="w-5 h-5 text-amber-500" />}
                  {item.status === 'blocked' && <XCircle className="w-5 h-5 text-gray-300" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Hoạt động gần đây</h3>
          <div className="relative border-l border-gray-200 ml-3 space-y-6">
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[#2740BA] ring-4 ring-white"></span>
              <div className="text-xs text-gray-500 mb-1">Hôm nay, 09:41</div>
              <div className="text-sm font-semibold text-gray-800">Khai báo sản phẩm mới</div>
              <div className="text-sm text-gray-600">Đã lưu nháp "Bưởi Tân Triều xuất khẩu"</div>
            </div>
            
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></span>
              <div className="text-xs text-gray-500 mb-1">Hôm qua, 15:30</div>
              <div className="text-sm font-semibold text-gray-800">Cập nhật tài liệu</div>
              <div className="text-sm text-gray-600">Đã tải lên Chứng nhận VietGAP</div>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></span>
              <div className="text-xs text-gray-500 mb-1">12/10/2023, 08:00</div>
              <div className="text-sm font-semibold text-gray-800">Đăng ký tài khoản</div>
              <div className="text-sm text-gray-600">Hoàn tất đăng ký bước 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
