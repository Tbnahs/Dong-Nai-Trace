import React from 'react';
import { Search, ChevronDown, Menu, CheckCircle2, Factory, Package, Link2, Smartphone, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function PortalHome() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col overflow-y-auto" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');
      `}} />

      {/* 1. Header (sticky) */}
      <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <img src="/__mockup/images/logo-skhcn.png" alt="Sở KH&CN Đồng Nai" className="h-10 w-auto" />
            <div className="hidden md:flex flex-col justify-center">
              <h1 className="text-lg font-bold leading-tight" style={{ color: '#1B2A6B' }}>Đồng Nai Trace</h1>
              <p className="text-[10px] text-gray-500 uppercase font-medium tracking-wider">Hệ thống Truy xuất nguồn gốc</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600 h-full">
            <a href="#" className="text-[#1B2A6B] font-semibold border-b-2 border-[#1B2A6B] h-full flex items-center px-1">Trang chủ</a>
            <a href="#" className="hover:text-[#1B2A6B] transition-colors h-full flex items-center px-1 border-b-2 border-transparent hover:border-[#1B2A6B]/30">Tra cứu</a>
            <a href="#" className="hover:text-[#1B2A6B] transition-colors h-full flex items-center px-1 border-b-2 border-transparent hover:border-[#1B2A6B]/30">Doanh nghiệp/HTX</a>
            <a href="#" className="hover:text-[#1B2A6B] transition-colors h-full flex items-center px-1 border-b-2 border-transparent hover:border-[#1B2A6B]/30">Kết quả TXNG Quốc gia</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer mr-2 hover:text-[#1B2A6B] transition-colors">
              <span className="font-medium">VI</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Button variant="outline" className="border-[#1B2A6B] text-[#1B2A6B] hover:bg-[#1B2A6B] hover:text-white transition-colors h-9 px-4 rounded-md">
              Đăng nhập DN
            </Button>
            <Button className="bg-[#E8650A] hover:bg-[#c95708] text-white transition-colors shadow-sm h-9 px-5 rounded-md">
              Đăng ký
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <section className="relative w-full overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2A3F8A 100%)' }}>
          <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1595859702955-4927b5e40e23?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
          
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl leading-[1.2]">
              Tra cứu nguồn gốc sản phẩm Đồng Nai
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl font-light">
              Tra cứu thông tin truy xuất nguồn gốc các sản phẩm, hàng hóa đã được chứng nhận tại Thành phố Đồng Nai
            </p>

            {/* Search Box */}
            <div className="w-full max-w-3xl bg-white rounded-xl p-2 flex flex-col md:flex-row shadow-2xl mb-6 border border-white/20">
              <div className="flex-1 flex items-center px-4 bg-white rounded-lg">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input 
                  type="text" 
                  placeholder="Quét hoặc nhập tên sản phẩm, doanh nghiệp, mã GTIN hoặc mã lô/mẻ..." 
                  className="border-0 shadow-none focus-visible:ring-0 text-base h-12 w-full px-0 font-medium placeholder:text-gray-400 placeholder:font-normal"
                />
              </div>
              <Button className="bg-[#E8650A] hover:bg-[#c95708] text-white h-12 px-8 rounded-lg text-base font-medium mt-2 md:mt-0 w-full md:w-auto shadow-sm">
                Tìm kiếm
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 text-sm">
              <span className="text-blue-200 py-1">Gợi ý:</span>
              <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors text-sm border border-white/10">Tiêu hút chân không</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors text-sm border border-white/10">Rau hữu cơ</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors text-sm border border-white/10">Thịt heo sạch</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors text-sm border border-white/10">Mật ong</button>
            </div>

            <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-6 transition-all hover:border-white/50">
              <Smartphone className="mr-2 h-4 w-4" />
              Quét mã QR — Tải ứng dụng
            </Button>
          </div>
        </section>

        {/* 3. Thống kê tổng quan */}
        <section className="py-12 bg-white border-b relative z-20 shadow-sm shrink-0">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-[#1B2A6B]">
                  <Factory className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1" style={{ color: '#1B2A6B' }}>1.247</h3>
                <p className="text-sm text-gray-500 font-medium">Doanh nghiệp/HTX</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center mb-4 text-[#E8650A]">
                  <Package className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1" style={{ color: '#E8650A' }}>4.892</h3>
                <p className="text-sm text-gray-500 font-medium">Sản phẩm công bố</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                  <Link2 className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1" style={{ color: '#4F46E5' }}>23.104</h3>
                <p className="text-sm text-gray-500 font-medium">Mã truy xuất đồng bộ</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center mb-4 text-[#16A34A]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1" style={{ color: '#16A34A' }}>98.7%</h3>
                <p className="text-sm text-gray-500 font-medium">Tra cứu thành công</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Danh mục ngành hàng */}
        <section className="py-16 bg-[#F7F9FC] shrink-0">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold" style={{ color: '#1B2A6B' }}>Khám phá theo ngành hàng</h3>
              <div className="w-16 h-1 bg-[#E8650A] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[
                { name: 'Nông sản & Rau củ quả', icon: '🌾' },
                { name: 'Thủy sản', icon: '🐟' },
                { name: 'Thịt & Sản phẩm chăn nuôi', icon: '🥩' },
                { name: 'Thực phẩm chế biến', icon: '🍯' },
                { name: 'Thủ công mỹ nghệ', icon: '🌺' },
                { name: 'Công nghiệp chế biến', icon: '🏭' },
                { name: 'Dược liệu & Thảo dược', icon: '🌿' },
                { name: 'Khác', icon: '📋' },
              ].map((category, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-transparent hover:-translate-y-1 bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-sm">{category.icon}</span>
                    <span className="font-semibold text-gray-800 text-sm">{category.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Sản phẩm tiêu biểu */}
        <section className="py-16 bg-white shrink-0">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10 border-b pb-4">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: '#1B2A6B' }}>Sản phẩm tiêu biểu mới cập nhật</h3>
                <div className="w-16 h-1 bg-[#E8650A] mt-4 rounded-full"></div>
              </div>
              <a href="#" className="text-[#E8650A] font-semibold hover:underline text-sm hidden md:flex items-center">
                Xem tất cả 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Sầu riêng Dona VietGAP', company: 'HTX Nông nghiệp Tân Phú', cat: 'Nông sản', img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=500&q=80' },
                { name: 'Bưởi Tân Triều', company: 'Công ty CP Nông sản Đồng Nai', cat: 'Nông sản', img: 'https://images.unsplash.com/photo-1557297395-e21897c88dfc?w=500&q=80' },
                { name: 'Mật ong rừng tràm nguyên chất', company: 'Cơ sở Mật ong Phương Nam', cat: 'Thực phẩm', img: 'https://images.unsplash.com/photo-1587049352847-4d4b126a51ce?w=500&q=80' },
                { name: 'Thịt heo thảo mộc', company: 'Trang trại Heo Sinh thái Vĩnh Cửu', cat: 'Chăn nuôi', img: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=500&q=80' },
              ].map((product, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-gray-100 flex flex-col h-full bg-white rounded-xl">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/95 text-[#16A34A] border-none font-semibold shadow-md hover:bg-white backdrop-blur-sm flex items-center py-1 px-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Đã xác thực
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <Badge variant="outline" className="w-fit mb-3 text-xs font-medium text-gray-600 border-gray-200 bg-gray-50">
                      {product.cat}
                    </Badge>
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug hover:text-[#1B2A6B] cursor-pointer" title={product.name}>{product.name}</h4>
                    <div className="mt-auto pt-3 border-t border-gray-50">
                      <p className="text-sm text-gray-500 line-clamp-1 flex items-center">
                        <Factory className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        {product.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" className="border-[#E8650A] text-[#E8650A] w-full">
                Xem tất cả sản phẩm
              </Button>
            </div>
          </div>
        </section>

        {/* 6. Banner */}
        <section className="py-12 bg-white shrink-0 pb-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl overflow-hidden relative shadow-lg" style={{ background: 'linear-gradient(90deg, #fff7ed 0%, #ffedd5 100%)' }}>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#E8650A] opacity-[0.03] skew-x-12 translate-x-10"></div>
              <div className="absolute right-[10%] top-0 bottom-0 w-64 bg-white opacity-20 blur-3xl"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative z-10">
                <div className="mb-6 md:mb-0 max-w-2xl text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight" style={{ color: '#E8650A' }}>
                    Doanh nghiệp chưa tham gia hệ thống TXNG Đồng Nai?
                  </h3>
                  <p className="text-orange-900/80 text-lg">
                    Đăng ký ngay để minh bạch nguồn gốc, nâng cao giá trị thương hiệu và tạo niềm tin cho người tiêu dùng.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
                  <Button className="bg-[#E8650A] hover:bg-[#c95708] text-white h-12 px-8 text-base shadow-md w-full sm:w-auto">
                    Đăng ký ngay
                  </Button>
                  <Button variant="outline" className="bg-white border-[#E8650A] text-[#E8650A] hover:bg-orange-50 h-12 px-6 shadow-sm w-full sm:w-auto">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-white border-t pt-16 pb-8 shrink-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 lg:gap-12 mb-12">
            {/* Col 1 */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <img src="/__mockup/images/logo-skhcn.png" alt="Sở KH&CN Đồng Nai" className="h-14 w-auto" />
                <div>
                  <h4 className="font-bold text-xl leading-tight" style={{ color: '#1B2A6B' }}>Đồng Nai Trace</h4>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-0.5">Hệ thống Truy xuất nguồn gốc</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-1 text-[#E8650A] shrink-0" />
                  <p className="leading-relaxed"><strong>Sở Khoa học và Công nghệ Thành phố Đồng Nai</strong><br/>Số 123 Đường XYZ, Khóm Y, Phường Z, TP. Biên Hòa, Tỉnh Đồng Nai</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-[#E8650A] shrink-0" />
                  <p className="font-medium">0251 382 1234</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-[#E8650A] shrink-0" />
                  <p>contact@skhcn.dongnai.gov.vn</p>
                </div>
              </div>
            </div>

            {/* Col 2 */}
            <div className="md:col-span-3 lg:col-span-4">
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-wider flex items-center">
                <span className="w-1.5 h-4 bg-[#1B2A6B] mr-2 inline-block"></span>
                Liên kết nhanh
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#E8650A] hover:translate-x-1 inline-block transition-transform">Trang chủ</a></li>
                <li><a href="#" className="hover:text-[#E8650A] hover:translate-x-1 inline-block transition-transform">Tra cứu nguồn gốc</a></li>
                <li><a href="#" className="hover:text-[#E8650A] hover:translate-x-1 inline-block transition-transform">Đăng ký Doanh nghiệp / HTX</a></li>
                <li><a href="#" className="hover:text-[#E8650A] hover:translate-x-1 inline-block transition-transform">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="hover:text-[#E8650A] hover:translate-x-1 inline-block transition-transform">Chính sách bảo mật & Điều khoản</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-wider flex items-center">
                <span className="w-1.5 h-4 bg-[#1B2A6B] mr-2 inline-block"></span>
                Kết nối Cổng Quốc gia
              </h4>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">Hệ thống được liên thông trực tiếp với Cổng truy xuất nguồn gốc sản phẩm, hàng hóa quốc gia theo chuẩn Bộ KH&CN.</p>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full mx-auto flex items-center justify-center mb-3 shadow-inner">
                    <span className="font-bold text-2xl">★</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 block uppercase tracking-wide">Cổng Truy xuất nguồn gốc<br/>Quốc gia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} <strong>Sở Khoa học và Công nghệ Thành phố Đồng Nai</strong>. Bản quyền được bảo lưu.</p>
            <p className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">Phiên bản Hệ thống 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
