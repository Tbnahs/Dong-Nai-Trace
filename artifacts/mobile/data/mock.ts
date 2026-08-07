// ─── Data matching the Portal exactly ────────────────────────────────────────
// Products, businesses, trace-codes, GTINs and LOTs are kept in sync with
// artifacts/portal/src/pages/SearchResultsPage.tsx (MOCK_PRODUCTS / MOCK_BUSINESSES)
// and artifacts/portal/src/lib/productLookup.ts.

export interface ProcessStep {
  step: string;
  description: string;
  date: string;
  location: string;
  images?: string[];
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
  images?: string[];
  certificationDocuments?: CertificationDocument[];
  process: ProcessStep[];
}

export interface CertificationDocument {
  name: string;
  issuer: string;
  expiry: string;
  image: string;
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

// ─── 12 products matching Portal ─────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: 'sp001',
    traceCode: 'TXNG-VCU-001-2024',
    gtin: '8934113001234',
    lotNumber: 'L-20241015-01',
    name: 'Bưởi Tân Triều',
    businessId: 'b1',
    businessName: 'HTX Nông nghiệp Xanh',
    origin: 'Tân Triều, Vĩnh Cửu, Đồng Nai',
    district: 'Vĩnh Cửu',
    province: 'Đồng Nai',
    category: 'Nông sản & Rau củ',
    certifications: ['VietGAP'],
    description: 'Bưởi Tân Triều là đặc sản nổi tiếng của vùng đất Vĩnh Cửu, Đồng Nai. Được trồng theo quy trình VietGAP, không sử dụng hóa chất độc hại, đảm bảo an toàn cho người tiêu dùng.',
    productionDate: '14/07/2024',
    expiryDate: '30/07/2024',
    weight: '1.0 – 1.5 kg/quả',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600',
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600',
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=600',
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600',
    ],
    certificationDocuments: [{
      name: 'VietGAP',
      issuer: 'Sở NN&PTNT tỉnh Đồng Nai',
      expiry: '30/09/2025',
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&h=620&fit=crop',
    }],
    process: [
      { step: 'Gieo trồng', description: 'Gieo hạt giống được kiểm định, đất được xử lý theo chuẩn VietGAP.', date: '01/07/2024', location: 'Vườn A – Tân Triều', images: ['https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600', 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600'] },
      { step: 'Chăm sóc', description: 'Tưới nước, bón phân hữu cơ theo lịch, kiểm tra sâu bệnh định kỳ.', date: '08/07/2024', location: 'Vườn A – Tân Triều', images: ['https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=600', 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600'] },
      { step: 'Thu hoạch', description: 'Thu hoạch đợt 1, đạt tiêu chuẩn kích thước và màu sắc, không có dấu hiệu bệnh.', date: '14/07/2024', location: 'Vườn A – Tân Triều', images: ['https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600', 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600'] },
      { step: 'Đóng gói', description: 'Đóng gói, dán nhãn mã QR truy xuất nguồn gốc, kiểm tra VSATTP.', date: '14/07/2024', location: 'Nhà đóng gói HTX' },
      { step: 'Vận chuyển & Phân phối', description: 'Vận chuyển bằng xe lạnh đến điểm phân phối Co.opmart Biên Hòa.', date: '15/07/2024', location: 'Co.opmart Biên Hòa', images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600'] },
    ],
  },
  {
    id: 'sp002',
    traceCode: 'TXNG-XL-002-2024',
    gtin: '8934567890123',
    lotNumber: 'L-20240715-02',
    name: 'Rau muống hữu cơ VietGAP',
    businessId: 'b4',
    businessName: 'Trang trại Sạch Đồng Nai',
    origin: 'Biên Hòa, Đồng Nai',
    district: 'Biên Hòa',
    province: 'Đồng Nai',
    category: 'Nông sản & Rau củ',
    certifications: ['VietGAP'],
    description: 'Rau muống được trồng theo tiêu chuẩn VietGAP, không sử dụng thuốc bảo vệ thực vật, đảm bảo an toàn thực phẩm.',
    productionDate: '14/07/2024',
    expiryDate: '17/07/2024',
    weight: '300g/bó',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=500&fit=crop',
    process: [
      { step: 'Gieo trồng', description: 'Gieo hạt giống được kiểm định, đất được xử lý theo chuẩn VietGAP.', date: '01/07/2024', location: 'Vườn A – Biên Hòa' },
      { step: 'Chăm sóc', description: 'Tưới nước, bón phân hữu cơ theo lịch, kiểm tra sâu bệnh định kỳ.', date: '08/07/2024', location: 'Vườn A – Biên Hòa' },
      { step: 'Thu hoạch', description: 'Thu hoạch đợt 1, đạt tiêu chuẩn kích thước và màu sắc.', date: '14/07/2024', location: 'Vườn A – Biên Hòa' },
      { step: 'Đóng gói & Phân phối', description: 'Đóng bó 300g, dán tem QR, vận chuyển đến siêu thị.', date: '15/07/2024', location: 'Kho đóng gói Trang trại' },
    ],
  },
  {
    id: 'sp003',
    traceCode: 'TXNG-LT-003-2024',
    gtin: '8934000003000',
    lotNumber: 'L-20240810-03',
    name: 'Tôm sú đông lạnh',
    businessId: 'b2',
    businessName: 'Công ty Thủy sản Đồng Nai',
    origin: 'Long Thành, Đồng Nai',
    district: 'Long Thành',
    province: 'Đồng Nai',
    category: 'Thủy sản',
    certifications: ['HACCP'],
    description: 'Tôm sú nuôi theo tiêu chuẩn HACCP, đông lạnh ngay sau thu hoạch, đảm bảo chất lượng và vệ sinh an toàn thực phẩm.',
    productionDate: '10/08/2024',
    expiryDate: '10/08/2026',
    weight: '500g/hộp',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=500&fit=crop',
    process: [
      { step: 'Nuôi trồng', description: 'Tôm sú được nuôi trong ao sạch, kiểm soát môi trường nước theo tiêu chuẩn HACCP.', date: '01/06/2024', location: 'Ao nuôi A1 – Long Thành' },
      { step: 'Kiểm tra chất lượng', description: 'Lấy mẫu kiểm tra kháng sinh, dư lượng hóa chất trước thu hoạch.', date: '05/08/2024', location: 'Lab KCS' },
      { step: 'Thu hoạch', description: 'Thu hoạch, phân loại theo kích cỡ, rửa sạch bằng nước muối.', date: '08/08/2024', location: 'Ao nuôi A1 – Long Thành' },
      { step: 'Chế biến & Đông lạnh', description: 'Đông lạnh IQF, đóng gói hút chân không, dán nhãn TXNG.', date: '10/08/2024', location: 'Nhà máy Long Thành' },
    ],
  },
  {
    id: 'sp004',
    traceCode: 'TXNG-NT-004-2024',
    gtin: '8934000004000',
    lotNumber: 'L-20240920-04',
    name: 'Cá tra phi lê',
    businessId: 'b6',
    businessName: 'Công ty TNHH Thủy sản Nam Phát',
    origin: 'Nhơn Trạch, Đồng Nai',
    district: 'Nhơn Trạch',
    province: 'Đồng Nai',
    category: 'Thủy sản',
    certifications: ['GlobalGAP'],
    description: 'Cá tra phi lê nuôi theo tiêu chuẩn GlobalGAP, xử lý và đóng gói trong điều kiện đạt chuẩn an toàn vệ sinh thực phẩm quốc tế.',
    productionDate: '20/09/2024',
    expiryDate: '20/09/2026',
    weight: '1kg/gói',
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&h=500&fit=crop',
    process: [
      { step: 'Nuôi trồng', description: 'Cá tra nuôi lồng bè theo tiêu chuẩn GlobalGAP.', date: 'Tháng 4/2024', location: 'Lồng bè Nhơn Trạch' },
      { step: 'Kiểm dịch', description: 'Kiểm tra chất lượng nước, dư lượng kháng sinh trước thu hoạch.', date: '15/09/2024', location: 'Phòng KCS' },
      { step: 'Phi lê & Đông lạnh', description: 'Phi lê, rửa sạch, IQF đông lạnh, kiểm tra cảm quan.', date: '20/09/2024', location: 'Nhà máy chế biến' },
      { step: 'Đóng gói & Xuất kho', description: 'Đóng gói hút chân không, dán tem truy xuất, xuất kho.', date: '20/09/2024', location: 'Kho lạnh Nhơn Trạch' },
    ],
  },
  {
    id: 'sp005',
    traceCode: 'TXNG-XL-005-2024',
    gtin: '8934000005000',
    lotNumber: 'L-20240601-05',
    name: 'Nước mắm truyền thống',
    businessId: 'b7',
    businessName: 'Cơ sở Nước mắm Hương Đồng',
    origin: 'Xuân Lộc, Đồng Nai',
    district: 'Xuân Lộc',
    province: 'Đồng Nai',
    category: 'Thực phẩm chế biến',
    certifications: ['ISO 22000'],
    description: 'Nước mắm truyền thống Hương Đồng được sản xuất theo phương pháp ủ chượp cá cơm lâu năm, đạt tiêu chuẩn ISO 22000, hương vị đậm đà.',
    productionDate: '01/06/2024',
    expiryDate: '01/06/2026',
    weight: '500ml/chai',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=500&fit=crop',
    process: [
      { step: 'Chọn nguyên liệu', description: 'Cá cơm tươi được chọn lọc kỹ, muối hạt sạch đạt tiêu chuẩn.', date: 'Tháng 9/2023', location: 'Kho nguyên liệu' },
      { step: 'Ủ chượp', description: 'Ủ cá với muối theo tỷ lệ truyền thống trong thùng gỗ 24 tháng.', date: 'Tháng 9/2023 – 5/2024', location: 'Khu ủ chượp' },
      { step: 'Kéo rút', description: 'Kéo rút nước mắm nhĩ, kiểm tra màu sắc, độ đạm theo tiêu chuẩn.', date: 'Tháng 5/2024', location: 'Phòng chế biến' },
      { step: 'Đóng chai & Dán nhãn', description: 'Chiết rót vào chai thủy tinh 500ml, dán tem truy xuất.', date: '01/06/2024', location: 'Dây chuyền đóng chai' },
    ],
  },
  {
    id: 'sp006',
    traceCode: 'TXNG-DQ-006-2024',
    gtin: '8934000006000',
    lotNumber: 'L-20240801-06',
    name: 'Dưa hấu không hạt',
    businessId: 'b3',
    businessName: 'HTX Dưa hấu Định Quán',
    origin: 'Định Quán, Đồng Nai',
    district: 'Định Quán',
    province: 'Đồng Nai',
    category: 'Nông sản & Rau củ',
    certifications: ['OCOP'],
    description: 'Dưa hấu không hạt Định Quán được trồng theo quy trình an toàn, vỏ mỏng, ruột đỏ, ngọt mát, đạt tiêu chuẩn OCOP tỉnh Đồng Nai.',
    productionDate: '01/08/2024',
    expiryDate: '15/08/2024',
    weight: '4 – 6 kg/quả',
    image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=600&h=500&fit=crop',
    process: [
      { step: 'Gieo hạt', description: 'Hạt giống dưa hấu không hạt F1, ươm trong khay nhà màng.', date: '01/06/2024', location: 'Nhà màng HTX' },
      { step: 'Chăm sóc', description: 'Tưới nhỏ giọt, bón phân cân đối, kiểm soát côn trùng bằng bẫy sinh học.', date: 'Tháng 6 – 7/2024', location: 'Đồng ruộng Định Quán' },
      { step: 'Thu hoạch', description: 'Thu hoạch khi đạt độ chín đặc trưng, kiểm tra trọng lượng và chất lượng.', date: '30/07/2024', location: 'Đồng ruộng Định Quán' },
      { step: 'Đóng gói & Phân phối', description: 'Phân loại, dán tem TXNG, vận chuyển đến siêu thị và chợ đầu mối.', date: '01/08/2024', location: 'Kho HTX Định Quán' },
    ],
  },
  {
    id: 'sp007',
    traceCode: 'TXNG-TP-007-2024',
    gtin: '8934000007000',
    lotNumber: 'L-20240501-07',
    name: 'Mật ong rừng nguyên chất',
    businessId: 'b8',
    businessName: 'Trang trại Ong Rừng Đồng Nai',
    origin: 'Tân Phú, Đồng Nai',
    district: 'Tân Phú',
    province: 'Đồng Nai',
    category: 'Thực phẩm chế biến',
    certifications: ['OCOP'],
    description: 'Mật ong rừng nguyên chất Tân Phú được lấy từ tổ ong nuôi trong rừng tự nhiên, không pha trộn, đảm bảo 100% nguyên chất, đạt tiêu chuẩn OCOP.',
    productionDate: '01/05/2024',
    expiryDate: '01/05/2026',
    weight: '500ml/chai',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=500&fit=crop',
    process: [
      { step: 'Nuôi ong', description: 'Đàn ong nuôi trong rừng tự nhiên Tân Phú, không dùng kháng sinh.', date: 'Năm 2024', location: 'Rừng Tân Phú' },
      { step: 'Khai thác', description: 'Khai thác mật bằng phương pháp truyền thống, giữ nguyên chất lượng.', date: '28/04/2024', location: 'Vị trí đàn ong số 12' },
      { step: 'Lọc & Kiểm nghiệm', description: 'Lọc qua vải, kiểm tra độ ẩm, hàm lượng đường và kháng sinh.', date: '30/04/2024', location: 'Phòng Lab trang trại' },
      { step: 'Đóng chai', description: 'Chiết rót chai thủy tinh 500ml, dán tem QR truy xuất.', date: '01/05/2024', location: 'Xưởng đóng gói' },
    ],
  },
  {
    id: 'sp008',
    traceCode: 'TXNG-DQ-008-2024',
    gtin: '8934000008000',
    lotNumber: 'L-20240915-08',
    name: 'Gạo hữu cơ Định Quán',
    businessId: 'b9',
    businessName: 'HTX Nông sản Định Quán',
    origin: 'Định Quán, Đồng Nai',
    district: 'Định Quán',
    province: 'Đồng Nai',
    category: 'Nông sản & Rau củ',
    certifications: ['VietGAP'],
    description: 'Gạo hữu cơ Định Quán được canh tác hoàn toàn tự nhiên, không dùng phân bón hóa học hay thuốc trừ sâu, gạo trắng đều, cơm dẻo thơm.',
    productionDate: '15/09/2024',
    expiryDate: '15/09/2025',
    weight: '5kg/túi',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&h=500&fit=crop',
    process: [
      { step: 'Gieo cấy', description: 'Giống lúa ST25 hữu cơ được ngâm ủ và cấy trên ruộng sạch.', date: 'Tháng 6/2024', location: 'Cánh đồng Định Quán' },
      { step: 'Chăm sóc hữu cơ', description: 'Bón phân vi sinh, dùng thiên địch kiểm soát sâu bệnh.', date: 'Tháng 6 – 8/2024', location: 'Cánh đồng Định Quán' },
      { step: 'Thu hoạch', description: 'Gặt máy, phơi sấy tự nhiên đạt độ ẩm tiêu chuẩn.', date: '10/09/2024', location: 'Cánh đồng Định Quán' },
      { step: 'Xay xát & Đóng gói', description: 'Xay xát, đóng túi 5kg, hút chân không, dán tem TXNG.', date: '15/09/2024', location: 'Nhà máy xay xát HTX' },
    ],
  },
  {
    id: 'sp009',
    traceCode: 'TXNG-BH-009-2024',
    gtin: '8934000009000',
    lotNumber: 'L-20241101-09',
    name: 'Chả giò chiên giòn',
    businessId: 'b10',
    businessName: 'Công ty TNHH Thực phẩm Bình An',
    origin: 'Biên Hòa, Đồng Nai',
    district: 'Biên Hòa',
    province: 'Đồng Nai',
    category: 'Thực phẩm chế biến',
    certifications: ['ISO 22000'],
    description: 'Chả giò chiên giòn Bình An sản xuất từ thịt heo sạch, rau củ tươi, bánh tráng không chất bảo quản, đạt tiêu chuẩn ISO 22000 và VSATTP.',
    productionDate: '01/11/2024',
    expiryDate: '01/02/2025',
    weight: '300g/gói (10 cái)',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=500&fit=crop',
    process: [
      { step: 'Chuẩn bị nguyên liệu', description: 'Thịt heo, nấm mèo, miến, cà rốt được kiểm tra chất lượng.', date: '30/10/2024', location: 'Kho nguyên liệu' },
      { step: 'Chế biến nhân', description: 'Xay, trộn nhân theo công thức chuẩn, kiểm tra cảm quan.', date: '31/10/2024', location: 'Phòng chế biến' },
      { step: 'Cuốn & Đông lạnh', description: 'Cuốn bằng máy, đông lạnh nhanh IQF để giữ độ giòn.', date: '01/11/2024', location: 'Dây chuyền sản xuất' },
      { step: 'Đóng gói & Kiểm định', description: 'Đóng gói 10 cái/gói, kiểm định lần cuối, dán tem TXNG.', date: '01/11/2024', location: 'Khu đóng gói Bình An' },
    ],
  },
  {
    id: 'sp010',
    traceCode: 'TXNG-LK-010-2024',
    gtin: '8934000010000',
    lotNumber: 'L-20241201-10',
    name: 'Tiêu sọ Long Khánh',
    businessId: 'b5',
    businessName: 'HTX Hồ Tiêu Long Khánh',
    origin: 'Long Khánh, Đồng Nai',
    district: 'Long Khánh',
    province: 'Đồng Nai',
    category: 'Nông sản & Rau củ',
    certifications: ['OCOP'],
    description: 'Tiêu sọ Long Khánh được trồng theo quy trình hữu cơ, phơi nắng tự nhiên, hạt tròn đều, thơm nồng đặc trưng, đạt tiêu chuẩn OCOP 4 sao.',
    productionDate: '01/12/2024',
    expiryDate: '01/12/2025',
    weight: '250g/túi',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=500&fit=crop',
    process: [
      { step: 'Canh tác', description: 'Vườn tiêu 8 năm tuổi, quản lý theo quy trình hữu cơ, không thuốc trừ sâu.', date: 'Năm 2024', location: 'Vườn tiêu Long Khánh' },
      { step: 'Thu hoạch', description: 'Hái thủ công từng chùm khi chín đỏ, đảm bảo độ chín đồng đều.', date: '25/11/2024', location: 'Vườn tiêu số 5' },
      { step: 'Tách vỏ & Phơi sấy', description: 'Ngâm nước, tách vỏ, phơi nắng tự nhiên 3 ngày đến khi đạt tiêu chuẩn.', date: '26 – 29/11/2024', location: 'Sân phơi HTX' },
      { step: 'Đóng gói', description: 'Đóng túi 250g, hút chân không, dán tem QR truy xuất nguồn gốc.', date: '01/12/2024', location: 'Kho đóng gói HTX' },
    ],
  },
  {
    id: 'sp011',
    traceCode: 'TXNG-LK-011-2024',
    gtin: '8934000011000',
    lotNumber: 'L-20241105-11',
    name: 'Bò khô Long Khánh',
    businessId: 'b11',
    businessName: 'Cơ sở Đặc sản Long Khánh',
    origin: 'Long Khánh, Đồng Nai',
    district: 'Long Khánh',
    province: 'Đồng Nai',
    category: 'Thực phẩm chế biến',
    certifications: ['HACCP'],
    description: 'Bò khô Long Khánh làm từ thịt bò tươi chọn lọc, ướp gia vị truyền thống, sấy khô tự nhiên, không chất bảo quản, đạt tiêu chuẩn HACCP.',
    productionDate: '05/11/2024',
    expiryDate: '05/02/2025',
    weight: '200g/gói',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=500&fit=crop',
    process: [
      { step: 'Chọn nguyên liệu', description: 'Thịt bò tươi loại 1 được kiểm định vệ sinh thú y.', date: '03/11/2024', location: 'Kho nguyên liệu' },
      { step: 'Ướp gia vị', description: 'Ướp theo công thức truyền thống 12 tiếng trong điều kiện lạnh.', date: '03 – 04/11/2024', location: 'Phòng chế biến' },
      { step: 'Sấy khô', description: 'Sấy bằng lò nhiệt đối lưu ở 70°C trong 8 giờ, đảm bảo an toàn vi sinh.', date: '04/11/2024', location: 'Lò sấy' },
      { step: 'Đóng gói', description: 'Đóng gói 200g, hút chân không, dán tem TXNG và hạn sử dụng.', date: '05/11/2024', location: 'Khu đóng gói' },
    ],
  },
  {
    id: 'sp012',
    traceCode: 'TXNG-VC-012-2024',
    gtin: '8934000012000',
    lotNumber: 'L-20241010-12',
    name: 'Dệt thổ cẩm thủ công',
    businessId: 'b12',
    businessName: 'Làng nghề Trị An',
    origin: 'Vĩnh Cửu, Đồng Nai',
    district: 'Vĩnh Cửu',
    province: 'Đồng Nai',
    category: 'Thủ công mỹ nghệ',
    certifications: [],
    description: 'Vải thổ cẩm Trị An được dệt thủ công bởi nghệ nhân người Châu Mạ, họa tiết truyền thống phong phú, màu sắc từ thực vật tự nhiên.',
    productionDate: '10/10/2024',
    expiryDate: '—',
    weight: '1.2m × 0.8m/tấm',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop',
    process: [
      { step: 'Chuẩn bị sợi', description: 'Sợi cotton nhuộm màu từ cây rừng tự nhiên theo truyền thống.', date: 'Tháng 9/2024', location: 'Xưởng nhuộm sợi' },
      { step: 'Dệt thủ công', description: 'Nghệ nhân dệt trên khung gỗ truyền thống, mỗi tấm mất 3 ngày.', date: 'Tháng 10/2024', location: 'Xưởng dệt Làng nghề' },
      { step: 'Hoàn thiện', description: 'Kiểm tra chất lượng, viền mép, phơi khô tự nhiên.', date: '08/10/2024', location: 'Xưởng hoàn thiện' },
      { step: 'Đóng gói & Gắn tem', description: 'Đóng gói bảo quản, gắn tem truy xuất nguồn gốc làng nghề.', date: '10/10/2024', location: 'Khu trưng bày Làng nghề' },
    ],
  },
];

// ─── 12 businesses matching Portal ───────────────────────────────────────────
export const BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'HTX Nông nghiệp Xanh',
    shortName: 'HTX NN Xanh',
    type: 'Hợp tác xã',
    district: 'Vĩnh Cửu',
    address: 'Xã Tân Triều, Huyện Vĩnh Cửu, Đồng Nai',
    phone: '0251 890 123',
    email: 'htx@nongnghi.vn',
    representative: 'Nguyễn Văn Minh',
    taxCode: '3600111111',
    certifications: ['VietGAP', 'GlobalGAP', 'OCOP'],
    productIds: ['sp001'],
    description: 'HTX Nông nghiệp Xanh chuyên trồng và phân phối bưởi Tân Triều, rau củ quả theo tiêu chuẩn VietGAP và GlobalGAP, cung cấp cho các siêu thị và xuất khẩu.',
    productCount: 5,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  },
  {
    id: 'b2',
    name: 'Công ty Thủy sản Đồng Nai',
    shortName: 'Thủy sản ĐN',
    type: 'Doanh nghiệp',
    district: 'Long Thành',
    address: 'KCN Long Thành, Huyện Long Thành, Đồng Nai',
    phone: '0251 234 567',
    email: 'info@thuysandn.vn',
    representative: 'Trần Văn Hùng',
    taxCode: '3600222222',
    certifications: ['HACCP', 'ISO 22000'],
    productIds: ['sp003'],
    description: 'Công ty chuyên nuôi trồng, chế biến và xuất khẩu thủy sản (tôm sú, tôm thẻ, cá tra) đạt tiêu chuẩn HACCP và ISO 22000, xuất khẩu sang 20 quốc gia.',
    productCount: 8,
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&h=400&fit=crop',
  },
  {
    id: 'b3',
    name: 'HTX Dưa hấu Định Quán',
    shortName: 'HTX Dưa hấu',
    type: 'Hợp tác xã',
    district: 'Định Quán',
    address: 'Xã Phú Vinh, Huyện Định Quán, Đồng Nai',
    phone: '0251 345 678',
    email: 'htxduahau@gmail.com',
    representative: 'Lê Thị Thu',
    taxCode: '3600333333',
    certifications: ['OCOP', 'VietGAP'],
    productIds: ['sp006'],
    description: 'HTX Dưa hấu Định Quán chuyên sản xuất dưa hấu không hạt theo tiêu chuẩn an toàn thực phẩm, đạt OCOP tỉnh Đồng Nai, phân phối toàn quốc.',
    productCount: 3,
    image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=600&h=400&fit=crop',
  },
  {
    id: 'b4',
    name: 'Trang trại Sạch Đồng Nai',
    shortName: 'TT Sạch ĐN',
    type: 'Trang trại',
    district: 'Biên Hòa',
    address: 'Phường Hóa An, TP. Biên Hòa, Đồng Nai',
    phone: '0251 456 789',
    email: 'ttsach.dongnai@gmail.com',
    representative: 'Phạm Văn Đức',
    taxCode: '3600444444',
    certifications: ['VietGAP', 'GlobalGAP'],
    productIds: ['sp002'],
    description: 'Trang trại Sạch Đồng Nai sản xuất rau củ theo tiêu chuẩn VietGAP và GlobalGAP, cung cấp cho hệ thống siêu thị Big C, Co.opmart và bếp ăn công nghiệp.',
    productCount: 12,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
  },
  {
    id: 'b5',
    name: 'HTX Hồ Tiêu Long Khánh',
    shortName: 'HTX Hồ Tiêu',
    type: 'Hợp tác xã',
    district: 'Long Khánh',
    address: 'Xã Bảo Quang, TP. Long Khánh, Đồng Nai',
    phone: '0251 567 890',
    email: 'hotieuLK@gmail.com',
    representative: 'Võ Thị Hương',
    taxCode: '3600555555',
    certifications: ['OCOP', 'Hữu cơ'],
    productIds: ['sp010'],
    description: 'HTX Hồ Tiêu Long Khánh chuyên canh tác hồ tiêu hữu cơ, sản phẩm tiêu sọ đạt OCOP 4 sao, xuất khẩu sang Nhật Bản, Hàn Quốc và EU.',
    productCount: 4,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
  },
  {
    id: 'b6',
    name: 'Công ty TNHH Thủy sản Nam Phát',
    shortName: 'Nam Phát',
    type: 'Doanh nghiệp',
    district: 'Nhơn Trạch',
    address: 'KCN Nhơn Trạch III, Huyện Nhơn Trạch, Đồng Nai',
    phone: '0251 678 901',
    email: 'namphat@thuysandn.vn',
    representative: 'Nguyễn Thanh Tùng',
    taxCode: '3600666666',
    certifications: ['GlobalGAP', 'ASC', 'HACCP'],
    productIds: ['sp004'],
    description: 'Công ty TNHH Thủy sản Nam Phát chuyên nuôi và chế biến cá tra phi lê xuất khẩu đạt tiêu chuẩn GlobalGAP và ASC, xuất khẩu sang châu Âu và Mỹ.',
    productCount: 7,
    image: 'https://images.unsplash.com/photo-1534361960057-19f073e29f93?w=600&h=400&fit=crop',
  },
  {
    id: 'b7',
    name: 'Cơ sở Nước mắm Hương Đồng',
    shortName: 'Hương Đồng',
    type: 'Cơ sở sản xuất',
    district: 'Xuân Lộc',
    address: 'Xã Xuân Thọ, Huyện Xuân Lộc, Đồng Nai',
    phone: '0251 789 012',
    email: 'nuocmam.huongdong@gmail.com',
    representative: 'Trần Thị Huệ',
    taxCode: '3600777777',
    certifications: ['ISO 22000', 'VSATTP'],
    productIds: ['sp005'],
    description: 'Cơ sở sản xuất nước mắm truyền thống Hương Đồng theo phương pháp ủ chượp lâu năm, đạt tiêu chuẩn ISO 22000, thương hiệu nổi tiếng vùng Xuân Lộc.',
    productCount: 2,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop',
  },
  {
    id: 'b8',
    name: 'Trang trại Ong Rừng Đồng Nai',
    shortName: 'Ong Rừng ĐN',
    type: 'Trang trại',
    district: 'Tân Phú',
    address: 'Xã Phú Lâm, Huyện Tân Phú, Đồng Nai',
    phone: '0251 890 234',
    email: 'ongrung.dongnai@gmail.com',
    representative: 'Hoàng Văn Lâm',
    taxCode: '3600888888',
    certifications: ['OCOP', 'Hữu cơ'],
    productIds: ['sp007'],
    description: 'Trang trại Ong Rừng Đồng Nai khai thác và chế biến mật ong rừng tự nhiên tại huyện Tân Phú, sản phẩm đạt OCOP 3 sao, 100% nguyên chất không pha trộn.',
    productCount: 3,
    image: 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=600&h=400&fit=crop',
  },
  {
    id: 'b9',
    name: 'HTX Nông sản Định Quán',
    shortName: 'HTX NS Định Quán',
    type: 'Hợp tác xã',
    district: 'Định Quán',
    address: 'Xã Phú Cường, Huyện Định Quán, Đồng Nai',
    phone: '0251 901 234',
    email: 'htxnongsan.dinhquan@gmail.com',
    representative: 'Nguyễn Hữu Phúc',
    taxCode: '3600999999',
    certifications: ['VietGAP', 'OCOP'],
    productIds: ['sp008'],
    description: 'HTX Nông sản Định Quán chuyên sản xuất gạo hữu cơ và các loại nông sản sạch, áp dụng công nghệ canh tác hiện đại, đạt VietGAP và OCOP 3 sao.',
    productCount: 6,
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&h=400&fit=crop',
  },
  {
    id: 'b10',
    name: 'Công ty TNHH Thực phẩm Bình An',
    shortName: 'Thực phẩm Bình An',
    type: 'Doanh nghiệp',
    district: 'Biên Hòa',
    address: 'KCN Biên Hòa 2, TP. Biên Hòa, Đồng Nai',
    phone: '0251 012 345',
    email: 'binhan@thucpham.vn',
    representative: 'Lê Minh Châu',
    taxCode: '3601000000',
    certifications: ['ISO 22000', 'HACCP', 'VSATTP'],
    productIds: ['sp009'],
    description: 'Công ty TNHH Thực phẩm Bình An chuyên sản xuất thực phẩm chế biến đông lạnh (chả giò, nem, hoành thánh) đạt ISO 22000 và HACCP, phân phối toàn quốc.',
    productCount: 9,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    id: 'b11',
    name: 'Cơ sở Đặc sản Long Khánh',
    shortName: 'Đặc sản LK',
    type: 'Cơ sở sản xuất',
    district: 'Long Khánh',
    address: 'Phường Xuân An, TP. Long Khánh, Đồng Nai',
    phone: '0251 111 222',
    email: 'dacsanLK@gmail.com',
    representative: 'Bùi Thị Lan',
    taxCode: '3601111000',
    certifications: ['HACCP', 'VSATTP'],
    productIds: ['sp011'],
    description: 'Cơ sở Đặc sản Long Khánh chuyên sản xuất bò khô, heo khô và các đặc sản vùng miền theo công thức truyền thống, đạt tiêu chuẩn HACCP, thương hiệu uy tín 20 năm.',
    productCount: 4,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop',
  },
  {
    id: 'b12',
    name: 'Làng nghề Trị An',
    shortName: 'Làng nghề Trị An',
    type: 'Làng nghề',
    district: 'Vĩnh Cửu',
    address: 'Xã Trị An, Huyện Vĩnh Cửu, Đồng Nai',
    phone: '0251 222 333',
    email: 'langngheTrAn@dongnai.gov.vn',
    representative: 'K\'Bé (Nghệ nhân dân gian)',
    taxCode: '3601222000',
    certifications: ['Di sản văn hóa phi vật thể'],
    productIds: ['sp012'],
    description: 'Làng nghề dệt thổ cẩm Trị An của người Châu Mạ đã được công nhận Di sản văn hóa phi vật thể quốc gia. Sản phẩm thổ cẩm thủ công với họa tiết truyền thống độc đáo.',
    productCount: 6,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
  },
];

// ─── News (same as Portal) ────────────────────────────────────────────────────
export const NEWS: NewsItem[] = [
  {
    id: 'n001',
    title: 'Đồng Nai triển khai hệ thống truy xuất nguồn gốc toàn diện cho nông sản xuất khẩu',
    excerpt: 'Sở Khoa học và Công nghệ Đồng Nai chính thức ra mắt nền tảng Đồng Nai Trace, kết nối hơn 200 doanh nghiệp và hợp tác xã trên địa bàn tỉnh vào hệ thống truy xuất nguồn gốc điện tử.',
    content: `Sở Khoa học và Công nghệ Đồng Nai chính thức ra mắt nền tảng Đồng Nai Trace, kết nối hơn 200 doanh nghiệp và hợp tác xã trên địa bàn tỉnh vào hệ thống truy xuất nguồn gốc điện tử.\n\nHệ thống sử dụng công nghệ mã QR và dữ liệu minh bạch để ghi nhận và xác thực thông tin về nguồn gốc, quy trình sản xuất của các sản phẩm nông nghiệp trên địa bàn tỉnh.\n\nĐây là bước đột phá trong việc nâng cao chất lượng nông sản Đồng Nai, tăng niềm tin của người tiêu dùng và mở rộng cơ hội xuất khẩu.`,
    date: '20/07/2026',
    category: 'Chính sách',
    author: 'Ban biên tập',
    views: 12450,
    featured: true,
    image: 'https://picsum.photos/seed/news1/800/450',
  },
  {
    id: 'n002',
    title: 'Hội thảo \'Minh bạch chuỗi cung ứng nông sản\' tại Biên Hòa thu hút 300 đại biểu',
    excerpt: 'Hội thảo do Sở KH&CN phối hợp với Hiệp hội Doanh nghiệp Đồng Nai tổ chức đã quy tụ đông đảo doanh nghiệp, HTX và các chuyên gia trong lĩnh vực nông nghiệp công nghệ cao.',
    content: `Hội thảo do Sở KH&CN phối hợp với Hiệp hội Doanh nghiệp Đồng Nai tổ chức đã quy tụ đông đảo doanh nghiệp, HTX và các chuyên gia trong lĩnh vực nông nghiệp công nghệ cao.\n\nTại hội thảo, các chuyên gia nhấn mạnh tầm quan trọng của minh bạch thông tin trong chuỗi cung ứng nông sản nhằm nâng cao giá trị và mở rộng thị trường xuất khẩu.`,
    date: '15/07/2026',
    category: 'Sự kiện',
    author: 'Phòng Thông tin',
    views: 8320,
    featured: false,
    image: 'https://picsum.photos/seed/news2/800/450',
  },
  {
    id: 'n003',
    title: 'Hướng dẫn đăng ký và sử dụng tem truy xuất QR Code cho sản phẩm OCOP',
    excerpt: 'Doanh nghiệp và HTX có sản phẩm OCOP từ 3 sao trở lên được hỗ trợ miễn phí đăng ký tem QR Code và tích hợp vào hệ thống Đồng Nai Trace trong năm 2026.',
    content: `Doanh nghiệp và HTX có sản phẩm OCOP từ 3 sao trở lên được hỗ trợ miễn phí đăng ký tem QR Code và tích hợp vào hệ thống Đồng Nai Trace trong năm 2026.\n\nQuy trình đăng ký gồm 3 bước: nộp hồ sơ trực tuyến, xét duyệt trong 3-5 ngày làm việc và nhận mã truy xuất. Sau khi được cấp mã, doanh nghiệp có thể in tem QR dán lên sản phẩm.`,
    date: '10/07/2026',
    category: 'Hướng dẫn',
    author: 'Ban biên tập',
    views: 9870,
    featured: false,
    image: 'https://picsum.photos/seed/news3/800/450',
  },
  {
    id: 'n004',
    title: 'Nông sản Đồng Nai có truy xuất nguồn gốc tăng giá trị xuất khẩu lên 35%',
    excerpt: 'Theo báo cáo quý II/2026 của Sở Công Thương, các lô hàng nông sản có chứng nhận truy xuất nguồn gốc điện tử ghi nhận mức giá bán cao hơn bình quân 35% so với sản phẩm thông thường.',
    content: `Theo báo cáo quý II/2026 của Sở Công Thương, các lô hàng nông sản có chứng nhận truy xuất nguồn gốc điện tử ghi nhận mức giá bán cao hơn bình quân 35% so với sản phẩm thông thường.\n\nKết quả này phản ánh xu hướng người tiêu dùng ngày càng ưu tiên sản phẩm có nguồn gốc rõ ràng, minh bạch thông tin sản xuất.`,
    date: '05/07/2026',
    category: 'Thị trường',
    author: 'Nguyễn Thanh Hà',
    views: 6540,
    featured: false,
    image: 'https://picsum.photos/seed/news4/800/450',
  },
  {
    id: 'n005',
    title: 'Đoàn doanh nghiệp Nhật Bản thăm và khảo sát mô hình truy xuất nông sản Đồng Nai',
    excerpt: 'Đoàn gồm 15 doanh nghiệp Nhật Bản chuyên nhập khẩu nông sản đã đến tham quan thực tế mô hình chuỗi truy xuất nguồn gốc tại HTX Nông nghiệp Xanh, huyện Vĩnh Cửu.',
    content: `Đoàn gồm 15 doanh nghiệp Nhật Bản chuyên nhập khẩu nông sản đã đến tham quan thực tế mô hình chuỗi truy xuất nguồn gốc tại HTX Nông nghiệp Xanh, huyện Vĩnh Cửu.\n\nCác đại diện doanh nghiệp Nhật Bản đánh giá cao hệ thống truy xuất nguồn gốc của Đồng Nai và bày tỏ sẵn sàng ký kết hợp đồng nhập khẩu nông sản có chứng nhận từ địa phương.`,
    date: '28/06/2026',
    category: 'Sự kiện',
    author: 'Trần Minh Quang',
    views: 11230,
    featured: false,
    image: 'https://picsum.photos/seed/news5/800/450',
  },
  {
    id: 'n006',
    title: 'UBND tỉnh ban hành kế hoạch hỗ trợ doanh nghiệp ứng dụng công nghệ blockchain trong truy xuất',
    excerpt: 'Kế hoạch số 127/KH-UBND đặt mục tiêu đến năm 2027 có ít nhất 500 sản phẩm nông nghiệp của Đồng Nai được truy xuất nguồn gốc bằng công nghệ blockchain.',
    content: `Kế hoạch số 127/KH-UBND đặt mục tiêu đến năm 2027 có ít nhất 500 sản phẩm nông nghiệp của Đồng Nai được truy xuất nguồn gốc bằng công nghệ blockchain.\n\nTheo kế hoạch, tỉnh sẽ hỗ trợ chi phí tích hợp blockchain cho các doanh nghiệp vừa và nhỏ, đồng thời tổ chức đào tạo kỹ thuật để nâng cao năng lực ứng dụng công nghệ cho người sản xuất.`,
    date: '20/06/2026',
    category: 'Chính sách',
    author: 'Ban biên tập',
    views: 15680,
    featured: false,
    image: 'https://picsum.photos/seed/news6/800/450',
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────
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
    body: 'Chứng nhận VietGAP của sản phẩm "Bưởi Tân Triều" sẽ hết hạn vào ngày 30/01/2024. Vui lòng gia hạn để tiếp tục sử dụng tem TXNG.',
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
    body: 'Sản phẩm "Tiêu sọ Long Khánh" cần bổ sung thông tin quy trình sản xuất theo yêu cầu mới của TXNG. Vui lòng cập nhật trong vòng 7 ngày.',
    type: 'warning',
    date: '22/01/2024',
    read: false,
  },
  {
    id: 'nt005',
    title: 'Đăng ký thành công',
    body: 'Sản phẩm "Mật ong rừng nguyên chất" đã được cấp mã TXNG thành công. Mã truy xuất: TXNG-TP-007-2024.',
    type: 'success',
    date: '01/05/2024',
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

// ─── Lookup maps matching Portal's productLookup.ts ───────────────────────────
const TRACE_CODE_MAP: Record<string, string> = {
  'TXNG-VCU-001-2024': 'sp001',
  'TXNG-XL-002-2024':  'sp002',
  'TXNG-LT-003-2024':  'sp003',
  'TXNG-NT-004-2024':  'sp004',
  'TXNG-XL-005-2024':  'sp005',
  'TXNG-DQ-006-2024':  'sp006',
  'TXNG-TP-007-2024':  'sp007',
  'TXNG-DQ-008-2024':  'sp008',
  'TXNG-BH-009-2024':  'sp009',
  'TXNG-LK-010-2024':  'sp010',
  'TXNG-LK-011-2024':  'sp011',
  'TXNG-VC-012-2024':  'sp012',
};

const GTIN_MAP: Record<string, string> = {
  '8934113001234': 'sp001',
  '8934567890123': 'sp002',
  '8934000003000': 'sp003',
  '8934000004000': 'sp004',
  '8934000005000': 'sp005',
  '8934000006000': 'sp006',
  '8934000007000': 'sp007',
  '8934000008000': 'sp008',
  '8934000009000': 'sp009',
  '8934000010000': 'sp010',
  '8934000011000': 'sp011',
  '8934000012000': 'sp012',
};

const LOT_MAP: Record<string, string> = {
  'L-20241015-01': 'sp001',
  'L-20240715-02': 'sp002',
  'L-20240810-03': 'sp003',
};

export function lookupByTraceCode(code: string): Product | null {
  const normalized = code.trim().toUpperCase();
  const id = TRACE_CODE_MAP[normalized] ?? TRACE_CODE_MAP[code.trim()];
  if (!id) return null;
  return PRODUCTS.find(p => p.id === id) ?? null;
}

export function lookupByGTIN(gtin: string, lot?: string): Product | null {
  const g = gtin.trim();
  const l = lot?.trim();

  // Exact lot match takes priority
  if (l && LOT_MAP[l]) {
    const id = LOT_MAP[l];
    return PRODUCTS.find(p => p.id === id) ?? null;
  }

  const id = GTIN_MAP[g];
  if (!id) return null;
  return PRODUCTS.find(p => p.id === id) ?? null;
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

// ─── Filter options matching Portal ──────────────────────────────────────────
export const DISTRICTS = ['Tất cả', 'Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú', 'Trảng Bom', 'Thống Nhất', 'Cẩm Mỹ'];
export const DISTRICT_OPTIONS = ['Biên Hòa', 'Long Khánh', 'Vĩnh Cửu', 'Long Thành', 'Nhơn Trạch', 'Định Quán', 'Xuân Lộc', 'Tân Phú', 'Trảng Bom', 'Thống Nhất', 'Cẩm Mỹ'];
export const ORG_TYPE_OPTIONS = ['Doanh nghiệp', 'Hợp tác xã (HTX)', 'Trang trại', 'Cơ sở sản xuất', 'Hộ kinh doanh'];
export const SECTOR_OPTIONS = ['Nông sản & Rau củ', 'Thủy sản', 'Thực phẩm chế biến', 'Thủ công mỹ nghệ', 'Dược liệu', 'Công nghiệp chế biến'];
export const CATEGORIES = ['Tất cả', 'Nông sản & Rau củ', 'Phân bón & Vật tư nông nghiệp', 'Thủy sản', 'Thịt & Chăn nuôi', 'Thực phẩm chế biến', 'Dược liệu', 'Thủ công mỹ nghệ', 'Công nghiệp chế biến'];
export const BUSINESS_TYPES = ['Tất cả', 'Hợp tác xã', 'Doanh nghiệp', 'Trang trại', 'Cơ sở sản xuất', 'Làng nghề'];
export const CERTIFICATIONS = ['Tất cả', 'VietGAP', 'GlobalGAP', 'OCOP', 'Hữu cơ', 'HACCP', 'ISO 22000'];

export const STATS = {
  products: 4892,
  businesses: 1247,
  districts: 23104,
  scans: 1200000,
};
