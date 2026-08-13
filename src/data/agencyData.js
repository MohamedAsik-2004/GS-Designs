// GS DESIGNS - BRANDING & AGENCY CENTRAL DATA STORE

export const BRAND_INFO = {
  name: "GS Designs",
  tagline: "Ideas That Elevate Brands",
  founder: "Ln. G.Shaik Alaudeen",
  industry: "Advertising Agency",
  established: 2014,
  phone: "+91 98432 19951",
  altPhone: "+91 77088 66844",
  email: "gsdesignsngt@gmail.com",
  adminEmail: "admin@gsdesigns.com",
  whatsapp: "919843219951",
  address: "1/31, Public Office Road, Next to CRC Depot, Velippalayam",
  cityState: "Nagapattinam - 611001",
  businessHours: {
    weekdays: "09:00 AM - 08:30 PM",
    saturday: "09:00 AM - 08:30 PM",
    sunday: "Emergency Orders Only"
  },
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    behance: "https://behance.net"
  },
  stats: {
    projectsCompleted: 5240,
    happyClients: 1250,
    yearsExperience: 11,
    supportHours: "24/7"
  }
};

export const SERVICES_LIST = [
  {
    id: "logo-design",
    title: "Logo Design",
    category: "Branding",
    icon: "PenTool",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    description: "Crafting iconic, memorable vector logos that reflect your core brand identity.",
    startingPrice: "₹9,999",
    numericPrice: 9999,
    popular: true,
    features: ["Vector Source Files (AI, EPS, SVG)", "3 Unique Concept Options", "3D Mockup Presentation", "Full Copyright Ownership", "Unlimited Revisions"]
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Branding",
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
    description: "Complete corporate brand guidelines including typography, color palette, logo usage, and brand voice.",
    startingPrice: "₹24,999",
    numericPrice: 24999,
    popular: true,
    features: ["Brand Guidelines Manual (PDF)", "Color Hierarchy (HEX, CMYK, Pantone)", "Typography System", "Stationery Mockups", "Social Media Kit"]
  },
  {
    id: "flex-printing",
    title: "Flex Printing",
    category: "Printing",
    icon: "Printer",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80",
    description: "High-definition large format flex, vinyl, and star flex printing for outdoor ads and hoardings.",
    startingPrice: "₹15 / sq.ft",
    numericPrice: 15,
    popular: true,
    features: ["UV Resistant Solvent Printing", "Star Flex & Glow Sign Material", "Eyelets & Hemming Included", "Weatherproof Coating", "Same Day Express Delivery"]
  },
  {
    id: "invitation-design",
    title: "Invitation Design",
    category: "Print & Digital",
    icon: "Mail",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    description: "Elegantly crafted physical and digital motion video invitations for corporate events, weddings, and galas.",
    startingPrice: "₹4,999",
    numericPrice: 4999,
    popular: false,
    features: ["Royal Embossed Card Mockup", "Animated Video WhatsApp Cards", "Interactive RSVP Link", "Multiple Language Layouts", "Print-Ready PDF Included"]
  },
  {
    id: "visiting-cards",
    title: "Visiting Cards",
    category: "Printing",
    icon: "CreditCard",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    description: "Premium velvet touch, spot UV, gold foil, and NFC smart digital visiting cards.",
    startingPrice: "₹1,999 / 100 Cards",
    numericPrice: 1999,
    popular: true,
    features: ["400 GSM Heavy Paper Stock", "Spot UV & Metallic Foil Options", "NFC Smart Contact Chip", "Rounded/Custom Die-Cut Edges", "Free Storage Box"]
  },
  {
    id: "brochures",
    title: "Brochures",
    category: "Print & Digital",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    description: "Bi-fold, tri-fold, and multi-page corporate product catalogs with high-end print finishes.",
    startingPrice: "₹7,999",
    numericPrice: 7999,
    popular: false,
    features: ["Custom Layout & Infographics", "Glossy or Matte Lamination", "Digital Flipbook Version", "High Resolution Print PDF", "Stock Photography Included"]
  },
  {
    id: "pamphlets",
    title: "Pamphlets",
    category: "Printing",
    icon: "FileText",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    description: "Eye-catching promotional flyers for retail sales, events, distribution, and local campaigns.",
    startingPrice: "₹2,999 / 1000 Pcs",
    numericPrice: 2999,
    popular: false,
    features: ["130 GSM Art Paper", "Single / Double Sided Print", "Fast Bulk Turnaround", "Targeted Messaging Layout", "Free Graphic Concept"]
  },
  {
    id: "banners",
    title: "Banners",
    category: "Signage",
    icon: "Maximize",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
    description: "Roll-up standees, backdrop banners, promotional x-banners, and cloth event banners.",
    startingPrice: "₹1,499 / Banner",
    numericPrice: 1499,
    popular: false,
    features: ["Heavy Aluminium Standee Base", "Non-Curl Poly Vinyl Film", "Carrying Bag Included", "Quick Assembly Mechanism", "Vibrant Solvent Colors"]
  },
  {
    id: "posters",
    title: "Posters",
    category: "Printing",
    icon: "Image",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    description: "High impact movie, event, product display, and indoor wall posters in custom dimensions.",
    startingPrice: "₹999 / Poster",
    numericPrice: 999,
    popular: false,
    features: ["Photo Satin Finish Paper", "Framing Options Available", "Vivid Color Accuracy", "Scratch Resistant Ink", "Custom Sizing (A0 to A4)"]
  },
  {
    id: "sign-boards",
    title: "Sign Boards",
    category: "Signage",
    icon: "Layout",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    description: "3D Acrylic LED letter boards, ACP frontlit/backlit signs, neon signages, and outdoor pylons.",
    startingPrice: "₹12,499 / Board",
    numericPrice: 12499,
    popular: true,
    features: ["Energy Efficient Samsung LEDs", "Weatherproof Aluminium Composite", "3-Year Warranty On Lighting", "On-site Installation", "3D Rendering Preview"]
  },
  {
    id: "vehicle-branding",
    title: "Vehicle Branding",
    category: "Signage",
    icon: "Truck",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    description: "Full vehicle vinyl wraps and partial fleet graphics for cars, vans, trucks, and buses.",
    startingPrice: "₹18,500 / Vehicle",
    numericPrice: 18500,
    popular: false,
    features: ["3M Premium Cast Vinyl", "Paint Safe Protection Film", "Custom Fleet Cutouts", "5-Year Outdoor Durability", "Certified Wrap Technicians"]
  },
  {
    id: "social-media-posts",
    title: "Social Media Posts",
    category: "Digital Marketing",
    icon: "Share2",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    description: "High-converting social graphics, Instagram reels, ad creatives, and monthly content calendars.",
    startingPrice: "₹4,999 / 10 Posts",
    numericPrice: 4999,
    popular: true,
    features: ["Static & Motion Reel Graphics", "Engaging Copywriting Text", "Hashtag Strategy Included", "Brand Template Creation", "Canva / PSD Source Files"]
  },
  {
    id: "packaging-design",
    title: "Packaging Design",
    category: "Branding",
    icon: "Box",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    description: "Product box structures, pouch designs, bottle labels, and unboxing experience aesthetics.",
    startingPrice: "₹14,999 / Packaging",
    numericPrice: 14999,
    popular: false,
    features: ["Dieline Precision Files", "Realistic 3D Renders", "Barcode & FDA Layouts", "Eco-friendly Material Advice", "Print Production Support"]
  },
  {
    id: "wedding-designs",
    title: "Wedding Designs",
    category: "Print & Digital",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    description: "Complete royal wedding suite: welcome boards, menu cards, luggage tags, video invites & gift boxes.",
    startingPrice: "₹12,499 / Suite",
    numericPrice: 12499,
    popular: false,
    features: ["Custom Monogram Design", "Gold Foil Hardbound Boxes", "Animated Video Suite", "Welcome Acrylic Easels", "Guest Name Personalization"]
  },
  {
    id: "political-campaign-designs",
    title: "Political Campaign Designs",
    category: "Signage",
    icon: "Flag",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80",
    description: "Massive scale election campaign banners, caps, flags, audio-visual clips, and digital blitz.",
    startingPrice: "₹25,000 / Campaign",
    numericPrice: 25000,
    popular: false,
    features: ["High Speed Bulk Printing", "Custom Slogan Creation", "Social Media War Room Graphics", "Vehicle & Stage Backdrop", "24/7 Emergency Delivery"]
  },
  {
    id: "business-promotions",
    title: "Business Promotions",
    category: "Digital Marketing",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "End-to-end promotional campaigns, launch event collateral, giveaways, and pop-up store branding.",
    startingPrice: "₹15,000 / Package",
    numericPrice: 15000,
    popular: false,
    features: ["Multi-channel Strategy", "Promo Swag Mockups", "Ad Campaign Banners", "Landing Page Visuals", "Press Release Design"]
  },
  {
    id: "certificates",
    title: "Certificates",
    category: "Printing",
    icon: "Award",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    description: "High-security anti-counterfeit certificates with watermark, hologram, and gold foil seal.",
    startingPrice: "₹2,499 / 100 Pcs",
    numericPrice: 2499,
    popular: false,
    features: ["Security Watermark Paper", "3D Hologram Sticker Option", "Golden Metallic Embossing", "Variable Data Name Printing", "Custom Border Artwork"]
  },
  {
    id: "shield-mementos",
    title: "Shield & Mementos",
    category: "Custom Printing",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80",
    description: "Custom engraved acrylic awards, wooden mementos, crystal trophies, and metal recognition shields.",
    startingPrice: "₹1,499 / Trophy",
    numericPrice: 1499,
    popular: false,
    features: ["Laser Precision Engraving", "Sublimation Metal Printing", "Velvet Gift Box Packaging", "Custom Shape Cutouts", "No Minimum Quantity"]
  }
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Aura Luxury Botanicals",
    category: "Packaging",
    service: "Packaging Design",
    client: "Aura Cosmetics",
    year: "2025",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    description: "Complete rebrand and luxury matte metallic gold foil packaging for organic skincare line.",
    tags: ["Packaging", "Gold Foil", "3D Render", "Cosmetics"],
    featured: true,
    pdfUrl: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    title: "Apex Tech Towers 3D LED Board",
    category: "Signage",
    service: "Sign Boards",
    client: "Apex Properties",
    year: "2025",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    description: "Massive 60ft outdoor 3D Acrylic frontlit LED letter signboard with ACP cladding.",
    tags: ["Sign Board", "3D LED", "ACP Cladding", "Corporate"],
    featured: true,
    pdfUrl: "#",
    videoUrl: ""
  },
  {
    id: 3,
    title: "Verve Fashion Autumn Identity",
    category: "Branding",
    service: "Brand Identity",
    client: "Verve Apparel",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
    description: "Bold minimalistic logo, hangtags, shopping bags, and store interior signage design.",
    tags: ["Logo", "Identity", "Apparel", "Minimal"],
    featured: true,
    pdfUrl: "#",
    videoUrl: ""
  },
  {
    id: 4,
    title: "Royal Grand Wedding Suite",
    category: "Invitation",
    service: "Invitation Design",
    client: "Kapoor Family",
    year: "2025",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    description: "Rigid box invitation with velvet lining, metallic monogram seal, and animated digital WhatsApp card.",
    tags: ["Invitation", "Royal Wedding", "Gold Foil", "Video Card"],
    featured: false,
    pdfUrl: "#",
    videoUrl: ""
  },
  {
    id: 5,
    title: "Urban Fleet Vehicle Wraps",
    category: "Flex",
    service: "Vehicle Branding",
    client: "Urban Express Logistics",
    year: "2024",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",
    description: "Full body cast vinyl wraps for a fleet of 25 delivery vans with reflective night accents.",
    tags: ["Vehicle Wrap", "3M Vinyl", "Fleet Branding"],
    featured: false,
    pdfUrl: "#",
    videoUrl: ""
  },
  {
    id: 6,
    title: "NFC Smart Business Cards",
    category: "Business Cards",
    service: "Visiting Cards",
    client: "FinTech Global",
    year: "2025",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    description: "Black matte acrylic cards with embedded NFC chip and metallic gold edge painting.",
    tags: ["Business Card", "NFC Tech", "Spot UV", "Gold Edge"],
    featured: true,
    pdfUrl: "#",
    videoUrl: ""
  },
  {
    id: 7,
    title: "Mega Expo Flex Hoardings",
    category: "Banner",
    service: "Flex Printing",
    client: "International Trade Fair",
    year: "2024",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1000&q=80",
    description: "10,000 sq.ft flex banner coverage across highway hoardings with UV protective ink.",
    tags: ["Flex Printing", "Hoarding", "Outdoor Ad"],
    featured: false,
    pdfUrl: "#",
    videoUrl: ""
  },
  {
    id: 8,
    title: "CyberPulse Social Campaign",
    category: "Social Media",
    service: "Social Media Posts",
    client: "CyberPulse Security",
    year: "2025",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    description: "30-day 3D cyberpunk themed social media ad creatives and short form motion reels.",
    tags: ["Social Media", "Reels", "Ad Creatives", "Motion"],
    featured: false,
    pdfUrl: "#",
    videoUrl: ""
  }
];

export const GALLERY_ALBUMS = [
  {
    id: "printing-works",
    title: "Printing Works & Equipment",
    images: [
      { id: "g1", url: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80", caption: "Roland UV HD Plotter Printer" },
      { id: "g2", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", caption: "Automatic Spot UV & Foil Stamper" },
      { id: "g3", url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80", caption: "High Speed Booklet Folding Line" }
    ]
  },
  {
    id: "shop-photos",
    title: "GS Designs Studio & Workshop",
    images: [
      { id: "g4", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", caption: "Main Client Lounge & Display Studio" },
      { id: "g5", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", caption: "Creative Design & Pre-Press Team Station" }
    ]
  },
  {
    id: "customer-works",
    title: "Installed Client Projects",
    images: [
      { id: "g6", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", caption: "Acrylic LED Board Installation at City Mall" },
      { id: "g7", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", caption: "Fleet Delivery Vans Vinyl Wrap Project" }
    ]
  }
];

export const TESTIMONIALS_LIST = [
  {
    id: 1,
    name: "Rajesh Malhotra",
    company: "CEO, Malhotra Retail Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    review: "GS Designs revamped our entire retail branding, from LED sign boards to visiting cards and flex banners. Their turn-around time is unmatched and the print quality is pure luxury!",
    serviceUsed: "Brand Identity & Sign Boards"
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Founder, Luxe Wedding Planners",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    review: "For all our royal wedding invitations and acrylic welcome easels, GS Designs is our sole trusted partner. Their gold foil finishes and video invites leave every guest mesmerized.",
    serviceUsed: "Invitation Suite"
  },
  {
    id: 3,
    name: "David Vance",
    company: "Marketing Director, Apex Global",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    review: "The administrative team at GS Designs handled our multi-city outdoor flex hoarding campaign seamlessly. 100% professional, responsive 24/7, and delivered ahead of schedule.",
    serviceUsed: "Flex Printing & Outdoor Banners"
  }
];

export const PRICING_PACKAGES = [
  {
    id: "basic",
    name: "Startup Essentials",
    price: "₹14,999",
    period: "one-time",
    popular: false,
    description: "Ideal for small businesses launching their brand presence.",
    features: [
      "Vector Logo Design (3 Concepts)",
      "500 Premium Visiting Cards (Spot UV)",
      "Social Media Launch Kit (5 Posts)",
      "Digital Business Card Link",
      "Standard 3-Day Turnaround"
    ]
  },
  {
    id: "standard",
    name: "Professional Growth",
    price: "₹34,999",
    period: "one-time",
    popular: true,
    description: "Complete physical & digital advertising boost for growing companies.",
    features: [
      "Complete Brand Identity & Guidelines",
      "1,000 Spot UV Visiting Cards",
      "1,000 Glossy Pamphlets (Tri-Fold)",
      "1 Roll-Up Standee Banner",
      "15 Social Media Creatives & Reels",
      "Priority 48-Hour Turnaround"
    ]
  },
  {
    id: "premium",
    name: "Agency Supreme",
    price: "₹74,999",
    period: "one-time",
    popular: false,
    description: "Comprehensive 360-degree branding, signage, and marketing powerhouse.",
    features: [
      "Everything in Professional Growth",
      "3D Acrylic LED Sign Board (up to 20 sq.ft)",
      "Custom Packaging or Box Design",
      "500 Security Certificates or Mementos",
      "Vehicle Branding Graphics",
      "Dedicated Account Manager & 24/7 Support"
    ]
  },
  {
    id: "enterprise",
    name: "Custom Enterprise",
    price: "Custom",
    period: "project-basis",
    popular: false,
    description: "Bespoke high-volume printing, campaign blitz, and fleet branding.",
    features: [
      "Unlimited Printing Volume Discounts",
      "Multi-location Sign Board Installations",
      "Political or Mega Event Blitz Operations",
      "On-Site Press Supervision",
      "Custom SLA & Dedicated Creative Team"
    ]
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Gaurav Sharma",
    position: "Founder & Managing Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    experience: "12+ Years",
    skills: ["Brand Strategy", "Signage Engineering", "Creative Direction"]
  },
  {
    name: "Siddharth Verma",
    position: "Lead Art Director & 3D Artist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    experience: "8+ Years",
    skills: ["Logo Architecture", "Packaging Renders", "Motion Graphics"]
  },
  {
    name: "Ananya Roy",
    position: "Senior Graphic & Print Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    experience: "6+ Years",
    skills: ["Pre-Press Processing", "Gold Foil Styling", "Typography"]
  },
  {
    name: "Vikram Malhotra",
    position: "Head of Flex & Signage Production",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    experience: "10+ Years",
    skills: ["Large Format Printing", "LED Systems", "Acrylic Cutting"]
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Golden Rules of Designing high-Converting Flex Hoardings",
    category: "Printing Tips",
    author: "Gaurav Sharma",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80",
    summary: "Discover how viewing distance, contrast ratio, and font selection determine whether your outdoor billboard captures immediate attention.",
    content: "Outdoor advertising remains one of the highest ROI mediums when done right. In this guide, we dive into solvent print resolution, RGB to CMYK color profile conversions, and high-visibility typography."
  },
  {
    id: 2,
    title: "Why Spot UV & Foil Embossing Instantly Multiplies Brand Perception",
    category: "Branding Ideas",
    author: "Ananya Roy",
    date: "Aug 04, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    summary: "Tactile branding elements like velvet soft-touch laminate and raised metallic foil create subconscious premium psychological associations.",
    content: "When a potential client holds your business card, touch perception accounts for over 40% of their initial trust evaluation. Here's how tactile finishes work."
  },
  {
    id: 3,
    title: "3D Acrylic vs Neon Sign Boards: Which is Best for Your Storefront?",
    category: "Agency News",
    author: "Vikram Malhotra",
    date: "Jul 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    summary: "Comparing longevity, energy efficiency, weather resistance, and nighttime visibility of modern LED storefront signages.",
    content: "Storefront signboards operate 24 hours a day. Learn how Samsung LED powered acrylic letters compare against glass and flex neon alternatives."
  }
];

export const CAREER_OPENINGS = [
  {
    id: "job-1",
    title: "Senior Brand & Packaging Designer",
    department: "Creative Studio",
    location: "Nagapattinam (On-site / Hybrid)",
    type: "Full-Time",
    experience: "4-6 Years",
    description: "We are seeking a master graphic designer skilled in Illustrator, Photoshop, and 3D mockup tools for luxury packaging & logo systems."
  },
  {
    id: "job-2",
    title: "Flex & Large Format Machine Operator",
    department: "Print Production",
    location: "Workshop - Nagapattinam",
    type: "Full-Time",
    experience: "2-4 Years",
    description: "Hands-on experience with Roland, Mimaki, or Konica solvent & UV printers, RIP software, and vinyl cutting plotters."
  },
  {
    id: "job-3",
    title: "Digital Marketing & Reels Creator",
    department: "Social Media Agency",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "2-3 Years",
    description: "Create trend-focused video reels, ad graphics, and copy for diverse client accounts across Instagram, LinkedIn & Facebook."
  }
];

export const FAQ_ITEMS = [
  {
    q: "What is your standard turnaround time for printing orders?",
    a: "Visiting cards, flex banners, and flyers usually ship within 24-48 hours. Complex projects such as 3D LED sign boards or custom packaging require 4-7 business days depending on design approvals."
  },
  {
    q: "Do you provide graphic design assistance if I don't have vector files?",
    a: "Absolutely! Our in-house creative design team can create complete artwork from scratch or vectorize your low-resolution raster logos."
  },
  {
    q: "Can I inspect physical samples before placing a bulk printing order?",
    a: "Yes! You can visit our studio lounge in Nagapattinam to inspect paper stocks, spot UV samples, acrylic finishes, and flex textures."
  },
  {
    q: "What file formats should I submit for high-quality printing?",
    a: "We recommend vector PDF, AI, EPS, or CDR files with all fonts converted to curves/outlines, and color mode set to CMYK at 300 DPI."
  },
  {
    q: "Do you offer installation services for outdoor sign boards?",
    a: "Yes, we have certified fabrication and installation technicians who install 3D LED boards, ACP panels, and hoardings safely across all commercial areas."
  }
];

// INITIAL ADMIN DATA
export const INITIAL_ADMIN_QUOTES = [
  { id: "QT-1092", clientName: "Aman Gupta", company: "boAt Audio Store", service: "Sign Boards", budget: "₹45,000", date: "2026-08-12", status: "Pending", phone: "+91 98111 22334" },
  { id: "QT-1091", clientName: "Simran Kaur", company: "Zari Couture", service: "Invitation Design", budget: "₹18,500", date: "2026-08-11", status: "Approved", phone: "+91 99887 76655" },
  { id: "QT-1090", clientName: "Dr. K. S. Reddy", company: "Reddy Heart Hospital", service: "Flex Printing", budget: "₹65,000", date: "2026-08-10", status: "In Progress", phone: "+91 97766 55443" }
];

export const INITIAL_ADMIN_MESSAGES = [
  { id: "MSG-401", sender: "Rohan Verma", email: "rohan@techcorp.in", subject: "Inquiry for 500 NFC Visiting Cards", date: "2026-08-13 10:30 AM", read: false, text: "Hi GS Designs team, we need custom NFC matte black cards with gold metallic foil edges for our executive team." },
  { id: "MSG-400", sender: "Neha Kapoor", email: "neha@weddingluxe.com", subject: "Collaboration for 2026 Season", date: "2026-08-12 04:15 PM", read: true, text: "Looking forward to partnering with your studio for our upcoming destination wedding invitations." }
];
