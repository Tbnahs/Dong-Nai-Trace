export default function DonNaiTraceKienTruc() {
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
        gap: "3vh 4vw",
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
          <div>KIẾN TRÚC KỸ THUẬT</div>
          <div>2026</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <div style={{ textAlign: "center" }}>
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
            Stack kỹ thuật
          </div>
          <h2
            style={{
              fontSize: "3vw",
              fontWeight: 800,
              margin: "0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Kiến trúc hệ thống
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2vw" }}>
          <div
            style={{
              background: "#FFFFFF",
              padding: "2.5vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
              textAlign: "center",
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
              Portal (Frontend)
            </div>
            <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#1E3A5F", lineHeight: 1.2 }}>
              React 19
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 500, color: "#0D9488", marginTop: "1vh" }}>
              Vite · TailwindCSS · shadcn/ui
            </div>
            <div style={{ fontSize: "0.9vw", color: "#94A3B8", marginTop: "0.5vh" }}>
              Wouter · TanStack Query · Leaflet
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              padding: "2.5vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
              textAlign: "center",
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
              API Server (Backend)
            </div>
            <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#1E3A5F", lineHeight: 1.2 }}>
              Express 5
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 500, color: "#0D9488", marginTop: "1vh" }}>
              Node.js · TypeScript · Pino
            </div>
            <div style={{ fontSize: "0.9vw", color: "#94A3B8", marginTop: "0.5vh" }}>
              OpenAPI · Zod · esbuild
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              padding: "2.5vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
              textAlign: "center",
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
              Database
            </div>
            <div style={{ fontSize: "2.5vw", fontWeight: 700, color: "#1E3A5F", lineHeight: 1.2 }}>
              PostgreSQL
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 500, color: "#0D9488", marginTop: "1vh" }}>
              Drizzle ORM · Drizzle Zod
            </div>
            <div style={{ fontSize: "0.9vw", color: "#94A3B8", marginTop: "0.5vh" }}>
              Type-safe schema · Auto-migration
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            padding: "3vh 4vw",
            borderRadius: "1vw",
            border: "1px solid #E2E8F0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3vh",
            }}
          >
            <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#1E3A5F" }}>
              Luồng dữ liệu — OpenAPI-first
            </div>
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <div
                  style={{ width: "1vw", height: "1vw", backgroundColor: "#0D9488", borderRadius: "2px" }}
                />
                <span style={{ fontSize: "0.9vw", color: "#64748B" }}>Tầng ứng dụng</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <div
                  style={{
                    width: "1vw",
                    height: "1vw",
                    backgroundColor: "rgba(13, 148, 136, 0.3)",
                    borderRadius: "2px",
                  }}
                />
                <span style={{ fontSize: "0.9vw", color: "#64748B" }}>Tầng dữ liệu</span>
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              gap: "2vw",
              borderBottom: "2px solid #E2E8F0",
              paddingBottom: "1vh",
              height: "16vh",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1vh",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "0.3vw",
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "60%",
                    backgroundColor: "#0D9488",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: "72%",
                    backgroundColor: "rgba(13, 148, 136, 0.3)",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Portal</div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1vh",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "0.3vw",
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "78%",
                    backgroundColor: "#0D9488",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: "88%",
                    backgroundColor: "rgba(13, 148, 136, 0.3)",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>API</div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1vh",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "0.3vw",
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "50%",
                    backgroundColor: "#0D9488",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: "63%",
                    backgroundColor: "rgba(13, 148, 136, 0.3)",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Zod</div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1vh",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "0.3vw",
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "90%",
                    backgroundColor: "#0D9488",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: "100%",
                    backgroundColor: "rgba(13, 148, 136, 0.3)",
                    borderRadius: "0.2vw 0.2vw 0 0",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Database</div>
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
          <span>Trang 3</span>
        </div>
      </div>
    </div>
  );
}
