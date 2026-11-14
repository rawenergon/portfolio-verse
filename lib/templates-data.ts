export interface TechStackItem {
  name: string;
  badge: string;
  icon: string;
  color: string;
}

export interface TemplateItem {
  id: string;
  slug: string;
  title: string;
  isNew: boolean;
  isFeatured?: boolean;
  price: number;
  originalPrice: number;
  category: "Portfolio";
  subCategory: "Security & Systems" | "Agency & Studio" | "Developer & Terminal" | "Minimalist" | "Design & Creative";
  description: string;
  longDescription: string;
  techStack: TechStackItem[];
  videoSrc?: string;
  previewUrl: string;
  demoUrl: string;
  features: string[];
  pages: string[];
  updatedAt: string;
  rating: number;
  salesCount: number;
  previewGradient: string;
  previewAccent: string;
}

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: "1",
    slug: "certific",
    title: "Certific",
    isNew: true,
    price: 55,
    originalPrice: 79,
    category: "Portfolio",
    subCategory: "Agency & Studio",
    description: "A modern agency template with services, projects, MDX blog, smooth scrolling, and built-in Cal.com + Discord.",
    longDescription: "Certific is an ultra-refined agency and developer portfolio template. Features buttery-smooth Lenis scrolling, dynamic MDX-powered case studies, appointment scheduling integration via Cal.com, Discord inquiry webhooks, and comprehensive SEO optimization.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Next.js", badge: "Next", icon: "next", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
      { name: "Framer Motion", badge: "Motion", icon: "motion", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/certific.mp4",
    previewUrl: "/templates/certific",
    demoUrl: "https://certific.ui-layouts.com/",
    features: [
      "Custom Lenis Smooth Scrolling engine",
      "Interactive Project Showcase with filter tabs",
      "Full MDX Blog System with code syntax highlighting",
      "Cal.com embedded booking scheduler",
      "Discord contact form automation hook",
      "100/100 Lighthouse Performance & SEO",
      "Dark / Light theme with system sync"
    ],
    pages: ["Home / Landing", "Case Studies", "Case Study Detail", "Services Grid", "MDX Blog", "Contact & Booking"],
    updatedAt: "March 12, 2026",
    rating: 4.95,
    salesCount: 142,
    previewGradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    previewAccent: "#f97316"
  },
  {
    id: "2",
    slug: "mvpstudio",
    title: "MVP Studio",
    isNew: true,
    price: 35,
    originalPrice: 49,
    category: "Portfolio",
    subCategory: "Agency & Studio",
    description: "A modern agency template with services, projects, MDX blog, smooth scrolling, and built-in Cal.com + Discord.",
    longDescription: "MVP Studio is crafted specifically for rapid product builders, software venture studios, and design sprints. Showcase your MVP packages, pricing tiers, client testimonials, and case studies with high-velocity aesthetics.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Next.js", badge: "Next", icon: "next", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/mvpstudio.mp4",
    previewUrl: "/templates/mvpstudio",
    demoUrl: "https://mvpstudio.ui-layouts.com/",
    features: [
      "MVP Sprint pricing & package selector",
      "Interactive sprint deliverables timeline",
      "Client testimonial carousel with video modal",
      "One-click Calendly / Cal.com integration",
      "Instant email notifications with Resend"
    ],
    pages: ["Hero / Studio Intro", "Sprint Packages", "Portfolio Archive", "Client Reviews", "FAQ & Inquiry"],
    updatedAt: "March 8, 2026",
    rating: 4.9,
    salesCount: 89,
    previewGradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    previewAccent: "#a855f7"
  },
  {
    id: "3",
    slug: "ccidcop",
    title: "CCIDCOP",
    isNew: true,
    isFeatured: true,
    price: 49,
    originalPrice: 79,
    category: "Portfolio",
    subCategory: "Security & Systems",
    description: "The official security engineer & systems developer portfolio of Aditya Raj (@rawenergon). Minimalist dark UI with timeline, stack inspector, and technical blog.",
    longDescription: "CCIDCOP (ccidcop.in) is the benchmark developer & security tools engineer portfolio. Built with Next.js, React, Tailwind CSS, and shadcn/ui, it showcases engineering accomplishments, zero-knowledge security suites, an interactive project timeline (2024–2026), categorized tech stack cards, and deep-dive technical articles.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Next.js", badge: "Next", icon: "next", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
      { name: "shadcn/ui", badge: "shadcn", icon: "shadcn", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    ],
    videoSrc: "",
    previewUrl: "/templates/ccidcop",
    demoUrl: "https://ccidcop.in/",
    features: [
      "Official live portfolio of Aditya Raj (@rawenergon) at ccidcop.in",
      "Minimalist cybersecurity & developer dark aesthetic",
      "Interactive Project Showcase: RECO Labs, RECON-X, Face Mash & ADI AI",
      "Categorized Technical Stack Breakdown (Languages, Frontend, Backend, Tools)",
      "Technical Markdown Blog Reader with estimated read times",
      "Curated talks & computer science lecture shelf",
      "Instant GitHub (@rawenergon), X (@adibxr), and email contact integrations"
    ],
    pages: ["Work / Projects", "Technical Blog", "Tech Stack Matrix", "Experience Timeline", "Curated Lectures", "Contact & Socials"],
    updatedAt: "Live on ccidcop.in",
    rating: 5.0,
    salesCount: 420,
    previewGradient: "from-orange-500/25 via-zinc-900 to-black",
    previewAccent: "#f95300"
  },
  {
    id: "4",
    slug: "nextcodez",
    title: "NextCodez",
    isNew: false,
    price: 75,
    originalPrice: 99,
    category: "Portfolio",
    subCategory: "Developer & Terminal",
    description: "An elite engineer & creator portfolio with code blocks, services, projects, MDX blog, and terminal interactive widgets.",
    longDescription: "NextCodez is the flagship developer portfolio template. Comes with an interactive retro terminal widget, live GitHub repository stats widget, animated skill radar, MDX technical tutorials, and resume download modal.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Next.js", badge: "Next", icon: "next", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/nextcodez-ui-layouts.mp4",
    previewUrl: "/templates/nextcodez",
    demoUrl: "https://nextcodez.ui-layouts.com/",
    features: [
      "Interactive Terminal with runnable CLI commands",
      "Live GitHub Contribution Graph & Activity Feed",
      "Code Playground snippets with copy & run simulation",
      "Dynamic MDX Tech Articles with table of contents",
      "Interactive Experience & Education Timeline"
    ],
    pages: ["Terminal Hero", "About & Philosophy", "Featured Projects", "Tech Stack Radar", "Writing / Articles", "Contact"],
    updatedAt: "February 28, 2026",
    rating: 5.0,
    salesCount: 310,
    previewGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    previewAccent: "#10b981"
  },
  {
    id: "5",
    slug: "laynite",
    title: "Laynite",
    isNew: true,
    price: 15,
    originalPrice: 25,
    category: "Portfolio",
    subCategory: "Minimalist",
    description: "A modern React template built with TypeScript, TailwindCSS v4, and Motion. Perfect for creating stunning web applications with smooth animations and responsive design.",
    longDescription: "Laynite is an ultra-minimalist personal portfolio template. Clean typography, generous negative space, smooth layout transitions, and lightweight bundle size (< 45KB).",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
      { name: "Motion", badge: "Motion", icon: "motion", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/laynite.mp4",
    previewUrl: "/templates/laynite",
    demoUrl: "https://laynite.ui-layouts.com/",
    features: [
      "TailwindCSS v4 native architecture",
      "Micro-interactions on hover and scroll",
      "Lightweight instant page loads",
      "Clean grid gallery for creative work",
      "Subtle sound effects on interactions (optional)"
    ],
    pages: ["Index / Bio", "Works", "Writing", "Colophon", "Contact"],
    updatedAt: "March 11, 2026",
    rating: 4.96,
    salesCount: 95,
    previewGradient: "from-zinc-500/20 via-slate-500/10 to-transparent",
    previewAccent: "#94a3b8"
  },
  {
    id: "6",
    slug: "layoutic",
    title: "Layoutic",
    isNew: true,
    price: 25,
    originalPrice: 39,
    category: "Portfolio",
    subCategory: "Design & Creative",
    description: "A premium React template featuring TypeScript, TailwindCSS v4, and Motion. Designed for building sophisticated web applications with advanced layouts and interactions.",
    longDescription: "Layoutic specializes in designer portfolios, frontend engineers, and creative agencies showcasing complex component architectures and interaction models.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
      { name: "Motion", badge: "Motion", icon: "motion", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/layoutic.mp4",
    previewUrl: "/templates/layoutic",
    demoUrl: "https://layoutic.ui-layouts.com/",
    features: [
      "40+ Copy-paste ready block components",
      "Dynamic interactive layout builder preview",
      "TailwindCSS v4 high-performance utility classes",
      "Responsive breakpoint inspector tool",
      "Figma design tokens included"
    ],
    pages: ["Catalog", "Component Explorer", "Preview Sandbox", "Styleguide", "Docs"],
    updatedAt: "March 10, 2026",
    rating: 4.91,
    salesCount: 83,
    previewGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    previewAccent: "#8b5cf6"
  },
  {
    id: "7",
    slug: "talentflow",
    title: "TalentFlow",
    isNew: true,
    price: 35,
    originalPrice: 55,
    category: "Portfolio",
    subCategory: "Design & Creative",
    description: "A modern talent management and recruitment template built with Next.js, Framer Motion, and TailwindCSS. Perfect for job boards, recruitment platforms, and talent showcase websites.",
    longDescription: "TalentFlow powers executive showcase portfolios, creative talent representations, and tech job portfolios with multi-view interactive dashboards.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Next.js", badge: "Next", icon: "next", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/talentflow.mp4",
    previewUrl: "/templates/talentflow",
    demoUrl: "https://talentflow.ui-layouts.com/",
    features: [
      "Filterable Showcase Board with role & project tags",
      "Interactive Candidate / Executive Profile card",
      "Direct hire consultation scheduler",
      "Verified badges and recommendations section"
    ],
    pages: ["Showcase Directory", "Profile Detail", "Services & Rates", "Contact Portal"],
    updatedAt: "March 11, 2026",
    rating: 4.98,
    salesCount: 76,
    previewGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    previewAccent: "#f59e0b"
  },
  {
    id: "8",
    slug: "cortext-labs",
    title: "Cortext Labs",
    isNew: true,
    price: 30,
    originalPrice: 45,
    category: "Portfolio",
    subCategory: "Security & Systems",
    description: "A technology research laboratory and parent company specializing in AI innovation. Clean corporate aesthetic for deep-tech.",
    longDescription: "Cortext Labs is designed for AI researchers, academic fellows, and deep-tech engineers building publications and venture portfolios.",
    techStack: [
      { name: "TypeScript", badge: "TS", icon: "ts", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
      { name: "Next.js", badge: "Next", icon: "next", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "React", badge: "React", icon: "react", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
      { name: "Tailwind CSS", badge: "Tailwind", icon: "tailwind", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    ],
    videoSrc: "https://d39i1r5xb1nnr0.cloudfront.net/videos/cortext-labs.mp4",
    previewUrl: "/templates/cortext-labs",
    demoUrl: "https://cortext-labs.ui-layouts.com/",
    features: [
      "Deep tech laboratory aesthetics with grid lines",
      "Research paper index with PDF download triggers",
      "Interactive neural network particle simulation",
      "Advisory board & researcher profiles"
    ],
    pages: ["Research Overview", "Publications", "Lab Ventures", "Team & Fellows", "Press & News"],
    updatedAt: "March 9, 2026",
    rating: 4.87,
    salesCount: 52,
    previewGradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    previewAccent: "#06b6d4"
  }
];
