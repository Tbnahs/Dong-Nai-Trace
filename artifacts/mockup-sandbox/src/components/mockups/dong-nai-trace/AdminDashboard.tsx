import React from "react";
import {
  LayoutDashboard,
  Building2,
  Database,
  Link as LinkIcon,
  BarChart3,
  Users,
  ScrollText,
  Settings,
  HelpCircle,
  LogOut,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  ServerCrash
} from "lucide-react";

export function AdminDashboard() {
  return (
    <div
      className="flex min-h-screen font-sans bg-[#F7F9FC]"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');
          
          /* Custom scrollbar for a cleaner look */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1; 
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
          }
        `}
      </style>

      {/* Sidebar */}
      <aside className="w-[240px] fixed inset-y-0 left-0 bg-[#1B2A6B] text-white flex flex-col z-10 shadow-xl">
        <div className="p-4 flex flex-col items-center border-b border-white/10 mt-2">
          <div className="bg-white p-2 rounded-lg mb-3 shadow-sm">
            <img 
              src="/__mockup/images/logo-skhcn.png" 
              alt="Logo SKHCN" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/100x100/ffffff/1B2A6B?text=SKHCN";
              }}
            />
          </div>
          <h1 className="text-center font-bold text-sm tracking-wide uppercase leading-tight mb-1">
            Đồng Nai Trace
          </h1>
          <span className="bg-[#E8650A] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
            ADMIN PANEL
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-[#E8650A]/20 text-white font-medium">
            <LayoutDashboard size={18} className="text-[#E8650A]" />
            <span className="text-sm">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Building2 size={18} />
            <span className="text-sm">Hồ sơ Doanh nghiệp</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Database size={18} />
            <span className="text-sm">Dữ liệu đồng bộ</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <LinkIcon size={18} />
            <span className="text-sm">Kết nối liên thông</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <BarChart3 size={18} />
            <span className="text-sm">Báo cáo thống kê</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Users size={18} />
            <span className="text-sm">Quản trị tài khoản</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <ScrollText size={18} />
            <span className="text-sm">Nhật ký hệ thống</span>
          </a>
          
          <div className="h-px bg-white/10 my-2 mx-2"></div>
          
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Settings size={18} />
            <span className="text-sm">Cấu hình hệ thống</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <HelpCircle size={18} />
            <span className="text-sm">Hỗ trợ kỹ thuật</span>
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Nguyễn Văn A</span>
                <span className="text-[11px] text-white/60">Quản trị viên</span>
              </div>
            </div>
            <button className="text-white/60 hover:text-red-400 transition-colors p-1" title="Đăng xuất">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Hệ thống</span>
            <span>/</span>
            <span className="font-medium text-gray-900">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <Clock size={14} />
              Cập nhật lần cuối: <span className="font-medium text-gray-700">22/07/2026 14:32</span>
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              <RefreshCw size={14} />
              Làm mới
            </button>
          </div>
        </header>

        <div className="p-8 space-y-6 flex-1">
          
          {/* Row 1: KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 border-l-4 border-l-[#E8650A] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Doanh nghiệp/HTX</p>
                <div className="bg-[#E8650A]/10 p-2 rounded-md">
                  <Building2 size={18} className="text-[#E8650A]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1.247</h3>
              <div className="flex items-center text-xs">
                <span className="text-[#16A34A] flex items-center font-medium">
                  <TrendingUp size={12} className="mr-1" />
                  +23
                </span>
                <span className="text-gray-400 ml-1">tháng này</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 border-l-4 border-l-[#3B82F6] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sản phẩm đăng ký</p>
                <div className="bg-blue-50 p-2 rounded-md">
                  <Database size={18} className="text-[#3B82F6]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.892</h3>
              <div className="flex items-center text-xs">
                <span className="text-[#16A34A] flex items-center font-medium">
                  <TrendingUp size={12} className="mr-1" />
                  +156
                </span>
                <span className="text-gray-400 ml-1">tháng này</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 border-l-4 border-l-[#8B5CF6] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Mã TXNG đồng bộ</p>
                <div className="bg-purple-50 p-2 rounded-md">
                  <LinkIcon size={18} className="text-[#8B5CF6]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">23.104</h3>
              <div className="flex items-center text-xs">
                <span className="text-[#16A34A] flex items-center font-medium">
                  <TrendingUp size={12} className="mr-1" />
                  +2.847
                </span>
                <span className="text-gray-400 ml-1">tháng này</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 border-l-4 border-l-[#16A34A] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tỷ lệ đồng bộ</p>
                <div className="bg-green-50 p-2 rounded-md">
                  <CheckCircle size={18} className="text-[#16A34A]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98.7%</h3>
              <div className="flex items-center text-xs">
                <span className="text-red-500 flex items-center font-medium">
                  <TrendingDown size={12} className="mr-1" />
                  -0.3%
                </span>
                <span className="text-gray-400 ml-1">so tháng trước</span>
              </div>
            </div>
          </div>

          {/* Row 2: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Line Chart Placeholder */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-800">Xu hướng đăng ký theo tháng (2024)</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                    <span className="text-gray-600">Doanh nghiệp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#E8650A]"></span>
                    <span className="text-gray-600">Sản phẩm</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[250px] w-full flex items-end justify-between pt-10 pb-6 px-4">
                {/* Y-axis lines */}
                <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-6 z-0">
                  <div className="border-t border-gray-100 w-full"></div>
                  <div className="border-t border-gray-100 w-full"></div>
                  <div className="border-t border-gray-100 w-full"></div>
                  <div className="border-t border-gray-100 w-full"></div>
                  <div className="border-t border-gray-200 w-full"></div>
                </div>
                
                {/* Chart Columns (simulating a line chart visual with bars for now for ease of standard html) */}
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[30%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[40%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T1</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[45%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[55%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T2</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[35%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[60%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T3</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[55%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[75%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T4</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[70%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[85%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T5</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[85%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[95%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T6</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-1 w-1/7">
                  <div className="flex items-end h-[180px] gap-1.5">
                    <div className="w-4 bg-[#3B82F6]/80 rounded-t h-[60%]"></div>
                    <div className="w-4 bg-[#E8650A]/80 rounded-t h-[80%]"></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">T7</span>
                </div>
              </div>
            </div>

            {/* Distribution Chart Placeholder */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-5">
              <h3 className="text-base font-bold text-gray-800 mb-6">Phân bổ theo ngành hàng</h3>
              
              <div className="flex flex-col gap-4 mt-2">
                {[
                  { label: "Nông sản", percent: 34, color: "bg-green-500" },
                  { label: "Thực phẩm", percent: 26, color: "bg-orange-500" },
                  { label: "Thủy sản", percent: 18, color: "bg-blue-500" },
                  { label: "Thủ công mỹ nghệ", percent: 12, color: "bg-purple-500" },
                  { label: "Khác", percent: 10, color: "bg-gray-400" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-32 text-gray-600 truncate" title={item.label}>{item.label}</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full`} 
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-right font-medium text-gray-800">{item.percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Table - Hồ sơ chờ duyệt */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-[#E8650A]" size={20} />
                <h3 className="text-base font-bold text-gray-800">Hồ sơ chờ duyệt — Cần xử lý</h3>
                <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-semibold ml-2">
                  8 hồ sơ
                </span>
              </div>
              <button className="text-sm text-[#1B2A6B] font-medium hover:underline">Xem tất cả →</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 w-12 text-center">STT</th>
                    <th className="px-5 py-3">Tên tổ chức</th>
                    <th className="px-5 py-3">Loại hình</th>
                    <th className="px-5 py-3">Ngày nộp</th>
                    <th className="px-5 py-3">Người phụ trách</th>
                    <th className="px-5 py-3">Trạng thái</th>
                    <th className="px-5 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-center text-gray-500">1</td>
                    <td className="px-5 py-3 font-medium text-gray-900">HTX Nông nghiệp Xanh Vĩnh Cửu</td>
                    <td className="px-5 py-3 text-gray-600">Hợp tác xã</td>
                    <td className="px-5 py-3 text-gray-600">22/07/2026</td>
                    <td className="px-5 py-3 text-gray-600">Trần Thị B</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={12} /> Chờ duyệt
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[#1B2A6B] hover:bg-gray-100 rounded" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        <button className="text-xs bg-[#16A34A] hover:bg-[#15803d] text-white px-2 py-1 rounded transition-colors font-medium">
                          Phê duyệt
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-center text-gray-500">2</td>
                    <td className="px-5 py-3 font-medium text-gray-900">Công ty TNHH Thực phẩm Đồng Nai</td>
                    <td className="px-5 py-3 text-gray-600">Doanh nghiệp</td>
                    <td className="px-5 py-3 text-gray-600">21/07/2026</td>
                    <td className="px-5 py-3 text-gray-600">Lê Văn C</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800">
                        <AlertTriangle size={12} /> Yêu cầu bổ sung
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[#1B2A6B] hover:bg-gray-100 rounded" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        <button className="text-xs border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-2 py-1 rounded transition-colors font-medium">
                          Xem phản hồi
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-center text-gray-500">3</td>
                    <td className="px-5 py-3 font-medium text-gray-900">Trại Bưởi Tân Triều Út Dũng</td>
                    <td className="px-5 py-3 text-gray-600">Hộ kinh doanh</td>
                    <td className="px-5 py-3 text-gray-600">20/07/2026</td>
                    <td className="px-5 py-3 text-gray-600">Nguyễn Văn A</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                        <Activity size={12} /> Đang xử lý
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[#1B2A6B] hover:bg-gray-100 rounded" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        <button className="text-xs bg-[#16A34A] hover:bg-[#15803d] text-white px-2 py-1 rounded transition-colors font-medium">
                          Phê duyệt
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-center text-gray-500">4</td>
                    <td className="px-5 py-3 font-medium text-gray-900">Cơ sở sản xuất gỗ mỹ nghệ Trảng Bom</td>
                    <td className="px-5 py-3 text-gray-600">Hộ kinh doanh</td>
                    <td className="px-5 py-3 text-gray-600">20/07/2026</td>
                    <td className="px-5 py-3 text-gray-600">Trần Thị B</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={12} /> Chờ duyệt
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[#1B2A6B] hover:bg-gray-100 rounded" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        <button className="text-xs bg-[#16A34A] hover:bg-[#15803d] text-white px-2 py-1 rounded transition-colors font-medium">
                          Phê duyệt
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-center text-gray-500">5</td>
                    <td className="px-5 py-3 font-medium text-gray-900">CTCP Thủy sản Hồ Trị An</td>
                    <td className="px-5 py-3 text-gray-600">Doanh nghiệp</td>
                    <td className="px-5 py-3 text-gray-600">19/07/2026</td>
                    <td className="px-5 py-3 text-gray-600">Lê Văn C</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={12} /> Chờ duyệt
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-[#1B2A6B] hover:bg-gray-100 rounded" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        <button className="text-xs bg-[#16A34A] hover:bg-[#15803d] text-white px-2 py-1 rounded transition-colors font-medium">
                          Phê duyệt
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Row 4: Status connections */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ServerCrash size={18} className="text-gray-500" />
              Trạng thái kết nối liên thông
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">Cổng TXNG Quốc gia</h4>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.6)]"></span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <span className="font-medium text-[#16A34A]">Đang kết nối</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lần đồng bộ:</span>
                    <span className="font-medium text-gray-900">22/07/2026 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng bản ghi:</span>
                    <span className="font-medium text-gray-900">23.104</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-[#1B2A6B] font-medium text-sm rounded-md transition-colors border border-gray-200">
                  Xem chi tiết
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">Sở Nông nghiệp & PTNT</h4>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.6)]"></span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <span className="font-medium text-[#16A34A]">Đang kết nối</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lần đồng bộ:</span>
                    <span className="font-medium text-gray-900">22/07/2026 13:45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng bản ghi:</span>
                    <span className="font-medium text-gray-900">8.934</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-[#1B2A6B] font-medium text-sm rounded-md transition-colors border border-gray-200">
                  Xem chi tiết
                </button>
              </div>

              <div className="bg-white border border-red-200 rounded-lg p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-center justify-between mb-4 pl-2">
                  <h4 className="font-semibold text-gray-800">Sở Công Thương</h4>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4 pl-2">
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <span className="font-medium text-red-600">Lỗi kết nối</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thành công cuối:</span>
                    <span className="font-medium text-gray-900">21/07/2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Log lỗi:</span>
                    <span className="font-medium text-red-500 truncate max-w-[120px]" title="Connection timeout">Connection timeout</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-sm rounded-md transition-colors border border-red-200 ml-1">
                  Khắc phục sự cố
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
