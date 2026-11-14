import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/noise-overlay";

const inter = Inter({ subsets: ["latin"] });

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
    default: "CV.VERSE — Modern Portfolio & Developer Templates",
    template: "%s | CV.VERSE",
  },
  description:
    "Stop wasting time on boilerplate. Build faster with production-ready developer, security, and agency portfolio templates by Aditya Raj. Built with Next.js, Tailwind CSS, and React.",
  keywords: [
    "portfolio templates",
    "nextjs templates",
    "tailwind templates",
    "cv verse",
    "developer portfolio",
    "ccidcop",
    "syntax overlord",
    "aditya raj",
    "rawenergon",
    "security portfolio",
    "shadcn portfolio",
    "react developer portfolio",
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
      "Stop wasting time on boilerplate. Production-ready developer and security portfolio templates by Aditya Raj.",
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
      "Stop wasting time on boilerplate. Production-ready developer and security portfolio templates by Aditya Raj.",
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
        "Production-ready developer and security portfolio templates built with Next.js, Tailwind CSS, and React.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 transition-colors relative`}
      >
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
