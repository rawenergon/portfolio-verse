import JSZip from "jszip";
import { TemplateItem } from "./templates-data";

export async function generateTemplateZip(
  template: TemplateItem,
  licenseType: "single" | "unlimited" = "single"
): Promise<Blob> {
  const zip = new JSZip();

  // 1. package.json
  const packageJson = {
    name: `${template.slug}-portfolio`,
    version: "1.0.0",
    private: true,
    description: template.description,
    scripts: {
      dev: "next dev -p 3000",
      build: "next build",
      start: "next start -p 3000",
      lint: "next lint",
    },
    dependencies: {
      clsx: "^2.1.1",
      "framer-motion": "^11.11.9",
      "lucide-react": "^0.453.0",
      next: "14.2.15",
      react: "^18.3.1",
      "react-dom": "^18.3.1",
      "tailwind-merge": "^2.5.4",
    },
    devDependencies: {
      "@types/node": "^20.17.6",
      "@types/react": "^18.3.12",
      "@types/react-dom": "^18.3.1",
      autoprefixer: "^10.4.20",
      postcss: "^8.4.47",
      tailwindcss: "^3.4.14",
      typescript: "^5.6.3",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 2. README.md
  const readmeMd = `# ${template.title} — Portfolio Template

> ${template.description}

Licensed under **${
    licenseType === "unlimited"
      ? "Unlimited Commercial / Agency License"
      : "Personal / Single Project License"
  }**.

---

## 🚀 Quickstart

1. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   \`\`\`

2. **Run local development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) to view your site.

3. **Build for production:**
   \`\`\`bash
   npm run build
   npm run start
   \`\`\`

---

## 📦 What's Included

- **Category:** ${template.category} (${template.subCategory})
- **Framework:** Next.js 14 (App Router) + React 18
- **Styling:** Tailwind CSS + Lucide Icons + Framer Motion
- **TypeScript:** Strict type-safe setup out of the box

### ✨ Key Features
${template.features.map((f) => `- ${f}`).join("\n")}

### 📄 Included Pages & Views
${template.pages.map((p) => `- ${p}`).join("\n")}

### 🛠️ Tech Stack
${template.techStack.map((t) => `- **${t.name}** (\`${t.badge}\`)`).join("\n")}

---

## 📁 Project Structure

\`\`\`
├── app/
│   ├── globals.css      # Tailwind directives & theme styles
│   ├── layout.tsx       # Root layout with responsive viewport & metadata
│   └── page.tsx         # Main portfolio landing page
├── components/
│   ├── hero.tsx         # Showcase hero section
│   ├── features.tsx     # Feature grid & tech stack badges
│   ├── contact.tsx      # Contact & inquiry form component
│   └── footer.tsx       # Standard portfolio footer
├── lib/
│   └── utils.ts         # Classnames merge utility (clsx + twMerge)
├── tailwind.config.ts   # Custom theme accents and typography
├── next.config.mjs      # Next.js build configuration
└── package.json         # Scripts and project dependencies
\`\`\`

---

## 🚢 Deployment

### Deploy to Vercel
The fastest way to deploy is with [Vercel](https://vercel.com):
1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. Next.js is detected automatically with optimal zero-config presets.

---

Crafted with precision from **Portfolio Verse**.
`;
  zip.file("README.md", readmeMd);

  // 3. tsconfig.json
  const tsconfig = {
    compilerOptions: {
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [
        {
          name: "next",
        },
      ],
      paths: {
        "@/*": ["./*"],
      },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  };
  zip.file("tsconfig.json", JSON.stringify(tsconfig, null, 2));

  // 4. next.config.mjs
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`;
  zip.file("next.config.mjs", nextConfig);

  // 5. tailwind.config.ts
  const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "${template.previewAccent || "#f97316"}",
      },
    },
  },
  plugins: [],
};
export default config;
`;
  zip.file("tailwind.config.ts", tailwindConfig);

  // 6. postcss.config.js
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
  zip.file("postcss.config.js", postcssConfig);

  // 7. .gitignore
  const gitignore = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# typescript
*.tsbuildinfo
next-env.d.ts
`;
  zip.file(".gitignore", gitignore);

  // 8. lib/utils.ts
  const libUtils = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
  zip.file("lib/utils.ts", libUtils);

  // 9. app/globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 24, 24, 27;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 250, 250, 250;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 244, 244, 245;
    --background-start-rgb: 9, 9, 11;
    --background-end-rgb: 18, 18, 20;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-start-rgb));
  min-height: 100vh;
}
`;
  zip.file("app/globals.css", globalsCss);

  // 10. app/layout.tsx
  const appLayout = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${template.title} — Portfolio",
  description: "${template.description.replace(/"/g, '\\"')}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-[#f95300] selection:text-white">
        {children}
      </body>
    </html>
  );
}
`;
  zip.file("app/layout.tsx", appLayout);

  // 11. components/hero.tsx
  const compHero = `"use client";

import React from "react";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 px-6 md:px-12 text-center max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 mb-6">
        <Sparkles className="h-3.5 w-3.5" />
        <span>${template.category} • ${template.subCategory}</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
        ${template.title}
      </h1>

      <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
        ${template.description.replace(/"/g, '\\"')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-xl bg-[#f95300] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-[#ff6a1a] transition"
        >
          <span>Get In Touch</span>
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#features"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
        >
          <Terminal className="h-4 w-4 text-orange-400" />
          <span>Explore Features</span>
        </a>
      </div>
    </section>
  );
}
`;
  zip.file("components/hero.tsx", compHero);

  // 12. components/features.tsx
  const compFeatures = `import React from "react";
import { CheckCircle2 } from "lucide-react";

const features = ${JSON.stringify(template.features, null, 2)};
const techStack = ${JSON.stringify(template.techStack, null, 2)};

export function Features() {
  return (
    <section id="features" className="py-20 px-6 max-w-5xl mx-auto border-t border-zinc-800/80">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Key Features</h2>
        <p className="text-sm text-zinc-400">Everything designed for production velocity and modern design standards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-zinc-300 mb-4">Tech Stack & Tooling</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {techStack.map((tech: { name: string; badge: string }, idx: number) => (
            <span key={idx} className="px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-mono text-zinc-300">
              {tech.name} ({tech.badge})
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
  zip.file("components/features.tsx", compFeatures);

  // 13. components/contact.tsx
  const compContact = `"use client";

import React, { useState } from "react";
import { Send, Check } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 px-6 max-w-xl mx-auto border-t border-zinc-800/80 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Ready to work together?</h2>
      <p className="text-sm text-zinc-400 mb-8">Drop your message or project inquiry below.</p>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2">
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">Message sent successfully! We'll reply within 24h.</span>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4 text-left"
        >
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="Alex Rivers"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your project or inquiry..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f95300] py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-[#ff6a1a] transition"
          >
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </section>
  );
}
`;
  zip.file("components/contact.tsx", compContact);

  // 14. components/footer.tsx
  const compFooter = `import React from "react";

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-zinc-800/80 text-center text-xs text-zinc-500">
      <p>© {new Date().getFullYear()} ${template.title}. All rights reserved.</p>
      <p className="mt-1 text-zinc-600">Built with Next.js 14, Tailwind CSS & Framer Motion.</p>
    </footer>
  );
}
`;
  zip.file("components/footer.tsx", compFooter);

  // 15. app/page.tsx
  const appPage = `import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-white">
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}
`;
  zip.file("app/page.tsx", appPage);

  // Generate the zip blob
  return await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  if (typeof window === "undefined") return;

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}

export async function downloadTemplateBundle(
  template: TemplateItem,
  licenseType: "single" | "unlimited" = "single"
): Promise<void> {
  const blob = await generateTemplateZip(template, licenseType);
  downloadBlob(blob, `${template.slug}-template-v1.0.zip`);
}
