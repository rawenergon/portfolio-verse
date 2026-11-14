import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEMPLATES_DATA } from "@/lib/templates-data";
import { TemplateDetailView } from "@/components/template-detail-view";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return TEMPLATES_DATA.map((template) => ({
    slug: template.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const template = TEMPLATES_DATA.find((t) => t.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-verse-bice.vercel.app";

  if (!template) {
    return {
      title: "Template Not Found | CV.VERSE",
      description: "The requested template does not exist in the catalog.",
    };
  }

  const title = `${template.title} — ${template.subCategory} Template`;
  const description = `${template.description} Production-ready Next.js portfolio template by Aditya Raj.`;
  const pageUrl = `${baseUrl}/templates/${template.slug}`;

  return {
    title,
    description,
    keywords: [
      template.title,
      template.slug,
      template.subCategory,
      "portfolio template",
      "nextjs template",
      "tailwind template",
      "aditya raj",
      "rawenergon",
      ...template.techStack.map((ts) => ts.name),
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | CV.VERSE`,
      description,
      url: pageUrl,
      type: "article",
      siteName: "CV.VERSE",
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 800,
          height: 800,
          alt: `${template.title} Template Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CV.VERSE`,
      description,
      creator: "@adibxr",
      images: [`${baseUrl}/logo.png`],
    },
  };
}

export default function TemplateDetailPage({ params }: PageProps) {
  const template = TEMPLATES_DATA.find((t) => t.slug === params.slug);

  if (!template) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-verse-bice.vercel.app";
  const pageUrl = `${baseUrl}/templates/${template.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Product", "SoftwareApplication"],
        "@id": `${pageUrl}#product`,
        name: template.title,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web, Node.js, Next.js",
        description: template.description,
        image: `${baseUrl}/logo.png`,
        brand: {
          "@type": "Brand",
          name: "CV.VERSE",
        },
        author: {
          "@type": "Person",
          name: "Aditya Raj",
          alternateName: "rawenergon",
          url: "https://ccidcop.in",
          sameAs: ["https://github.com/rawenergon", "https://x.com/adibxr"],
        },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          price: template.price,
          priceCurrency: template.currency || "INR",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2027-12-31",
          seller: {
            "@type": "Person",
            name: "Aditya Raj",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: template.rating.toFixed(2),
          reviewCount: template.salesCount.toString(),
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Templates",
            item: `${baseUrl}/#templates`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: template.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TemplateDetailView template={template} />
    </>
  );
}
