import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import OrgProfilePage from './pages/OrgProfilePage';
import ProductsProfilePage from './pages/ProductsProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import NotFound from '@/pages/not-found';
import PublicLayout from './components/PublicLayout';

const queryClient = new QueryClient();

function Router() {
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/dang-nhap" component={LoginPage} />
        <Route path="/dang-ky" component={RegisterPage} />
        <Route path="/tra-cuu" component={SearchResultsPage} />
        <Route path="/san-pham/:id" component={ProductDetailPage} />
        <Route path="/doanh-nghiep/:id" component={BusinessDetailPage} />
        <Route path="/ho-so-doanh-nghiep" component={OrgProfilePage} />
        <Route path="/ho-so-san-pham" component={ProductsProfilePage} />
        <Route path="/thong-bao" component={NotificationsPage} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
