import React from 'react';
import { 
  CheckCircle2, 
  Search, 
  Package, 
  Building2, 
  Link as LinkIcon, 
  ShieldCheck, 
  FileEdit, 
  FolderOpen, 
  CheckSquare, 
  Tag, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

export function PortalLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-800" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&display=swap');
      `}} />

      {/* HEADER */}
      <header className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
        {/* Tầng 1 */}
        <div className="flex justify-between items-center py-3 px-6 lg:px-12 border-b border-gray-100">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/__mockup/images/logo-skhcn.png" alt="Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1B2A6B] text-lg leading-tight">ĐỒNG NAI TRACE</span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <a href="#" className="font-bold text-[#1B2A6B] text-sm hover:underline block">Đăng ký tài khoản doanh nghiệp</a>
              <span className="text-xs text-gray-500">Quản lý thông tin sản phẩm của doanh nghiệp</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 border border-[#1B2A6B] text-[#1B2A6B] font-semibold text-sm rounded-md hover:bg-slate-50 transition-colors">
                Đăng ký
              </button>
              <button className="px-5 py-2 bg-[#1B2A6B] text-white font-semibold text-sm rounded-md hover:bg-[#152055] transition-colors">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>

        {/* Tầng 2 */}
        <nav className="bg-[#1B2A6B] text-white px-6 lg:px-12">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase overflow-x-auto whitespace-nowrap">
            <li className="py-3 border-b-2 border-white cursor-pointer">TRANG CHỦ</li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors">DANH MỤC SẢN PHẨM</li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors">HƯỚNG DẪN DOANH NGHIỆP</li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors">GỬI TIN BÁO</li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors">KÊNH HỖ TRỢ</li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-[#EBF0F9] py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Cột trái */}
          <div className="lg:w-[55%] flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#1B2A6B]" />
              <span className="text-sm font-semibold text-[#1B2A6B]">Đồng Nai Trace</span>
            </div>
            
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">TRA CỨU NHANH</span>
            
            <h1 className="text-4xl lg:text-[2.75rem] font-extrabold text-[#1B2A6B] uppercase leading-[1.2]">
              TRUY XUẤT NGUỒN GỐC<br />
              SẢN PHẨM ĐỒNG NAI
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Nhờ ứng dụng công nghệ tiên tiến, hệ thống cho phép định danh, truy vết nguồn gốc sản phẩm hàng hóa tại Thành phố Đồng Nai, đồng thời ngăn chặn hàng giả, góp phần bảo vệ quyền lợi người tiêu dùng.
            </p>
            
            <div className="w-full max-w-lg mt-4 flex shadow-lg rounded-md overflow-hidden border border-slate-200">
              <input 
                type="text" 
                placeholder="Nhập tên sản phẩm, mã GTIN, mã lô/mẻ..." 
                className="flex-1 px-5 py-4 focus:outline-none text-gray-700 bg-white w-full"
              />
              <button className="bg-[#E8650A] text-white px-6 sm:px-8 py-4 font-bold flex items-center gap-2 hover:bg-[#D55C08] transition-colors whitespace-nowrap">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Tra cứu ngay</span>
              </button>
            </div>
          </div>
          
          {/* Cột phải - Mockup */}
          <div className="lg:w-[45%] relative h-[450px] w-full flex justify-center items-center mt-12 lg:mt-0">
            {/* Vòng tròn bg trang trí */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-200/40 rounded-full blur-3xl -z-10"></div>
            
            {/* Phone Mockup Card */}
            <div className="w-[260px] sm:w-[280px] bg-white rounded-[2rem] shadow-2xl p-4 border-4 border-slate-100 relative z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#1B2A6B] text-white rounded-t-xl py-4 px-4 text-center">
                <span className="font-bold text-sm block">TXNG SẢN PHẨM</span>
              </div>
              <div className="bg-slate-50 h-[300px] rounded-b-xl flex flex-col items-center justify-center p-6 gap-6 border-x border-b border-slate-100">
                <div className="w-32 h-32 bg-white border-2 border-dashed border-[#1B2A6B]/30 rounded-lg flex items-center justify-center">
                  <div className="w-20 h-20 bg-slate-200/50 rounded flex flex-wrap p-1 gap-1 relative overflow-hidden">
                     {/* Fake QR */}
                     <div className="w-[30%] h-[30%] bg-[#1B2A6B]"></div>
                     <div className="w-[30%] h-[30%] bg-transparent"></div>
                     <div className="w-[30%] h-[30%] bg-[#1B2A6B]"></div>
                     
                     <div className="w-[30%] h-[30%] bg-transparent"></div>
                     <div className="w-[30%] h-[30%] bg-[#1B2A6B]"></div>
                     <div className="w-[30%] h-[30%] bg-transparent"></div>
                     
                     <div className="w-[30%] h-[30%] bg-[#1B2A6B]"></div>
                     <div className="w-[30%] h-[30%] bg-transparent"></div>
                     <div className="w-[30%] h-[30%] bg-[#E8650A]"></div>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded-full mx-auto"></div>
                </div>
                <button className="w-full py-2.5 bg-[#E8650A] text-white rounded-lg text-xs font-bold uppercase mt-auto">
                  Quét QR
                </button>
              </div>
            </div>
            
            {/* Floating Card Stats */}
            <div className="absolute top-10 right-0 lg:-right-4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 z-20 animate-[bounce_3s_infinite]">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#1B2A6B]">4.892</div>
                <div className="text-xs text-gray-500 font-medium">Sản phẩm</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 px-6 lg:px-12 bg-white relative z-20 -mt-16 lg:-mt-10">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 py-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
            <Package className="w-10 h-10 text-[#1B2A6B] mb-4" />
            <span className="text-4xl font-extrabold text-[#1B2A6B] mb-2">4.892</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sản phẩm đã đăng ký</span>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <Building2 className="w-10 h-10 text-[#1B2A6B] mb-4" />
            <span className="text-4xl font-extrabold text-[#1B2A6B] mb-2">1.247</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Doanh nghiệp tham gia</span>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <LinkIcon className="w-10 h-10 text-[#1B2A6B] mb-4" />
            <span className="text-4xl font-extrabold text-[#1B2A6B] mb-2">23.104</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Mã truy xuất đồng bộ</span>
          </div>
          <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
            <ShieldCheck className="w-10 h-10 text-[#1B2A6B] mb-4" />
            <span className="text-4xl font-extrabold text-[#1B2A6B] mb-2">98.7%</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Xác thực thành công</span>
          </div>
        </div>
      </section>

      {/* 4 BƯỚC SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-[#1B2A6B] text-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4">ĐĂNG KÝ ĐỊNH DANH</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold uppercase mb-2">
            4 BƯỚC — DỄ DÀNG
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-[#E8650A] uppercase mb-16">
            VÀ NHANH CHÓNG
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full relative">
            {/* Đường nối ngang */}
            <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-white/20 z-0 border-t-2 border-dashed border-white/20"></div>

            {/* Bước 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <FileEdit className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 1</div>
              <h4 className="text-xl font-bold mb-3">Đăng ký tài khoản</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Tạo tài khoản doanh nghiệp trên Portal với thông tin cơ bản.</p>
            </div>

            {/* Bước 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <FolderOpen className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 2</div>
              <h4 className="text-xl font-bold mb-3">Hoàn thiện hồ sơ</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Cung cấp thông tin pháp lý, upload tài liệu chứng nhận.</p>
            </div>

            {/* Bước 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <CheckSquare className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 3</div>
              <h4 className="text-xl font-bold mb-3">Được phê duyệt</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Sở KH&CN xét duyệt trong 3-5 ngày làm việc.</p>
            </div>

            {/* Bước 4 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Tag className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 4</div>
              <h4 className="text-xl font-bold mb-3">Nhận mã định danh</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Cấp mã chính thức + QR code trên nền tảng cho sản phẩm.</p>
            </div>
          </div>

          <button className="mt-16 bg-[#E8650A] hover:bg-[#D55C08] text-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
            Đăng ký ngay <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* DANH MỤC NGÀNH HÀNG */}
      <section className="py-20 px-6 lg:px-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1B2A6B] mb-2 uppercase">Danh mục sản phẩm</h2>
            <p className="text-gray-500 font-medium">Khám phá theo nhóm ngành hàng</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌾', name: 'Nông sản & Rau củ', count: 312 },
              { icon: '🐟', name: 'Thủy sản', count: 198 },
              { icon: '🥩', name: 'Thịt & Chăn nuôi', count: 267 },
              { icon: '🍯', name: 'Thực phẩm chế biến', count: 445 },
              { icon: '🌺', name: 'Thủ công mỹ nghệ', count: 89 },
              { icon: '🌿', name: 'Dược liệu', count: 67 },
              { icon: '🏭', name: 'Công nghiệp chế biến', count: 234 },
              { icon: '📋', name: 'Khác', count: 180 },
            ].map((cat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-100 cursor-pointer transition-all hover:-translate-y-1 group">
                <div className="text-4xl mb-4 grayscale-[20%] group-hover:grayscale-0 transition-all">{cat.icon}</div>
                <h4 className="font-bold text-[#1B2A6B] mb-1 group-hover:text-[#E8650A] transition-colors">{cat.name}</h4>
                <p className="text-sm text-gray-500">{cat.count} Sản phẩm</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <button className="text-[#1B2A6B] font-bold text-sm hover:text-[#E8650A] transition-colors inline-flex items-center gap-1">
              Xem tất cả danh mục <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* HƯỚNG DẪN DOANH NGHIỆP */}
      <section className="py-20 px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1B2A6B] mb-8 uppercase">Hướng dẫn doanh nghiệp</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 min-w-6 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">Đăng ký hồ sơ pháp lý và thông tin tổ chức</h4>
                  <p className="text-gray-600 text-sm mt-1">Cập nhật đầy đủ giấy phép kinh doanh và chứng nhận vệ sinh an toàn thực phẩm.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 min-w-6 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">Khai báo thông tin sản phẩm và tải lên chứng nhận</h4>
                  <p className="text-gray-600 text-sm mt-1">Gắn kết thông tin chứng nhận OCOP, VietGAP, GlobalGAP cho từng lô hàng.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 min-w-6 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">Kết nối đơn vị cung cấp giải pháp TXNG để đồng bộ dữ liệu</h4>
                  <p className="text-gray-600 text-sm mt-1">Tích hợp API hoặc import dữ liệu tự động từ các giải pháp bên thứ ba vào cổng chung.</p>
                </div>
              </div>
            </div>
            
            <button className="mt-10 font-bold text-[#E8650A] hover:text-[#D55C08] flex items-center gap-2 group transition-colors">
              Xem hướng dẫn chi tiết <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="lg:w-1/2 relative w-full flex justify-center">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-[#F8FAFC] rounded-[3rem] -rotate-3 transform z-0"></div>
            
            {/* Form Mockup */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-xl w-full max-w-md p-6 relative z-10 mt-8 mb-8">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="font-bold text-[#1B2A6B] text-lg">Đăng ký doanh nghiệp</h3>
                <p className="text-xs text-gray-400 mt-1">Hoàn thiện thông tin để bắt đầu</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Tên doanh nghiệp / HTX</label>
                  <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-sm text-gray-400">Nhập tên tổ chức...</div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Mã số thuế</label>
                  <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-sm text-gray-400">Nhập MST...</div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Tải lên Giấy phép ĐKKD</label>
                  <div className="h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <FolderOpen className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Click để tải file (.pdf, .png)</span>
                  </div>
                </div>
                <button className="w-full h-11 bg-[#1B2A6B] text-white rounded font-bold text-sm mt-4 hover:bg-[#152055] transition-colors">
                  Tiếp tục
                </button>
              </div>
            </div>
            
            {/* Decor float */}
            <div className="absolute top-10 -left-6 bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-20 flex items-center gap-3 animate-[bounce_4s_infinite]">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1B2A6B]">
                <FileEdit className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Xét duyệt nhanh</div>
                <div className="text-xs text-gray-500 mt-0.5">3-5 ngày làm việc</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1B2A6B] text-white pt-16 pb-6 px-6 lg:px-12 border-t-[6px] border-[#E8650A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-3 mb-6 bg-white p-2.5 rounded-xl inline-flex shadow-sm">
                <img src="/__mockup/images/logo-skhcn.png" alt="Logo" className="h-10 w-auto object-contain" />
                <span className="font-bold text-[#1B2A6B] text-lg pr-3">ĐỒNG NAI TRACE</span>
              </div>
              <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai. Nền tảng kết nối doanh nghiệp, cơ quan quản lý và người tiêu dùng nhằm minh bạch hóa thông tin chuỗi cung ứng.
              </p>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="font-bold text-sm">FB</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="font-bold text-sm">YT</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="font-bold text-sm">Z</span>
                </div>
              </div>
            </div>
            
            {/* Col 2 */}
            <div className="lg:pl-12">
              <h4 className="text-base font-bold uppercase mb-6 tracking-wide text-white">Liên kết nhanh</h4>
              <ul className="space-y-3.5">
                <li><a href="#" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Trang chủ</a></li>
                <li><a href="#" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Đăng ký doanh nghiệp</a></li>
                <li><a href="#" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Gửi tin báo vi phạm</a></li>
                <li><a href="#" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Kênh hỗ trợ</a></li>
              </ul>
            </div>
            
            {/* Col 3 */}
            <div>
              <h4 className="text-base font-bold uppercase mb-6 tracking-wide text-white">Liên hệ</h4>
              <ul className="space-y-4 text-blue-100/80 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E8650A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Sở Khoa học và Công nghệ Thành phố Đồng Nai<br/>1592 Nguyễn Ái Quốc, KP6, P.Trung Dũng, Biên Hoà, Đồng Nai</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E8650A] shrink-0" />
                  <span>0251.3822297</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#E8650A] shrink-0" />
                  <span>skhcn@dongnai.gov.vn</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#E8650A] transition-colors">
                  <LinkIcon className="w-4 h-4" /> Cổng Truy xuất nguồn gốc Quốc gia
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/60">
            <p>© 2024 Sở Khoa học và Công nghệ Thành phố Đồng Nai. Tất cả quyền được bảo lưu.</p>
            <p>Nền tảng vận hành bởi đơn vị được ủy quyền</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
