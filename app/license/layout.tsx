import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial License & Rights",
  description: "CV.VERSE commercial license agreement. Understand your rights for personal, client, and commercial deployments of CCIDCOP and Syntax Overlord templates.",
  alternates: {
    canonical: "/license",
  },
  openGraph: {
    title: "Commercial License & Rights | CV.VERSE",
    description: "CV.VERSE commercial license agreement for personal, client, and commercial deployments.",
    url: "https://portfolio-verse-bice.vercel.app/license",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial License & Rights | CV.VERSE",
    description: "CV.VERSE commercial license agreement.",
  },
};

export default function LicenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
