import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NoiseOverlay } from "@/components/noise-overlay";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-verse-bice.vercel.app";

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CV.VERSE — Inspirational Developer Portfolios & Free Open Source Templates",
    template: "%s | CV.VERSE",
  },
  description:
    "100% Free & Open Source inspirational developer portfolios and Next.js, Tailwind CSS, and React templates. Clone the source code directly from GitHub and build your portfolio in minutes.",
  keywords: [
    "inspirational portfolio",
    "inspirational portfolios",
    "free portfolio templates",
    "open source developer portfolios",
    "portfolio templates",
    "nextjs templates",
    "tailwind templates",
    "react templates",
    "developer portfolios",
    "security templates",
    "agency websites",
    "cv verse",
    "ccidcop",
    "syntax overlord",
    "vinod jangid",
    "aditya raj",
    "rawenergon",
    "security portfolio",
    "shadcn portfolio",
    "react developer portfolio",
    "github portfolio clone",
  ],
  authors: [{ name: "Aditya Raj", url: "https://ccidcop.in" }],
  creator: "Aditya Raj (@rawenergon)",
  publisher: "CV.VERSE",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "CV.VERSE — Modern Portfolio & Developer Templates",
    description:
      "Why start from scratch when you can deploy in minutes? Production-ready Next.js, Tailwind CSS, and React templates for developers, security professionals, and agencies.",
    url: siteUrl,
    siteName: "CV.VERSE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: "CV.VERSE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV.VERSE — Modern Portfolio & Developer Templates",
    description:
      "Why start from scratch when you can deploy in minutes? Production-ready Next.js, Tailwind CSS, and React templates for developers, security professionals, and agencies.",
    creator: "@adibxr",
    images: [`${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "CV.VERSE",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      founder: {
        "@type": "Person",
        name: "Aditya Raj",
        alternateName: "rawenergon",
        url: "https://ccidcop.in",
        sameAs: [
          "https://github.com/rawenergon",
          "https://x.com/adibxr",
        ],
      },
      sameAs: [
        "https://github.com/rawenergon",
        "https://x.com/adibxr",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CV.VERSE",
      description:
        "100% Free & Open Source inspirational developer portfolios and Next.js, Tailwind CSS, and React templates. Clone the source code directly from GitHub and build your portfolio in minutes.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#inspirational-portfolios`,
      name: "Inspirational Developer Portfolios",
      description: "Curated open source developer portfolios with direct GitHub source code links.",
      itemListElement: [
        {
          "@type": "SoftwareSourceCode",
          position: 1,
          name: "CCIDCOP",
          codeRepository: "https://github.com/AdityaKodez/adityaojha",
          programmingLanguage: "TypeScript",
          author: { "@type": "Person", name: "Aditya Raj" }
        },
        {
          "@type": "SoftwareSourceCode",
          position: 2,
          name: "Syntax Overlord",
          codeRepository: "https://github.com/rawenergon/portfolio",
          programmingLanguage: "JavaScript",
          author: { "@type": "Person", name: "Aditya Raj" }
        },
        {
          "@type": "SoftwareSourceCode",
          position: 3,
          name: "Vinod Jangid",
          codeRepository: "https://github.com/vinodjangid07/vinodjangid07.github.io",
          programmingLanguage: "TypeScript",
          author: { "@type": "Person", name: "Vinod Jangid" }
        }
      ]
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:ital,wght@0,300..800;1,300..800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className="font-mono min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 transition-colors relative selection:bg-[#ff6a00] selection:text-white"
      >
        <NoiseOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
