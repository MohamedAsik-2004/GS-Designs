import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_INFO, SERVICES_LIST, PORTFOLIO_ITEMS, BLOG_POSTS, INITIAL_ADMIN_QUOTES, INITIAL_ADMIN_MESSAGES, GALLERY_ALBUMS, CAREER_OPENINGS, TIMELINE_EVENTS, TEAM_MEMBERS } from '../data/agencyData';
import { syncToFirebase, subscribeToFirebase } from '../config/firebase';

const ThemeLanguageContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[LocalStorage] Failed to save key "${key}". Storage quota may be full.`, e);
  }
};

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

  // Admin State with Persistent localStorage Initialization
  const [adminUser, setAdminUser] = useState(null);
  const [adminQuotes, setAdminQuotes] = useState(() => loadFromStorage('gs_admin_quotes', INITIAL_ADMIN_QUOTES));
  const [adminMessages, setAdminMessages] = useState(() => loadFromStorage('gs_admin_messages', INITIAL_ADMIN_MESSAGES));
  const [adminServices, setAdminServices] = useState(() => loadFromStorage('gs_admin_services', SERVICES_LIST));
  const [adminPortfolio, setAdminPortfolio] = useState(() => loadFromStorage('gs_admin_portfolio', PORTFOLIO_ITEMS));
  const [adminBlog, setAdminBlog] = useState(() => loadFromStorage('gs_admin_blog', BLOG_POSTS));
  const [adminGallery, setAdminGallery] = useState(() => loadFromStorage('gs_admin_gallery', GALLERY_ALBUMS));
  const [adminCareers, setAdminCareers] = useState(() => loadFromStorage('gs_admin_careers', CAREER_OPENINGS));
  const [adminTimeline, setAdminTimeline] = useState(() => loadFromStorage('gs_admin_timeline', TIMELINE_EVENTS));
  const [adminTeam, setAdminTeam] = useState(() => loadFromStorage('gs_admin_team', TEAM_MEMBERS));
  const [dashboardCleared, setDashboardCleared] = useState(() => loadFromStorage('gs_dashboard_cleared', false));

  // CMS dynamic content state
  const [cmsHero, setCmsHero] = useState(() => loadFromStorage('gs_cms_hero', {
    headline: "Creative Advertising Solutions That Grow Your Business",
    subtext: "From Logo Design to Branding, Flex Printing, Invitations, Digital Marketing and Creative Advertising.",
    heroImage: ""
  }));

  const [cmsStory, setCmsStory] = useState(() => loadFromStorage('gs_cms_story', {
    headline: "Elevating Brands Through Exceptional Design & Precision Printing",
    description: "Since 2014, GS Designs has been the silent engine behind iconic corporate identities, retail signages, and mass printing campaigns.",
    mission: "To empower every business with visual branding that commands attention, instills trust, and drives measurable revenue growth.",
    vision: "To remain the most trusted full-service advertising agency in the region, bridging physical craftsmanship with modern digital innovation.",
    whyUs: "Zero compromise on paper GSM, color calibration, and installation safety. 24/7 dedicated support for emergency printing.",
    bannerImage: ""
  }));

  const [cmsSeo, setCmsSeo] = useState(() => loadFromStorage('gs_cms_seo', {
    title: "GS Designs | Premium Advertising & Branding Agency",
    description: "GS Designs - Premium Advertising Agency. Ideas That Elevate Brands."
  }));

  const [cmsBrand, setCmsBrand] = useState(() => loadFromStorage('gs_cms_brand', {
    phone: BRAND_INFO.phone,
    email: BRAND_INFO.email,
    whatsapp: BRAND_INFO.whatsapp,
    address: `${BRAND_INFO.address}, ${BRAND_INFO.cityState}`,
    tagline: BRAND_INFO.tagline,
    googleMapsUrl: "https://maps.app.goo.gl/8VySk1rQaABQZkZX8",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4506912627617!2d79.83815707480491!3d10.776752289372041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a556c855e5edc79%3A0x240a060699ae3bdd!2zR1Mg4K6f4K6_4K6a4K-I4K6p4K-N4K644K-N!5e0!3m2!1sen!2sin!4v1788067087720!5m2!1sen!2sin"
  }));

  const DEFAULT_CMS_SECTIONS = {
    heroSection: true,
    statsCounter: true,
    clientLogoTicker: true,
    servicesPreview: true,
    portfolioSpotlight: true,
    testimonialsSection: true,
    aboutStory: true,
    agencyTimeline: true,
    leadershipTeam: true,
    contactInfo: true,
    faqSection: true,
    blogSection: true
  };

  const [cmsSections, setCmsSections] = useState(() => loadFromStorage('gs_cms_sections', DEFAULT_CMS_SECTIONS));

  // Auto-Save effects for local storage & Firebase cloud database persistence
  useEffect(() => { saveToStorage('gs_admin_quotes', adminQuotes); syncToFirebase('gs_admin_quotes', adminQuotes); }, [adminQuotes]);
  useEffect(() => { saveToStorage('gs_admin_messages', adminMessages); syncToFirebase('gs_admin_messages', adminMessages); }, [adminMessages]);
  useEffect(() => { saveToStorage('gs_admin_services', adminServices); syncToFirebase('gs_admin_services', adminServices); }, [adminServices]);
  useEffect(() => { saveToStorage('gs_admin_portfolio', adminPortfolio); syncToFirebase('gs_admin_portfolio', adminPortfolio); }, [adminPortfolio]);
  useEffect(() => { saveToStorage('gs_admin_blog', adminBlog); syncToFirebase('gs_admin_blog', adminBlog); }, [adminBlog]);
  useEffect(() => { saveToStorage('gs_admin_gallery', adminGallery); syncToFirebase('gs_admin_gallery', adminGallery); }, [adminGallery]);
  useEffect(() => { saveToStorage('gs_admin_careers', adminCareers); syncToFirebase('gs_admin_careers', adminCareers); }, [adminCareers]);
  useEffect(() => { saveToStorage('gs_admin_timeline', adminTimeline); syncToFirebase('gs_admin_timeline', adminTimeline); }, [adminTimeline]);
  useEffect(() => { saveToStorage('gs_admin_team', adminTeam); syncToFirebase('gs_admin_team', adminTeam); }, [adminTeam]);
  useEffect(() => { saveToStorage('gs_dashboard_cleared', dashboardCleared); syncToFirebase('gs_dashboard_cleared', dashboardCleared); }, [dashboardCleared]);
  useEffect(() => { saveToStorage('gs_cms_hero', cmsHero); syncToFirebase('gs_cms_hero', cmsHero); }, [cmsHero]);
  useEffect(() => { saveToStorage('gs_cms_story', cmsStory); syncToFirebase('gs_cms_story', cmsStory); }, [cmsStory]);
  useEffect(() => { saveToStorage('gs_cms_seo', cmsSeo); syncToFirebase('gs_cms_seo', cmsSeo); }, [cmsSeo]);
  useEffect(() => { saveToStorage('gs_cms_brand', cmsBrand); syncToFirebase('gs_cms_brand', cmsBrand); }, [cmsBrand]);
  useEffect(() => { saveToStorage('gs_cms_sections', cmsSections); syncToFirebase('gs_cms_sections', cmsSections); }, [cmsSections]);

  // Real-time Cross-Tab & Cloud Synchronization Engine
  const notifyCrossTabSync = (storageKey, valueToSave) => {
    if (storageKey && valueToSave !== undefined) {
      saveToStorage(storageKey, valueToSave);
      syncToFirebase(storageKey, valueToSave);
    }
    try {
      const channel = new BroadcastChannel('gs_designs_channel');
      channel.postMessage({ type: 'GS_DATA_UPDATED', timestamp: Date.now(), key: storageKey });
      channel.close();
    } catch (e) {}
  };

  // Subscribe to Firebase Realtime Database updates for live multi-device persistence
  useEffect(() => {
    const keys = [
      { key: 'gs_admin_quotes', setter: setAdminQuotes, initial: adminQuotes },
      { key: 'gs_admin_messages', setter: setAdminMessages, initial: adminMessages },
      { key: 'gs_admin_services', setter: setAdminServices, initial: adminServices },
      { key: 'gs_admin_portfolio', setter: setAdminPortfolio, initial: adminPortfolio },
      { key: 'gs_admin_blog', setter: setAdminBlog, initial: adminBlog },
      { key: 'gs_admin_gallery', setter: setAdminGallery, initial: adminGallery },
      { key: 'gs_admin_careers', setter: setAdminCareers, initial: adminCareers },
      { key: 'gs_admin_timeline', setter: setAdminTimeline, initial: adminTimeline },
      { key: 'gs_admin_team', setter: setAdminTeam, initial: adminTeam },
      { key: 'gs_cms_hero', setter: setCmsHero, initial: cmsHero },
      { key: 'gs_cms_story', setter: setCmsStory, initial: cmsStory },
      { key: 'gs_cms_seo', setter: setCmsSeo, initial: cmsSeo },
      { key: 'gs_cms_brand', setter: setCmsBrand, initial: cmsBrand },
      { key: 'gs_cms_sections', setter: setCmsSections, initial: cmsSections }
    ];

    const unsubscribes = keys.map(({ key, setter, initial }) => {
      return subscribeToFirebase(key, (val) => {
        if (val !== undefined && val !== null) {
          setter(val);
          saveToStorage(key, val);
        }
      }, initial);
    });

    const reloadStoredState = () => {
      try {
        setAdminQuotes(loadFromStorage('gs_admin_quotes', INITIAL_ADMIN_QUOTES));
        setAdminMessages(loadFromStorage('gs_admin_messages', INITIAL_ADMIN_MESSAGES));
        setDashboardCleared(loadFromStorage('gs_dashboard_cleared', false));
        setAdminServices(loadFromStorage('gs_admin_services', SERVICES_LIST));
        setAdminPortfolio(loadFromStorage('gs_admin_portfolio', PORTFOLIO_ITEMS));
        setAdminBlog(loadFromStorage('gs_admin_blog', BLOG_POSTS));
        setAdminGallery(loadFromStorage('gs_admin_gallery', GALLERY_ALBUMS));
        setAdminCareers(loadFromStorage('gs_admin_careers', CAREER_OPENINGS));
        setAdminTimeline(loadFromStorage('gs_admin_timeline', TIMELINE_EVENTS));
        setAdminTeam(loadFromStorage('gs_admin_team', TEAM_MEMBERS));
        setCmsHero(loadFromStorage('gs_cms_hero', { headline: "Creative Advertising Solutions That Grow Your Business", subtext: "From Logo Design to Branding...", heroImage: "" }));
        setCmsStory(loadFromStorage('gs_cms_story', { headline: "Elevating Brands Through Exceptional Design & Precision Printing", description: "Since 2014...", mission: "To empower every business...", vision: "To remain the most trusted...", whyUs: "Zero compromise...", bannerImage: "" }));
        setCmsBrand(loadFromStorage('gs_cms_brand', { phone: BRAND_INFO.phone, email: BRAND_INFO.email, whatsapp: BRAND_INFO.whatsapp, address: `${BRAND_INFO.address}, ${BRAND_INFO.cityState}`, tagline: BRAND_INFO.tagline, googleMapsUrl: "https://maps.app.goo.gl/8VySk1rQaABQZkZX8", mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4506912627617!2d79.83815707480491!3d10.776752289372041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a556c855e5edc79%3A0x240a060699ae3bdd!2zR1Mg4K6f4K6_4K6a4K-I4K6p4K-N4K644K-N!5e0!3m2!1sen!2sin!4v1788067087720!5m2!1sen!2sin" }));
        setCmsSections(loadFromStorage('gs_cms_sections', DEFAULT_CMS_SECTIONS));
      } catch (e) {}
    };

    const handleStorageChange = () => {
      reloadStoredState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('gs_local_sync', reloadStoredState);

    let channel;
    try {
      channel = new BroadcastChannel('gs_designs_channel');
      channel.onmessage = (event) => {
        if (event.data?.type === 'GS_DATA_UPDATED') {
          reloadStoredState();
        }
      };
    } catch (e) {}

    return () => {
      unsubscribes.forEach(unsub => unsub && unsub());
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('gs_local_sync', reloadStoredState);
      if (channel) channel.close();
    };
  }, []);

  const clearAllDashboardData = () => {
    setAdminQuotes([]);
    setAdminMessages([]);
    setDashboardCleared(true);
    saveToStorage('gs_admin_quotes', []);
    saveToStorage('gs_admin_messages', []);
    saveToStorage('gs_dashboard_cleared', true);
    notifyCrossTabSync();
  };

  const restoreDefaultDemoData = () => {
    setAdminQuotes(INITIAL_ADMIN_QUOTES);
    setAdminMessages(INITIAL_ADMIN_MESSAGES);
    setDashboardCleared(false);
    saveToStorage('gs_admin_quotes', INITIAL_ADMIN_QUOTES);
    saveToStorage('gs_admin_messages', INITIAL_ADMIN_MESSAGES);
    saveToStorage('gs_dashboard_cleared', false);
    notifyCrossTabSync();
  };

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
    const quoteId = `QT-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toISOString().split('T')[0];

    const newQuote = {
      id: quoteId,
      clientName: quoteData.name,
      company: quoteData.company || "Individual",
      email: quoteData.email || "",
      phone: quoteData.phone || "",
      service: quoteData.service,
      budget: quoteData.budget || "TBD",
      details: quoteData.details || "",
      date: dateStr,
      status: "Pending",
      assignedStaff: "Gaurav Sharma"
    };

    // Also create a message inbox entry so admin receives quote as an inbox message
    const msgId = `MSG-${Math.floor(100 + Math.random() * 900)}`;
    const newMsg = {
      id: msgId,
      sender: quoteData.name,
      email: quoteData.email || (quoteData.phone ? `Phone: ${quoteData.phone}` : 'N/A'),
      subject: `📋 Quote Inquiry: ${quoteData.service} (${quoteData.budget || 'TBD'})`,
      date: new Date().toLocaleString(),
      read: false,
      text: `Quote ID: ${quoteId}\nClient Name: ${quoteData.name}\nEmail: ${quoteData.email || 'N/A'}\nPhone/WhatsApp: ${quoteData.phone || 'N/A'}\nCompany: ${quoteData.company || 'Individual'}\nService: ${quoteData.service}\nEstimated Budget: ${quoteData.budget || 'TBD'}\nProject Requirements: ${quoteData.details || 'No specific details provided.'}`
    };

    const updatedQuotes = [newQuote, ...loadFromStorage('gs_admin_quotes', INITIAL_ADMIN_QUOTES)];
    const updatedMessages = [newMsg, ...loadFromStorage('gs_admin_messages', INITIAL_ADMIN_MESSAGES)];

    setAdminQuotes(updatedQuotes);
    setAdminMessages(updatedMessages);
    setDashboardCleared(false);

    saveToStorage('gs_admin_quotes', updatedQuotes);
    saveToStorage('gs_admin_messages', updatedMessages);
    saveToStorage('gs_dashboard_cleared', false);

    notifyCrossTabSync();
  };

  // Helper for adding a new contact message
  const submitContactMessage = (msgData) => {
    const msgId = `MSG-${Math.floor(100 + Math.random() * 900)}`;
    const newMsg = {
      id: msgId,
      sender: msgData.name,
      email: msgData.email || (msgData.phone ? `Phone: ${msgData.phone}` : 'N/A'),
      phone: msgData.phone || "",
      subject: msgData.subject || "General Contact Inquiry",
      date: new Date().toLocaleString(),
      read: false,
      text: msgData.message
    };

    const updatedMessages = [newMsg, ...loadFromStorage('gs_admin_messages', INITIAL_ADMIN_MESSAGES)];

    setAdminMessages(updatedMessages);
    setDashboardCleared(false);

    saveToStorage('gs_admin_messages', updatedMessages);
    saveToStorage('gs_dashboard_cleared', false);

    notifyCrossTabSync();
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
        adminCareers,
        setAdminCareers,
        adminTimeline,
        setAdminTimeline,
        adminTeam,
        setAdminTeam,
        clearAllDashboardData,
        restoreDefaultDemoData,
        dashboardCleared,
        setDashboardCleared,
        cmsHero,
        setCmsHero,
        cmsStory,
        setCmsStory,
        cmsSeo,
        setCmsSeo,
        cmsBrand,
        setCmsBrand,
        cmsSections,
        setCmsSections,
        notifyCrossTabSync
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => useContext(ThemeLanguageContext);

