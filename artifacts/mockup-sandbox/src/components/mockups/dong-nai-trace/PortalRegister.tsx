import React from "react";
import { 
  Building2, 
  User, 
  Briefcase, 
  KeyRound, 
  Upload, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Printer, 
  Save, 
  Send,
  Check,
  Building
} from "lucide-react";

// Inline font import
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');
  .font-be-vietnam {
    font-family: 'Be Vietnam Pro', sans-serif;
  }
`;

export function PortalRegister() {
  return (
    <div className="font-be-vietnam min-h-screen bg-[#F7F9FC] p-8">
      <style>{fontStyle}</style>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#1B2A6B] mb-2">Đồng Nai Trace</h1>
        <p className="text-[#E8650A] font-medium">PORTAL — ĐĂNG KÝ & HỒ SƠ DOANH NGHIỆP</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1440px] mx-auto">
        
        {/* BƯỚC 1 */}
        <div className="flex flex-col">
          <div className="bg-[#1B2A6B] text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
            BƯỚC 1 — Đăng ký tài khoản
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm p-6 flex-1 flex flex-col h-[650px] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#1B2A6B]/10 flex items-center justify-center text-[#1B2A6B]">
                  <Building size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-[#1B2A6B]">Đăng ký tổ chức / cá nhân</h2>
                  <p className="text-sm text-gray-500">Tham gia Hệ thống Truy xuất nguồn gốc</p>
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
              
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-[#E8650A] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white">1</div>
                <span className="text-xs font-semibold text-[#E8650A]">Thông tin tổ chức</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white">2</div>
                <span className="text-xs font-medium text-gray-400">Người đại diện</span>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white">3</div>
                <span className="text-xs font-medium text-gray-400">Ngành hàng</span>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white px-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-white">4</div>
                <span className="text-xs font-medium text-gray-400">Tài khoản</span>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên tổ chức <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" placeholder="Nhập tên tổ chức..." defaultValue="HTX Rau sạch Bình Lợi" />
                  <p className="text-xs text-gray-500 mt-1">Tên đầy đủ theo Giấy ĐKKD</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại hình <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]">
                    <option>Hợp tác xã</option>
                    <option>Doanh nghiệp</option>
                    <option>Cơ sở sản xuất</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã số thuế <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border border-red-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50" defaultValue="0312" />
                  <p className="text-xs text-red-500 mt-1 font-medium">Mã số thuế không hợp lệ</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số đăng ký kinh doanh
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" placeholder="Nhập số ĐKKD..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ chi tiết <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" placeholder="Số nhà, đường..." defaultValue="123 Đường Liên Ấp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa bàn <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]">
                    <option>Xã Bình Lợi, Huyện Vĩnh Cửu</option>
                    <option>Phường Trảng Dài, TP. Biên Hòa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giấy đăng ký kinh doanh / Quyết định thành lập <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#1B2A6B]/10 flex items-center justify-center text-[#1B2A6B] mb-2">
                    <Upload size={18} />
                  </div>
                  <p className="text-sm font-medium text-[#1B2A6B]">Nhấn để tải lên hoặc kéo thả file vào đây</p>
                  <p className="text-xs text-gray-500 mt-1">Hỗ trợ PDF, JPG, PNG (Tối đa 5MB)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end pt-4 border-t">
              <button className="bg-[#E8650A] hover:bg-[#d15808] text-white px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors">
                Tiếp theo <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BƯỚC 2 */}
        <div className="flex flex-col">
          <div className="bg-[#1B2A6B] text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
            BƯỚC 2 — Theo dõi hồ sơ
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm p-6 flex-1 flex flex-col h-[650px] overflow-y-auto">
            {/* Profile Info */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 mb-6 flex justify-between items-start">
              <div>
                <h2 className="font-bold text-lg text-[#1B2A6B]">HTX Rau sạch Bình Lợi</h2>
                <div className="flex flex-col gap-1 mt-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400 w-20">Mã hồ sơ:</span> 
                    <span className="font-medium text-gray-800">HS-2024-00892</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400 w-20">Ngày nộp:</span> 
                    <span>10/03/2024</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 border border-amber-200 shadow-sm">
                <Clock size={16} />
                ⏳ Chờ duyệt
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-semibold text-[#1B2A6B]">Tiến độ hoàn thiện hồ sơ</h3>
                <span className="text-sm font-bold text-[#E8650A]">60%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#E8650A] h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
                <CheckCircle2 className="text-[#16A34A] mt-0.5 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-800">Thông tin tổ chức</p>
                  <p className="text-xs text-[#16A34A]">Đã hoàn thiện</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
                <CheckCircle2 className="text-[#16A34A] mt-0.5 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-800">Thông tin người đại diện</p>
                  <p className="text-xs text-[#16A34A]">Đã hoàn thiện</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
                <CheckCircle2 className="text-[#16A34A] mt-0.5 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-800">Upload GPKD / Quyết định</p>
                  <p className="text-xs text-[#16A34A]">Đã hoàn thiện</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                <Clock className="text-amber-500 mt-0.5 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-800">Xác minh email</p>
                  <p className="text-xs text-amber-600">Chờ xác minh</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                <XCircle className="text-gray-300 mt-0.5 shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phê duyệt từ Sở KH&CN</p>
                  <p className="text-xs text-gray-400">Chưa xử lý</p>
                </div>
              </div>
            </div>

            {/* Requires Action */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">Cán bộ thẩm định yêu cầu bổ sung:</h4>
                  <ul className="text-sm text-amber-700 list-disc pl-4 mb-3 space-y-1">
                    <li>Ảnh chụp thực tế khu vực sản xuất (tối thiểu 3 ảnh)</li>
                    <li>Bản sao chứng chỉ VietGAP (nếu có)</li>
                  </ul>
                  <p className="text-xs font-medium text-amber-800">Hạn bổ sung: 20/03/2024</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button className="bg-[#E8650A] hover:bg-[#d15808] text-white px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors">
                Bổ sung hồ sơ
              </button>
            </div>
          </div>
        </div>

        {/* BƯỚC 3 */}
        <div className="flex flex-col">
          <div className="bg-[#1B2A6B] text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
            BƯỚC 3 — Cấp mã định danh
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm p-6 flex-1 flex flex-col h-[650px] overflow-y-auto">
            
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-green-200">
                <CheckCircle2 size={18} className="text-green-600" />
                ✅ Hồ sơ đã được phê duyệt
              </div>
            </div>

            <div className="border-2 border-[#1B2A6B] rounded-xl p-6 relative overflow-hidden bg-white shadow-sm mb-8">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B2A6B]/5 rounded-bl-full -mr-4 -mt-4"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Tổ chức đăng ký</p>
                  <h3 className="font-bold text-xl text-[#1B2A6B]">HTX Rau sạch Bình Lợi</h3>
                </div>
                <img src="/__mockup/images/logo-skhcn.png" alt="Sở KHCN Đồng Nai" className="h-12 w-auto object-contain" />
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center border-t border-gray-100 pt-6">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-[120px] h-[120px] bg-white border-2 border-gray-200 p-2 rounded-lg flex items-center justify-center shadow-sm">
                    {/* Fake QR */}
                    <div className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400 font-mono text-xs">
                      [QR CODE]
                    </div>
                  </div>
                  <div className="mt-3 w-full h-8 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-[10px] text-gray-400 tracking-widest font-mono">
                    |||| || ||| || |||
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Mã định danh hệ thống</p>
                    <div className="bg-[#1B2A6B]/5 text-[#1B2A6B] font-mono font-bold text-lg px-3 py-2 rounded border border-[#1B2A6B]/20 inline-block">
                      TXNG-DN-2024-00892
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Ngày cấp</p>
                      <p className="text-sm font-medium">25/03/2024</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Ngày hết hạn</p>
                      <p className="text-sm font-medium">24/03/2027</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center mb-10">
              <button className="flex-1 bg-white border border-[#E8650A] text-[#E8650A] hover:bg-orange-50 px-4 py-2.5 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                <Download size={16} /> 📥 Tải xuống mã
              </button>
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                <Printer size={16} /> 🖨️ In thẻ
              </button>
            </div>

            <div className="mt-auto text-center border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-600 mb-4">
                Với mã định danh này, doanh nghiệp có thể bắt đầu khai báo sản phẩm trên hệ thống.
              </p>
              <button className="bg-[#E8650A] hover:bg-[#d15808] text-white px-8 py-3 rounded-md font-semibold w-full flex items-center justify-center gap-2 transition-colors shadow-sm">
                Khai báo sản phẩm đầu tiên <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>

        {/* BƯỚC 4 */}
        <div className="flex flex-col">
          <div className="bg-[#1B2A6B] text-white px-4 py-2 rounded-t-lg font-semibold text-sm">
            BƯỚC 4 — Khai báo sản phẩm
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm p-0 flex-1 flex flex-col h-[650px] overflow-hidden">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto hide-scrollbar">
              <button className="px-4 py-3 text-sm font-semibold text-[#1B2A6B] border-b-2 border-[#1B2A6B] whitespace-nowrap flex items-center gap-1.5 bg-white">
                Thông tin cơ bản <div className="w-2 h-2 rounded-full bg-[#E8650A]"></div>
              </button>
              <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Thành phần & Quy cách
              </button>
              <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Chứng nhận
              </button>
              <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">
                Media
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" placeholder="Nhập tên sản phẩm..." defaultValue="Bưởi Tân Triều" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mã định danh sản phẩm
                    </label>
                    <input type="text" disabled className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-500 font-mono" defaultValue="SP-00892-001" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                      <span>Mã GTIN</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Tùy chọn</span>
                    </label>
                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B] font-mono" placeholder="Ví dụ: 8931234567890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chủng loại <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]">
                      <option>Nông sản tươi sống</option>
                      <option>Thực phẩm chế biến</option>
                      <option>Đồ uống</option>
                      <option>Sản phẩm thủ công mỹ nghệ</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Xuất xứ <span className="text-red-500">*</span>
                    </label>
                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" defaultValue="Đồng Nai, Việt Nam" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thương hiệu / Nhãn hiệu
                    </label>
                    <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" defaultValue="HTX Bình Lợi" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhóm ngành hàng (OCOP, VietGAP...)
                  </label>
                  <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 min-h-[42px]">
                    <span className="bg-[#1B2A6B]/10 text-[#1B2A6B] px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      VietGAP <button className="text-[#1B2A6B] hover:text-red-500"><XCircle size={12} /></button>
                    </span>
                    <span className="bg-[#1B2A6B]/10 text-[#1B2A6B] px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      OCOP 3 Sao <button className="text-[#1B2A6B] hover:text-red-500"><XCircle size={12} /></button>
                    </span>
                    <input type="text" placeholder="Thêm nhóm..." className="flex-1 min-w-[100px] text-sm outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả sản phẩm
                  </label>
                  <textarea 
                    rows={3} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#1B2A6B] focus:ring-1 focus:ring-[#1B2A6B]" 
                    placeholder="Nhập thông tin giới thiệu chi tiết về sản phẩm..."
                  ></textarea>
                </div>

              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-500 max-w-[280px]">
                Sau khi gửi duyệt, sản phẩm sẽ được cán bộ Sở KH&CN xem xét và phê duyệt trong 3-5 ngày làm việc.
              </p>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                  <Save size={16} /> 💾 Lưu nháp
                </button>
                <button className="flex-1 sm:flex-none bg-[#E8650A] hover:bg-[#d15808] text-white px-6 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                  📤 Gửi duyệt <Send size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default PortalRegister;
