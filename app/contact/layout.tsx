import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Aditya Raj",
  description: "Get in touch with Aditya Raj (@rawenergon) for portfolio design, full-stack systems engineering, and open-source template support. Direct email: devadibxr@gmail.com and Instagram: @adibxr.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Aditya Raj | CV.VERSE",
    description: "Get in touch with Aditya Raj (@rawenergon) for portfolio design, full-stack systems engineering, and open-source template support.",
    url: "https://portfolio-verse-bice.vercel.app/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aditya Raj | CV.VERSE",
    description: "Connect with Aditya Raj for developer portfolio builds and open-source template support.",
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
