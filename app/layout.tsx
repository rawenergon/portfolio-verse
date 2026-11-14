import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/noise-overlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV.VERSE — Modern Portfolio Templates",
  description: "Stop wasting time on boilerplate. Build faster with production-ready developer, security, and agency portfolio templates built with Next.js, Tailwind CSS, and React.",
  keywords: ["portfolio templates", "nextjs templates", "tailwind templates", "cv verse", "developer portfolio", "ccidcop"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CV.VERSE — Modern Portfolio Templates",
    description: "Stop wasting time on boilerplate. Build faster with production-ready portfolio templates.",
    url: "https://portfolio-verse-bice.vercel.app",
    siteName: "CV.VERSE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 transition-colors relative`}>
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
