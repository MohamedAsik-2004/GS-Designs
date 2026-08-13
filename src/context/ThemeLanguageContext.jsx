import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES_LIST, PORTFOLIO_ITEMS, BLOG_POSTS, INITIAL_ADMIN_QUOTES, INITIAL_ADMIN_MESSAGES, GALLERY_ALBUMS } from '../data/agencyData';

const ThemeLanguageContext = createContext();

export const ThemeLanguageProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('EN'); // 'EN', 'HI', 'ES'
  const [activePage, setActivePage] = useState('home');
  const [cursorEnabled, setCursorEnabled] = useState(true);

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState(null);
  
  const [serviceModalItem, setServiceModalItem] = useState(null);
  const [portfolioModalItem, setPortfolioModalItem] = useState(null);
  const [resumeModalJob, setResumeModalJob] = useState(null);
  const [blogModalPost, setBlogModalPost] = useState(null);

  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Admin State
  const [adminUser, setAdminUser] = useState(null);
  const [adminQuotes, setAdminQuotes] = useState(INITIAL_ADMIN_QUOTES);
  const [adminMessages, setAdminMessages] = useState(INITIAL_ADMIN_MESSAGES);
  const [adminServices, setAdminServices] = useState(SERVICES_LIST);
  const [adminPortfolio, setAdminPortfolio] = useState(PORTFOLIO_ITEMS);
  const [adminBlog, setAdminBlog] = useState(BLOG_POSTS);
  const [adminGallery, setAdminGallery] = useState(GALLERY_ALBUMS);
  const [dashboardCleared, setDashboardCleared] = useState(false);

  const clearAllDashboardData = () => {
    setAdminQuotes([]);
    setAdminMessages([]);
    setDashboardCleared(true);
  };

  // CMS dynamic content state
  const [cmsHero, setCmsHero] = useState({
    headline: "Creative Advertising Solutions That Grow Your Business",
    subtext: "From Logo Design to Branding, Flex Printing, Invitations, Digital Marketing and Creative Advertising."
  });

  const [cmsSeo, setCmsSeo] = useState({
    title: "GS Designs | Premium Advertising & Branding Agency",
    description: "GS Designs - Premium Advertising Agency. Ideas That Elevate Brands."
  });

  // Sync theme with body class
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCursor = () => {
    setCursorEnabled(prev => !prev);
  };

  const openQuoteModal = (service = null) => {
    setSelectedQuoteService(service);
    setQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteModalOpen(false);
    setSelectedQuoteService(null);
  };

  const openServiceModal = (service) => {
    setServiceModalItem(service);
  };

  const closeServiceModal = () => {
    setServiceModalItem(null);
  };

  const openPortfolioModal = (item) => {
    setPortfolioModalItem(item);
  };

  const closePortfolioModal = () => {
    setPortfolioModalItem(null);
  };

  const openResumeModal = (job) => {
    setResumeModalJob(job);
  };

  const closeResumeModal = () => {
    setResumeModalJob(null);
  };

  const openBlogModal = (post) => {
    setBlogModalPost(post);
  };

  const closeBlogModal = () => {
    setBlogModalPost(null);
  };

  // Helper for adding a new quote request from frontend
  const submitQuoteRequest = (quoteData) => {
    const newQuote = {
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: quoteData.name,
      company: quoteData.company || "Individual",
      service: quoteData.service,
      budget: quoteData.budget || "TBD",
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      phone: quoteData.phone
    };
    setAdminQuotes(prev => [newQuote, ...prev]);
  };

  // Helper for adding a new contact message
  const submitContactMessage = (msgData) => {
    const newMsg = {
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      sender: msgData.name,
      email: msgData.email,
      subject: msgData.subject || "General Contact Inquiry",
      date: new Date().toLocaleString(),
      read: false,
      text: msgData.message
    };
    setAdminMessages(prev => [newMsg, ...prev]);
  };

  const loginAdmin = (email, password) => {
    if (email && password) {
      setAdminUser({
        name: "Gaurav Sharma",
        role: "Administrator",
        email: email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      });
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setActivePage('home');
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        activePage,
        setActivePage,
        cursorEnabled,
        toggleCursor,
        quoteModalOpen,
        selectedQuoteService,
        openQuoteModal,
        closeQuoteModal,
        serviceModalItem,
        openServiceModal,
        closeServiceModal,
        portfolioModalItem,
        openPortfolioModal,
        closePortfolioModal,
        resumeModalJob,
        openResumeModal,
        closeResumeModal,
        blogModalPost,
        openBlogModal,
        closeBlogModal,
        liveChatOpen,
        setLiveChatOpen,
        maintenanceMode,
        setMaintenanceMode,
        adminUser,
        loginAdmin,
        logoutAdmin,
        adminQuotes,
        setAdminQuotes,
        submitQuoteRequest,
        adminMessages,
        setAdminMessages,
        submitContactMessage,
        adminServices,
        setAdminServices,
        adminPortfolio,
        setAdminPortfolio,
        adminBlog,
        setAdminBlog,
        adminGallery,
        setAdminGallery,
        clearAllDashboardData,
        dashboardCleared,
        setDashboardCleared,
        cmsHero,
        setCmsHero,
        cmsSeo,
        setCmsSeo
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => useContext(ThemeLanguageContext);
