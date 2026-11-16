# CV.VERSE ⚡

A modern, high-performance catalog of developer portfolios and templates built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.

100% Free & Open Source on GitHub.

---

## 🚀 Features

- 🎨 **Minimal & Fast UI**: Clean aesthetic, dark mode support, and responsive grid layouts.
- 📂 **Curated Developer Portfolios**: Featuring real production portfolios with live demos and direct source code repositories.
- ⚡ **Zero Bloat**: Fast build times, statically pre-rendered pages, sub-second transitions.
- 🔍 **Command Palette (`Ctrl+K` / `⌘K`)**: Instant search across templates, frameworks, and stacks.
- 📱 **Fully Responsive**: Tailored from mobile screens to desktop viewports.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

---

## 💻 Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:

```bash
npm run build
npm start
```

---

## 🤝 How to Contribute

We welcome contributions from developers, designers, and open-source enthusiasts! Whether you want to add your own developer portfolio template, improve existing features, or fix a bug, here is how you can contribute:

### 1. Add Your Portfolio Template

To showcase your open-source portfolio on CV.VERSE:

1. **Fork the Repository**:
   Click the **Fork** button at the top right of this repository to create your own copy.

2. **Clone your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-verse.git
   cd portfolio-verse
   ```

3. **Create a New Branch**:
   ```bash
   git checkout -b add-portfolio/your-portfolio-name
   ```

4. **Add Your Template Data**:
   Open `lib/templates-data.ts` and add your portfolio object to `TEMPLATES_DATA`:
   ```typescript
   {
     id: "your-slug",
     title: "Your Portfolio Name",
     slug: "your-slug",
     description: "A concise 1-2 sentence description of your portfolio.",
     longDescription: "Detailed breakdown of features, architecture, and design.",
     subCategory: "Developer & Terminal", // or Agency, Minimalist, etc.
     price: 0,
     originalPrice: 0,
     isFree: true,
     isNew: true,
     demoUrl: "https://your-live-portfolio.com",
     githubUrl: "https://github.com/your-username/your-repo",
     imageUrl: "https://your-portfolio.com/preview.png", // or leave empty for auto-generated preview
     techStack: [
       { name: "Next.js", badge: "Next.js" },
       { name: "TypeScript", badge: "TS" },
       { name: "TailwindCSS", badge: "Tailwind" },
     ],
     features: [
       "Fully Responsive Layout",
       "Dark Mode Support",
       "Clean Component Architecture",
     ]
   }
   ```

5. **Test Your Changes**:
   ```bash
   npm run build
   ```
   Ensure the build passes with 0 errors and test locally with `npm run dev`.

6. **Submit a Pull Request (PR)**:
   - Push your branch to GitHub: `git push origin add-portfolio/your-portfolio-name`
   - Open a Pull Request against the `master` branch.
   - Include a link to your live portfolio and repository in the PR description.

---

### 2. Submission Guidelines

- **Open Source**: The portfolio template source code must be public on GitHub.
- **Tech Stack**: Built with modern web technologies (Next.js, React, Tailwind CSS, TypeScript, etc.).
- **Live Deployment**: Must have a working live URL (Vercel, Netlify, GitHub Pages, or custom domain).
- **Code Quality**: Clean code, descriptive component names, and responsive design.

---

### 3. Reporting Issues & Feedback

If you find a bug or have an idea for improvement:
- Open an issue on GitHub describing the bug or feature request.
- Or email directly at: `devadibxr@gmail.com`

---

## 💖 Support & Sponsoring

If you find CV.VERSE helpful, consider sponsoring the project:
- [Sponsor via Razorpay](https://rzp.io/rzp/eTtCTKo)

---

## 📄 License

This project is licensed under the MIT License — feel free to customize and use it for your own projects.
