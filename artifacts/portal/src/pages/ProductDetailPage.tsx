import React, { useState } from 'react';
import { Link, useParams } from 'wouter';
import {
  ArrowLeft, ShieldCheck, MapPin, Phone, Mail, Building2,
  Download, Share2, Leaf, Calendar, Package, Truck, Store,
  CheckCircle2, Info, FlaskConical,
} from 'lucide-react';

// ─── Product data ─────────────────────────────────────────────────────────────
const PRODUCTS: Record<string, any> = {
  sp001: {
    name: 'Bưởi Tân Triều',
    traceCode: 'TXNG-VCU-001-2024',
    cert: 'VietGAP',
    certColor: 'text-emerald-600 bg-emerald-50',
    origin: 'Tân Triều, Vĩnh Cửu, Đồng Nai',
    packaging: 'Túi lưới 1.0–1.5 kg/quả',
    updateDate: '15/10/2024',
    orgShort: 'HTX Nông nghiệp Xanh',
    description: 'Bưởi Tân Triều là đặc sản nổi tiếng của vùng đất Vĩnh Cửu, Đồng Nai. Được trồng theo quy trình VietGAP, không sử dụng hóa chất độc hại, đảm bảo an toàn cho người tiêu dùng.',
    img: 'https://picsum.photos/seed/buoi/600/500',
    gtin: '8934113001234',
    lotCode: 'L-20241015-01',
    weight: '1.0 – 1.5 kg/quả',
    expiry: '15 ngày (nhiệt độ thường)',
    ingredients: 'Bưởi nguyên quả 100% tự nhiên',
    certs: [{ name: 'VietGAP', issuer: 'Sở NN&PTNT tỉnh Đồng Nai', date: '01/10/2023', expiry: '30/09/2025' }],
    org: { name: 'HTX Nông nghiệp Xanh Tân Triều', address: 'Xã Tân Triều, Vĩnh Cửu, Đồng Nai', phone: '0251 890 123', email: 'htx@nongnghi.vn', type: 'Hợp tác xã', products: 5, cert: 'VietGAP' },
    journey: [
      { icon: 'leaf', label: 'Gieo trồng', date: '1/7/2024', detail: 'Gieo hạt giống được kiểm định, đất được xử lý theo chuẩn VietGAP.', location: 'Vườn A – Tân Triều', org: 'HTX Nông nghiệp Xanh' },
      { icon: 'flask', label: 'Chăm sóc', date: '8/7/2024', detail: 'Tưới nước, bón phân hữu cơ theo lịch, kiểm tra sâu bệnh định kỳ.', location: 'Vườn A – Tân Triều', org: 'HTX Nông nghiệp Xanh' },
      { icon: 'calendar', label: 'Thu hoạch', date: '14/7/2024', detail: 'Thu hoạch đợt 1, đạt tiêu chuẩn kích thước và màu sắc, không có dấu hiệu bệnh.', location: 'Vườn A – Tân Triều', org: 'HTX Nông nghiệp Xanh' },
      { icon: 'package', label: 'Đóng gói', date: '14/7/2024', detail: 'Đóng gói, dán nhãn mã QR truy xuất nguồn gốc, kiểm tra VSATTP.', location: 'Nhà đóng gói HTX', org: 'HTX Nông nghiệp Xanh' },
      { icon: 'truck', label: 'Vận chuyển & Phân phối', date: '15/7/2024', detail: 'Vận chuyển bằng xe lạnh đến điểm phân phối Co.opmart Biên Hòa.', location: 'Co.opmart Biên Hòa', org: 'Logistics Nam Phát' },
    ],
  },
  sp002: {
    name: 'Rau muống hữu cơ VietGAP',
    traceCode: 'TXNG-XL-001-2024',
    cert: 'VietGAP',
    certColor: 'text-emerald-600 bg-emerald-50',
    origin: 'Xuân Lộc, Đồng Nai',
    packaging: 'Bó 500g – 1kg',
    updateDate: '15/7/2024',
    orgShort: 'HTX Nông nghiệp Xuân Lộc',
    description: 'Rau muống được trồng theo tiêu chuẩn VietGAP, không sử dụng thuốc bảo vệ thực vật, đảm bảo an toàn thực phẩm.',
    img: 'https://picsum.photos/seed/raumuong/600/500',
    gtin: '8934567890123',
    lotCode: 'L-20240715-02',
    weight: '300g/bó',
    expiry: '3–5 ngày (bảo quản lạnh)',
    ingredients: 'Rau muống hữu cơ 100%',
    certs: [{ name: 'VietGAP', issuer: 'Sở NN&PTNT tỉnh Đồng Nai', date: '20/08/2023', expiry: '19/08/2025' }],
    org: { name: 'HTX Nông nghiệp Xuân Lộc', address: 'Xã Xuân Thọ, Xuân Lộc, Đồng Nai', phone: '0251 555 666', email: 'htx@xuanloc.vn', type: 'Hợp tác xã', products: 4, cert: 'VietGAP' },
    journey: [
      { icon: 'leaf', label: 'Gieo trồng', date: '1/7/2024', detail: 'Gieo hạt giống được kiểm định, đất được xử lý theo chuẩn VietGAP.', location: 'Vườn A – Xuân Lộc', org: 'HTX Nông nghiệp Xuân Lộc' },
      { icon: 'flask', label: 'Chăm sóc', date: '8/7/2024', detail: 'Tưới nước, bón phân hữu cơ theo lịch, kiểm tra sâu bệnh định kỳ.', location: 'Vườn A – Xuân Lộc', org: 'HTX Nông nghiệp Xuân Lộc' },
      { icon: 'calendar', label: 'Thu hoạch', date: '14/7/2024', detail: 'Thu hoạch đợt 1, đạt tiêu chuẩn kích thước và màu sắc, không có dấu hiệu bệnh.', location: 'Vườn A – Xuân Lộc', org: 'HTX Nông nghiệp Xuân Lộc' },
    ],
  },
  sp003: {
    name: 'Tôm sú đông lạnh',
    traceCode: 'TXNG-LTH-003-2024',
    cert: 'HACCP',
    certColor: 'text-purple-600 bg-purple-50',
    origin: 'Long Thành, Đồng Nai',
    packaging: 'Hộp 500g',
    updateDate: '10/8/2024',
    orgShort: 'Cty Thủy sản Đồng Nai',
    description: 'Tôm sú nuôi theo tiêu chuẩn HACCP, đông lạnh ngay sau thu hoạch, đảm bảo chất lượng và vệ sinh an toàn thực phẩm.',
    img: 'https://picsum.photos/seed/tomsu/600/500',
    gtin: '8934000003000',
    lotCode: 'L-20240810-03',
    weight: '500g/hộp',
    expiry: '24 tháng (đông lạnh)',
    ingredients: 'Tôm sú 100%',
    certs: [{ name: 'HACCP', issuer: 'Cục An toàn thực phẩm', date: '01/06/2023', expiry: '31/05/2026' }],
    org: { name: 'Công ty Thủy sản Đồng Nai', address: 'KCN Long Thành, Đồng Nai', phone: '0251 234 567', email: 'info@thuysandn.vn', type: 'Doanh nghiệp', products: 8, cert: 'HACCP' },
    journey: [
      { icon: 'leaf', label: 'Nuôi trồng', date: '1/6/2024', detail: 'Tôm sú được nuôi trong ao sạch, kiểm soát môi trường nước theo tiêu chuẩn HACCP.', location: 'Ao nuôi A1 – Long Thành', org: 'Cty Thủy sản Đồng Nai' },
      { icon: 'flask', label: 'Kiểm tra chất lượng', date: '5/8/2024', detail: 'Lấy mẫu kiểm tra kháng sinh, dư lượng hóa chất trước thu hoạch.', location: 'Lab KCS', org: 'Cty Thủy sản Đồng Nai' },
      { icon: 'calendar', label: 'Thu hoạch', date: '8/8/2024', detail: 'Thu hoạch, phân loại theo kích cỡ, rửa sạch bằng nước muối.', location: 'Ao nuôi A1 – Long Thành', org: 'Cty Thủy sản Đồng Nai' },
      { icon: 'package', label: 'Chế biến & Đông lạnh', date: '10/8/2024', detail: 'Đông lạnh IQF, đóng gói hút chân không, dán nhãn TXNG.', location: 'Nhà máy Long Thành', org: 'Cty Thủy sản Đồng Nai' },
    ],
  },
};

// Map-section product IDs fall back to a generic entry
const buildGeneric = (id: string, name: string, cert: string, origin: string, orgName: string) => ({
  name, traceCode: `TXNG-DN-${id.toUpperCase()}-2024`, cert,
  certColor: cert === 'VietGAP' ? 'text-emerald-600 bg-emerald-50' : cert.includes('OCOP') ? 'text-orange-600 bg-orange-50' : 'text-blue-600 bg-blue-50',
  origin, packaging: 'Theo tiêu chuẩn sản phẩm', updateDate: '01/01/2024', orgShort: orgName,
  description: `${name} được sản xuất tại ${origin}, đáp ứng tiêu chuẩn chất lượng ${cert}.`,
  img: `https://picsum.photos/seed/${id}/600/500`,
  gtin: `89340000${id.replace(/\D/g,'')}`, lotCode: `L-2024-${id.toUpperCase()}`, weight: 'Xem nhãn', expiry: 'Xem nhãn',
  ingredients: `${name} tự nhiên 100%`,
  certs: [{ name: cert, issuer: 'Sở NN&PTNT tỉnh Đồng Nai', date: '01/01/2024', expiry: '31/12/2025' }],
  org: { name: orgName, address: `${origin}, Đồng Nai`, phone: '0251 000 000', email: 'lienhe@dongnai.gov.vn', type: 'Tổ chức', products: 3, cert },
  journey: [
    { icon: 'leaf', label: 'Gieo trồng / Sản xuất', date: '01/01/2024', detail: `Sản xuất ${name} theo tiêu chuẩn ${cert}.`, location: origin, org: orgName },
    { icon: 'calendar', label: 'Thu hoạch / Hoàn thành', date: '15/01/2024', detail: 'Kiểm tra chất lượng, đóng gói, dán nhãn TXNG.', location: origin, org: orgName },
    { icon: 'truck', label: 'Phân phối', date: '20/01/2024', detail: 'Vận chuyển đến điểm bán, siêu thị, chợ địa phương.', location: 'Đồng Nai', org: orgName },
  ],
});

// Add generic entries for map-section product IDs
const MAP_PRODUCTS: Record<string, any> = {
  p1:  buildGeneric('p1',  'Xoài Cát Hòa Lộc',       'VietGAP',  'Bình Phước, Đồng Nai',  'HTX Nông nghiệp Bình Phước'),
  p3:  buildGeneric('p3',  'Chuối tiêu hồng',          'GlobalGAP','Đồng Xoài, Đồng Nai',   'Cty TNHH Xuất khẩu Đồng Xoài'),
  p4:  buildGeneric('p4',  'Rau muống hữu cơ',         'Hữu cơ',   'Phước Long, Đồng Nai',  'Trang trại Phước Long Xanh'),
  p5:  buildGeneric('p5',  'Cà chua bi VietGAP',       'VietGAP',  'Bình Tân, Đồng Nai',    'HTX Rau sạch Bình Tân'),
  p6:  buildGeneric('p6',  'Tiêu đen Lộc Ninh',        'OCOP 4★',  'Lộc Ninh, Đồng Nai',   'HTX Rau sạch Lộc Ninh'),
  p7:  buildGeneric('p7',  'Điều rang muối Long Hà',   'ISO 22000','Long Hà, Đồng Nai',     'HTX Cây ăn trái Long Hà'),
  p8:  buildGeneric('p8',  'Nấm linh chi Lộc Tấn',    'VietGAP',  'Lộc Tấn, Đồng Nai',    'Cty TNHH Nông sản Lộc Tấn'),
  p9:  buildGeneric('p9',  'Mật ong rừng Trị An',      'OCOP 3★',  'Trị An, Vĩnh Cửu',     'HTX Bưởi Vĩnh Cửu'),
  p10: buildGeneric('p10', 'Thanh long ruột đỏ',       'GlobalGAP','Xuân Lộc, Đồng Nai',   'HTX Thanh long Xuân Lộc'),
  p11: buildGeneric('p11', 'Sầu riêng Ri6 Hưng Thịnh','VietGAP',  'Hưng Thịnh, Đồng Nai', 'Cty CP Nông sản Hưng Thịnh'),
  p12: buildGeneric('p12', 'Xoài Đài Loan Dầu Giây',  'VietGAP',  'Dầu Giây, Đồng Nai',   'HTX Xoài Đầu Giây'),
  p13: buildGeneric('p13', 'Rau thủy canh Nhơn Trạch','Hữu cơ',   'Nhơn Trạch, Đồng Nai', 'Trang trại Nhơn Trạch Green'),
  p14: buildGeneric('p14', 'Cam sành Cẩm Mỹ',         'OCOP 4★',  'Cẩm Mỹ, Đồng Nai',    'Cty CP Nông nghiệp Cam Mỹ'),
  p15: buildGeneric('p15', 'Tôm thẻ chân trắng',      'ASC',      'Biên Hòa, Đồng Nai',   'Cty TNHH Chế biến Biên Hòa'),
};

const ALL_PRODUCTS: Record<string, any> = { ...PRODUCTS, ...MAP_PRODUCTS };

// ─── Icon map ─────────────────────────────────────────────────────────────────
const JourneyIcon: Record<string, React.ReactNode> = {
  leaf:    <Leaf     className="w-4 h-4" />,
  flask:   <FlaskConical className="w-4 h-4" />,
  calendar:<Calendar className="w-4 h-4" />,
  package: <Package  className="w-4 h-4" />,
  truck:   <Truck    className="w-4 h-4" />,
  store:   <Store    className="w-4 h-4" />,
};

const JourneyBg: Record<string, string> = {
  leaf:    'bg-emerald-100 text-emerald-600',
  flask:   'bg-blue-100 text-blue-600',
  calendar:'bg-violet-100 text-violet-600',
  package: 'bg-orange-100 text-orange-600',
  truck:   'bg-sky-100 text-sky-600',
  store:   'bg-amber-100 text-amber-600',
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = ALL_PRODUCTS[params.id] ?? PRODUCTS['sp002'];
  const [activeTab, setActiveTab] = useState<'journey' | 'info' | 'org'>('journey');

  const TABS = [
    { key: 'journey', icon: <CheckCircle2 className="w-4 h-4" />, label: 'Hành trình sản phẩm' },
    { key: 'info',    icon: <Info          className="w-4 h-4" />, label: 'Thông tin sản phẩm' },
    { key: 'org',     icon: <Building2     className="w-4 h-4" />, label: 'Doanh nghiệp' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/tra-cuu" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay lại kết quả
          </Link>
          <span className="text-xs text-gray-400">Đồng Nai Trace — Hệ thống truy xuất nguồn gốc</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-4">
            {/* Product Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={product.img} alt={product.name} className="w-full h-72 lg:h-80 object-cover" />
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col items-center">
              <div className="p-3 border border-slate-200 rounded-xl mb-3 bg-white">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${product.traceCode}&margin=4`}
                  alt="QR Code"
                  className="w-36 h-36"
                />
              </div>
              <p className="text-xs text-gray-500 mb-4 text-center">Mã QR truy xuất nguồn gốc</p>
              <div className="flex gap-2 w-full">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  <Download className="w-4 h-4" /> Tải QR
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                  <Share2 className="w-4 h-4" /> Chia sẻ
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            {/* Cert badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${product.certColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
              {product.cert}
            </div>

            {/* Name */}
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight mb-2">
              {product.name}
            </h1>

            {/* Trace code */}
            <p className="text-sm text-gray-500 mb-2">
              Mã truy xuất:{' '}
              <span className="font-mono font-bold text-[#2740BA]">{product.traceCode}</span>
            </p>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* 4-column stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 mb-5">
              {[
                { icon: <MapPin className="w-4 h-4 text-gray-400" />, label: 'Nguồn gốc', value: product.origin },
                { icon: <Package className="w-4 h-4 text-gray-400" />, label: 'Quy cách', value: product.packaging },
                { icon: <Calendar className="w-4 h-4 text-gray-400" />, label: 'Cập nhật', value: product.updateDate },
                { icon: <Building2 className="w-4 h-4 text-gray-400" />, label: 'Đơn vị', value: product.orgShort },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">{s.icon} {s.label}</div>
                  <div className="text-sm font-semibold text-gray-800 truncate" title={s.value}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              {TABS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px ${
                    activeTab === t.key
                      ? 'border-[#2740BA] text-[#2740BA]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* ── Tab: Journey ── */}
            {activeTab === 'journey' && (
              <div className="space-y-0">
                {product.journey.map((step: any, i: number, arr: any[]) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${JourneyBg[step.icon] || 'bg-gray-100 text-gray-500'}`}>
                        {JourneyIcon[step.icon] || <Package className="w-4 h-4" />}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-100 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-5 ${i === arr.length - 1 ? '' : ''}`}>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="font-semibold text-slate-800 text-sm">{step.label}</span>
                        <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{step.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{step.detail}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {step.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> {step.org}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Tab: Product Info ── */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                {[
                  { label: 'Mã GTIN', value: product.gtin },
                  { label: 'Mã lô / Batch', value: product.lotCode },
                  { label: 'Khối lượng / Quy cách', value: product.weight },
                  { label: 'Hạn sử dụng', value: product.expiry },
                  { label: 'Xuất xứ', value: product.origin },
                  { label: 'Thành phần', value: product.ingredients },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-gray-500 w-44 shrink-0">{row.label}</span>
                    <span className="text-sm font-medium text-gray-800">{row.value}</span>
                  </div>
                ))}

                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Chứng nhận chất lượng</p>
                  <div className="space-y-3">
                    {product.certs.map((c: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-emerald-700">{c.name}</p>
                          <p className="text-xs text-gray-500">Cấp bởi: {c.issuer} — Hiệu lực đến {c.expiry}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Org ── */}
            {activeTab === 'org' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-14 h-14 bg-[#2740BA] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0">
                    {product.org.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-[#2740BA] text-base">{product.org.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{product.org.type}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: <MapPin className="w-4 h-4 text-gray-400" />, value: product.org.address },
                    { icon: <Phone className="w-4 h-4 text-gray-400" />, value: product.org.phone },
                    { icon: <Mail className="w-4 h-4 text-gray-400" />, value: product.org.email },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="shrink-0">{row.icon}</span>
                      <span>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-xl font-extrabold text-[#2740BA]">{product.org.products}</p>
                    <p className="text-xs text-gray-500">Sản phẩm</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" /> {product.org.cert}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
