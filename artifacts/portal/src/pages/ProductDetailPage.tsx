import React, { useEffect, useState } from "react";
import { useParams, useSearch } from "wouter";
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Building2,
  Download,
  Share2,
  Leaf,
  Calendar,
  Package,
  Truck,
  Store,
  CheckCircle2,
  Info,
  FlaskConical,
} from "lucide-react";

// ─── Product data ─────────────────────────────────────────────────────────────
const PRODUCTS: Record<string, any> = {
  sp001: {
    name: "Bưởi Tân Triều",
    traceCode: "TXNG-VCU-001-2024",
    cert: "VietGAP",
    certColor: "text-emerald-600 bg-emerald-50",
    origin: "Tân Triều, Vĩnh Cửu, Đồng Nai",
    packaging: "Túi lưới 1.0–1.5 kg/quả",
    updateDate: "15/10/2024",
    orgShort: "HTX Nông nghiệp Xanh",
    description:
      "Bưởi Tân Triều là đặc sản nổi tiếng của vùng đất Vĩnh Cửu, Đồng Nai. Được trồng theo quy trình VietGAP, đảm bảo chất lượng và an toàn cho người tiêu dùng.",
    img: `${import.meta.env.BASE_URL}images/buoi-tan-trieu.jpg`,
    gtin: "8934113001234",
    lotCode: "L-20241015-01",
    weight: "1.0–1.5 kg/quả",
    expiry: "15 ngày (nhiệt độ thường)",
    ingredients: "Bưởi nguyên quả 100% tự nhiên",
    certs: [],
    org: {
      name: "HTX Nông nghiệp Xanh Tân Triều",
      address: "Xã Tân Triều, Vĩnh Cửu, Đồng Nai",
      phone: "0251 890 123",
      email: "htx@nongnghi.vn",
      type: "Hợp tác xã",
      products: 5,
      cert: "VietGAP",
    },
    journey: [
      {
        icon: "leaf",
        label: "Gieo trồng",
        date: "1/7/2024",
        detail: "Gieo hạt giống được kiểm định, đất được xử lý theo chuẩn VietGAP.",
        location: "Vườn A – Tân Triều",
        org: "HTX Nông nghiệp Xanh",
      },
      {
        icon: "flask",
        label: "Chăm sóc",
        date: "8/7/2024",
        detail: "Tưới nước, bón phân hữu cơ theo lịch, kiểm tra sâu bệnh định kỳ.",
        location: "Vườn A – Tân Triều",
        org: "HTX Nông nghiệp Xanh",
      },
      {
        icon: "calendar",
        label: "Thu hoạch",
        date: "14/7/2024",
        detail: "Thu hoạch đợt 1, đạt tiêu chuẩn kích thước và màu sắc.",
        location: "Vườn A – Tân Triều",
        org: "HTX Nông nghiệp Xanh",
      },
      {
        icon: "package",
        label: "Đóng gói",
        date: "14/7/2024",
        detail: "Đóng gói, dán nhãn mã QR truy xuất nguồn gốc, kiểm tra VSATTP.",
        location: "Nhà đóng gói HTX",
        org: "HTX Nông nghiệp Xanh",
      },
      {
        icon: "truck",
        label: "Vận chuyển & Phân phối",
        date: "15/7/2024",
        detail: "Vận chuyển đến điểm phân phối Co.opmart Biên Hòa.",
        location: "Co.opmart Biên Hòa",
        org: "Logistics Nam Phát",
      },
    ],
  },

  sp002: {
    name: "Rau muống hữu cơ VietGAP",
    traceCode: "TXNG-XL-001-2024",
    cert: "VietGAP",
    certColor: "text-emerald-600 bg-emerald-50",
    origin: "Xuân Lộc, Đồng Nai",
    packaging: "Bó 500g–1kg",
    updateDate: "15/7/2024",
    orgShort: "HTX Nông nghiệp Xuân Lộc",
    description:
      "Rau muống được trồng theo tiêu chuẩn VietGAP, hướng đến an toàn thực phẩm và truy xuất nguồn gốc rõ ràng.",
    img: `${import.meta.env.BASE_URL}images/rau-muong.jpg`,
    gtin: "8934567890123",
    lotCode: "L-20240715-02",
    weight: "300g/bó",
    expiry: "3–5 ngày (bảo quản lạnh)",
    ingredients: "Rau muống 100%",
    certs: [
      {
        name: "VietGAP",
        issuer: "Đơn vị cấp chứng nhận",
        date: "20/08/2023",
        expiry: "19/08/2025",
        image:
          "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&h=620&fit=crop",
      },
    ],
    org: {
      name: "HTX Nông nghiệp Xuân Lộc",
      address: "Xã Xuân Thọ, Xuân Lộc, Đồng Nai",
      phone: "0251 555 666",
      email: "htx@xuanloc.vn",
      type: "Hợp tác xã",
      products: 4,
      cert: "VietGAP",
    },
    journey: [
      {
        icon: "leaf",
        label: "Gieo trồng",
        date: "1/7/2024",
        detail: "Gieo trồng và kiểm soát điều kiện canh tác.",
        location: "Vườn A – Xuân Lộc",
        org: "HTX Nông nghiệp Xuân Lộc",
      },
      {
        icon: "flask",
        label: "Chăm sóc",
        date: "8/7/2024",
        detail: "Theo dõi quá trình chăm sóc và kiểm tra chất lượng.",
        location: "Vườn A – Xuân Lộc",
        org: "HTX Nông nghiệp Xuân Lộc",
      },
      {
        icon: "calendar",
        label: "Thu hoạch",
        date: "14/7/2024",
        detail: "Thu hoạch, phân loại và kiểm tra sản phẩm.",
        location: "Vườn A – Xuân Lộc",
        org: "HTX Nông nghiệp Xuân Lộc",
      },
    ],
  },

  sp003: {
    name: "Tôm sú đông lạnh",
    traceCode: "TXNG-LTH-003-2024",
    cert: "HACCP",
    certColor: "text-purple-600 bg-purple-50",
    origin: "Long Thành, Đồng Nai",
    packaging: "Hộp 500g",
    updateDate: "10/8/2024",
    orgShort: "Công ty Thủy sản Đồng Nai",
    description:
      "Tôm sú được kiểm soát chất lượng trong quá trình nuôi, thu hoạch, chế biến và đông lạnh.",
    img: `${import.meta.env.BASE_URL}images/tom-su-dong-lanh.jpg`,
    gtin: "8934000003000",
    lotCode: "L-20240810-03",
    weight: "500g/hộp",
    expiry: "24 tháng (đông lạnh)",
    ingredients: "Tôm sú 100%",
    certs: [
      {
        name: "HACCP",
        issuer: "Đơn vị cấp chứng nhận",
        date: "01/06/2023",
        expiry: "31/05/2026",
        image:
          "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&h=620&fit=crop",
      },
    ],
    org: {
      name: "Công ty Thủy sản Đồng Nai",
      address: "KCN Long Thành, Đồng Nai",
      phone: "0251 234 567",
      email: "info@thuysandn.vn",
      type: "Doanh nghiệp",
      products: 8,
      cert: "HACCP",
    },
    journey: [
      {
        icon: "leaf",
        label: "Nuôi trồng",
        date: "1/6/2024",
        detail: "Theo dõi điều kiện nuôi và môi trường nước.",
        location: "Ao nuôi A1 – Long Thành",
        org: "Công ty Thủy sản Đồng Nai",
      },
      {
        icon: "flask",
        label: "Kiểm tra chất lượng",
        date: "5/8/2024",
        detail: "Kiểm tra chất lượng trước thu hoạch.",
        location: "Bộ phận kiểm soát chất lượng",
        org: "Công ty Thủy sản Đồng Nai",
      },
      {
        icon: "calendar",
        label: "Thu hoạch",
        date: "8/8/2024",
        detail: "Thu hoạch và phân loại theo kích cỡ.",
        location: "Ao nuôi A1 – Long Thành",
        org: "Công ty Thủy sản Đồng Nai",
      },
      {
        icon: "package",
        label: "Chế biến & Đông lạnh",
        date: "10/8/2024",
        detail: "Đông lạnh, đóng gói và dán nhãn truy xuất nguồn gốc.",
        location: "Nhà máy Long Thành",
        org: "Công ty Thủy sản Đồng Nai",
      },
    ],
  },

  // Dữ liệu chi tiết Cá tra phi lê (sp004)
  sp004: {
    name: "Cá tra phi lê",
    traceCode: "TXNG-NT-004-2024",
    cert: "GlobalGAP",
    certColor: "text-blue-600 bg-blue-50",
    origin: "Nhơn Trạch, Đồng Nai",
    packaging: "Túi hút chân không",
    updateDate: "01/10/2024",
    orgShort: "Công ty TNHH Thủy sản Nam Phát",
    description:
      "Cá tra phi lê được sơ chế và đóng gói tại cơ sở chế biến thủy sản. Thông tin lô hàng và quy trình truy xuất được cung cấp theo dữ liệu sản phẩm.",
    img: `${import.meta.env.BASE_URL}images/ca-tra-phi-le.jpg`,
    gtin: "8934000004000",
    lotCode: "L-20241001-04",
    weight: "500g/túi",
    expiry: "Xem hướng dẫn trên bao bì",
    ingredients: "Cá tra phi lê",
    certs: [],
    org: {
      name: "Công ty TNHH Thủy sản Nam Phát",
      address: "Nhơn Trạch, Đồng Nai",
      phone: "Chưa cập nhật",
      email: "Chưa cập nhật",
      type: "Doanh nghiệp",
      products: 7,
      cert: "GlobalGAP",
    },
    journey: [
      {
        icon: "leaf",
        label: "Tiếp nhận nguyên liệu",
        date: "01/10/2024",
        detail: "Ghi nhận thông tin nguyên liệu cá tra và lô hàng.",
        location: "Nhơn Trạch, Đồng Nai",
        org: "Công ty TNHH Thủy sản Nam Phát",
      },
      {
        icon: "flask",
        label: "Sơ chế và kiểm tra chất lượng",
        date: "01/10/2024",
        detail: "Sơ chế cá tra phi lê và kiểm tra chất lượng.",
        location: "Cơ sở chế biến",
        org: "Công ty TNHH Thủy sản Nam Phát",
      },
      {
        icon: "package",
        label: "Đóng gói",
        date: "01/10/2024",
        detail: "Đóng gói sản phẩm và ghi nhận thông tin lô.",
        location: "Cơ sở chế biến",
        org: "Công ty TNHH Thủy sản Nam Phát",
      },
      {
        icon: "truck",
        label: "Phân phối",
        date: "02/10/2024",
        detail: "Chuẩn bị lô sản phẩm để vận chuyển đến đơn vị phân phối.",
        location: "Đồng Nai",
        org: "Công ty TNHH Thủy sản Nam Phát",
      },
    ],
  },

  // Dữ liệu chi tiết Dưa hấu không hạt (sp006)
  sp006: {
    name: "Dưa hấu không hạt",
    traceCode: "TXNG-DN-006-2024",
    cert: "VietGAP",
    certColor: "text-emerald-600 bg-emerald-50",
    origin: "Đồng Nai",
    packaging: "Theo quy cách đóng gói",
    updateDate: "15/10/2024",
    orgShort: "Cơ sở sản xuất Đồng Nai",
    description:
      "Dưa hấu không hạt với thông tin nguồn gốc, lô sản phẩm và quy trình truy xuất phục vụ tra cứu.",
    img: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=300&h=200&fit=crop',
    gtin: "8934000006000",
    lotCode: "L-20241015-06",
    weight: "Xem nhãn sản phẩm",
    expiry: "Xem nhãn sản phẩm",
    ingredients: "Dưa hấu không hạt",
    certs: [],
    org: {
      name: "Cơ sở sản xuất Đồng Nai",
      address: "Đồng Nai",
      phone: "Chưa cập nhật",
      email: "Chưa cập nhật",
      type: "Cơ sở sản xuất",
      products: 3,
      cert: "VietGAP",
    },
    journey: [
      {
        icon: "leaf",
        label: "Canh tác",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin canh tác của sản phẩm.",
        location: "Đồng Nai",
        org: "Cơ sở sản xuất Đồng Nai",
      },
      {
        icon: "calendar",
        label: "Thu hoạch",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin thu hoạch và lô sản phẩm.",
        location: "Đồng Nai",
        org: "Cơ sở sản xuất Đồng Nai",
      },
      {
        icon: "package",
        label: "Đóng gói",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin đóng gói và chuẩn bị dữ liệu truy xuất.",
        location: "Đồng Nai",
        org: "Cơ sở sản xuất Đồng Nai",
      },
    ],
  },

  // Dữ liệu chi tiết Tiêu sọ Long Khánh (sp010)
  sp010: {
    name: "Tiêu sọ Long Khánh",
    traceCode: "TXNG-LK-010-2024",
    cert: "OCOP",
    certColor: "text-orange-600 bg-orange-50",
    origin: "Long Khánh, Đồng Nai",
    packaging: "Gói theo quy cách nhà sản xuất",
    updateDate: "15/10/2024",
    orgShort: "Cơ sở tiêu Long Khánh",
    description:
      "Tiêu sọ Long Khánh với thông tin sản phẩm, đơn vị cung cấp và lô hàng phục vụ truy xuất nguồn gốc.",
    img: `${import.meta.env.BASE_URL}images/peppercorns-black.jpg`,
    gtin: "8934000010000",
    lotCode: "L-20241015-10",
    weight: "Xem nhãn sản phẩm",
    expiry: "Xem nhãn sản phẩm",
    ingredients: "Tiêu sọ",
    certs: [],
    org: {
      name: "Cơ sở tiêu Long Khánh",
      address: "Long Khánh, Đồng Nai",
      phone: "Chưa cập nhật",
      email: "Chưa cập nhật",
      type: "Cơ sở sản xuất",
      products: 3,
      cert: "OCOP",
    },
    journey: [
      {
        icon: "leaf",
        label: "Tiếp nhận nguyên liệu",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin nguyên liệu và nguồn cung cấp.",
        location: "Long Khánh, Đồng Nai",
        org: "Cơ sở tiêu Long Khánh",
      },
      {
        icon: "flask",
        label: "Sơ chế và kiểm tra",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin sơ chế và kiểm tra chất lượng.",
        location: "Long Khánh, Đồng Nai",
        org: "Cơ sở tiêu Long Khánh",
      },
      {
        icon: "package",
        label: "Đóng gói",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin đóng gói và lô sản phẩm.",
        location: "Long Khánh, Đồng Nai",
        org: "Cơ sở tiêu Long Khánh",
      },
    ],
  },

  // Dữ liệu chi tiết Bò khô Long Khánh (sp011)
  sp011: {
    name: "Bò khô Long Khánh",
    traceCode: "TXNG-LK-011-2024",
    cert: "Chưa cập nhật",
    certColor: "text-slate-600 bg-slate-100",
    origin: "Long Khánh, Đồng Nai",
    packaging: "Gói theo quy cách nhà sản xuất",
    updateDate: "15/10/2024",
    orgShort: "Cơ sở bò khô Long Khánh",
    description:
      "Bò khô Long Khánh với thông tin sản phẩm, nguyên liệu và lô hàng phục vụ tra cứu nguồn gốc.",
    img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop',
    gtin: "8934000011000",
    lotCode: "L-20241015-11",
    weight: "Xem nhãn sản phẩm",
    expiry: "Xem nhãn sản phẩm",
    ingredients: "Thịt bò và gia vị theo nhãn sản phẩm",
    certs: [],
    org: {
      name: "Cơ sở bò khô Long Khánh",
      address: "Long Khánh, Đồng Nai",
      phone: "Chưa cập nhật",
      email: "Chưa cập nhật",
      type: "Cơ sở sản xuất",
      products: 2,
      cert: "Chưa cập nhật",
    },
    journey: [
      {
        icon: "leaf",
        label: "Tiếp nhận nguyên liệu",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin nguyên liệu đầu vào.",
        location: "Long Khánh, Đồng Nai",
        org: "Cơ sở bò khô Long Khánh",
      },
      {
        icon: "flask",
        label: "Chế biến",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin chế biến và kiểm tra sản phẩm.",
        location: "Long Khánh, Đồng Nai",
        org: "Cơ sở bò khô Long Khánh",
      },
      {
        icon: "package",
        label: "Đóng gói",
        date: "15/10/2024",
        detail: "Ghi nhận thông tin đóng gói và lô sản phẩm.",
        location: "Long Khánh, Đồng Nai",
        org: "Cơ sở bò khô Long Khánh",
      },
    ],
  },
};

// ─── Generic product builder ──────────────────────────────────────────────────
const buildGeneric = (
  id: string,
  name: string,
  cert: string,
  origin: string,
  orgName: string,
  img: string,
) => ({
  name,
  traceCode: `TXNG-DN-${id.toUpperCase()}-2024`,
  cert,
  certColor:
    cert === "VietGAP"
      ? "text-emerald-600 bg-emerald-50"
      : cert.includes("OCOP")
        ? "text-orange-600 bg-orange-50"
        : "text-blue-600 bg-blue-50",
  origin,
  packaging: "Theo tiêu chuẩn sản phẩm",
  updateDate: "01/01/2024",
  orgShort: orgName,
  description: `${name} được sản xuất tại ${origin}, đáp ứng tiêu chuẩn chất lượng ${cert}.`,
  img,
  gtin: `89340000${id.replace(/\D/g, "")}`,
  lotCode: `L-2024-${id.toUpperCase()}`,
  weight: "Xem nhãn",
  expiry: "Xem nhãn",
  ingredients: name,
  certs: [
    {
      name: cert,
      issuer: "Đơn vị cấp chứng nhận",
      date: "01/01/2024",
      expiry: "31/12/2025",
      image:
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&h=620&fit=crop",
    },
  ],
  org: {
    name: orgName,
    address: `${origin}, Đồng Nai`,
    phone: "0251 000 000",
    email: "lienhe@dongnai.gov.vn",
    type: "Tổ chức",
    products: 3,
    cert,
  },
  journey: [
    {
      icon: "leaf",
      label: "Sản xuất",
      date: "01/01/2024",
      detail: `Sản xuất ${name} theo tiêu chuẩn ${cert}.`,
      location: origin,
      org: orgName,
    },
    {
      icon: "calendar",
      label: "Kiểm tra và hoàn thành",
      date: "15/01/2024",
      detail: "Kiểm tra chất lượng và chuẩn bị sản phẩm.",
      location: origin,
      org: orgName,
    },
    {
      icon: "truck",
      label: "Phân phối",
      date: "20/01/2024",
      detail: "Vận chuyển sản phẩm đến điểm phân phối.",
      location: "Đồng Nai",
      org: orgName,
    },
  ],
});

// ─── Map-section products ─────────────────────────────────────────────────────
const MAP_PRODUCTS: Record<string, any> = {
  p1: buildGeneric(
    "p1",
    "Xoài Cát Hòa Lộc",
    "VietGAP",
    "Bình Phước, Đồng Nai",
    "HTX Nông nghiệp Bình Phước",
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=500&fit=crop",
  ),
  p3: buildGeneric(
    "p3",
    "Chuối tiêu hồng",
    "GlobalGAP",
    "Đồng Xoài, Đồng Nai",
    "Cty TNHH Xuất khẩu Đồng Xoài",
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=500&fit=crop",
  ),
  p4: buildGeneric(
    "p4",
    "Rau muống hữu cơ",
    "Hữu cơ",
    "Phước Long, Đồng Nai",
    "Trang trại Phước Long Xanh",
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=500&fit=crop",
  ),
  p5: buildGeneric(
    "p5",
    "Cà chua bi VietGAP",
    "VietGAP",
    "Bình Tân, Đồng Nai",
    "HTX Rau sạch Bình Tân",
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=500&fit=crop",
  ),
  p6: buildGeneric(
    "p6",
    "Tiêu đen Lộc Ninh",
    "OCOP 4★",
    "Lộc Ninh, Đồng Nai",
    "HTX Rau sạch Lộc Ninh",
    "https://images.unsplash.com/photo-1599909533731-a4f31a68a3dd?w=600&h=500&fit=crop",
  ),
  p7: buildGeneric(
    "p7",
    "Điều rang muối Long Hà",
    "ISO 22000",
    "Long Hà, Đồng Nai",
    "HTX Cây ăn trái Long Hà",
    "https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&h=500&fit=crop",
  ),
  p8: buildGeneric(
    "p8",
    "Nấm linh chi Lộc Tấn",
    "VietGAP",
    "Lộc Tấn, Đồng Nai",
    "Cty TNHH Nông sản Lộc Tấn",
    "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=600&h=500&fit=crop",
  ),
  p9: buildGeneric(
    "p9",
    "Mật ong rừng Trị An",
    "OCOP 3★",
    "Trị An, Vĩnh Cửu",
    "HTX Bưởi Vĩnh Cửu",
    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=500&fit=crop",
  ),
  p10: buildGeneric(
    "p10",
    "Thanh long ruột đỏ",
    "GlobalGAP",
    "Xuân Lộc, Đồng Nai",
    "HTX Thanh long Xuân Lộc",
    "https://images.unsplash.com/photo-1558642669-822d2db4b1ae?w=600&h=500&fit=crop",
  ),
  p11: buildGeneric(
    "p11",
    "Sầu riêng Ri6 Hưng Thịnh",
    "VietGAP",
    "Hưng Thịnh, Đồng Nai",
    "Cty CP Nông sản Hưng Thịnh",
    "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&h=500&fit=crop",
  ),
  p12: buildGeneric(
    "p12",
    "Xoài Đài Loan Dầu Giây",
    "VietGAP",
    "Dầu Giây, Đồng Nai",
    "HTX Xoài Dầu Giây",
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=500&fit=crop",
  ),
  p13: buildGeneric(
    "p13",
    "Rau thủy canh Nhơn Trạch",
    "Hữu cơ",
    "Nhơn Trạch, Đồng Nai",
    "Trang trại Nhơn Trạch Green",
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=500&fit=crop",
  ),
  p14: buildGeneric(
    "p14",
    "Cam sành Cẩm Mỹ",
    "OCOP 4★",
    "Cẩm Mỹ, Đồng Nai",
    "Cty CP Nông nghiệp Cam Mỹ",
    "https://images.unsplash.com/photo-1582979512210-7df77551e49e?w=600&h=500&fit=crop",
  ),
  p15: buildGeneric(
    "p15",
    "Tôm thẻ chân trắng",
    "ASC",
    "Biên Hòa, Đồng Nai",
    "Cty TNHH Chế biến Biên Hòa",
    "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=500&fit=crop",
  ),
};

const ALL_PRODUCTS: Record<string, any> = {
  ...PRODUCTS,
  ...MAP_PRODUCTS,
};

// ─── Journey icons ────────────────────────────────────────────────────────────
const JourneyIcon: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-4 h-4" />,
  flask: <FlaskConical className="w-4 h-4" />,
  calendar: <Calendar className="w-4 h-4" />,
  package: <Package className="w-4 h-4" />,
  truck: <Truck className="w-4 h-4" />,
  store: <Store className="w-4 h-4" />,
};

const JourneyBg: Record<string, string> = {
  leaf: "bg-emerald-100 text-emerald-600",
  flask: "bg-blue-100 text-blue-600",
  calendar: "bg-violet-100 text-violet-600",
  package: "bg-orange-100 text-orange-600",
  truck: "bg-sky-100 text-sky-600",
  store: "bg-amber-100 text-amber-600",
};

// ─── Product detail page ──────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const search = useSearch();

  // Không tự động hiển thị rau muống khi ID không tồn tại.
  const product = params.id ? ALL_PRODUCTS[params.id] : undefined;

  const hasJourneyAccess =
    new URLSearchParams(search).get("access") === "gtin";

  const [activeTab, setActiveTab] = useState<"journey" | "info" | "org">(
    hasJourneyAccess ? "journey" : "info",
  );

  useEffect(() => {
    if (!hasJourneyAccess && activeTab === "journey") {
      setActiveTab("info");
    }
  }, [hasJourneyAccess, activeTab]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-800 mb-2">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Sản phẩm không tồn tại hoặc chưa có thông tin chi tiết.
          </p>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-lg bg-[#2740BA] text-white font-semibold hover:opacity-90"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const certs = Array.isArray(product.certs) ? product.certs : [];
  const journey = Array.isArray(product.journey) ? product.journey : [];
  const org = product.org ?? {};

  const TABS = [
    ...(hasJourneyAccess
      ? [
          {
            key: "journey",
            icon: <CheckCircle2 className="w-4 h-4" />,
            label: "Hành trình sản phẩm",
          },
        ]
      : []),
    {
      key: "info",
      icon: <Info className="w-4 h-4" />,
      label: "Thông tin sản phẩm",
    },
    {
      key: "org",
      icon: <Building2 className="w-4 h-4" />,
      label: "Doanh nghiệp",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-5 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src =
                    "https://placehold.co/600x500?text=Product+Image";
                }}
                className="w-full h-72 lg:h-80 object-cover"
              />
            </div>

            {/* QR code */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col items-center">
              <div className="p-3 border border-slate-200 rounded-xl mb-3 bg-white">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                    product.traceCode ?? "",
                  )}&margin=4`}
                  alt="QR Code"
                  className="w-36 h-36"
                />
              </div>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Mã QR truy xuất nguồn gốc
              </p>
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={() => {
                    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
                      product.traceCode ?? "",
                    )}&margin=4`;
                    const link = document.createElement("a");
                    link.href = qrUrl;
                    link.download = `QR-${product.traceCode ?? "product"}.png`;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.click();
                  }}
                  className="flex-1 min-h-11 flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  <Download className="w-4 h-4 shrink-0" /> Tải QR
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const shareData = {
                      title: product.name,
                      text: `Truy xuất nguồn gốc sản phẩm ${product.name}`,
                      url: window.location.href,
                    };

                    try {
                      if (navigator.share) {
                        await navigator.share(shareData);
                      } else if (navigator.clipboard) {
                        await navigator.clipboard.writeText(
                          window.location.href,
                        );
                        alert("Đã sao chép liên kết sản phẩm.");
                      } else {
                        window.prompt(
                          "Sao chép liên kết:",
                          window.location.href,
                        );
                      }
                    } catch (error) {
                      console.error("Không thể chia sẻ liên kết:", error);
                    }
                  }}
                  className="flex-1 min-h-11 flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  <Share2 className="w-4 h-4 shrink-0" /> Chia sẻ
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                product.certColor ?? "text-blue-600 bg-blue-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
              {product.cert ?? "Chưa cập nhật chứng nhận"}
            </div>

            <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-slate-800 leading-tight mb-2">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mb-2">
              Mã truy xuất:{" "}
              <span className="font-mono font-bold text-[#2740BA]">
                {product.traceCode}
              </span>
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-100 mb-5">
              {[
                {
                  icon: <MapPin className="w-4 h-4 text-gray-400" />,
                  label: "Nguồn gốc",
                  value: product.origin,
                },
                {
                  icon: <Package className="w-4 h-4 text-gray-400" />,
                  label: "Quy cách",
                  value: product.packaging,
                },
                {
                  icon: <Calendar className="w-4 h-4 text-gray-400" />,
                  label: "Cập nhật",
                  value: product.updateDate,
                },
                {
                  icon: <Building2 className="w-4 h-4 text-gray-400" />,
                  label: "Đơn vị",
                  value: product.orgShort,
                },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                    {item.icon} {item.label}
                  </div>
                  <div
                    className="text-sm font-semibold text-gray-800 truncate"
                    title={String(item.value ?? "")}
                  >
                    {item.value ?? "Chưa cập nhật"}
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Thông tin sản phẩm"
              className={`grid ${
                hasJourneyAccess ? "grid-cols-3" : "grid-cols-2"
              } gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 mb-6`}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`min-h-12 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-1 sm:px-3 py-2 text-[11px] sm:text-sm leading-tight text-center font-semibold rounded-lg transition-colors ${
                    activeTab === tab.key
                      ? "bg-white text-[#2740BA] shadow-sm ring-1 ring-slate-200"
                      : "text-gray-500 hover:bg-white/70 hover:text-gray-800"
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ── Tab: Journey ── */}
            {activeTab === "journey" && (
              <div className="space-y-0">
                {journey.length > 0 ? (
                  journey.map((step: any, index: number, steps: any[]) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            JourneyBg[step.icon] ??
                            "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {JourneyIcon[step.icon] ?? (
                            <Package className="w-4 h-4" />
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                        )}
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-2 gap-3">
                            <h3 className="font-semibold text-slate-800">
                              {step.label ?? "Bước truy xuất"}
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 shrink-0">
                              {step.date ?? "Chưa cập nhật"}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {step.detail ?? ""}
                          </p>

                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {step.location ?? "Chưa cập nhật"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              {step.org ?? "Chưa cập nhật"}
                            </div>
                          </div>

                          {Array.isArray(step.images) &&
                            step.images.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                {step.images.map(
                                  (image: string, imageIndex: number) => (
                                    <img
                                      key={imageIndex}
                                      src={image}
                                      alt={`${step.label ?? "Hành trình"}-${imageIndex + 1}`}
                                      loading="lazy"
                                      onError={(event) => {
                                        event.currentTarget.style.display =
                                          "none";
                                      }}
                                      className="rounded-lg border border-slate-200 h-28 w-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                    />
                                  ),
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-gray-500">
                    Chưa có thông tin hành trình truy xuất nguồn gốc.
                  </div>
                )}
              </div>
            )}

            {/* ── Tab: Product info ── */}
            {activeTab === "info" && (
              <div className="space-y-4">
                {[
                  { label: "Mã GTIN", value: product.gtin },
                  { label: "Mã lô sản xuất", value: product.lotCode },
                  { label: "Khối lượng / Quy cách", value: product.weight },
                  { label: "Hạn sử dụng", value: product.expiry },
                  { label: "Xuất xứ", value: product.origin },
                  { label: "Thành phần", value: product.ingredients },
                ].map((row, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0"
                  >
                    <span className="text-sm text-gray-500 w-32 sm:w-44 shrink-0">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium text-gray-800 break-words">
                      {row.value ?? "Chưa cập nhật"}
                    </span>
                  </div>
                ))}

                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Chứng nhận chất lượng
                  </p>
                  <div className="space-y-3">
                    {certs.length > 0 ? (
                      certs.map((cert: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-emerald-700">
                              {cert.name ?? "Chứng nhận"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Cấp bởi: {cert.issuer ?? "Chưa cập nhật"}
                              {" — "}
                              Hiệu lực đến {cert.expiry ?? "Chưa cập nhật"}
                            </p>
                          </div>
                          {cert.image && (
                            <img
                              src={cert.image}
                              alt={`Chứng chỉ ${cert.name ?? ""}`}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                              className="ml-auto h-16 w-24 rounded-lg border border-emerald-200 object-cover shrink-0"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-gray-500">
                        Sản phẩm chưa có thông tin chứng nhận chi tiết.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Organization ── */}
            {activeTab === "org" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-14 h-14 bg-[#2740BA] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0">
                    {(org.name ?? "DN").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#2740BA] text-base">
                      {org.name ?? "Chưa cập nhật tên đơn vị"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {org.type ?? "Chưa cập nhật loại hình"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      icon: <MapPin className="w-4 h-4 text-gray-400" />,
                      value: org.address,
                    },
                    {
                      icon: <Phone className="w-4 h-4 text-gray-400" />,
                      value: org.phone,
                    },
                    {
                      icon: <Mail className="w-4 h-4 text-gray-400" />,
                      value: org.email,
                    },
                  ].map((row, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <span className="shrink-0">{row.icon}</span>
                      <span className="break-words">
                        {row.value ?? "Chưa cập nhật"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-xl font-extrabold text-[#2740BA]">
                      {org.products ?? 0}
                    </p>
                    <p className="text-xs text-gray-500">Sản phẩm</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {org.cert ?? product.cert ?? "Chưa cập nhật"}
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
