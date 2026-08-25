import { useRoute, Link } from 'wouter';
import { Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const NEWS_LIST = [
  {
    id: 1,
    category: 'Chính sách',
    title: 'Khánh Hòa triển khai hệ thống truy xuất nguồn gốc toàn diện cho nông sản xuất khẩu',
    summary:
      'Sở Khoa học và Công nghệ Khánh Hòa chính thức ra mắt nền tảng Khánh Hòa Trace, kết nối hơn 200 doanh nghiệp và hợp tác xã trên địa bàn tỉnh vào hệ thống truy xuất nguồn gốc điện tử.',
    date: '20/07/2026',
    img: 'https://picsum.photos/seed/news1/1200/600',
    featured: true,
    content: `
Sở Khoa học và Công nghệ tỉnh Khánh Hòa vừa chính thức ra mắt nền tảng <strong>Khánh Hòa Trace</strong> — hệ thống truy xuất nguồn gốc điện tử toàn diện dành cho nông sản xuất khẩu. Đây là bước tiến quan trọng trong chiến lược phát triển nông nghiệp minh bạch, bền vững của tỉnh.

<h3>Kết nối hơn 200 đơn vị sản xuất</h3>
Nền tảng đã kết nối thành công hơn 200 doanh nghiệp, hợp tác xã và cơ sở sản xuất trên địa bàn tỉnh, cho phép truy xuất toàn bộ chuỗi cung ứng từ khâu sản xuất, sơ chế, đóng gói đến phân phối.

<h3>Công nghệ QR Code và Blockchain</h3>
Mỗi lô hàng nông sản được gắn mã QR Code duy nhất. Người tiêu dùng chỉ cần quét mã là có thể xem đầy đủ thông tin về vùng trồng, quy trình canh tác, chứng nhận chất lượng và lịch sử vận chuyển.

<h3>Lộ trình triển khai</h3>
Giai đoạn 1 (2026): Tích hợp các sản phẩm OCOP và nông sản xuất khẩu chủ lực.
Giai đoạn 2 (2027): Mở rộng ra toàn bộ sản phẩm nông nghiệp trên địa bàn tỉnh.

Theo đại diện Sở KH&CN, hệ thống sẽ giúp nâng cao giá trị và uy tín nông sản Khánh Hòa trên thị trường trong và ngoài nước.
    `,
  },
  {
    id: 2,
    category: 'Sự kiện',
    title: "Hội thảo 'Minh bạch chuỗi cung ứng nông sản' tại Biên Hòa thu hút 300 đại biểu",
    summary:
      'Hội thảo do Sở KH&CN phối hợp với Hiệp hội Doanh nghiệp Khánh Hòa tổ chức đã quy tụ đông đảo doanh nghiệp, HTX và các chuyên gia trong lĩnh vực nông nghiệp công nghệ cao.',
    date: '15/07/2026',
    img: 'https://picsum.photos/seed/news2/1200/600',
    featured: false,
    content: `
Ngày 15/07/2026, tại Trung tâm Hội nghị tỉnh Khánh Hòa, Sở Khoa học và Công nghệ phối hợp cùng Hiệp hội Doanh nghiệp tỉnh tổ chức hội thảo chuyên đề <strong>"Minh bạch chuỗi cung ứng nông sản"</strong>.

<h3>Quy mô và thành phần tham dự</h3>
Hội thảo thu hút hơn 300 đại biểu, bao gồm đại diện các doanh nghiệp xuất khẩu nông sản, hợp tác xã, cơ quan quản lý nhà nước và các chuyên gia trong lĩnh vực nông nghiệp công nghệ cao.

<h3>Nội dung trọng tâm</h3>
Các chuyên gia đã chia sẻ kinh nghiệm triển khai hệ thống truy xuất nguồn gốc tại nhiều địa phương, đồng thời thảo luận về những thách thức và giải pháp để nâng cao hiệu quả ứng dụng công nghệ trong quản lý chuỗi cung ứng.

<h3>Kết luận và cam kết</h3>
Hội thảo đã thông qua Tuyên bố chung về phát triển nông nghiệp minh bạch, trong đó các bên cam kết đẩy mạnh ứng dụng công nghệ số trong toàn bộ chuỗi giá trị nông sản Khánh Hòa.
    `,
  },
  {
    id: 3,
    category: 'Hướng dẫn',
    title: 'Hướng dẫn đăng ký và sử dụng tem truy xuất QR Code cho sản phẩm OCOP',
    summary:
      'Doanh nghiệp và HTX có sản phẩm OCOP từ 3 sao trở lên được hỗ trợ miễn phí đăng ký tem QR Code và tích hợp vào hệ thống Khánh Hòa Trace trong năm 2026.',
    date: '10/07/2026',
    img: 'https://picsum.photos/seed/news3/1200/600',
    featured: false,
    content: `
Nhằm hỗ trợ các doanh nghiệp và hợp tác xã nhanh chóng tiếp cận hệ thống truy xuất nguồn gốc, Sở KH&CN Khánh Hòa ban hành hướng dẫn chi tiết về quy trình đăng ký và sử dụng tem truy xuất QR Code.

<h3>Đối tượng được hỗ trợ miễn phí</h3>
Tất cả doanh nghiệp, HTX có sản phẩm OCOP từ 3 sao trở lên trên địa bàn tỉnh Khánh Hòa sẽ được hỗ trợ miễn phí 100% chi phí đăng ký và in tem QR Code trong năm 2026.

<h3>Quy trình đăng ký</h3>
1. Truy cập hệ thống tại <strong>txng.khanhhoa.gov.vn</strong> và đăng ký tài khoản doanh nghiệp.
2. Điền đầy đủ thông tin sản phẩm và tải lên các chứng nhận liên quan.
3. Chờ Sở KH&CN xét duyệt hồ sơ (3–5 ngày làm việc).
4. Sau khi được phê duyệt, tải xuống file QR Code và sử dụng để in tem.

<h3>Lưu ý quan trọng</h3>
Tem QR Code phải được in rõ ràng, kích thước tối thiểu 2cm x 2cm và gắn ở vị trí dễ quét trên bao bì sản phẩm.
    `,
  },
  {
    id: 4,
    category: 'Thị trường',
    title: 'Nông sản Khánh Hòa có truy xuất nguồn gốc tăng giá trị xuất khẩu lên 35%',
    summary:
      'Theo báo cáo quý II/2026 của Sở Công Thương, các lô hàng nông sản có chứng nhận truy xuất nguồn gốc điện tử ghi nhận mức giá bán cao hơn bình quân 35% so với sản phẩm thông thường.',
    date: '05/07/2026',
    img: 'https://picsum.photos/seed/news4/1200/600',
    featured: false,
    content: `
Báo cáo quý II/2026 của Sở Công Thương tỉnh Khánh Hòa ghi nhận tín hiệu tích cực: các lô hàng nông sản có chứng nhận truy xuất nguồn gốc điện tử đạt mức giá bán cao hơn trung bình <strong>35%</strong> so với sản phẩm không có truy xuất.

<h3>Số liệu nổi bật</h3>
Trong quý II/2026, tổng kim ngạch xuất khẩu nông sản có truy xuất nguồn gốc của tỉnh đạt hơn 120 triệu USD, tăng 28% so với cùng kỳ năm 2025.

<h3>Thị trường chính</h3>
Nhật Bản, Hàn Quốc và EU là ba thị trường nhập khẩu lớn nhất, đặc biệt ưu tiên sản phẩm có đầy đủ hồ sơ truy xuất nguồn gốc điện tử.

<h3>Đánh giá của chuyên gia</h3>
Các chuyên gia kinh tế nhận định, việc ứng dụng công nghệ truy xuất không chỉ nâng cao giá trị sản phẩm mà còn mở ra cơ hội tiếp cận các thị trường xuất khẩu khó tính, tạo nền tảng phát triển bền vững cho ngành nông nghiệp tỉnh Khánh Hòa.
    `,
  },
  {
    id: 5,
    category: 'Sự kiện',
    title: 'Đoàn doanh nghiệp Nhật Bản thăm và khảo sát mô hình truy xuất nông sản Khánh Hòa',
    summary:
      'Đoàn gồm 15 doanh nghiệp Nhật Bản chuyên nhập khẩu nông sản đã đến tham quan thực tế mô hình chuỗi truy xuất nguồn gốc tại HTX Nông nghiệp Xanh, huyện Vĩnh Cửu.',
    date: '28/06/2026',
    img: 'https://picsum.photos/seed/news5/1200/600',
    featured: false,
    content: `
Ngày 28/06/2026, đoàn công tác gồm 15 doanh nghiệp Nhật Bản chuyên nhập khẩu nông sản đã đến thăm và khảo sát thực tế mô hình truy xuất nguồn gốc tại HTX Nông nghiệp Xanh, huyện Vĩnh Cửu, tỉnh Khánh Hòa.

<h3>Điểm tham quan và đánh giá</h3>
Đoàn đã trực tiếp tham quan vùng trồng rau hữu cơ, quy trình đóng gói và hệ thống gắn tem QR Code. Đại diện các doanh nghiệp Nhật Bản đánh giá cao mức độ minh bạch và khả năng truy xuất thông tin chi tiết đến từng lô hàng.

<h3>Triển vọng hợp tác</h3>
Sau chuyến thăm, hai phía đã ký kết biên bản ghi nhớ hợp tác, mở ra triển vọng xuất khẩu nông sản Khánh Hòa vào thị trường Nhật Bản với số lượng lớn hơn trong thời gian tới.
    `,
  },
  {
    id: 6,
    category: 'Chính sách',
    title: 'UBND tỉnh ban hành kế hoạch hỗ trợ doanh nghiệp ứng dụng công nghệ blockchain trong truy xuất',
    summary:
      'Kế hoạch số 127/KH-UBND đặt mục tiêu đến năm 2027 có ít nhất 500 sản phẩm nông nghiệp của Khánh Hòa được truy xuất nguồn gốc bằng công nghệ blockchain.',
    date: '20/06/2026',
    img: 'https://picsum.photos/seed/news6/1200/600',
    featured: false,
    content: `
UBND tỉnh Khánh Hòa vừa ban hành Kế hoạch số 127/KH-UBND về hỗ trợ doanh nghiệp, hợp tác xã ứng dụng công nghệ blockchain trong truy xuất nguồn gốc hàng hóa giai đoạn 2026–2027.

<h3>Mục tiêu cụ thể</h3>
Đến cuối năm 2027, ít nhất 500 sản phẩm nông nghiệp chủ lực của tỉnh được truy xuất nguồn gốc bằng công nghệ blockchain, trong đó ưu tiên các sản phẩm xuất khẩu và sản phẩm OCOP từ 4 sao trở lên.

<h3>Chính sách hỗ trợ</h3>
Doanh nghiệp tham gia chương trình sẽ được hỗ trợ tối đa 50% chi phí triển khai hệ thống blockchain, không vượt quá 200 triệu đồng/dự án.

<h3>Cơ quan thực hiện</h3>
Sở KH&CN là cơ quan chủ trì, phối hợp với Sở NN&PTNT, Sở Công Thương và các đơn vị liên quan để triển khai kế hoạch đúng lộ trình.
    `,
  },
];

const categoryColor: Record<string, string> = {
  'Chính sách': 'bg-blue-100 text-blue-700',
  'Sự kiện': 'bg-orange-100 text-orange-700',
  'Hướng dẫn': 'bg-green-100 text-green-700',
  'Thị trường': 'bg-purple-100 text-purple-700',
};

export default function NewsDetailPage() {
  const [, params] = useRoute('/tin-tuc/:id');
  const id = Number(params?.id);
  const article = NEWS_LIST.find(n => n.id === id);
  const others = NEWS_LIST.filter(n => n.id !== id).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy bài viết.</p>
          <Link href="/tin-tuc" className="text-[#2740BA] font-semibold hover:underline">← Quay lại Tin tức</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Hero image */}
      <div className="w-full h-72 lg:h-96 overflow-hidden relative">
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {article.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        {/* Back link */}
        <Link href="/tin-tuc" className="inline-flex items-center gap-1.5 text-sm text-[#2740BA] font-semibold hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" /> Quay lại Tin tức
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-10 mb-8">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-slate-800 leading-snug mb-4">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-base text-gray-600 leading-relaxed border-l-4 border-[#2740BA] pl-4 mb-8 italic">
            {article.summary}
          </p>

          {/* Content */}
          <div
            className="prose prose-slate max-w-none text-sm leading-relaxed text-gray-700
              [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-2
              [&_strong]:text-slate-800 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: article.content.trim().replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* Related articles */}
        {others.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Tin tức liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {others.map(n => (
                <Link key={n.id} href={`/tin-tuc/${n.id}`}>
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
                    <div className="h-36 overflow-hidden">
                      <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoryColor[n.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {n.category}
                      </span>
                      <h3 className="mt-2 text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#2740BA] transition-colors">
                        {n.title}
                      </h3>
                      <span className="mt-2 text-xs font-semibold text-[#2740BA] flex items-center gap-1">
                        Đọc tiếp <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
