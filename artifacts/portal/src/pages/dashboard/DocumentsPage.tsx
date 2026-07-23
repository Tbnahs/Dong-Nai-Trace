import React from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Download, Trash2, Eye } from 'lucide-react';

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: 'Giấy phép ĐKKD', type: 'Pháp lý', status: 'verified', date: '12/10/2023', file: 'GPKD_HTX.pdf' },
    { id: 2, name: 'Chứng nhận VSATTP', type: 'Chất lượng', status: 'verified', date: '12/10/2023', file: 'VSATTP_2023.pdf' },
    { id: 3, name: 'Chứng nhận VietGAP', type: 'Chất lượng', status: 'pending', date: '14/10/2023', file: 'VietGAP_RauCu.pdf' },
    { id: 4, name: 'Chứng nhận OCOP (3 sao)', type: 'Chất lượng', status: 'missing', date: '-', file: null },
    { id: 5, name: 'Mã số vùng trồng', type: 'Pháp lý', status: 'missing', date: '-', file: null },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#1B2A6B]">Danh sách hồ sơ & tài liệu</h2>
          <p className="text-sm text-gray-500 mt-1">Quản lý các giấy tờ pháp lý và chứng nhận chất lượng của tổ chức.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Tên tài liệu</th>
                <th className="px-6 py-3">Loại</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Ngày tải lên</th>
                <th className="px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {doc.name}
                    </div>
                    {doc.file && <div className="text-xs text-gray-500 mt-1 ml-6">{doc.file}</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.type}</td>
                  <td className="px-6 py-4">
                    {doc.status === 'verified' && <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded text-xs"><CheckCircle2 className="w-3 h-3"/> Đã duyệt</span>}
                    {doc.status === 'pending' && <span className="inline-flex items-center gap-1 text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded text-xs"><AlertCircle className="w-3 h-3"/> Đang chờ duyệt</span>}
                    {doc.status === 'missing' && <span className="inline-flex items-center gap-1 text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded text-xs">Chưa có</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4">
                    {doc.file ? (
                      <div className="flex gap-2 text-gray-400">
                        <button className="hover:text-[#1B2A6B] p-1"><Eye className="w-4 h-4" /></button>
                        <button className="hover:text-[#1B2A6B] p-1"><Download className="w-4 h-4" /></button>
                        <button className="hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button className="text-sm font-semibold text-[#E8650A] hover:underline">Tải lên</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Tải lên tài liệu mới</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-center group">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-8 h-8 text-[#1B2A6B]" />
          </div>
          <p className="text-base font-bold text-[#1B2A6B] mb-1">Kéo thả file vào đây để tải lên</p>
          <p className="text-sm text-gray-500">Hoặc <span className="text-[#E8650A] underline">chọn file từ máy tính</span></p>
          <p className="text-xs text-gray-400 mt-4">Hỗ trợ PDF, JPG, PNG (Tối đa 10MB)</p>
        </div>
      </div>
    </div>
  );
}
