const base = import.meta.env.BASE_URL;

export default function DonNaiTraceTitle() {
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
        gridTemplateColumns: "3fr 2fr",
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
          <div>GIỚI THIỆU DỰ ÁN</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left — title & scope */}
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
          Sở Khoa học và Công nghệ Đồng Nai
        </div>
        <h1
          style={{
            fontSize: "5vw",
            fontWeight: 800,
            margin: "0 0 2vh 0",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Đồng Nai Trace
        </h1>
        <p
          style={{
            fontSize: "1.4vw",
            fontWeight: 400,
            color: "#475569",
            margin: "0 0 4vh 0",
            lineHeight: 1.5,
            maxWidth: "38vw",
          }}
        >
          Nền tảng định danh và truy vết nguồn gốc sản phẩm hàng hóa Thành phố Đồng Nai.
        </p>

        {/* Scope cards */}
        <div style={{ display: "flex", gap: "2vw" }}>
          <div
            style={{
              background: "#FFFFFF",
              padding: "2.5vh 2vw",
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
              Nền tảng
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1vw" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#1E3A5F" }}>3</div>
              <div
                style={{
                  fontSize: "0.9vw",
                  fontWeight: 600,
                  color: "#0D9488",
                  backgroundColor: "rgba(13, 148, 136, 0.1)",
                  padding: "0.5vh 0.8vw",
                  borderRadius: "2vw",
                }}
              >
                Portal · App · Client
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              padding: "2.5vh 2vw",
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
              Phạm vi
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1vw" }}>
              <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#1E3A5F" }}>Toàn tỉnh</div>
              <div
                style={{
                  fontSize: "0.9vw",
                  fontWeight: 600,
                  color: "#0D9488",
                  backgroundColor: "rgba(13, 148, 136, 0.1)",
                  padding: "0.5vh 0.8vw",
                  borderRadius: "2vw",
                }}
              >
                Đồng Nai
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — hero image */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "1vw",
            border: "1px solid #E2E8F0",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
          }}
        >
          <img
            src={`${base}hero.jpg`}
            crossOrigin="anonymous"
            alt="Sản phẩm Đồng Nai"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
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
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}
