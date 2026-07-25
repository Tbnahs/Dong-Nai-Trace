export default function DonNaiLoTrinh() {
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
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr auto",
        gap: "4vh 4vw",
        color: "#1E3A5F",
      }}
    >
      {/* Header */}
      <div
        style={{
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
          <div>LỘ TRÌNH PHÁT TRIỂN</div>
          <div>2026</div>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "6vw",
            height: "6vw",
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "3vh",
          }}
        >
          <div
            style={{
              width: "3vw",
              height: "3vw",
              backgroundColor: "#0D9488",
              borderRadius: "50%",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: "5vw",
            fontWeight: 800,
            margin: "0 0 2vh 0",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Lộ trình phát triển
        </h2>
        <p
          style={{
            fontSize: "1.4vw",
            fontWeight: 400,
            color: "#475569",
            margin: "0 0 5vh 0",
            lineHeight: 1.5,
            maxWidth: "50vw",
          }}
        >
          Ba giai đoạn xây dựng nền tảng truy xuất nguồn gốc toàn diện cho Đồng Nai.
        </p>

        <div style={{ display: "flex", gap: "2vw", width: "100%", maxWidth: "72vw" }}>
          <div
            style={{
              flex: 1,
              background: "#0D9488",
              color: "#FFFFFF",
              padding: "3vh 2.5vw",
              borderRadius: "1vw",
              textAlign: "left",
              boxShadow: "0 1vw 2vw rgba(13, 148, 136, 0.2)",
            }}
          >
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                opacity: 0.8,
                marginBottom: "1vh",
              }}
            >
              Giai đoạn 1
            </div>
            <div style={{ fontSize: "1.5vw", fontWeight: 700, marginBottom: "1vh" }}>
              Portal công khai
            </div>
            <div style={{ fontSize: "0.95vw", opacity: 0.85, lineHeight: 1.6 }}>
              Giao diện tra cứu cho người tiêu dùng, hồ sơ doanh nghiệp và danh mục sản phẩm
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              color: "#1E3A5F",
              padding: "3vh 2.5vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              textAlign: "left",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: 600,
                color: "#0D9488",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1vh",
              }}
            >
              Giai đoạn 2
            </div>
            <div style={{ fontSize: "1.5vw", fontWeight: 700, marginBottom: "1vh" }}>
              Xác thực & dữ liệu thực
            </div>
            <div style={{ fontSize: "0.95vw", color: "#64748B", lineHeight: 1.6 }}>
              Đăng nhập phía server, cơ sở dữ liệu thực, kết nối API đầy đủ
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              color: "#1E3A5F",
              padding: "3vh 2.5vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              textAlign: "left",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: 600,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1vh",
              }}
            >
              Giai đoạn 3
            </div>
            <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#94A3B8", marginBottom: "1vh" }}>
              Ứng dụng di động
            </div>
            <div style={{ fontSize: "0.95vw", color: "#94A3B8", lineHeight: 1.6 }}>
              App quét QR cho người tiêu dùng, dashboard quản trị dành cho doanh nghiệp
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "4vh",
            display: "flex",
            gap: "4vw",
            padding: "3vh 6vw",
            background: "#FFFFFF",
            borderRadius: "1vw",
            border: "1px solid #E2E8F0",
            boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: 600,
                color: "#64748B",
                marginBottom: "0.5vh",
                textTransform: "uppercase",
              }}
            >
              Liên hệ
            </div>
            <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#1E3A5F" }}>
              0251.3822297
            </div>
          </div>
          <div style={{ width: "1px", backgroundColor: "#E2E8F0" }} />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: 600,
                color: "#64748B",
                marginBottom: "0.5vh",
                textTransform: "uppercase",
              }}
            >
              Đơn vị chủ trì
            </div>
            <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#1E3A5F" }}>
              Sở Khoa học và Công nghệ Đồng Nai
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
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
          <span>Trang 5</span>
        </div>
      </div>
    </div>
  );
}
