import React from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, MapPin, Phone, Mail, ShieldCheck, Package, Building2, Award } from 'lucide-react';
import { MOCK_BUSINESSES } from './SearchResultsPage';
import { MOCK_PRODUCTS } from './SearchResultsPage';

// MapSection business IDs not in SearchResultsPage catalog
const MAP_BUSINESSES: Record<string, any> = {
  b1:  { id:'b1',  name:'HTX Nông nghiệp Bình Phước',     type:'Hợp tác xã',      district:'Bình Phước',   phone:'0251 123 456', products:4, cert:'VietGAP',   img:'https://picsum.photos/seed/biz_b1/600/300' },
  b2:  { id:'b2',  name:'Cty TNHH Xuất khẩu Đồng Xoài',  type:'Doanh nghiệp',    district:'Đồng Xoài',   phone:'0251 234 567', products:6, cert:'GlobalGAP', img:'https://picsum.photos/seed/biz_b2/600/300' },
  b3:  { id:'b3',  name:'Trang trại Phước Long Xanh',      type:'Trang trại',      district:'Phước Long',  phone:'0251 345 678', products:3, cert:'Hữu cơ',    img:'https://picsum.photos/seed/biz_b3/600/300' },
  b4:  { id:'b4',  name:'Cty CP Nông sản Bình Tân',        type:'Doanh nghiệp',    district:'Bình Tân',    phone:'0251 456 789', products:8, cert:'VietGAP',   img:'https://picsum.photos/seed/biz_b4/600/300' },
  b5:  { id:'b5',  name:'HTX Rau sạch Lộc Ninh',           type:'Hợp tác xã',      district:'Lộc Ninh',    phone:'0251 567 890', products:5, cert:'OCOP',      img:'https://picsum.photos/seed/biz_b5/600/300' },
  b6:  { id:'b6',  name:'Cty TNHH Nông sản Lộc Tấn',      type:'Doanh nghiệp',    district:'Lộc Tấn',     phone:'0251 678 901', products:4, cert:'ISO 22000', img:'https://picsum.photos/seed/biz_b6/600/300' },
  b7:  { id:'b7',  name:'HTX Cây ăn trái Long Hà',         type:'Hợp tác xã',      district:'Long Hà',     phone:'0251 789 012', products:6, cert:'VietGAP',   img:'https://picsum.photos/seed/biz_b7/600/300' },
  b8:  { id:'b8',  name:'Trang trại Tân Triều Organic',    type:'Trang trại',      district:'Tân Triều',   phone:'0251 890 123', products:3, cert:'Hữu cơ',    img:'https://picsum.photos/seed/biz_b8/600/300' },
  b9:  { id:'b9',  name:'Cty CP Nông sản Hưng Thịnh',      type:'Doanh nghiệp',    district:'Hưng Thịnh',  phone:'0251 901 234', products:7, cert:'VietGAP',   img:'https://picsum.photos/seed/biz_b9/600/300' },
  b10: { id:'b10', name:'HTX Bưởi Vĩnh Cửu',               type:'Hợp tác xã',      district:'Vĩnh Cửu',    phone:'0251 012 345', products:5, cert:'VietGAP',   img:'https://picsum.photos/seed/biz_b10/600/300' },
  b11: { id:'b11', name:'Cty TNHH Chế biến Biên Hòa',      type:'Doanh nghiệp',    district:'Biên Hòa',    phone:'0251 111 222', products:9, cert:'HACCP',     img:'https://picsum.photos/seed/biz_b11/600/300' },
  b12: { id:'b12', name:'HTX Xoài Đầu Giây',                type:'Hợp tác xã',      district:'Dầu Giây',    phone:'0251 222 333', products:4, cert:'VietGAP',   img:'https://picsum.photos/seed/biz_b12/600/300' },
  b13: { id:'b13', name:'Trang trại Nhơn Trạch Green',      type:'Trang trại',      district:'Nhơn Trạch',  phone:'0251 333 444', products:5, cert:'Hữu cơ',    img:'https://picsum.photos/seed/biz_b13/600/300' },
  b14: { id:'b14', name:'Cty CP Nông nghiệp Cam Mỹ',        type:'Doanh nghiệp',    district:'Cẩm Mỹ',     phone:'0251 444 555', products:6, cert:'OCOP',      img:'https://picsum.photos/seed/biz_b14/600/300' },
  b15: { id:'b15', name:'HTX Thanh long Xuân Lộc',           type:'Hợp tác xã',      district:'Xuân Lộc',    phone:'0251 555 666', products:3, cert:'GlobalGAP', img:'https://picsum.photos/seed/biz_b15/600/300' },
};

// Merge catalog businesses with map businesses
const ALL_BUSINESSES: Record<string, any> = {};
MOCK_BUSINESSES.forEach(b => { ALL_BUSINESSES[b.id] = { ...b, img: `https://picsum.photos/seed/biz${b.id}/600/300` }; });
Object.entries(MAP_BUSINESSES).forEach(([k, v]) => { if (!ALL_BUSINESSES[k]) ALL_BUSINESSES[k] = v; });

const certColor: Record<string, string> = {
  'VietGAP':   'bg-emerald-100 text-emerald-700',
  'GlobalGAP': 'bg-blue-100 text-blue-700',
  'OCOP':      'bg-orange-100 text-orange-700',
  'HACCP':     'bg-purple-100 text-purple-700',
  'ISO 22000': 'bg-sky-100 text-sky-700',
  'Hữu cơ':   'bg-lime-100 text-lime-700',
};

const typeColor: Record<string, string> = {
  'Hợp tác xã':   'bg-blue-100 text-[#2740BA]',
  'Doanh nghiệp': 'bg-green-100 text-green-700',
  'Trang trại':   'bg-lime-100 text-lime-700',
  'Cơ sở sản xuất': 'bg-yellow-100 text-yellow-700',
};

export default function BusinessDetailPage() {
  const params = useParams<{ id: string }>();
  const biz = ALL_BUSINESSES[params.id];

  if (!biz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">Không tìm thấy doanh nghiệp</h2>
          <Link href="/tra-cuu?tab=business" className="text-[#2740BA] text-sm font-semibold hover:underline">← Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  // Show some products from this business's district (demo)
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.district === biz.district).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/tra-cuu?tab=business" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </Link>
          <span className="text-xs text-gray-400">Đồng Nai Trace — Doanh nghiệp</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">

          {/* LEFT */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={biz.img} alt={biz.name} className="w-full h-56 object-cover" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{biz.district}, Đồng Nai</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <a href={`tel:${biz.phone}`} className="hover:text-[#2740BA]">{biz.phone}</a>
                </div>
                {biz.email && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <a href={`mailto:${biz.email}`} className="hover:text-[#2740BA]">{biz.email}</a>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-[#2740BA]">{biz.products}</p>
                  <p className="text-xs text-gray-500 mt-1">Sản phẩm</p>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${certColor[biz.cert] || 'bg-gray-100 text-gray-600'}`}>
                    {biz.cert}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Chứng nhận</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
              {/* Type badge */}
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${typeColor[biz.type] || 'bg-gray-100 text-gray-600'}`}>
                {biz.type}
              </span>

              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight mb-2">{biz.name}</h1>

              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{biz.district}, Đồng Nai</span>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-gray-700">Đã xác thực trên hệ thống Đồng Nai Trace</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {biz.name} là đơn vị tham gia hệ thống truy xuất nguồn gốc Đồng Nai Trace, đã đăng ký và xác thực thông tin theo quy định của Sở Khoa học và Công nghệ Thành phố Đồng Nai.
                </p>
              </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#2740BA]" />
                  Sản phẩm cùng địa bàn
                </h3>
                <div className="space-y-3">
                  {relatedProducts.map(p => (
                    <Link key={p.id} href={`/san-pham/${p.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                        <img src={p.img} alt={p.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#2740BA] truncate">{p.name}</p>
                          <p className="text-xs text-gray-500 truncate">{p.org}</p>
                          <div className="flex gap-1.5 mt-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{p.district}</span>
                            {p.cert && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{p.cert}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/tra-cuu" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2740BA] hover:underline">
                  Xem tất cả sản phẩm →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
