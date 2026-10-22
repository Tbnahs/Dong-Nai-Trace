import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, Tag, ChevronRight, Search } from "lucide-react";
import { NEWS_CATEGORIES, NEWS_LIST } from "../data/news";

const categoryColor: Record<string, string> = {
  "Chính sách": "bg-blue-100 text-blue-700",
  "Sự kiện":    "bg-orange-100 text-orange-700",
  "Hướng dẫn":  "bg-green-100 text-green-700",
  "Thị trường": "bg-purple-100 text-purple-700",
};

export default function NewsPage() {
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = NEWS_LIST.filter((n) => {
    const matchCat = activeCategory === "Tất cả" || n.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = NEWS_LIST.find((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#0B3E77] via-[#1D4EAA] to-[#2740BA] px-4 py-4 md:px-6 md:py-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 border-t-[ffff] border-r-[ffff] border-b-[ffff] border-l-[ffff] text-[ffffff]">
            Cập nhật mới nhất
          </p>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold uppercase mb-3 text-[#ffffff]">Tin Tức</h1>
          <p className="text-sm max-w-xl text-[#ffffff]">
            Thông tin chính sách, sự kiện và hướng dẫn mới nhất về hệ thống truy xuất nguồn gốc
            nông sản tỉnh Đồng Nai.
          </p>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2740BA]/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {NEWS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-[#2740BA] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#2740BA] hover:text-[#2740BA]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured article */}
        {featured && activeCategory === "Tất cả" && searchQuery === "" && (
          <Link href={`/tin-tuc/${featured.id}`}>
            <div className="mb-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col lg:flex-row group cursor-pointer hover:shadow-md transition-shadow">
              <div className="lg:w-1/2 h-56 lg:h-auto overflow-hidden">
                <img
                  src={featured.img}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold bg-[#E8650A] text-white px-3 py-1 rounded-full uppercase tracking-wide">
                    Nổi bật
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[featured.category] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-slate-800 leading-snug mb-3 group-hover:text-[#2740BA] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{featured.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" /> {featured.date}
                  </span>
                  <span className="text-sm font-semibold text-[#2740BA] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đọc tiếp <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* News grid */}
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((news) => (
              <Link key={news.id} href={`/tin-tuc/${news.id}`}>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col group cursor-pointer h-full">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={news.img}
                      alt={news.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[news.category] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {news.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                        <Calendar className="w-3 h-3" /> {news.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 leading-snug mb-2 group-hover:text-[#2740BA] transition-colors flex-1">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {news.summary}
                    </p>
                    <span className="text-xs font-semibold text-[#2740BA] flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      Đọc tiếp <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Không tìm thấy tin tức phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
}
