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
  }
];
