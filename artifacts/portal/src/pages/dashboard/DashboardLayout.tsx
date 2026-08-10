import React, { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Building2, 
  Package, 
  Search, 
  FileText, 
  Bell, 
  HelpCircle,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const logoUrl = import.meta.env.BASE_URL + 'images/logo-skhcn.png';

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
    { href: '/dashboard/ho-so-to-chuc', icon: Building2, label: 'Hồ sơ tổ chức' },
    { href: '/dashboard/ho-so-san-pham', icon: Package, label: 'Dòng sản phẩm' },
    { href: '/dashboard/tra-cuu-txng', icon: Search, label: 'Tra cứu TXNG' },
    { href: '/dashboard/chung-nhan', icon: FileText, label: 'Chứng nhận & Tài liệu' },
    { href: '/dashboard/thong-bao', icon: Bell, label: 'Thông báo', badge: 2 },
    { href: '/dashboard/ho-tro', icon: HelpCircle, label: 'Hỗ trợ kỹ thuật' },
  ];

  // Helper to check active nav
  const isActive = (href: string) => {
    if (href === '/dashboard') return location === href;
    return location.startsWith(href);
  };

  const handleLogout = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#2740BA] text-white flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 border-b border-[#25398a] flex items-center gap-3">
          <img src={logoUrl} alt="Logo" className="h-10 w-auto bg-white rounded p-1" />
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">ĐỒNG NAI TRACE</span>
            <span className="text-[10px] text-blue-200">Cổng Doanh nghiệp</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-[#E8650A] text-white font-semibold' : 'text-blue-100 hover:bg-[#25398a] hover:text-white'}`}>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-blue-300'}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#25398a]">
          <Link href="/dashboard/ho-so-to-chuc">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-blue-100 hover:bg-[#25398a] transition-colors mb-2">
              <Settings className="w-5 h-5 text-blue-300" />
              <span className="text-sm">Tài khoản</span>
            </div>
          </Link>
          <div onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-blue-100 hover:bg-[#25398a] transition-colors">
            <LogOut className="w-5 h-5 text-blue-300" />
            <span className="text-sm">Đăng xuất</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative w-full">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-800 hidden sm:block">
              {navItems.find(item => isActive(item.href))?.label || 'Bảng điều khiển'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-bold text-gray-800 leading-tight">HTX Nông nghiệp Xanh</div>
                <div className="text-xs text-gray-500">MST: 3601234567</div>
              </div>
              <div className="w-10 h-10 bg-[#2740BA] text-white rounded-full flex items-center justify-center font-bold text-sm">
                HTX
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
