export default function DonNaiTinhNang() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAFBFC",
        fontFamily: "'Inter', sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto 1fr auto",
        gap: "4vh 4vw",
        color: "#1E3A5F",
      }}
    >
      {/* Header */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: "2vh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div
            style={{
              width: "2vw",
              height: "2vw",
              backgroundColor: "#0D9488",
              borderRadius: "0.4vw",
            }}
          />
          <div style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "0.02em" }}>
            ĐỒNG NAI TRACE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "2vw",
            fontSize: "1vw",
            fontWeight: 500,
            color: "#64748B",
          }}
        >
          <div>TÍNH NĂNG CHÍNH</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left — features */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          style={{
            fontSize: "1.1vw",
            fontWeight: 600,
            color: "#0D9488",
            marginBottom: "1vh",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Chức năng hệ thống
        </div>
        <h2
          style={{
            fontSize: "3.5vw",
            fontWeight: 800,
            margin: "0 0 3vh 0",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Tính năng chính
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "center",
              background: "#FFFFFF",
              padding: "1.8vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.5vw",
                height: "2.5vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>
                Tra cứu theo mã QR & mã GTIN
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B" }}>
                Quét mã để xem toàn bộ hành trình sản phẩm từ trang trại đến kệ hàng
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "center",
              background: "#FFFFFF",
              padding: "1.8vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.5vw",
                height: "2.5vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>
                Hồ sơ doanh nghiệp & sản phẩm
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B" }}>
                Quản lý thông tin, hình ảnh và tài liệu chứng nhận chất lượng
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "center",
              background: "#FFFFFF",
              padding: "1.8vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.5vw",
                height: "2.5vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>
                Bản đồ vùng sản xuất tích hợp
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B" }}>
                React Leaflet hiển thị vùng trồng trọt và cơ sở chế biến trên bản đồ
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "center",
              background: "#FFFFFF",
              padding: "1.8vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.5vw",
                height: "2.5vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            >
              4
            </div>
            <div>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>
                Cổng đăng nhập dành cho doanh nghiệp
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B" }}>
                Đăng ký, đăng nhập và quản lý danh mục sản phẩm trên nền tảng
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — highlights */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "3vh" }}>
        <div
          style={{
            background: "#FFFFFF",
            padding: "4vh 3vw",
            borderRadius: "1vw",
            border: "1px solid #E2E8F0",
            flex: 1,
            boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "0.9vw",
              fontWeight: 600,
              color: "#64748B",
              marginBottom: "1vh",
              textTransform: "uppercase",
            }}
          >
            Giao diện công khai
          </div>
          <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#1E3A5F" }}>Portal</div>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#0D9488", marginTop: "1vh" }}>
            Dành cho người tiêu dùng
          </div>
          <div style={{ fontSize: "0.9vw", color: "#94A3B8", marginTop: "0.8vh", lineHeight: 1.6 }}>
            Trang chủ · Tra cứu · Chi tiết sản phẩm
          </div>
          <div style={{ fontSize: "0.9vw", color: "#94A3B8", lineHeight: 1.6 }}>
            Doanh nghiệp · Tin tức · Liên hệ
          </div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            padding: "4vh 3vw",
            borderRadius: "1vw",
            border: "1px solid #E2E8F0",
            flex: 1,
            boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "0.9vw",
              fontWeight: 600,
              color: "#64748B",
              marginBottom: "1vh",
              textTransform: "uppercase",
            }}
          >
            Tin tức & Thông báo
          </div>
          <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#1E3A5F" }}>Cổng tin</div>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#0D9488", marginTop: "1vh" }}>
            Thông tin chính thống
          </div>
          <div style={{ fontSize: "0.9vw", color: "#94A3B8", marginTop: "0.8vh", lineHeight: 1.6 }}>
            Tin tức ngành · Thông báo chính sách
          </div>
          <div style={{ fontSize: "0.9vw", color: "#94A3B8", lineHeight: 1.6 }}>
            Hướng dẫn doanh nghiệp tham gia
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #E2E8F0",
          paddingTop: "2vh",
          fontSize: "0.9vw",
          color: "#94A3B8",
          fontWeight: 500,
        }}
      >
        <div>Sở Khoa học và Công nghệ Đồng Nai</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hệ thống truy xuất nguồn gốc</span>
          <span>•</span>
          <span>Trang 4</span>
        </div>
      </div>
    </div>
  );
}
