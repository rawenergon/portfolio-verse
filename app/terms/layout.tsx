import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for purchasing, downloading, and licensing production-ready portfolio and SaaS templates on CV.VERSE.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | CV.VERSE",
    description: "Terms and conditions for purchasing, downloading, and licensing production-ready portfolio and SaaS templates on CV.VERSE.",
    url: "https://portfolio-verse-bice.vercel.app/terms",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CV.VERSE",
    description: "Terms and conditions for CV.VERSE portfolio templates.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
