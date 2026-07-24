import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, Tag, ChevronRight, Search } from "lucide-react";

// ─── Mock news data ───────────────────────────────────────────────────────────
const NEWS_CATEGORIES = ["Tất cả", "Chính sách", "Sự kiện", "Hướng dẫn", "Thị trường"];

const NEWS_LIST = [
  {
    id: 1,
    category: "Chính sách",
    title: "Đồng Nai triển khai hệ thống truy xuất nguồn gốc toàn diện cho nông sản xuất khẩu",
    summary:
      "Sở Khoa học và Công nghệ Đồng Nai chính thức ra mắt nền tảng Đồng Nai Trace, kết nối hơn 200 doanh nghiệp và hợp tác xã trên địa bàn tỉnh vào hệ thống truy xuất nguồn gốc điện tử.",
    date: "20/07/2026",
    img: "https://picsum.photos/seed/news1/800/450",
    featured: true,
  },
  {
    id: 2,
    category: "Sự kiện",
    title: "Hội thảo 'Minh bạch chuỗi cung ứng nông sản' tại Biên Hòa thu hút 300 đại biểu",
    summary:
      "Hội thảo do Sở KH&CN phối hợp với Hiệp hội Doanh nghiệp Đồng Nai tổ chức đã quy tụ đông đảo doanh nghiệp, HTX và các chuyên gia trong lĩnh vực nông nghiệp công nghệ cao.",
    date: "15/07/2026",
    img: "https://picsum.photos/seed/news2/800/450",
    featured: false,
  },
  {
    id: 3,
    category: "Hướng dẫn",
    title: "Hướng dẫn đăng ký và sử dụng tem truy xuất QR Code cho sản phẩm OCOP",
    summary:
      "Doanh nghiệp và HTX có sản phẩm OCOP từ 3 sao trở lên được hỗ trợ miễn phí đăng ký tem QR Code và tích hợp vào hệ thống Đồng Nai Trace trong năm 2026.",
    date: "10/07/2026",
    img: "https://picsum.photos/seed/news3/800/450",
    featured: false,
  },
  {
    id: 4,
    category: "Thị trường",
    title: "Nông sản Đồng Nai có truy xuất nguồn gốc tăng giá trị xuất khẩu lên 35%",
    summary:
      "Theo báo cáo quý II/2026 của Sở Công Thương, các lô hàng nông sản có chứng nhận truy xuất nguồn gốc điện tử ghi nhận mức giá bán cao hơn bình quân 35% so với sản phẩm thông thường.",
    date: "05/07/2026",
    img: "https://picsum.photos/seed/news4/800/450",
    featured: false,
  },
  {
    id: 5,
    category: "Sự kiện",
    title: "Đoàn doanh nghiệp Nhật Bản thăm và khảo sát mô hình truy xuất nông sản Đồng Nai",
    summary:
      "Đoàn gồm 15 doanh nghiệp Nhật Bản chuyên nhập khẩu nông sản đã đến tham quan thực tế mô hình chuỗi truy xuất nguồn gốc tại HTX Nông nghiệp Xanh, huyện Vĩnh Cửu.",
    date: "28/06/2026",
    img: "https://picsum.photos/seed/news5/800/450",
    featured: false,
  },
  {
    id: 6,
    category: "Chính sách",
    title: "UBND tỉnh ban hành kế hoạch hỗ trợ doanh nghiệp ứng dụng công nghệ blockchain trong truy xuất",
    summary:
      "Kế hoạch số 127/KH-UBND đặt mục tiêu đến năm 2027 có ít nhất 500 sản phẩm nông nghiệp của Đồng Nai được truy xuất nguồn gốc bằng công nghệ blockchain.",
    date: "20/06/2026",
    img: "https://picsum.photos/seed/news6/800/450",
    featured: false,
  },
];

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
      <div className="bg-[#2740BA] text-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">
            Cập nhật mới nhất
          </p>
          <h1 className="text-3xl lg:text-4xl font-extrabold uppercase mb-3">Tin Tức</h1>
          <p className="text-blue-100/80 text-sm max-w-xl">
            Thông tin chính sách, sự kiện và hướng dẫn mới nhất về hệ thống truy xuất nguồn gốc
            nông sản tỉnh Đồng Nai.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((news) => (
              <Link key={news.id} href={`/tin-tuc/${news.id}`}>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col group cursor-pointer h-full">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={news.img}
                      alt={news.title}
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
