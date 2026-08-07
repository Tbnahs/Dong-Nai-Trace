---
name: Mobile–portal parity
description: Các luồng mobile dành cho doanh nghiệp cần bám sát nội dung, trạng thái và trường dữ liệu của portal.
---

Mobile là phiên bản đồng hành của portal, không phải một luồng rút gọn khác biệt: các màn hình liên hệ, hồ sơ doanh nghiệp, quản lý sản phẩm và quyền truy cập thông báo cần giữ cùng nội dung, trạng thái và hành vi cốt lõi.

**Why:** Người dùng chuyển đổi giữa portal và mobile cho cùng một tài khoản; khác biệt về trường biểu mẫu hoặc trạng thái dễ gây nhầm lẫn và mất dữ liệu.

**How to apply:** Khi sửa một luồng doanh nghiệp ở portal, đối chiếu ngay màn hình mobile tương ứng, đặc biệt các trường tạo/chỉnh sửa, trạng thái duyệt, tài liệu đính kèm và điều kiện đăng nhập.

Đối với bản đồ, mobile phải tải trực tiếp cùng endpoint GeoJSON từ API như portal; không thay thế bằng dữ liệu hình học giả hoặc fallback rút gọn.

**Why:** Ranh giới phường/xã là dữ liệu sản phẩm cần nhất quán; fallback đơn giản làm bản đồ nhìn sai so với portal và khiến thao tác chọn khu vực không đáng tin cậy.

**How to apply:** Giữ mobile gọi `/api/geojson/wards` qua domain được inject bởi workflow/deployment. Nếu API lỗi, hiển thị trạng thái kết nối rõ ràng thay vì vẽ bản đồ thay thế.