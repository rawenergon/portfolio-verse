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
  price: number; // In INR (₹)
  originalPrice: number;
  currency: string;
  currencySymbol: string;
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
    slug: "ccidcop",
    title: "CCIDCOP",
    isNew: true,
    isFeatured: true,
    price: 69, // Exactly 69 INR as requested by dj
    originalPrice: 199,
    currency: "INR",
    currencySymbol: "₹",
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
    id: "2",
    slug: "syntax-overlord",
    title: "Syntax Overlord",
    isNew: true,
    isFeatured: true,
    price: 100, // Exactly 100 INR as requested by dj
    originalPrice: 249,
    currency: "INR",
    currencySymbol: "₹",
    category: "Portfolio",
    subCategory: "Developer & Terminal",
    description: "An elite full-stack developer portfolio and interactive command center by Aditya Raj. Features GSAP smooth animations, Ctrl+K command palette, and dark/light modes.",
    longDescription: "Syntax Overlord (syntax-overlord.me) is an ultra-fast, high-aesthetic developer portfolio and command hub by Aditya Raj. Features buttery GSAP ScrollTrigger reveal animations, retro-modern terminal styling, a full-featured keyboard-driven command palette (Ctrl+K), curated dev logs, interactive project cards, and minimalist aesthetics.",
    techStack: [
      { name: "JavaScript", badge: "JS", icon: "js", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      { name: "GSAP Motion", badge: "GSAP", icon: "gsap", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
      { name: "ScrollTrigger", badge: "Scroll", icon: "scroll", color: "bg-green-500/20 text-green-400 border-green-500/30" },
      { name: "Geist Typography", badge: "Geist", icon: "geist", color: "bg-zinc-800 text-zinc-200 border-zinc-700" },
      { name: "CSS3 Variables", badge: "CSS", icon: "css", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    ],
    videoSrc: "",
    previewUrl: "/templates/syntax-overlord",
    demoUrl: "https://syntax-overlord.me/",
    features: [
      "Official live portfolio of Aditya Raj at syntax-overlord.me",
      "Interactive Command Palette with Ctrl+K shortcut navigation",
      "GSAP 3.12 & ScrollTrigger buttery smooth reveal animations",
      "Complete Projects, Blog, Bookmarks & System Dashboard modules",
      "Persistent Dark / Light theme switch with localStorage sync",
      "Geist & Geist Mono typographic hierarchy",
      "Minimalist quote band & custom cat mascot footer animation",
      "Ultra-lightweight zero-dependency architecture for instant 100/100 Lighthouse performance"
    ],
    pages: ["Home", "Projects", "Blog", "Bookmarks", "Dashboard", "Command Palette"],
    updatedAt: "Live on syntax-overlord.me",
    rating: 4.99,
    salesCount: 230,
    previewGradient: "from-emerald-500/25 via-zinc-900 to-black",
    previewAccent: "#10b981"
  }
];
