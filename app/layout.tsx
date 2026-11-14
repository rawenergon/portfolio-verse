import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio verse — Modern Portfolio & SaaS Templates",
  description: "Stop wasting time on boilerplate. Build faster with production-ready SaaS, portfolio, and agency templates built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: ["portfolio templates", "nextjs templates", "tailwind templates", "ui layouts", "framer motion templates", "react portfolio"],
  openGraph: {
    title: "Portfolio verse — Modern Portfolio & SaaS Templates",
    description: "Stop wasting time on boilerplate. Build faster with production-ready SaaS, portfolio, and agency templates.",
    url: "https://portfolio-verse.vercel.app",
    siteName: "Portfolio verse",
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
      <body className={`${inter.className} min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 transition-colors`}>
        {children}
      </body>
    </html>
  );
}
