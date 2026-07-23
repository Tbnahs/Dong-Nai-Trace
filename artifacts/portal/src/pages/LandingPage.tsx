import React from 'react';
import hero3d from '../assets/hero-3d.png';
import { Link, useLocation } from 'wouter';
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

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const logoUrl = import.meta.env.BASE_URL + 'images/logo-skhcn.png';

  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation('/tra-cuu' + (searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ''));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* HEADER */}
      <header className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
        {/* Tầng 1 */}
        <div className="flex justify-between items-center py-3 px-6 lg:px-12 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src={logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-[#1B2A6B] text-lg leading-tight">ĐỒNG NAI TRACE</span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <Link href="/dang-ky" className="font-bold text-[#1B2A6B] text-sm hover:underline block">Đăng ký tài khoản doanh nghiệp</Link>
              <span className="text-xs text-gray-500">Quản lý thông tin sản phẩm của doanh nghiệp</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dang-ky" className="px-5 py-2 border border-[#1B2A6B] text-[#1B2A6B] font-semibold text-sm rounded-md hover:bg-slate-50 transition-colors">
                Đăng ký
              </Link>
              <Link href="/dang-nhap" className="px-5 py-2 bg-[#1B2A6B] text-white font-semibold text-sm rounded-md hover:bg-[#152055] transition-colors">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>

        {/* Tầng 2 */}
        <nav className="bg-[#1B2A6B] text-white px-6 lg:px-12">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase overflow-x-auto whitespace-nowrap">
            <li className="py-3 border-b-2 border-white cursor-pointer"><Link href="/">TRANG CHỦ</Link></li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors"><Link href="/tra-cuu">DANH MỤC SẢN PHẨM</Link></li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors"><Link href="/dang-ky">HƯỚNG DẪN DOANH NGHIỆP</Link></li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors"><Link href="/dashboard/ho-tro">GỬI TIN BÁO</Link></li>
            <li className="py-3 border-b-2 border-transparent text-white/80 hover:text-white cursor-pointer transition-colors"><Link href="/dashboard/ho-tro">KÊNH HỖ TRỢ</Link></li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-[#EBF0F9] py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Cột trái */}
          <div className="lg:w-[55%] flex flex-col items-start space-y-6">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">TRA CỨU NHANH</span>
            
            <h1 className="text-4xl lg:text-[2.75rem] font-extrabold text-[#1B2A6B] uppercase leading-[1.2]">
              TRUY XUẤT NGUỒN GỐC<br />
              SẢN PHẨM ĐỒNG NAI
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Nhờ ứng dụng công nghệ tiên tiến, hệ thống cho phép định danh, truy vết nguồn gốc sản phẩm hàng hóa tại Thành phố Đồng Nai, đồng thời ngăn chặn hàng giả, góp phần bảo vệ quyền lợi người tiêu dùng.
            </p>
            
            <form onSubmit={handleSearch} className="w-full max-w-lg mt-4 flex shadow-lg rounded-md overflow-hidden border border-slate-200">
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Nhập tên sản phẩm, mã GTIN, mã lô/mẻ..." 
                className="flex-1 px-5 py-4 focus:outline-none text-gray-700 bg-white w-full"
              />
              <button type="submit" className="bg-[#E8650A] text-white px-6 sm:px-8 py-4 font-bold flex items-center gap-2 hover:bg-[#D55C08] transition-colors whitespace-nowrap">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Tra cứu ngay</span>
              </button>
            </form>
          </div>
          
          {/* Cột phải - Mockup */}
          <div className="lg:w-[45%] relative h-[450px] w-full flex justify-center items-center mt-12 lg:mt-0">
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-200/40 rounded-full blur-3xl -z-10"></div>
            
            <img
              src={hero3d}
              alt="Đồng Nai Trace – minh họa hệ thống truy xuất nguồn gốc"
              className="relative z-10 w-full max-w-[480px] object-contain drop-shadow-2xl
                         hover:scale-[1.03] transition-transform duration-700 ease-out
                         animate-[float_6s_ease-in-out_infinite]"
            />
            
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
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-slate-100 py-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
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
            <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-white/20 z-0 border-t-2 border-dashed border-white/20"></div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <FileEdit className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 1</div>
              <h4 className="text-xl font-bold mb-3">Đăng ký tài khoản</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Tạo tài khoản doanh nghiệp trên Portal với thông tin cơ bản.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <FolderOpen className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 2</div>
              <h4 className="text-xl font-bold mb-3">Hoàn thiện hồ sơ</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Cung cấp thông tin pháp lý, upload tài liệu chứng nhận.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <CheckSquare className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 3</div>
              <h4 className="text-xl font-bold mb-3">Được phê duyệt</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Sở KH&CN xét duyệt trong 3-5 ngày làm việc.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <Tag className="w-10 h-10 text-white" />
              </div>
              <div className="bg-[#E8650A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BƯỚC 4</div>
              <h4 className="text-xl font-bold mb-3">Nhận mã định danh</h4>
              <p className="text-blue-100 text-sm max-w-[240px]">Cấp mã chính thức + QR code trên nền tảng cho sản phẩm.</p>
            </div>
          </div>

          <Link href="/dang-ky" className="mt-16 bg-[#E8650A] hover:bg-[#D55C08] text-white px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
            Đăng ký ngay <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* DANH MỤC NGÀNH HÀNG */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Danh mục</p>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1B2A6B] uppercase">Sản phẩm đáng chú ý</h2>
            </div>
            <button className="px-5 py-2 border border-[#1B2A6B] text-[#1B2A6B] text-sm font-semibold rounded hover:bg-[#1B2A6B] hover:text-white transition-colors whitespace-nowrap">
              Xem thêm
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Nông sản & Rau củ',      img: 'https://picsum.photos/seed/vegetable/600/360' },
              { name: 'Phân bón & Vật tư nông nghiệp', img: 'https://picsum.photos/seed/fertilizer/600/360' },
              { name: 'Thủy sản',               img: 'https://picsum.photos/seed/seafood/600/360' },
              { name: 'Thịt & Chăn nuôi',       img: 'https://picsum.photos/seed/livestock/600/360' },
              { name: 'Thực phẩm chế biến',     img: 'https://picsum.photos/seed/processed/600/360' },
              { name: 'Dược liệu',              img: 'https://picsum.photos/seed/herbs/600/360' },
              { name: 'Thủ công mỹ nghệ',       img: 'https://picsum.photos/seed/handicraft/600/360' },
              { name: 'Công nghiệp chế biến',   img: 'https://picsum.photos/seed/industry/600/360' },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="group cursor-pointer rounded overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                {/* Photo */}
                <div className="overflow-hidden h-[200px]">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-[#1B2A6B] transition-colors">{cat.name}</span>
                  <span className="text-[#1B2A6B] font-bold text-lg leading-none">→</span>
                </div>
              </div>
            ))}
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
            
            <Link href="/dang-ky" className="mt-10 font-bold text-[#E8650A] hover:text-[#D55C08] flex items-center gap-2 group transition-colors">
              Đăng ký doanh nghiệp ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="lg:w-1/2 relative w-full flex justify-center">
            <div className="absolute inset-0 bg-[#F8FAFC] rounded-[3rem] -rotate-3 transform z-0"></div>
            
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
                <Link href="/dang-ky" className="w-full h-11 bg-[#1B2A6B] text-white rounded font-bold text-sm mt-4 hover:bg-[#152055] transition-colors flex items-center justify-center">
                  Tiếp tục
                </Link>
              </div>
            </div>
            
            <div className="absolute top-10 -left-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-20 flex items-center gap-3 animate-[bounce_4s_infinite]">
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
                <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                <span className="font-bold text-[#1B2A6B] text-lg pr-3">ĐỒNG NAI TRACE</span>
              </div>
              <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
                Hệ thống Truy xuất nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai. Nền tảng kết nối doanh nghiệp, cơ quan quản lý và người tiêu dùng nhằm minh bạch hóa thông tin chuỗi cung ứng.
              </p>
            </div>
            
            {/* Col 2 */}
            <div className="lg:pl-12">
              <h4 className="text-base font-bold uppercase mb-6 tracking-wide text-white">Liên kết nhanh</h4>
              <ul className="space-y-3.5">
                <li><Link href="/" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Trang chủ</Link></li>
                <li><Link href="/dang-ky" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Đăng ký doanh nghiệp</Link></li>
                <li><Link href="/dang-nhap" className="text-blue-100/80 hover:text-white transition-colors flex items-center gap-2 text-sm"><ChevronRight className="w-4 h-4" /> Đăng nhập hệ thống</Link></li>
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
