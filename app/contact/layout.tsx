import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Aditya Raj",
  description: "Get in touch with Aditya Raj (@rawenergon) for custom portfolio design, full-stack systems engineering, or 1:1 strategy calls (₹100). Direct phone, WhatsApp, and email options available.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Aditya Raj | CV.VERSE",
    description: "Get in touch with Aditya Raj (@rawenergon) for custom portfolio design, full-stack systems engineering, or 1:1 strategy calls.",
    url: "https://portfolio-verse-bice.vercel.app/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aditya Raj | CV.VERSE",
    description: "Connect with Aditya Raj for custom portfolio builds or 1:1 consultation calls.",
    creator: "@adibxr",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
