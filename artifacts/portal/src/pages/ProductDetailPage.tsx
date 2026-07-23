import React, { useState } from 'react';
import { Link, useParams } from 'wouter';
import {
  ArrowLeft, ShieldCheck, MapPin, Phone, Mail, Globe,
  Calendar, Truck, Store, Package, CheckCircle2, ChevronDown,
  QrCode, Download, Building2, Leaf, Award, ExternalLink
} from 'lucide-react';

const PRODUCTS: Record<string, any> = {
  sp001: {
    name: 'Bưởi Tân Triều', category: 'Nông sản & Rau củ', gtin: '8934113001234',
    origin: 'Xã Tân Triều, Huyện Vĩnh Cửu, Tỉnh Đồng Nai',
    brand: 'Bưởi Tân Triều Đồng Nai',
    description: 'Bưởi Tân Triều là đặc sản nổi tiếng của vùng đất Vĩnh Cửu, Đồng Nai. Được trồng theo quy trình VietGAP, không sử dụng hóa chất độc hại, đảm bảo an toàn cho người tiêu dùng.',
    weight: '1.0 - 1.5 kg/quả', packaging: 'Túi lưới + nhãn TXNG', expiry: '15 ngày (nhiệt độ thường)',
    ingredients: 'Bưởi nguyên quả 100% tự nhiên',
    certs: [
      { name: 'VietGAP', issuer: 'Sở Nông nghiệp tỉnh Đồng Nai', date: '01/10/2023', expiry: '30/09/2025', color: 'emerald' },
      { name: 'OCOP 4 sao', issuer: 'UBND Tỉnh Đồng Nai', date: '15/06/2023', expiry: '14/06/2026', color: 'orange' },
    ],
    org: { name: 'HTX Nông nghiệp Xanh Tân Triều', address: 'Xã Tân Triều, Vĩnh Cửu, Đồng Nai', phone: '0251.3822297', email: 'htxnongnghi@dongnai.gov.vn', website: '' },
    journey: [
      { icon: 'leaf', label: 'Gieo trồng & Chăm sóc', detail: 'Vùng trồng: Khu A, Xã Tân Triều — Diện tích: 5ha', date: '01/09/2023', status: 'done', cert: 'Đạt chuẩn VietGAP' },
      { icon: 'calendar', label: 'Thu hoạch', detail: 'Lô: L-20231015-01 — Số lượng: 2.500 quả', date: '15/10/2023 06:30', status: 'done', cert: '' },
      { icon: 'package', label: 'Phân loại & Đóng gói', detail: 'Xưởng đóng gói số 1, HTX Nông nghiệp Xanh', date: '15/10/2023 09:00', status: 'done', cert: 'Kiểm tra VSATTP' },
      { icon: 'truck', label: 'Vận chuyển', detail: 'Đơn vị: Logistics Nam Phát — Xe lạnh ĐN-12345', date: '15/10/2023 14:00', status: 'done', cert: '' },
      { icon: 'store', label: 'Phân phối', detail: 'Co.opmart Biên Hòa — Quầy Nông sản tươi', date: '16/10/2023 07:00', status: 'done', cert: '' },
    ],
    img: 'https://picsum.photos/seed/buoi/600/400',
    lotCode: 'L-20231015-01',
    harvestDate: '15/10/2023',
    syncDate: '15/10/2023 18:00',
    provider: 'Verigoods Platform',
  },
  sp002: {
    name: 'Rau muống hữu cơ VietGAP', category: 'Nông sản & Rau củ', gtin: '8934567890123',
    origin: 'Xã Bình Lộc, Huyện Long Khánh, Tỉnh Đồng Nai',
    brand: 'Rau sạch Đồng Nai',
    description: 'Rau muống hữu cơ được trồng theo tiêu chuẩn VietGAP, không dùng thuốc trừ sâu hóa học. Thu hoạch và đóng gói trong vòng 4 giờ để đảm bảo độ tươi ngon tối đa.',
    weight: '300g/bó', packaging: 'Túi PE có logo TXNG', expiry: '3-5 ngày (bảo quản lạnh)',
    ingredients: 'Rau muống hữu cơ 100%',
    certs: [
      { name: 'VietGAP', issuer: 'Sở Nông nghiệp tỉnh Đồng Nai', date: '20/08/2023', expiry: '19/08/2025', color: 'emerald' },
    ],
    org: { name: 'Trang trại Sạch Đồng Nai', address: 'Xã Bình Lộc, Long Khánh, Đồng Nai', phone: '0938123456', email: 'trangtrai@sach.vn', website: '' },
    journey: [
      { icon: 'leaf', label: 'Gieo trồng', detail: 'Vùng trồng: Ô B5, Trang trại Sạch Đồng Nai', date: '01/10/2023', status: 'done', cert: 'VietGAP' },
      { icon: 'calendar', label: 'Thu hoạch', detail: 'Lô: L-20231015-02 — Số lượng: 500kg', date: '15/10/2023 05:30', status: 'done', cert: '' },
      { icon: 'package', label: 'Đóng gói', detail: 'Nhà đóng gói số 2, Trang trại Sạch', date: '15/10/2023 07:00', status: 'done', cert: '' },
      { icon: 'truck', label: 'Vận chuyển', detail: 'Xe lạnh ĐN-67890', date: '15/10/2023 08:00', status: 'done', cert: '' },
      { icon: 'store', label: 'Phân phối', detail: 'Chợ Biên Hòa & Siêu thị WIN Đồng Nai', date: '15/10/2023 10:00', status: 'done', cert: '' },
    ],
    img: 'https://picsum.photos/seed/raumuong/600/400',
    lotCode: 'L-20231015-02',
    harvestDate: '15/10/2023',
    syncDate: '15/10/2023 10:30',
    provider: 'Verigoods Platform',
  },
};

const DEFAULT_PRODUCT = {
  name: 'Sản phẩm đã đăng ký', category: 'Nông sản & Rau củ', gtin: '8934000000000',
  origin: 'Tỉnh Đồng Nai', brand: 'Đồng Nai Trace',
  description: 'Sản phẩm đã được đăng ký và xác thực trên hệ thống Đồng Nai Trace.',
  weight: 'Xem nhãn sản phẩm', packaging: 'Xem nhãn', expiry: 'Xem nhãn sản phẩm',
  ingredients: 'Xem nhãn sản phẩm',
  certs: [{ name: 'Đã đăng ký', issuer: 'Sở KH&CN Đồng Nai', date: '01/01/2024', expiry: '31/12/2025', color: 'blue' }],
  org: { name: 'Doanh nghiệp Đồng Nai', address: 'Tỉnh Đồng Nai', phone: '0251.3822297', email: 'skhcn@dongnai.gov.vn', website: '' },
  journey: [
    { icon: 'package', label: 'Đăng ký sản phẩm', detail: 'Sản phẩm đã được đăng ký trên hệ thống Đồng Nai Trace', date: '01/01/2024', status: 'done', cert: '' },
    { icon: 'checkCircle', label: 'Phê duyệt', detail: 'Sở KH&CN Đồng Nai phê duyệt', date: '05/01/2024', status: 'done', cert: 'Xác thực' },
  ],
  img: 'https://picsum.photos/seed/product/600/400',
  lotCode: 'L-2024-001',
  harvestDate: '01/01/2024',
  syncDate: '01/01/2024',
  provider: 'Đồng Nai Trace',
};

const certColorMap: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
};

const journeyIconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  package: <Package className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  store: <Store className="w-5 h-5" />,
  checkCircle: <CheckCircle2 className="w-5 h-5" />,
};

const journeyBg: Record<string, string> = {
  leaf: 'bg-emerald-100 text-emerald-600',
  calendar: 'bg-blue-100 text-blue-600',
  package: 'bg-violet-100 text-violet-600',
  truck: 'bg-sky-100 text-sky-600',
  store: 'bg-amber-100 text-amber-600',
  checkCircle: 'bg-green-100 text-green-600',
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = PRODUCTS[params.id] || DEFAULT_PRODUCT;
  const [expandedCert, setExpandedCert] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Topbar */}
      <div className="bg-[#1B2A6B] py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/tra-cuu" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kết quả tra cứu
          </Link>
          <Link href="/" className="text-blue-200 hover:text-white text-sm transition-colors">Trang chủ</Link>
        </div>
      </div>

      {/* Verified banner */}
      <div className="bg-emerald-500 py-3 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-white">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-semibold text-sm">Sản phẩm đã được xác thực nguồn gốc trên hệ thống Đồng Nai Trace</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="md:flex gap-0">
                <div className="md:w-72 h-56 md:h-auto shrink-0 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-bold text-[#E8650A] uppercase tracking-wider">{product.category}</span>
                      <h1 className="text-2xl font-extrabold text-[#1B2A6B] mt-1 leading-tight">{product.name}</h1>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700">Đã xác thực</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">Thương hiệu</span>
                      <span className="font-semibold text-gray-800">{product.brand}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">Mã GTIN</span>
                      <span className="font-mono font-semibold text-gray-800">{product.gtin}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">Mã lô</span>
                      <span className="font-mono font-semibold text-gray-800">{product.lotCode}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">Ngày thu hoạch</span>
                      <span className="font-semibold text-gray-800">{product.harvestDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Thông tin sản phẩm</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Xuất xứ', value: product.origin, icon: <MapPin className="w-4 h-4 text-[#1B2A6B]" /> },
                  { label: 'Khối lượng / Quy cách', value: product.weight, icon: <Package className="w-4 h-4 text-[#1B2A6B]" /> },
                  { label: 'Bao bì đóng gói', value: product.packaging, icon: <Package className="w-4 h-4 text-[#1B2A6B]" /> },
                  { label: 'Hạn sử dụng', value: product.expiry, icon: <Calendar className="w-4 h-4 text-[#1B2A6B]" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold text-gray-800">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs text-gray-500 mb-1">Thành phần</div>
                <div className="text-sm font-medium text-gray-800">{product.ingredients}</div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E8650A]" /> Chứng nhận chất lượng
              </h2>
              <div className="space-y-3">
                {product.certs.map((cert: any, i: number) => (
                  <div key={i} className={`border rounded-xl overflow-hidden ${certColorMap[cert.color]}`}>
                    <button
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setExpandedCert(expandedCert === i ? null : i)}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span className="font-bold">{cert.name}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedCert === i ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedCert === i && (
                      <div className="px-4 pb-4 pt-0 space-y-1 text-sm">
                        <div><span className="font-medium">Đơn vị cấp:</span> {cert.issuer}</div>
                        <div><span className="font-medium">Ngày cấp:</span> {cert.date}</div>
                        <div><span className="font-medium">Hiệu lực đến:</span> {cert.expiry}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#1B2A6B]" /> Hành trình truy xuất nguồn gốc
              </h2>
              <p className="text-xs text-gray-400 mb-6 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Dữ liệu đồng bộ từ {product.provider} lúc {product.syncDate}
              </p>

              <div className="relative">
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-emerald-100"></div>
                <div className="space-y-6">
                  {product.journey.map((step: any, i: number) => (
                    <div key={i} className="relative flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ring-4 ring-white ${journeyBg[step.icon] || 'bg-gray-100 text-gray-500'}`}>
                        {journeyIconMap[step.icon] || <Package className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 pt-2 pb-4 border-b border-slate-100 last:border-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-gray-800">{step.label}</div>
                            <div className="text-sm text-gray-500 mt-0.5">{step.detail}</div>
                            {step.cert && (
                              <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <CheckCircle2 className="w-3 h-3" /> {step.cert}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{step.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* QR Code */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
              <QrCode className="w-8 h-8 text-[#1B2A6B] mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-3">Mã QR truy xuất</h3>
              <div className="inline-block p-3 bg-white border-2 border-[#1B2A6B]/10 rounded-xl shadow-sm mb-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=dongnaitrace-${params.id}&margin=4`}
                  alt="QR Code"
                  className="w-40 h-40"
                />
              </div>
              <p className="text-xs text-gray-500 mb-4">Quét mã để xem thông tin trên điện thoại</p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#1B2A6B] text-[#1B2A6B] rounded-md text-sm font-semibold hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" /> Tải mã QR
              </button>
            </div>

            {/* Producer info */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#1B2A6B]" /> Nhà sản xuất
              </h3>
              <div className="space-y-3">
                <div className="font-semibold text-[#1B2A6B]">{product.org.name}</div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{product.org.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{product.org.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{product.org.email}</span>
                </div>
              </div>
            </div>

            {/* Platform info */}
            <div className="bg-[#1B2A6B] rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm">Đồng Nai Trace</span>
              </div>
              <p className="text-xs text-blue-200 leading-relaxed mb-3">
                Thông tin truy xuất nguồn gốc được xác thực và đồng bộ bởi Sở Khoa học và Công nghệ Thành phố Đồng Nai.
              </p>
              <div className="text-xs text-blue-300">
                Nền tảng vận hành bởi đơn vị được ủy quyền theo Quyết định của UBND Tỉnh Đồng Nai.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
