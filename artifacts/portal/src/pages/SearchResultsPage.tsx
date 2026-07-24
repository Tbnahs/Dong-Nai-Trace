import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearch, useLocation } from 'wouter';
import {
  Search, ShieldCheck, ChevronDown, ChevronRight,
  SlidersHorizontal, X, ArrowLeft, Building2, Package, MapPin, Phone
} from 'lucide-react';

// ─── Products ─────────────────────────────────────────────────────────────────
export const MOCK_PRODUCTS = [
  { id: 'sp001', name: 'Bưởi Tân Triều', org: 'HTX Nông nghiệp Xanh', category: 'Nông sản & Rau củ', district: 'Vĩnh Cửu', status: 'published', cert: 'VietGAP', img: 'https://picsum.photos/seed/buoi/300/200' },
  { id: 'sp002', name: 'Rau muống hữu cơ VietGAP', org: 'Trang trại Sạch Đồng Nai', category: 'Nông sản & Rau củ', district: 'Biên Hòa', status: 'published', cert: 'VietGAP', img: 'https://picsum.photos/seed/raumuong/300/200' },
  { id: 'sp003', name: 'Tôm sú đông lạnh', org: 'Công ty Thủy sản Đồng Nai', category: 'Thủy sản', district: 'Long Thành', status: 'published', cert: 'HACCP', img: 'https://picsum.photos/seed/tomsu/300/200' },
  { id: 'sp004', name: 'Cá tra phi lê', org: 'Công ty TNHH Thủy sản Nam Phát', category: 'Thủy sản', district: 'Nhơn Trạch', status: 'published', cert: 'GlobalGAP', img: 'https://picsum.photos/seed/catra/300/200' },
  { id: 'sp005', name: 'Nước mắm truyền thống', org: 'Cơ sở Nước mắm Hương Đồng', category: 'Thực phẩm chế biến', district: 'Xuân Lộc', status: 'published', cert: 'ISO 22000', img: 'https://picsum.photos/seed/nuocmam/300/200' },
  { id: 'sp006', name: 'Dưa hấu không hạt', org: 'HTX Dưa hấu Định Quán', category: 'Nông sản & Rau củ', district: 'Định Quán', status: 'published', cert: 'OCOP', img: 'https://picsum.photos/seed/duahau/300/200' },
  { id: 'sp007', name: 'Mật ong rừng nguyên chất', org: 'Trang trại Ong Rừng Đồng Nai', category: 'Thực phẩm chế biến', district: 'Tân Phú', status: 'published', cert: 'OCOP', img: 'https://picsum.photos/seed/matong/300/200' },
  { id: 'sp008', name: 'Gạo hữu cơ Định Quán', org: 'HTX Nông sản Định Quán', category: 'Nông sản & Rau củ', district: 'Định Quán', status: 'published', cert: 'VietGAP', img: 'https://picsum.photos/seed/gao/300/200' },
  { id: 'sp009', name: 'Chả giò chiên giòn', org: 'Công ty TNHH Thực phẩm Bình An', category: 'Thực phẩm chế biến', district: 'Biên Hòa', status: 'published', cert: 'ISO 22000', img: 'https://picsum.photos/seed/chagi/300/200' },
  { id: 'sp010', name: 'Tiêu sọ Long Khánh', org: 'HTX Hồ Tiêu Long Khánh', category: 'Nông sản & Rau củ', district: 'Long Khánh', status: 'published', cert: 'OCOP', img: 'https://picsum.photos/seed/tieu/300/200' },
  { id: 'sp011', name: 'Bò khô Long Khánh', org: 'Cơ sở Đặc sản Long Khánh', category: 'Thực phẩm chế biến', district: 'Long Khánh', status: 'published', cert: 'HACCP', img: 'https://picsum.photos/seed/bokho/300/200' },
  { id: 'sp012', name: 'Dệt thổ cẩm thủ công', org: 'Làng nghề Trị An', category: 'Thủ công mỹ nghệ', district: 'Vĩnh Cửu', status: 'published', cert: '', img: 'https://picsum.photos/seed/thoicam/300/200' },
];

// ─── Businesses ───────────────────────────────────────────────────────────────
export const MOCK_BUSINESSES = [
  { id: 'b1',  name: 'HTX Nông nghiệp Xanh',             type: 'Hợp tác xã',       district: 'Vĩnh Cửu',   phone: '0251 890 123', products: 5,  cert: 'VietGAP',   img: 'https://picsum.photos/seed/biz1/300/200' },
  { id: 'b2',  name: 'Công ty Thủy sản Đồng Nai',         type: 'Doanh nghiệp',     district: 'Long Thành',  phone: '0251 234 567', products: 8,  cert: 'HACCP',     img: 'https://picsum.photos/seed/biz2/300/200' },
  { id: 'b3',  name: 'HTX Dưa hấu Định Quán',             type: 'Hợp tác xã',       district: 'Định Quán',   phone: '0251 345 678', products: 3,  cert: 'OCOP',      img: 'https://picsum.photos/seed/biz3/300/200' },
  { id: 'b4',  name: 'Trang trại Sạch Đồng Nai',          type: 'Trang trại',       district: 'Biên Hòa',    phone: '0251 456 789', products: 12, cert: 'VietGAP',   img: 'https://picsum.photos/seed/biz4/300/200' },
  { id: 'b5',  name: 'HTX Hồ Tiêu Long Khánh',            type: 'Hợp tác xã',       district: 'Long Khánh',  phone: '0251 567 890', products: 4,  cert: 'OCOP',      img: 'https://picsum.photos/seed/biz5/300/200' },
  { id: 'b6',  name: 'Công ty TNHH Thủy sản Nam Phát',    type: 'Doanh nghiệp',     district: 'Nhơn Trạch',  phone: '0251 678 901', products: 7,  cert: 'GlobalGAP', img: 'https://picsum.photos/seed/biz6/300/200' },
  { id: 'b7',  name: 'Cơ sở Nước mắm Hương Đồng',         type: 'Cơ sở sản xuất',  district: 'Xuân Lộc',    phone: '0251 789 012', products: 2,  cert: 'ISO 22000', img: 'https://picsum.photos/seed/biz7/300/200' },
  { id: 'b8',  name: 'Trang trại Ong Rừng Đồng Nai',      type: 'Trang trại',       district: 'Tân Phú',     phone: '0251 890 234', products: 3,  cert: 'OCOP',      img: 'https://picsum.photos/seed/biz8/300/200' },
  { id: 'b9',  name: 'HTX Nông sản Định Quán',             type: 'Hợp tác xã',       district: 'Định Quán',   phone: '0251 901 234', products: 6,  cert: 'VietGAP',   img: 'https://picsum.photos/seed/biz9/300/200' },
  { id: 'b10', name: 'Công ty TNHH Thực phẩm Bình An',    type: 'Doanh nghiệp',     district: 'Biên Hòa',    phone: '0251 012 345', products: 9,  cert: 'ISO 22000', img: 'https://picsum.photos/seed/biz10/300/200' },
  { id: 'b11', name: 'Cơ sở Đặc sản Long Khánh',          type: 'Cơ sở sản xuất',  district: 'Long Khánh',  phone: '0251 111 222', products: 4,  cert: 'HACCP',     img: 'https://picsum.photos/seed/biz11/300/200' },
  { id: 'b12', name: 'Làng nghề Trị An',                   type: 'Làng nghề',        district: 'Vĩnh Cửu',   phone: '0251 222 333', products: 6,  cert: '',          img: 'https://picsum.photos/seed/biz12/300/200' },
];

const CATEGORIES  = ['Tất cả', 'Nông sản & Rau củ', 'Thủy sản', 'Thực phẩm chế biến', 'Thủ công mỹ nghệ', 'Dược liệu'];
const DISTRICTS   = ['Tất cả', 'Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú'];
const CERTS       = ['Tất cả', 'VietGAP', 'GlobalGAP', 'OCOP', 'HACCP', 'ISO 22000'];
const ORG_TYPES   = ['Tất cả', 'Hợp tác xã', 'Doanh nghiệp', 'Trang trại', 'Cơ sở sản xuất', 'Làng nghề'];

const certColor: Record<string, string> = {
  'VietGAP':   'bg-emerald-100 text-emerald-700',
  'GlobalGAP': 'bg-blue-100 text-blue-700',
  'OCOP':      'bg-orange-100 text-orange-700',
  'HACCP':     'bg-purple-100 text-purple-700',
  'ISO 22000': 'bg-sky-100 text-sky-700',
};

const typeColor: Record<string, string> = {
  'Hợp tác xã':      'bg-blue-100 text-[#2740BA]',
  'Doanh nghiệp':    'bg-green-100 text-green-700',
  'Trang trại':      'bg-lime-100 text-lime-700',
  'Cơ sở sản xuất': 'bg-yellow-100 text-yellow-700',
  'Làng nghề':       'bg-rose-100 text-rose-700',
};

export default function SearchResultsPage() {
  const rawSearch = useSearch();
  const params = new URLSearchParams(rawSearch);
  const [, setLocation] = useLocation();

  // ── URL param–driven state ──────────────────────────────────────────────────
  const initialTab      = (params.get('tab') === 'business') ? 'business' : 'product';
  const highlightParam  = params.get('highlight') ?? null;

  const [activeTab, setActiveTab] = useState<'product' | 'business'>(initialTab);
  const [highlighted, setHighlighted]   = useState<string | null>(highlightParam);

  const [query, setQuery]               = useState(params.get('q') || '');
  const [inputVal, setInputVal]         = useState(params.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [districtFilter, setDistrictFilter] = useState('Tất cả');
  const [certFilter, setCertFilter]         = useState('Tất cả');
  const [orgTypeFilter, setOrgTypeFilter]   = useState('Tất cả');
  const [sort, setSort]                     = useState('newest');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // ── Scroll-to and flash-highlight on mount ──────────────────────────────────
  useEffect(() => {
    if (!highlighted) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(`item-${highlighted}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Remove highlight after animation completes
        const clearTimer = setTimeout(() => setHighlighted(null), 2500);
        return () => clearTimeout(clearTimer);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, []); // run once on mount

  // ── Filter logic ────────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let list = MOCK_PRODUCTS;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.org.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'Tất cả') list = list.filter(p => p.category === categoryFilter);
    if (districtFilter !== 'Tất cả') list = list.filter(p => p.district === districtFilter);
    if (certFilter !== 'Tất cả')     list = list.filter(p => p.cert === certFilter);
    return list;
  }, [query, categoryFilter, districtFilter, certFilter]);

  const filteredBusinesses = useMemo(() => {
    let list = MOCK_BUSINESSES;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.type.toLowerCase().includes(q) ||
        b.district.toLowerCase().includes(q)
      );
    }
    if (districtFilter !== 'Tất cả') list = list.filter(b => b.district === districtFilter);
    if (certFilter !== 'Tất cả')     list = list.filter(b => b.cert === certFilter);
    if (orgTypeFilter !== 'Tất cả')  list = list.filter(b => b.type === orgTypeFilter);
    return list;
  }, [query, districtFilter, certFilter, orgTypeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputVal);
  };

  const clearFilters = () => {
    setCategoryFilter('Tất cả');
    setDistrictFilter('Tất cả');
    setCertFilter('Tất cả');
    setOrgTypeFilter('Tất cả');
  };

  const hasActiveFilters =
    categoryFilter !== 'Tất cả' || districtFilter !== 'Tất cả' ||
    certFilter !== 'Tất cả' || orgTypeFilter !== 'Tất cả';

  const totalResults = activeTab === 'product' ? filteredProducts.length : filteredBusinesses.length;

  // ── Filter panel ────────────────────────────────────────────────────────────
  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800">Bộ lọc</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-[#E8650A] font-semibold flex items-center gap-1 hover:underline">
            <X className="w-3 h-3" /> Xóa bộ lọc
          </button>
        )}
      </div>

      {activeTab === 'product' && (
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Danh mục</p>
          <div className="space-y-2">
            {CATEGORIES.map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="category" checked={categoryFilter === c}
                  onChange={() => setCategoryFilter(c)}
                  className="text-[#2740BA] focus:ring-[#2740BA]" />
                <span className={`text-sm transition-colors ${categoryFilter === c ? 'font-semibold text-[#2740BA]' : 'text-gray-600 group-hover:text-gray-900'}`}>{c}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'business' && (
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Loại hình</p>
          <div className="space-y-2">
            {ORG_TYPES.map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="orgtype" checked={orgTypeFilter === t}
                  onChange={() => setOrgTypeFilter(t)}
                  className="text-[#2740BA] focus:ring-[#2740BA]" />
                <span className={`text-sm transition-colors ${orgTypeFilter === t ? 'font-semibold text-[#2740BA]' : 'text-gray-600 group-hover:text-gray-900'}`}>{t}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Địa bàn</p>
        <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-[#2740BA] focus:border-[#2740BA]">
          {DISTRICTS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Chứng nhận</p>
        <div className="space-y-2">
          {CERTS.map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="cert" checked={certFilter === c}
                onChange={() => setCertFilter(c)}
                className="text-[#2740BA] focus:ring-[#2740BA]" />
              <span className={`text-sm transition-colors ${certFilter === c ? 'font-semibold text-[#2740BA]' : 'text-gray-600 group-hover:text-gray-900'}`}>{c}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header search bar */}
      <div className="bg-[#2740BA] py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Trang chủ
          </Link>
          <form onSubmit={handleSearch} className="flex max-w-3xl shadow-lg rounded-md overflow-hidden">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}
                placeholder="Nhập tên sản phẩm, mã GTIN, mã lô/mẻ, tên doanh nghiệp..."
                className="w-full pl-12 pr-4 py-3.5 focus:outline-none text-gray-700 bg-white" />
            </div>
            <button type="submit" className="bg-[#E8650A] text-white px-8 font-bold hover:bg-[#D55C08] transition-colors whitespace-nowrap">
              Tra cứu
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Tab switcher */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 mb-6 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('product')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'product'
                ? 'bg-[#2740BA] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Package className="w-4 h-4" />
            Sản phẩm
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'product' ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-500'
            }`}>
              {filteredProducts.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'business'
                ? 'bg-[#2740BA] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Doanh nghiệp
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'business' ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-500'
            }`}>
              {filteredBusinesses.length}
            </span>
          </button>
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-[#2740BA]">{totalResults}</span> kết quả
            {query && <> cho "<span className="font-semibold">{query}</span>"</>}
          </p>
          <button onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-white">
            <Search className="w-4 h-4" /> Bộ lọc
            {hasActiveFilters && <span className="w-2 h-2 bg-[#E8650A] rounded-full"></span>}
          </button>
        </div>

        {showMobileFilter && (
          <div className="lg:hidden bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
            <FilterPanel />
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar – desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6 shadow-sm">
              <FilterPanel />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <p className="text-sm text-gray-600">
                Tìm thấy <span className="font-bold text-[#2740BA]">{totalResults}</span>{' '}
                {activeTab === 'product' ? 'sản phẩm' : 'doanh nghiệp'}
                {query && <> cho "<span className="font-semibold">{query}</span>"</>}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sắp xếp:</span>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-[#2740BA] focus:border-[#2740BA] bg-white">
                  <option value="newest">Mới nhất</option>
                  <option value="name">Tên A-Z</option>
                  <option value="district">Địa bàn</option>
                </select>
              </div>
            </div>

            {/* ── PRODUCTS ── */}
            {activeTab === 'product' && (
              filteredProducts.length === 0 ? (
                <EmptyState entity="sản phẩm" onClear={clearFilters} hasFilters={hasActiveFilters} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map(p => {
                    const isHighlighted = highlighted === p.id;
                    return (
                      <Link key={p.id} href={`/san-pham/${p.id}`}>
                        <div
                          id={`item-${p.id}`}
                          className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden cursor-pointer group h-full flex flex-col
                            ${isHighlighted ? 'border-[#E8650A]' : 'border-slate-200'}`}
                          style={isHighlighted ? { animation: 'highlight-pulse 2s ease-out forwards' } : undefined}
                        >
                          <div className="h-44 overflow-hidden">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-bold text-[#2740BA] group-hover:text-[#E8650A] transition-colors leading-tight">{p.name}</h4>
                              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" title="Đã xác thực" />
                            </div>
                            <p className="text-sm text-gray-500 mb-3 flex-1">{p.org}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1.5 flex-wrap">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">{p.district}</span>
                                {p.cert && (
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${certColor[p.cert] || 'bg-gray-100 text-gray-600'}`}>{p.cert}</span>
                                )}
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#E8650A] transition-colors shrink-0" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )
            )}

            {/* ── BUSINESSES ── */}
            {activeTab === 'business' && (
              filteredBusinesses.length === 0 ? (
                <EmptyState entity="doanh nghiệp" onClear={clearFilters} hasFilters={hasActiveFilters} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredBusinesses.map(b => {
                    const isHighlighted = highlighted === b.id;
                    return (
                      <div
                        key={b.id}
                        id={`item-${b.id}`}
                        className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden cursor-pointer group h-full flex flex-col
                          ${isHighlighted ? 'border-[#E8650A]' : 'border-slate-200'}`}
                        style={isHighlighted ? { animation: 'highlight-pulse 2s ease-out forwards' } : undefined}
                      >
                        <div className="h-44 overflow-hidden">
                          <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-bold text-[#2740BA] group-hover:text-[#E8650A] transition-colors leading-tight">{b.name}</h4>
                            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" title="Đã xác thực" />
                          </div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-500">{b.district}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-500">{b.phone}</span>
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex gap-1.5 flex-wrap">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[b.type] || 'bg-gray-100 text-gray-600'}`}>{b.type}</span>
                              {b.cert && (
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${certColor[b.cert] || 'bg-gray-100 text-gray-600'}`}>{b.cert}</span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 shrink-0">{b.products} sản phẩm</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ entity, onClear, hasFilters }: { entity: string; onClear: () => void; hasFilters: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
      <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-gray-600 mb-2">Không tìm thấy {entity}</h3>
      <p className="text-gray-500 text-sm">Thử thay đổi từ khóa hoặc xóa bộ lọc.</p>
      {hasFilters && (
        <button onClick={onClear} className="mt-4 text-sm font-semibold text-[#E8650A] hover:underline">Xóa bộ lọc</button>
      )}
    </div>
  );
}
