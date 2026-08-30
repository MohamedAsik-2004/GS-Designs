import React from 'react';
import { ThemeLanguageProvider, useThemeLanguage } from './context/ThemeLanguageContext';

// Components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import LiveChatModal from './components/LiveChatModal';
import QuoteModal from './components/QuoteModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import PortfolioLightboxModal from './components/PortfolioLightboxModal';
import ResumeUploadModal from './components/ResumeUploadModal';
import BlogCommentModal from './components/BlogCommentModal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';

// Admin Shell
import AdminLayout from './admin/AdminLayout';

const MainContent = () => {
  const { activePage, setActivePage, maintenanceMode } = useThemeLanguage();

  React.useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const search = window.location.search.toLowerCase();

      if (path === '/admin' || path === '/admin/' || hash === 'admin' || search.includes('admin')) {
        setActivePage('admin');
      } else if (hash && ['home', 'about', 'services', 'portfolio', 'careers', 'faq', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [setActivePage]);

  if (maintenanceMode && activePage !== 'admin') {
    return <MaintenancePage />;
  }

  if (activePage === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'services' && <ServicesPage />}
        {activePage === 'portfolio' && <PortfolioPage />}
        {activePage === 'careers' && <CareersPage />}
        {activePage === 'faq' && <FaqPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'notfound' && <NotFoundPage />}
        {activePage === 'maintenance' && <MaintenancePage />}
        {(activePage === 'privacy' || activePage === 'terms') && <AboutPage />}
      </main>

      <Footer />

      {/* Global Modals & Floating Helpers */}
      <FloatingActions />
      <LiveChatModal />
      <QuoteModal />
      <ServiceDetailModal />
      <PortfolioLightboxModal />
      <ResumeUploadModal />
      <BlogCommentModal />
    </div>
  );
};

function App() {
  return (
    <ThemeLanguageProvider>
      <Preloader />
      <CustomCursor />
      <MainContent />
    </ThemeLanguageProvider>
  );
}

export default App;
