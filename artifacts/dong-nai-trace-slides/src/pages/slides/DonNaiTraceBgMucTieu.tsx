export default function DonNaiTraceBgMucTieu() {
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
          <div>BỐI CẢNH & MỤC TIÊU</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left — challenges */}
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
          Thách thức
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
          Bối cảnh & Mục tiêu
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "flex-start",
              background: "#FFFFFF",
              padding: "2vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1.1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.8vw",
                height: "2.8vw",
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
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F", marginBottom: "0.4vh" }}>
                Xác minh nguồn gốc
              </div>
              <div style={{ fontSize: "0.95vw", color: "#64748B", lineHeight: 1.4 }}>
                Người tiêu dùng thiếu công cụ kiểm tra thông tin sản phẩm theo thời gian thực
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "flex-start",
              background: "#FFFFFF",
              padding: "2vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1.1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.8vw",
                height: "2.8vw",
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
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F", marginBottom: "0.4vh" }}>
                Số hóa chuỗi cung ứng
              </div>
              <div style={{ fontSize: "0.95vw", color: "#64748B", lineHeight: 1.4 }}>
                Doanh nghiệp chưa có nền tảng công bố dữ liệu truy xuất đến người tiêu dùng
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.5vw",
              alignItems: "flex-start",
              background: "#FFFFFF",
              padding: "2vh 2vw",
              borderRadius: "1vw",
              border: "1px solid #E2E8F0",
              boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "1.1vw",
                fontWeight: 700,
                color: "#0D9488",
                backgroundColor: "rgba(13, 148, 136, 0.1)",
                width: "2.8vw",
                height: "2.8vw",
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
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F", marginBottom: "0.4vh" }}>
                Giám sát tập trung
              </div>
              <div style={{ fontSize: "0.95vw", color: "#64748B", lineHeight: 1.4 }}>
                Cơ quan quản lý thiếu hệ thống theo dõi toàn bộ chuỗi lưu thông hàng hóa
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — milestones */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          style={{
            background: "#FFFFFF",
            padding: "4vh 3vw",
            borderRadius: "1vw",
            border: "1px solid #E2E8F0",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "1.5vw",
              fontWeight: 700,
              color: "#1E3A5F",
              borderBottom: "1px solid #E2E8F0",
              paddingBottom: "2vh",
            }}
          >
            Mục tiêu dự án
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3vh",
              position: "relative",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0.5vw",
                top: "1vh",
                bottom: "1vh",
                width: "2px",
                backgroundColor: "#E2E8F0",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "2vw",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "1vw",
                  height: "1vw",
                  backgroundColor: "#0D9488",
                  borderRadius: "50%",
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 0 0 1px #E2E8F0",
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.9vw",
                    fontWeight: 600,
                    color: "#0D9488",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Giai đoạn 1
                </div>
                <div style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1E3A5F" }}>
                  Portal công khai cho người tiêu dùng
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "2vw",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "1vw",
                  height: "1vw",
                  backgroundColor: "#0D9488",
                  borderRadius: "50%",
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 0 0 1px #E2E8F0",
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.9vw",
                    fontWeight: 600,
                    color: "#0D9488",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Giai đoạn 2
                </div>
                <div style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1E3A5F" }}>
                  Xác thực phía server và kết nối dữ liệu thực
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "2vw",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "1vw",
                  height: "1vw",
                  backgroundColor: "rgba(13, 148, 136, 0.3)",
                  borderRadius: "50%",
                  border: "4px solid #FFFFFF",
                  boxShadow: "0 0 0 1px #E2E8F0",
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.9vw",
                    fontWeight: 600,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Giai đoạn 3
                </div>
                <div style={{ fontSize: "1.2vw", fontWeight: 500, color: "#94A3B8" }}>
                  Ứng dụng di động cho người tiêu dùng
                </div>
              </div>
            </div>
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
          <span>Trang 2</span>
        </div>
      </div>
    </div>
  );
}
