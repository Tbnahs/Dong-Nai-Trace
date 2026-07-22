import React from 'react';
import {
  Search,
  ChevronRight,
  Filter,
  CheckCircle2,
  Building2,
  Leaf,
  Droplets,
  Microscope,
  PackageCheck,
  Store,
  ChevronDown,
  MapPin,
  Barcode,
  Calendar,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function PortalSearch() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-be-vietnam text-slate-800 pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');
        .font-be-vietnam { font-family: 'Be Vietnam Pro', sans-serif; }
      `}</style>

      {/* Brand Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <img src="/__mockup/images/logo-skhcn.png" alt="Logo Sở KHCN Đồng Nai" className="h-10 w-10 object-contain bg-slate-100 rounded-full" />
             <div>
               <h1 className="font-bold text-[#1B2A6B] leading-tight text-lg">Đồng Nai Trace</h1>
               <p className="text-xs text-slate-500 hidden sm:block">Hệ thống Truy xuất nguồn gốc sản phẩm Thành phố Đồng Nai</p>
             </div>
           </div>
           <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1B2A6B]">
             <a href="#" className="hover:text-[#E8650A]">Trang chủ</a>
             <a href="#" className="text-[#E8650A]">Tra cứu</a>
             <a href="#" className="hover:text-[#E8650A]">Tin tức</a>
             <a href="#" className="hover:text-[#E8650A]">Hướng dẫn</a>
           </nav>
        </div>
      </header>

      {/* Screen 1: Search Results */}
      <div className="bg-[#1B2A6B] py-6 text-white mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Màn hình 1 — Kết quả tra cứu</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
             <div className="relative w-full max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input 
                  type="text" 
                  defaultValue="rau hữu cơ Đồng Nai"
                  className="w-full pl-10 pr-24 py-6 rounded-lg text-slate-800 bg-white border-none focus-visible:ring-2 focus-visible:ring-[#E8650A] text-base" 
                />
                <Button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#E8650A] hover:bg-[#c95708] text-white h-auto py-2 px-5 rounded-md font-medium">
                  Tìm kiếm
                </Button>
             </div>
          </div>
          <p className="mt-4 text-slate-200 text-sm">Tìm thấy <strong className="text-white text-base">47</strong> kết quả cho <span className="italic">"rau hữu cơ Đồng Nai"</span></p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-[280px] shrink-0">
               <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-5">
                     <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-[#1B2A6B] flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Bộ lọc tìm kiếm
                        </h3>
                        <button className="text-xs text-slate-500 hover:text-[#E8650A] underline">Xóa tất cả</button>
                     </div>

                     {/* Filter Sections */}
                     <div className="space-y-6">
                        <div>
                           <h4 className="font-medium text-sm text-slate-800 mb-3">Ngành hàng</h4>
                           <div className="space-y-2.5">
                             {['Rau củ quả', 'Thủy sản', 'Thực phẩm chế biến', 'Thịt & Trứng'].map((item, i) => (
                               <label key={i} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
                                  <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 rounded border-slate-300 text-[#1B2A6B] focus:ring-[#1B2A6B]" />
                                  {item}
                               </label>
                             ))}
                           </div>
                        </div>

                        <div>
                           <h4 className="font-medium text-sm text-slate-800 mb-3">Địa bàn</h4>
                           <select className="w-full p-2.5 border border-slate-200 rounded-md text-sm text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-[#1B2A6B]">
                             <option>Tất cả khu vực</option>
                             <option>Biên Hòa</option>
                             <option>Long Khánh</option>
                             <option>Nhơn Trạch</option>
                             <option>Vĩnh Cửu</option>
                           </select>
                        </div>

                        <div>
                           <h4 className="font-medium text-sm text-slate-800 mb-3">Trạng thái</h4>
                           <div className="space-y-2.5">
                             {['Đã công khai', 'Chờ duyệt'].map((item, i) => (
                               <label key={i} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
                                  <input type="radio" name="status" defaultChecked={i === 0} className="w-4 h-4 border-slate-300 text-[#1B2A6B] focus:ring-[#1B2A6B]" />
                                  {item}
                               </label>
                             ))}
                           </div>
                        </div>

                        <div>
                           <h4 className="font-medium text-sm text-slate-800 mb-3">Chứng nhận</h4>
                           <div className="space-y-2.5">
                             {['VietGAP', 'OCOP', 'GlobalGAP', 'HACCP'].map((item, i) => (
                               <label key={i} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
                                  <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 rounded border-slate-300 text-[#1B2A6B] focus:ring-[#1B2A6B]" />
                                  {item}
                               </label>
                             ))}
                           </div>
                        </div>
                     </div>

                     <Button className="w-full mt-8 bg-[#E8650A] hover:bg-[#c95708] text-white py-5 rounded-lg font-medium transition-colors">
                        Áp dụng bộ lọc
                     </Button>
                  </CardContent>
               </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
               {/* Sort Bar */}
               <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm mb-6">
                  <span className="text-sm text-slate-500">Hiển thị <strong className="text-slate-800">1-6</strong> của <strong className="text-slate-800">47</strong> kết quả</span>
                  <div className="flex items-center gap-2 text-sm">
                     <span className="text-slate-500 hidden sm:inline">Sắp xếp theo:</span>
                     <select className="border-none bg-transparent font-medium text-[#1B2A6B] focus:ring-0 cursor-pointer text-sm">
                       <option>Mới nhất</option>
                       <option>Phổ biến nhất</option>
                       <option>Tên A-Z</option>
                     </select>
                  </div>
               </div>

               {/* Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                 {Array.from({length: 6}).map((_, i) => (
                    <Card key={i} className="border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group flex flex-col h-full rounded-xl">
                       {/* Image */}
                       <div className="h-44 bg-gradient-to-br from-[#E8F0FE] to-white relative flex items-center justify-center border-b border-slate-100">
                          <Leaf className="h-14 w-14 text-[#1B2A6B] opacity-10" />
                          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-[#1B2A6B] text-[11px] px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 shadow-sm border border-slate-100">
                             <Leaf className="h-3 w-3" /> Rau củ quả
                          </div>
                          <div className="absolute top-3 right-3 bg-[#16A34A] text-white text-[11px] px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 shadow-sm">
                             <CheckCircle2 className="h-3 w-3" /> Đã công khai
                          </div>
                       </div>
                       
                       {/* Content */}
                       <CardContent className="p-4 flex-1 flex flex-col pt-5">
                          <h3 className="font-bold text-[#1B2A6B] text-base mb-3 group-hover:text-[#E8650A] transition-colors line-clamp-2 leading-snug">
                             Rau {i === 0 ? 'muống' : i === 1 ? 'mồng tơi' : i === 2 ? 'cải ngọt' : i === 3 ? 'dền' : i === 4 ? 'xà lách' : 'thơm'} hữu cơ Đồng Nai
                          </h3>
                          <div className="flex items-start gap-2.5 text-sm text-slate-600 mb-5 mt-auto bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                             <Building2 className="h-4 w-4 shrink-0 mt-0.5 text-[#1B2A6B]/60" />
                             <span className="line-clamp-2 leading-tight">HTX Rau sạch {i % 2 === 0 ? 'Đồng Nai' : 'Thanh Bình'}</span>
                          </div>
                          <Button variant="outline" className="w-full border-[#E8650A] text-[#E8650A] hover:bg-[#E8650A] hover:text-white font-medium">
                             Xem chi tiết
                          </Button>
                       </CardContent>
                    </Card>
                 ))}
               </div>

               {/* Pagination */}
               <div className="flex justify-center items-center gap-1.5 mt-10">
                  <button className="p-2 border border-slate-200 rounded-md text-slate-400 bg-white" disabled><ChevronRight className="h-4 w-4 rotate-180" /></button>
                  <button className="w-9 h-9 rounded-md bg-[#1B2A6B] text-white font-medium text-sm shadow-sm">1</button>
                  <button className="w-9 h-9 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#1B2A6B] font-medium text-sm transition-colors">2</button>
                  <button className="w-9 h-9 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#1B2A6B] font-medium text-sm transition-colors">3</button>
                  <span className="text-slate-400 px-2">...</span>
                  <button className="w-9 h-9 rounded-md bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#1B2A6B] font-medium text-sm transition-colors">8</button>
                  <button className="p-2 border border-slate-200 rounded-md text-slate-600 bg-white hover:bg-slate-50 hover:text-[#1B2A6B] transition-colors"><ChevronRight className="h-4 w-4" /></button>
               </div>
            </div>
         </div>
      </main>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
         <div className="border-t-2 border-dashed border-slate-300 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F7F9FC] px-6 text-slate-300">
               <ChevronDown className="h-8 w-8" />
            </div>
         </div>
      </div>

      {/* Screen 2: Product Detail */}
      <div className="bg-[#1B2A6B] py-5 text-white mb-8 border-t border-white/10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Màn hình 2 — Chi tiết sản phẩm</h2>
          <div className="flex items-center gap-2 text-sm text-slate-300 mt-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
             <a href="#" className="hover:text-white transition-colors">Trang chủ</a>
             <ChevronRight className="h-4 w-4 shrink-0" />
             <a href="#" className="hover:text-white transition-colors">Tra cứu</a>
             <ChevronRight className="h-4 w-4 shrink-0" />
             <span className="text-white font-medium">Rau muống hữu cơ Đồng Nai</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Col - Info */}
            <div className="flex-1 w-full space-y-6">
               <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                  <CardContent className="p-6 sm:p-8">
                     <div className="flex flex-col md:flex-row gap-8">
                        {/* Image */}
                        <div className="w-full md:w-[320px] shrink-0">
                           <div className="aspect-square bg-gradient-to-br from-[#E8F0FE] to-[#F1F5F9] rounded-xl flex items-center justify-center p-8 border border-blue-100 shadow-inner">
                              <Leaf className="w-full h-full text-[#1B2A6B] opacity-10" />
                           </div>
                        </div>
                        
                        {/* Data */}
                        <div className="flex-1 flex flex-col justify-center">
                           <div className="mb-4">
                              <Badge className="bg-[#16A34A] hover:bg-[#16A34A] text-white px-3 py-1 text-sm font-medium border-transparent shadow-sm inline-flex items-center gap-1.5 rounded-full">
                                 <CheckCircle2 className="h-4 w-4" />
                                 Đã xác thực nguồn gốc
                              </Badge>
                           </div>
                           
                           <h2 className="text-3xl font-bold text-[#1B2A6B] mb-6 leading-tight">Rau muống hữu cơ Đồng Nai</h2>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-8 bg-slate-50 p-5 rounded-xl border border-slate-100">
                              <div>
                                 <span className="text-slate-500 text-[13px] uppercase font-semibold tracking-wide block mb-1.5">Mã GTIN</span>
                                 <div className="flex items-center gap-2.5 font-bold text-slate-800 text-lg">
                                    <Barcode className="h-5 w-5 text-[#1B2A6B]/60" />
                                    8938507561023
                                 </div>
                              </div>
                              <div>
                                 <span className="text-slate-500 text-[13px] uppercase font-semibold tracking-wide block mb-1.5">Mã lô sản xuất</span>
                                 <div className="flex items-center gap-2.5 font-bold text-slate-800 text-lg">
                                    <PackageCheck className="h-5 w-5 text-[#1B2A6B]/60" />
                                    LOT-2024-0892-DN
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-4 pt-5 border-t border-slate-100">
                              <div className="flex items-start gap-3.5">
                                 <div className="bg-slate-100 p-2 rounded-lg">
                                    <Building2 className="h-5 w-5 text-[#1B2A6B]" />
                                 </div>
                                 <div className="pt-0.5">
                                    <span className="text-[13px] text-slate-500 font-medium block">Doanh nghiệp sản xuất</span>
                                    <span className="font-semibold text-slate-800 text-base">HTX Rau sạch Đồng Nai</span>
                                 </div>
                              </div>
                              <div className="flex items-start gap-3.5">
                                 <div className="bg-slate-100 p-2 rounded-lg">
                                    <MapPin className="h-5 w-5 text-[#1B2A6B]" />
                                 </div>
                                 <div className="pt-0.5">
                                    <span className="text-[13px] text-slate-500 font-medium block">Địa chỉ</span>
                                    <span className="font-semibold text-slate-800 text-base">Xã Bình Lợi, Huyện Vĩnh Cửu, TP Đồng Nai</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Detail Tabs/Sections */}
               <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                  <div className="flex border-b border-slate-200 bg-slate-50/50">
                     <button className="px-6 py-4 text-sm font-bold text-[#1B2A6B] border-b-2 border-[#E8650A] bg-white">Thông tin chi tiết</button>
                     <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Hồ sơ doanh nghiệp</button>
                  </div>
                  <CardContent className="p-6 sm:p-8 space-y-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                           <h4 className="flex items-center gap-2 font-bold text-[#1B2A6B] mb-2.5 text-[15px]">
                             <FileText className="h-4.5 w-4.5 text-[#E8650A]" /> Thành phần
                           </h4>
                           <p className="text-slate-600 text-[15px] leading-relaxed">100% Rau muống tươi hữu cơ. Không sử dụng thuốc bảo vệ thực vật hóa học, không phân bón hóa học.</p>
                        </div>
                        <div>
                           <h4 className="flex items-center gap-2 font-bold text-[#1B2A6B] mb-2.5 text-[15px]">
                             <MapPin className="h-4.5 w-4.5 text-[#E8650A]" /> Xuất xứ
                           </h4>
                           <p className="text-slate-600 text-[15px] leading-relaxed">Việt Nam (Được trồng và thu hoạch tại Vĩnh Cửu, Đồng Nai)</p>
                        </div>
                        <div>
                           <h4 className="flex items-center gap-2 font-bold text-[#1B2A6B] mb-2.5 text-[15px]">
                             <PackageCheck className="h-4.5 w-4.5 text-[#E8650A]" /> Quy cách đóng gói
                           </h4>
                           <p className="text-slate-600 text-[15px] leading-relaxed">Túi sinh học 500g. Có dán tem truy xuất nguồn gốc chống hàng giả của tỉnh Đồng Nai.</p>
                        </div>
                        <div>
                           <h4 className="flex items-center gap-2 font-bold text-[#1B2A6B] mb-2.5 text-[15px]">
                             <Calendar className="h-4.5 w-4.5 text-[#E8650A]" /> Hạn sử dụng
                           </h4>
                           <p className="text-slate-600 text-[15px] leading-relaxed">5 ngày kể từ ngày thu hoạch (Bảo quản tốt nhất ở nhiệt độ 5-8°C)</p>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-slate-100">
                        <h4 className="font-bold text-[#1B2A6B] mb-4 text-[15px]">Chứng nhận đạt được</h4>
                        <div className="flex flex-wrap gap-3">
                           <div className="px-4 py-2 bg-blue-50/80 text-[#1B2A6B] rounded-lg text-sm font-semibold border border-blue-200/50 flex items-center gap-2 shadow-sm">
                             🏆 VietGAP
                           </div>
                           <div className="px-4 py-2 bg-orange-50/80 text-[#E8650A] rounded-lg text-sm font-semibold border border-orange-200/50 flex items-center gap-2 shadow-sm">
                             ⭐ OCOP 3 sao
                           </div>
                           <div className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold border border-slate-200 flex items-center gap-2 shadow-sm">
                             📜 ISO 22000:2018
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Right Col - Timeline */}
            <div className="w-full lg:w-[420px] shrink-0">
               <Card className="border-slate-200 shadow-sm sticky top-24 rounded-2xl">
                  <CardContent className="p-6 sm:p-8">
                     <h3 className="text-xl font-bold text-[#1B2A6B] mb-8 flex items-center gap-2 pb-4 border-b border-slate-100">
                        🗺️ Hành trình truy xuất
                     </h3>

                     <div className="relative pl-7 border-l-[3px] border-slate-100 space-y-9">
                        
                        {/* Step 1 */}
                        <div className="relative">
                           <div className="absolute -left-[43px] top-0.5 bg-white p-1 rounded-full">
                              <div className="bg-emerald-100 p-2 rounded-full border-2 border-emerald-500 shadow-sm">
                                 <Leaf className="h-4 w-4 text-emerald-600" />
                              </div>
                           </div>
                           <div>
                              <div className="flex items-center justify-between mb-1">
                                 <h4 className="font-bold text-[#1B2A6B] text-base">Gieo trồng</h4>
                                 <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md tracking-wide">15/01/2024</span>
                              </div>
                              <p className="text-sm text-slate-500 mb-2.5 font-medium flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5"/>Đồng Nai</p>
                              <div className="bg-[#F7F9FC] p-3.5 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-sm">
                                 <span className="font-semibold text-slate-800">Diện tích:</span> 2.000m²<br/>
                                 <span className="font-semibold text-slate-800">Giống:</span> Muống trắng hạt giống F1
                              </div>
                           </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                           <div className="absolute -left-[43px] top-0.5 bg-white p-1 rounded-full">
                              <div className="bg-blue-100 p-2 rounded-full border-2 border-blue-500 shadow-sm">
                                 <Droplets className="h-4 w-4 text-blue-600" />
                              </div>
                           </div>
                           <div>
                              <div className="flex items-center justify-between mb-1">
                                 <h4 className="font-bold text-[#1B2A6B] text-base">Chăm sóc & Giám sát</h4>
                                 <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md tracking-wide">15/01 - 20/03</span>
                              </div>
                              <p className="text-sm text-slate-500 mb-2.5 font-medium flex items-center gap-1.5"><FileText className="h-3.5 w-3.5"/>Nhật ký nông vụ điện tử</p>
                              <div className="bg-[#F7F9FC] p-3.5 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-sm">
                                 3 lần kiểm tra chất lượng đất và nước định kỳ. Chỉ sử dụng phân bón hữu cơ vi sinh.
                              </div>
                           </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                           <div className="absolute -left-[43px] top-0.5 bg-white p-1 rounded-full">
                              <div className="bg-purple-100 p-2 rounded-full border-2 border-purple-500 shadow-sm">
                                 <Microscope className="h-4 w-4 text-purple-600" />
                              </div>
                           </div>
                           <div>
                              <div className="flex items-center justify-between mb-1">
                                 <h4 className="font-bold text-[#1B2A6B] text-base">Kiểm nghiệm</h4>
                                 <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md tracking-wide">22/03/2024</span>
                              </div>
                              <p className="text-sm text-slate-500 mb-2.5 font-medium flex items-center gap-1.5 leading-snug"><Building2 className="h-3.5 w-3.5 shrink-0"/>Trung tâm kỹ thuật đo lường chất lượng</p>
                              <div className="bg-[#F7F9FC] p-3.5 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-sm">
                                 <span className="text-emerald-600 font-bold flex items-center gap-1.5 mb-1.5 bg-emerald-50 w-fit px-2 py-0.5 rounded-md"><CheckCircle2 className="h-3.5 w-3.5"/> Đạt chuẩn VietGAP</span>
                                 <span className="text-slate-600">Không phát hiện tồn dư thuốc bảo vệ thực vật.</span>
                              </div>
                           </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative">
                           <div className="absolute -left-[43px] top-0.5 bg-white p-1 rounded-full">
                              <div className="bg-orange-100 p-2 rounded-full border-2 border-orange-500 shadow-sm">
                                 <PackageCheck className="h-4 w-4 text-orange-600" />
                              </div>
                           </div>
                           <div>
                              <div className="flex items-center justify-between mb-1">
                                 <h4 className="font-bold text-[#1B2A6B] text-base">Thu hoạch & Đóng gói</h4>
                                 <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md tracking-wide">25/03/2024</span>
                              </div>
                              <p className="text-sm text-slate-500 mb-2.5 font-medium flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5"/>Xưởng sơ chế HTX Đồng Nai</p>
                              <div className="bg-[#F7F9FC] p-3.5 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-sm">
                                 <span className="font-semibold text-slate-800">Khối lượng:</span> 500kg<br/>
                                 <span className="font-semibold text-slate-800">Lô sản xuất:</span> LOT-2024-0892-DN
                              </div>
                           </div>
                        </div>

                        {/* Step 5 */}
                        <div className="relative">
                           <div className="absolute -left-[43px] top-0.5 bg-white p-1 rounded-full">
                              <div className="bg-[#1B2A6B]/10 p-2 rounded-full border-2 border-[#1B2A6B] shadow-sm">
                                 <Store className="h-4 w-4 text-[#1B2A6B]" />
                              </div>
                           </div>
                           <div>
                              <div className="flex items-center justify-between mb-1">
                                 <h4 className="font-bold text-[#1B2A6B] text-base">Phân phối</h4>
                                 <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md tracking-wide">26/03/2024</span>
                              </div>
                              <p className="text-sm text-slate-500 mb-2.5 font-medium flex items-center gap-1.5"><Store className="h-3.5 w-3.5"/>Các siêu thị đối tác</p>
                              <div className="bg-[#F7F9FC] p-3.5 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-sm">
                                 Đã giao hàng thành công tới: Big C Biên Hòa, Co.op Mart Long Khánh, Lotte Mart Đồng Nai.
                              </div>
                           </div>
                        </div>

                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </main>
      
      <footer className="mt-20 bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
             <img src="/__mockup/images/logo-skhcn.png" alt="Logo Sở KHCN Đồng Nai" className="h-12 w-12 object-contain bg-slate-50 rounded-full" />
             <div>
               <h4 className="font-bold text-[#1B2A6B] text-base">Hệ thống Truy xuất nguồn gốc Thành phố Đồng Nai</h4>
               <p className="text-sm text-slate-500 mt-1">Cơ quan chủ quản: Sở Khoa học và Công nghệ Thành phố Đồng Nai</p>
             </div>
           </div>
           <div className="text-sm text-slate-500 text-right">
             <p>© 2024 Đồng Nai Trace. Tất cả quyền được bảo lưu.</p>
             <div className="flex items-center gap-4 mt-2 justify-end">
               <a href="#" className="hover:text-[#E8650A]">Điều khoản sử dụng</a>
               <a href="#" className="hover:text-[#E8650A]">Chính sách bảo mật</a>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
