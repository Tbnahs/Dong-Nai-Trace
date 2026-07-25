import React, { useState } from 'react';
import { Search, ShieldCheck, QrCode, MapPin, Truck, Store, Calendar, ArrowRight } from 'lucide-react';

export default function TxngLookupPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#2740BA] mb-2 uppercase">Tra cứu Truy xuất nguồn gốc</h2>
        <p className="text-sm sm:text-base text-gray-500 mb-5 sm:mb-6">Kiểm tra thông tin chi tiết của lô hàng bằng mã GTIN hoặc mã lô.</p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row shadow-md rounded-md overflow-hidden border border-slate-300">
          <div className="flex-1 relative">
            <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Nhập mã GTIN, mã lô/mẻ..." 
              className="w-full min-h-[52px] pl-12 pr-4 py-3.5 focus:outline-none text-base sm:text-sm text-gray-700 font-medium"
            />
          </div>
          <button type="submit" className="min-h-[50px] sm:min-h-0 bg-[#E8650A] text-white px-6 sm:px-8 py-3 font-bold flex items-center justify-center gap-2 hover:bg-[#D55C08] transition-colors whitespace-nowrap">
            <Search className="w-5 h-5" />
            <span>Tra cứu</span>
          </button>
        </form>
      </div>

      {/* Result Card */}
      {searched && (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-emerald-50 border-b border-emerald-100 p-4 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-emerald-800">Sản phẩm đã được xác thực trên hệ thống Đồng Nai Trace</span>
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tên sản phẩm</div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#2740BA]">Rau muống hữu cơ VietGAP</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Doanh nghiệp/HTX</div>
                    <div className="font-semibold text-gray-800">HTX Nông nghiệp Xanh</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Mã GTIN</div>
                    <div className="font-semibold text-gray-800">8934567890123</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Mã lô / Mẻ</div>
                    <div className="font-semibold text-gray-800">L-20231015-01</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Ngày thu hoạch</div>
                    <div className="font-semibold text-gray-800">15/10/2023</div>
                  </div>
                </div>
              </div>
              
              {/* QR */}
              <div className="shrink-0 flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                <div className="w-32 h-32 bg-white rounded flex items-center justify-center p-2 shadow-sm border border-gray-200">
                  <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dongnaitrace')] bg-cover opacity-60 mix-blend-multiply"></div>
                </div>
                <span className="text-xs font-semibold text-gray-500 mt-3">Mã TXNG Đồng Nai</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h4 className="font-bold text-gray-800 mb-6 uppercase text-sm tracking-wider">Hành trình sản phẩm</h4>
              
              <div className="relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-emerald-100"></div>
                
                <div className="space-y-6">
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="pt-3">
                      <div className="font-bold text-gray-800">Gieo trồng & Chăm sóc</div>
                      <div className="text-sm text-gray-500 mt-1">Nông trại: Khu A, HTX Nông nghiệp Xanh, Vĩnh Cửu, Đồng Nai</div>
                      <div className="text-xs font-semibold text-emerald-600 mt-1">15/09/2023 - Đạt chuẩn VietGAP</div>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="pt-3">
                      <div className="font-bold text-gray-800">Thu hoạch & Đóng gói</div>
                      <div className="text-sm text-gray-500 mt-1">Xưởng đóng gói số 1, HTX Nông nghiệp Xanh</div>
                      <div className="text-xs font-semibold text-gray-500 mt-1">15/10/2023 06:30</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="pt-3">
                      <div className="font-bold text-gray-800">Đang vận chuyển</div>
                      <div className="text-sm text-gray-500 mt-1">Đơn vị vận tải: Logistics Nam Phát</div>
                      <div className="text-xs font-semibold text-gray-500 mt-1">15/10/2023 09:15</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                      <Store className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="pt-3">
                      <div className="font-bold text-gray-400">Phân phối (Dự kiến)</div>
                      <div className="text-sm text-gray-400 mt-1">Siêu thị Co.opmart Biên Hòa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
