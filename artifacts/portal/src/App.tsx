import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import OrgProfilePage from './pages/OrgProfilePage';
import ProductsProfilePage from './pages/ProductsProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ContactPage from './pages/ContactPage';
import NotFound from '@/pages/not-found';
import PublicLayout from './components/PublicLayout';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Auth pages — no header/footer */}
      <Route path="/dang-nhap">{() => <AuthPage defaultTab="login" />}</Route>
      <Route path="/dang-ky">{() => <AuthPage defaultTab="register" />}</Route>

      {/* All other pages — wrapped in PublicLayout */}
      <Route>
        <PublicLayout>
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/tra-cuu" component={SearchResultsPage} />
            <Route path="/san-pham/:id" component={ProductDetailPage} />
            <Route path="/doanh-nghiep/:id" component={BusinessDetailPage} />
            <Route path="/ho-so-doanh-nghiep" component={OrgProfilePage} />
            <Route path="/ho-so-san-pham" component={ProductsProfilePage} />
            <Route path="/thong-bao" component={NotificationsPage} />
            <Route path="/tin-tuc" component={NewsPage} />
            <Route path="/tin-tuc/:id" component={NewsDetailPage} />
            <Route path="/lien-he" component={ContactPage} />
            <Route component={NotFound} />
          </Switch>
        </PublicLayout>
      </Route>
    </Switch>
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
