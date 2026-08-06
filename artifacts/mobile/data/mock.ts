export interface ProcessStep {
  step: string;
  description: string;
  date: string;
  location: string;
}

export interface Product {
  id: string;
  traceCode: string;
  gtin: string;
  lotNumber: string;
  name: string;
  businessId: string;
  businessName: string;
  origin: string;
  district: string;
  province: string;
  category: string;
  certifications: string[];
  description: string;
  productionDate: string;
  expiryDate: string;
  weight: string;
  image: string;
  process: ProcessStep[];
}

export interface Business {
  id: string;
  name: string;
  shortName: string;
  type: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  representative: string;
  taxCode: string;
  certifications: string[];
  productIds: string[];
  description: string;
  productCount: number;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  views: number;
  featured: boolean;
  image: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'success' | 'warning' | 'info' | 'error';
  date: string;
  read: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p001',
    traceCode: 'DNRM-2024-001',
    gtin: '8934673000016',
    lotNumber: 'LOT-2024-001',
    name: 'Rau muống hữu cơ',
    businessId: 'b001',
    businessName: 'HTX Nông nghiệp Xanh Long Khánh',
    origin: 'Xã Xuân Lập, TP. Long Khánh',
    district: 'Long Khánh',
    province: 'Đồng Nai',
    category: 'Rau củ quả',
    certifications: ['VietGAP', 'OCOP 3 sao', 'Hữu cơ'],
    description: 'Rau muống hữu cơ được trồng theo quy trình sạch, không sử dụng thuốc bảo vệ thực vật, đảm bảo an toàn vệ sinh thực phẩm.',
    productionDate: '15/01/2024',
    expiryDate: '20/01/2024',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
    process: [
      { step: 'Gieo trồng', description: 'Hạt giống được gieo trên nền đất hữu cơ đã xử lý', date: '01/12/2023', location: 'Xã Xuân Lập, Long Khánh' },
      { step: 'Chăm sóc', description: 'Tưới nước bằng hệ thống phun tự động, bón phân hữu cơ vi sinh', date: '01/12/2023 - 14/01/2024', location: 'Vườn trồng B3' },
      { step: 'Thu hoạch', description: 'Thu hoạch thủ công, rửa sạch bằng nước tinh khiết', date: '14/01/2024', location: 'Kho sơ chế HTX' },
      { step: 'Đóng gói', description: 'Đóng gói theo tiêu chuẩn VietGAP, dán tem truy xuất nguồn gốc', date: '15/01/2024', location: 'Xưởng đóng gói' },
      { step: 'Phân phối', description: 'Vận chuyển bằng xe lạnh đến các điểm bán hàng', date: '15/01/2024', location: 'Siêu thị Co.op Mart Long Khánh' },
    ],
  },
  {
    id: 'p002',
    traceCode: 'DNTB-2024-001',
    gtin: '8934673000023',
    lotNumber: 'LOT-2024-015',
    name: 'Nhãn tiêu Bình An',
    businessId: 'b002',
    businessName: 'HTX Nhãn tiêu Bình An',
    origin: 'Xã Bình An, Huyện Vĩnh Cửu',
    district: 'Vĩnh Cửu',
    province: 'Đồng Nai',
    category: 'Trái cây',
    certifications: ['GlobalGAP', 'OCOP 4 sao'],
    description: 'Nhãn tiêu Bình An nổi tiếng với cùi dày, vị ngọt đậm, hạt nhỏ, được trồng theo tiêu chuẩn GlobalGAP.',
    productionDate: '10/07/2024',
    expiryDate: '25/07/2024',
    weight: '1kg',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
    process: [
      { step: 'Trồng trọt', description: 'Cây nhãn tiêu 8 năm tuổi, chăm sóc theo quy trình GlobalGAP', date: 'Tháng 3/2024', location: 'Vườn nhãn số 7, Bình An' },
      { step: 'Ra hoa', description: 'Hỗ trợ ra hoa đồng loạt bằng kỹ thuật cắt cành', date: 'Tháng 4/2024', location: 'Vườn nhãn số 7' },
      { step: 'Thu hoạch', description: 'Thu hoạch thủ công khi đạt độ chín 90%', date: '09/07/2024', location: 'Vườn nhãn số 7, Bình An' },
      { step: 'Sơ chế', description: 'Rửa, phân loại theo kích cỡ, kiểm tra chất lượng', date: '09/07/2024', location: 'Trạm sơ chế HTX' },
      { step: 'Đóng gói', description: 'Đóng hộp 1kg, dán tem QR truy xuất', date: '10/07/2024', location: 'Kho đóng gói HTX' },
    ],
  },
  {
    id: 'p003',
    traceCode: 'DNBX-2024-001',
    gtin: '8934673000030',
    lotNumber: 'LOT-2024-022',
    name: 'Bưởi da xanh Tân Phú',
    businessId: 'b003',
    businessName: 'Công ty TNHH Nông sản Tân Phú',
    origin: 'Xã Phú Trung, Huyện Tân Phú',
    district: 'Tân Phú',
    province: 'Đồng Nai',
    category: 'Trái cây',
    certifications: ['VietGAP', 'Chỉ dẫn địa lý'],
    description: 'Bưởi da xanh Tân Phú được bảo hộ chỉ dẫn địa lý, múi ngọt thanh, ít hạt, có giá trị dinh dưỡng cao.',
    productionDate: '20/09/2024',
    expiryDate: '20/10/2024',
    weight: '1.2 - 1.8kg/quả',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&h=400&fit=crop',
    process: [
      { step: 'Canh tác', description: 'Vườn bưởi 12 năm tuổi, quản lý sâu bệnh IPM', date: 'Năm 2024', location: 'Vườn bưởi A12, Phú Trung' },
      { step: 'Thu hoạch', description: 'Thu hoạch khi vỏ chuyển màu xanh nhạt đặc trưng', date: '18/09/2024', location: 'Vườn bưởi A12' },
      { step: 'Kiểm tra chất lượng', description: 'Kiểm tra độ Brix, trọng lượng, hình dạng theo tiêu chuẩn', date: '19/09/2024', location: 'Phòng kiểm nghiệm công ty' },
      { step: 'Đóng gói & dán nhãn', description: 'Bọc lưới xốp, đóng thùng carton, dán tem truy xuất', date: '20/09/2024', location: 'Kho hàng công ty' },
    ],
  },
  {
    id: 'p004',
    traceCode: 'DNMO-2024-001',
    gtin: '8934673000047',
    lotNumber: 'LOT-2024-008',
    name: 'Mật ong rừng Mã Đà',
    businessId: 'b004',
    businessName: 'HTX Mật ong Vĩnh Cửu',
    origin: 'Khu Bảo tồn thiên nhiên Mã Đà, Vĩnh Cửu',
    district: 'Vĩnh Cửu',
    province: 'Đồng Nai',
    category: 'Thực phẩm',
    certifications: ['Hữu cơ', 'OCOP 4 sao', 'FDA'],
    description: 'Mật ong rừng Mã Đà được lấy từ tổ ong tự nhiên trong rừng nguyên sinh, không pha trộn, đảm bảo nguyên chất 100%.',
    productionDate: '05/03/2024',
    expiryDate: '05/03/2026',
    weight: '500ml',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=400&fit=crop',
    process: [
      { step: 'Thu gom', description: 'Khai thác mật từ tổ ong tự nhiên bởi thợ khai thác có kinh nghiệm', date: '01/03/2024', location: 'Rừng Mã Đà, Vĩnh Cửu' },
      { step: 'Lọc thô', description: 'Lọc qua vải để loại bỏ sáp và tạp chất lớn', date: '02/03/2024', location: 'Điểm thu mua HTX' },
      { step: 'Kiểm nghiệm', description: 'Kiểm tra độ ẩm, hàm lượng đường, kháng sinh', date: '03/03/2024', location: 'Phòng Lab HTX' },
      { step: 'Đóng chai', description: 'Chiết rót vào chai thủy tinh, đậy nắp kín, dán tem QR', date: '05/03/2024', location: 'Xưởng đóng gói HTX' },
    ],
  },
  {
    id: 'p005',
    traceCode: 'DNTG-2024-001',
    gtin: '8934673000054',
    lotNumber: 'LOT-2024-031',
    name: 'Trứng gà ta thả vườn',
    businessId: 'b005',
    businessName: 'Trang trại gà sạch Xuân Lộc',
    origin: 'Xã Bảo Bình, Huyện Cẩm Mỹ',
    district: 'Cẩm Mỹ',
    province: 'Đồng Nai',
    category: 'Chăn nuôi',
    certifications: ['VietGAP', 'An toàn thực phẩm'],
    description: 'Trứng gà ta thả vườn, gà được nuôi tự nhiên trên nền đất, ăn thức ăn tự nhiên kết hợp ngô, đậu tương.',
    productionDate: '12/11/2024',
    expiryDate: '26/11/2024',
    weight: '10 quả/hộp',
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d2049?w=600&h=400&fit=crop',
    process: [
      { step: 'Chăn nuôi', description: 'Đàn gà 5.000 con, nuôi thả vườn theo VietGAP, không dùng kháng sinh', date: 'Tháng 8 - 11/2024', location: 'Trang trại Bảo Bình' },
      { step: 'Thu trứng', description: 'Thu trứng mỗi ngày, kiểm tra ngoại quan, loại bỏ trứng dập vỡ', date: '12/11/2024', location: 'Nhà trứng trang trại' },
      { step: 'Vệ sinh', description: 'Vệ sinh trứng bằng nước tinh khiết, sấy khô tự nhiên', date: '12/11/2024', location: 'Khu xử lý trứng' },
      { step: 'Đóng hộp', description: 'Đóng vỉ 10 quả, đóng hộp carton, dán tem truy xuất', date: '12/11/2024', location: 'Kho đóng gói' },
    ],
  },
  {
    id: 'p006',
    traceCode: 'DNXO-2024-001',
    gtin: '8934673000061',
    lotNumber: 'LOT-2024-019',
    name: 'Xoài cát Hòa Lộc',
    businessId: 'b001',
    businessName: 'HTX Nông nghiệp Xanh Long Khánh',
    origin: 'Xã Bàu Trâm, TP. Long Khánh',
    district: 'Long Khánh',
    province: 'Đồng Nai',
    category: 'Trái cây',
    certifications: ['GlobalGAP', 'OCOP 3 sao'],
    description: 'Xoài cát Hòa Lộc Long Khánh, giống gốc từ Tiền Giang, thịt vàng, ngọt thơm, sợi mịn, được xuất khẩu sang các thị trường châu Âu.',
    productionDate: '25/06/2024',
    expiryDate: '05/07/2024',
    weight: '350-500g/quả',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=400&fit=crop',
    process: [
      { step: 'Canh tác', description: 'Vườn xoài 15 năm tuổi, quản lý theo GlobalGAP', date: 'Năm 2024', location: 'Vườn xoài Bàu Trâm' },
      { step: 'Thu hoạch', description: 'Hái khi đạt độ chín 75%, tránh va đập', date: '23/06/2024', location: 'Vườn xoài B2' },
      { step: 'Xử lý nhiệt', description: 'Ngâm nước nóng 52°C trong 5 phút diệt sâu đục quả', date: '24/06/2024', location: 'Nhà xử lý HTX' },
      { step: 'Đóng gói', description: 'Bọc xốp riêng từng quả, xếp hộp carton 5kg, dán tem QR', date: '25/06/2024', location: 'Kho đóng gói HTX' },
    ],
  },
];

export const BUSINESSES: Business[] = [
  {
    id: 'b001',
    name: 'HTX Nông nghiệp Xanh Long Khánh',
    shortName: 'HTX Xanh LK',
    type: 'Hợp tác xã',
    district: 'Long Khánh',
    address: 'Số 12, đường Trần Phú, phường Xuân Tân, TP. Long Khánh, Đồng Nai',
    phone: '0251 382 1234',
    email: 'htxxanh.longnkhanh@gmail.com',
    representative: 'Nguyễn Văn Minh',
    taxCode: '3600123456',
    certifications: ['VietGAP', 'GlobalGAP', 'OCOP', 'ISO 22000'],
    productIds: ['p001', 'p006'],
    description: 'HTX Nông nghiệp Xanh Long Khánh chuyên sản xuất rau củ quả và trái cây theo tiêu chuẩn VietGAP và GlobalGAP, cung cấp cho các siêu thị và xuất khẩu.',
    productCount: 12,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  },
  {
    id: 'b002',
    name: 'HTX Nhãn tiêu Bình An',
    shortName: 'HTX Nhãn BA',
    type: 'Hợp tác xã',
    district: 'Vĩnh Cửu',
    address: 'Xã Bình An, Huyện Vĩnh Cửu, Đồng Nai',
    phone: '0251 396 5678',
    email: 'nhantieu.binhan@dongnai.gov.vn',
    representative: 'Trần Thị Hoa',
    taxCode: '3600234567',
    certifications: ['GlobalGAP', 'OCOP 4 sao'],
    productIds: ['p002'],
    description: 'HTX Nhãn tiêu Bình An là vùng trồng nhãn đặc sản nổi tiếng của Đồng Nai, được chứng nhận GlobalGAP và xuất khẩu sang châu Âu.',
    productCount: 3,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
  },
  {
    id: 'b003',
    name: 'Công ty TNHH Nông sản Tân Phú',
    shortName: 'Nông sản Tân Phú',
    type: 'Doanh nghiệp',
    district: 'Tân Phú',
    address: 'KCN Tân Phú Trung, Huyện Tân Phú, Đồng Nai',
    phone: '0251 371 9012',
    email: 'nongsan.tanphu@gmail.com',
    representative: 'Lê Văn Phúc',
    taxCode: '3600345678',
    certifications: ['VietGAP', 'Chỉ dẫn địa lý', 'HACCP'],
    productIds: ['p003'],
    description: 'Công ty chuyên sản xuất và kinh doanh bưởi da xanh Tân Phú, được bảo hộ chỉ dẫn địa lý, xuất khẩu sang 15 quốc gia.',
    productCount: 8,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    id: 'b004',
    name: 'HTX Mật ong Vĩnh Cửu',
    shortName: 'Mật ong Vĩnh Cửu',
    type: 'Hợp tác xã',
    district: 'Vĩnh Cửu',
    address: 'Khu Bảo tồn Mã Đà, Huyện Vĩnh Cửu, Đồng Nai',
    phone: '0251 389 3456',
    email: 'matong.vinhcuu@gmail.com',
    representative: 'Phạm Thị Lan',
    taxCode: '3600456789',
    certifications: ['Hữu cơ', 'OCOP 4 sao', 'FDA'],
    productIds: ['p004'],
    description: 'HTX khai thác và chế biến mật ong rừng tự nhiên tại khu bảo tồn Mã Đà, bảo đảm 100% nguyên chất, không pha trộn.',
    productCount: 5,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
  },
  {
    id: 'b005',
    name: 'Trang trại gà sạch Xuân Lộc',
    shortName: 'Gà sạch XL',
    type: 'Hộ kinh doanh',
    district: 'Cẩm Mỹ',
    address: 'Xã Bảo Bình, Huyện Cẩm Mỹ, Đồng Nai',
    phone: '0912 345 678',
    email: 'gasach.xuanloc@gmail.com',
    representative: 'Hoàng Văn Tuấn',
    taxCode: '3600567890',
    certifications: ['VietGAP', 'An toàn thực phẩm'],
    productIds: ['p005'],
    description: 'Trang trại gà ta thả vườn quy mô 5.000 con, nuôi theo quy trình VietGAP, không dùng kháng sinh, cung cấp trứng và thịt gà sạch.',
    productCount: 2,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop',
  },
];

export const NEWS: NewsItem[] = [
  {
    id: 'n001',
    title: 'Đồng Nai triển khai hệ thống truy xuất nguồn gốc toàn tỉnh',
    excerpt: 'Sở Khoa học & Công nghệ Đồng Nai chính thức ra mắt hệ thống TXNG tỉnh, kết nối hơn 500 doanh nghiệp và HTX trên địa bàn.',
    content: `Ngày 15/01/2024, Sở Khoa học & Công nghệ Đồng Nai chính thức ra mắt hệ thống truy xuất nguồn gốc (TXNG) tỉnh Đồng Nai - một trong những hệ thống TXNG cấp tỉnh hiện đại nhất cả nước.\n\nHệ thống sử dụng công nghệ blockchain và mã QR để ghi nhận và xác thực thông tin về nguồn gốc, quy trình sản xuất của các sản phẩm nông nghiệp trên địa bàn tỉnh.\n\nĐến nay, hệ thống đã kết nối hơn 500 doanh nghiệp, hợp tác xã và hộ sản xuất, với hơn 2.000 sản phẩm được cấp mã truy xuất nguồn gốc.\n\nÔng Nguyễn Văn An, Giám đốc Sở Khoa học & Công nghệ cho biết: "Đây là bước đột phá trong việc nâng cao chất lượng nông sản Đồng Nai, tăng niềm tin của người tiêu dùng và mở rộng cơ hội xuất khẩu."`,
    date: '15/01/2024',
    category: 'Công nghệ',
    author: 'Ban biên tập',
    views: 12450,
    featured: true,
    image: 'https://picsum.photos/seed/news1/800/450',
  },
  {
    id: 'n002',
    title: '100 doanh nghiệp tham gia chương trình TXNG năm 2024',
    excerpt: 'Trong đợt đăng ký đầu tiên của năm 2024, đã có 100 doanh nghiệp và HTX tham gia chương trình truy xuất nguồn gốc tỉnh Đồng Nai.',
    content: `Tính đến tháng 3/2024, đã có thêm 100 doanh nghiệp và hợp tác xã trên địa bàn tỉnh Đồng Nai đăng ký tham gia chương trình truy xuất nguồn gốc sản phẩm.\n\nCác đơn vị này tập trung trong các ngành: rau củ quả (35%), trái cây (28%), thủy sản (15%), chăn nuôi (12%) và các sản phẩm chế biến khác (10%).\n\nĐể được tham gia, các doanh nghiệp phải đáp ứng các yêu cầu về an toàn thực phẩm, có quy trình sản xuất rõ ràng và được cơ quan quản lý nhà nước chứng nhận.`,
    date: '05/03/2024',
    category: 'Sự kiện',
    author: 'Phòng Thông tin',
    views: 8320,
    featured: false,
    image: 'https://picsum.photos/seed/news2/800/450',
  },
  {
    id: 'n003',
    title: 'Nhãn Bình An được chứng nhận GlobalGAP, xuất khẩu sang EU',
    excerpt: 'HTX Nhãn tiêu Bình An vừa nhận chứng nhận GlobalGAP, mở ra cơ hội xuất khẩu 200 tấn nhãn mỗi năm sang thị trường châu Âu.',
    content: `HTX Nhãn tiêu Bình An (Huyện Vĩnh Cửu, Đồng Nai) vừa chính thức nhận chứng nhận GlobalGAP từ tổ chức Control Union, trở thành một trong số ít HTX trồng nhãn được chứng nhận tiêu chuẩn quốc tế này tại Việt Nam.\n\nVới chứng nhận GlobalGAP, HTX có thể xuất khẩu nhãn tiêu sang các thị trường khó tính như EU, Mỹ, Nhật Bản. Dự kiến vụ nhãn 2024, HTX sẽ xuất khẩu khoảng 200 tấn, mang lại doanh thu ước tính 15 tỷ đồng.\n\nBà Trần Thị Hoa, Chủ nhiệm HTX chia sẻ: "Chúng tôi đã mất 3 năm nỗ lực xây dựng quy trình sản xuất đạt chuẩn quốc tế. Đây là thành quả xứng đáng cho những nỗ lực đó."`,
    date: '20/04/2024',
    category: 'Nông nghiệp',
    author: 'Nguyễn Thanh Hà',
    views: 9870,
    featured: false,
    image: 'https://picsum.photos/seed/news3/800/450',
  },
  {
    id: 'n004',
    title: 'Hội thảo blockchain trong truy xuất nguồn gốc nông sản',
    excerpt: 'Hội thảo thu hút hơn 200 đại biểu tham gia, chia sẻ kinh nghiệm ứng dụng blockchain đảm bảo tính minh bạch trong chuỗi cung ứng.',
    content: `Ngày 28/05/2024, Sở Khoa học & Công nghệ Đồng Nai phối hợp với Cục Sở hữu trí tuệ tổ chức Hội thảo "Ứng dụng công nghệ Blockchain trong truy xuất nguồn gốc nông sản" tại TP. Biên Hòa.\n\nHội thảo thu hút hơn 200 đại biểu là đại diện doanh nghiệp, HTX, các sở ban ngành và chuyên gia công nghệ. Nhiều mô hình thành công trong nước và quốc tế đã được chia sẻ.\n\nCác chuyên gia nhấn mạnh: blockchain không thể làm giả thông tin nếu dữ liệu đầu vào được ghi nhận minh bạch, kết hợp với công nghệ IoT để tự động thu thập dữ liệu môi trường trong quá trình sản xuất.`,
    date: '29/05/2024',
    category: 'Công nghệ',
    author: 'Ban biên tập',
    views: 6540,
    featured: false,
    image: 'https://picsum.photos/seed/news4/800/450',
  },
  {
    id: 'n005',
    title: 'Bưởi da xanh Tân Phú được bảo hộ chỉ dẫn địa lý',
    excerpt: 'Sản phẩm bưởi da xanh Tân Phú được Cục Sở hữu trí tuệ cấp chứng nhận chỉ dẫn địa lý, đây là tài sản vô hình quý giá của địa phương.',
    content: `Ngày 10/07/2024, Cục Sở hữu trí tuệ (Bộ Khoa học & Công nghệ) đã trao chứng nhận chỉ dẫn địa lý "Bưởi da xanh Tân Phú - Đồng Nai" cho UBND Huyện Tân Phú.\n\nĐây là sản phẩm thứ 4 của tỉnh Đồng Nai được cấp chứng nhận chỉ dẫn địa lý, sau nhãn Xuân Khánh, xoài Long Khánh và hồ tiêu Lộc Ninh.\n\nBưởi da xanh Tân Phú có đặc trưng riêng biệt: vỏ xanh, múi ngọt thanh, ít hạt, tép mọng nước - những đặc điểm gắn liền với điều kiện thổ nhưỡng và khí hậu đặc thù của vùng đất Tân Phú.`,
    date: '12/07/2024',
    category: 'Nông nghiệp',
    author: 'Trần Minh Quang',
    views: 11230,
    featured: false,
    image: 'https://picsum.photos/seed/news5/800/450',
  },
  {
    id: 'n006',
    title: 'Đồng Nai dẫn đầu cả nước về ứng dụng QR truy xuất nguồn gốc',
    excerpt: 'Theo báo cáo của Bộ Nông nghiệp, Đồng Nai là tỉnh có tỷ lệ sản phẩm nông nghiệp được gắn tem QR truy xuất nguồn gốc cao nhất cả nước.',
    content: `Theo báo cáo tổng kết 6 tháng đầu năm 2024 của Bộ Nông nghiệp và Phát triển nông thôn, tỉnh Đồng Nai dẫn đầu cả nước về tỷ lệ sản phẩm nông nghiệp được gắn tem QR truy xuất nguồn gốc, đạt 78,5%.\n\nToàn tỉnh hiện có 2.456 sản phẩm được cấp mã truy xuất nguồn gốc, với hơn 1,2 triệu lượt quét mã QR được ghi nhận trong nửa đầu năm.\n\nKết quả này là thành quả của quá trình đầu tư vào hạ tầng kỹ thuật, đào tạo nhân lực và chính sách hỗ trợ doanh nghiệp của tỉnh trong hơn 2 năm qua.`,
    date: '05/08/2024',
    category: 'Thành tích',
    author: 'Ban biên tập',
    views: 15680,
    featured: false,
    image: 'https://picsum.photos/seed/news6/800/450',
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'nt001',
    title: 'Hồ sơ đã được phê duyệt',
    body: 'Hồ sơ đăng ký tham gia chương trình TXNG của tổ chức bạn đã được Sở KHCN Đồng Nai phê duyệt. Bạn có thể bắt đầu đăng ký sản phẩm.',
    type: 'success',
    date: '15/01/2024',
    read: true,
  },
  {
    id: 'nt002',
    title: 'Chứng nhận sắp hết hạn',
    body: 'Chứng nhận VietGAP của sản phẩm "Rau muống hữu cơ" sẽ hết hạn vào ngày 30/01/2024. Vui lòng gia hạn để tiếp tục sử dụng tem TXNG.',
    type: 'warning',
    date: '10/01/2024',
    read: false,
  },
  {
    id: 'nt003',
    title: 'Cập nhật hệ thống',
    body: 'Hệ thống TXNG tỉnh Đồng Nai sẽ bảo trì từ 23:00 - 02:00 ngày 20/01/2024. Vui lòng lưu ý để không bị ảnh hưởng đến công việc.',
    type: 'info',
    date: '18/01/2024',
    read: true,
  },
  {
    id: 'nt004',
    title: 'Sản phẩm cần bổ sung thông tin',
    body: 'Sản phẩm "Xoài cát Hòa Lộc" cần bổ sung thông tin quy trình sản xuất theo yêu cầu mới của TXNG. Vui lòng cập nhật trong vòng 7 ngày.',
    type: 'warning',
    date: '22/01/2024',
    read: false,
  },
  {
    id: 'nt005',
    title: 'Đăng ký thành công',
    body: 'Sản phẩm "Mật ong rừng Mã Đà" đã được cấp mã TXNG thành công. Mã truy xuất: DNMO-2024-001.',
    type: 'success',
    date: '05/03/2024',
    read: false,
  },
  {
    id: 'nt006',
    title: 'Thông báo từ hệ thống',
    body: 'Để tăng cường bảo mật, vui lòng cập nhật mật khẩu tài khoản của bạn định kỳ 3 tháng/lần.',
    type: 'info',
    date: '01/04/2024',
    read: true,
  },
];

// Lookup maps
const TRACE_CODE_MAP: Record<string, string> = {
  'DNRM-2024-001': 'p001',
  'DNTB-2024-001': 'p002',
  'DNBX-2024-001': 'p003',
  'DNMO-2024-001': 'p004',
  'DNTG-2024-001': 'p005',
  'DNXO-2024-001': 'p006',
  // Alternate codes
  'DNCM-2024-001': 'p001',
  'DNSM-2024-001': 'p002',
  'DNHQ-2024-001': 'p003',
  'DNCL-2024-001': 'p004',
  'DNRC-2024-001': 'p005',
  'DNVP-2024-001': 'p006',
};

const GTIN_MAP: Record<string, string> = {
  '8934673000016': 'p001',
  '8934673000023': 'p002',
  '8934673000030': 'p003',
  '8934673000047': 'p004',
  '8934673000054': 'p005',
  '8934673000061': 'p006',
};

export function lookupByTraceCode(code: string): Product | null {
  const id = TRACE_CODE_MAP[code.toUpperCase()] ?? TRACE_CODE_MAP[code];
  if (!id) return null;
  return PRODUCTS.find(p => p.id === id) ?? null;
}

export function lookupByGTIN(gtin: string, lot?: string): Product | null {
  const id = GTIN_MAP[gtin.trim()];
  if (!id) return null;
  const product = PRODUCTS.find(p => p.id === id) ?? null;
  if (product && lot && lot.trim()) {
    if (product.lotNumber.toLowerCase() !== lot.trim().toLowerCase()) return null;
  }
  return product;
}

export function getProduct(id: string): Product | null {
  return PRODUCTS.find(p => p.id === id) ?? null;
}

export function getBusiness(id: string): Business | null {
  return BUSINESSES.find(b => b.id === id) ?? null;
}

export function getNewsItem(id: string): NewsItem | null {
  return NEWS.find(n => n.id === id) ?? null;
}

export function getBusinessProducts(businessId: string): Product[] {
  return PRODUCTS.filter(p => p.businessId === businessId);
}

export const DISTRICTS = ['Tất cả', 'Long Khánh', 'Vĩnh Cửu', 'Tân Phú', 'Cẩm Mỹ', 'Biên Hòa', 'Nhơn Trạch'];
export const CATEGORIES = ['Tất cả', 'Rau củ quả', 'Trái cây', 'Thực phẩm', 'Chăn nuôi', 'Thủy sản'];
export const BUSINESS_TYPES = ['Tất cả', 'Hợp tác xã', 'Doanh nghiệp', 'Hộ kinh doanh'];
export const CERTIFICATIONS = ['Tất cả', 'VietGAP', 'GlobalGAP', 'OCOP', 'Hữu cơ', 'HACCP'];

export const STATS = {
  products: 4892,
  businesses: 1247,
  districts: 23104,
  scans: 1200000,
};
