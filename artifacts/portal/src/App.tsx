import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import OverviewPage from './pages/dashboard/OverviewPage';
import OrgProfilePage from './pages/dashboard/OrgProfilePage';
import ProductsPage from './pages/dashboard/ProductsPage';
import TxngLookupPage from './pages/dashboard/TxngLookupPage';
import DocumentsPage from './pages/dashboard/DocumentsPage';
import NotificationsPage from './pages/dashboard/NotificationsPage';
import SupportPage from './pages/dashboard/SupportPage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/dashboard" component={OverviewPage} />
        <Route path="/dashboard/ho-so-to-chuc" component={OrgProfilePage} />
        <Route path="/dashboard/ho-so-san-pham" component={ProductsPage} />
        <Route path="/dashboard/tra-cuu-txng" component={TxngLookupPage} />
        <Route path="/dashboard/chung-nhan" component={DocumentsPage} />
        <Route path="/dashboard/thong-bao" component={NotificationsPage} />
        <Route path="/dashboard/ho-tro" component={SupportPage} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dang-nhap" component={LoginPage} />
      <Route path="/dang-ky" component={RegisterPage} />
      
      {/* Dashboard Routes nested manually or matched via prefix */}
      <Route path="/dashboard" component={DashboardRoutes} />
      <Route path="/dashboard/:rest*" component={DashboardRoutes} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
