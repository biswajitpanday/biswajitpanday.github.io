import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Projects & Work Showcase",
  description: "Explore Biswajit Panday's portfolio featuring innovative full-stack projects, .NET applications, React apps, and cloud solutions. View live projects and source code.",
  keywords: [
    "portfolio",
    "projects",
    "full-stack development",
    ".NET projects",
    "React applications",
    "cloud solutions",
    "open source",
    "software development"
  ],
  openGraph: {
    title: "Portfolio - Biswajit Panday's Projects & Work",
    description: "Explore innovative full-stack projects, .NET applications, React apps, and cloud solutions",
    url: "https://biswajitpanday.github.io/portfolio",
  },
  twitter: {
    title: "Portfolio - Biswajit Panday's Projects & Work",
    description: "Explore innovative full-stack projects, .NET applications, React apps, and cloud solutions",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 