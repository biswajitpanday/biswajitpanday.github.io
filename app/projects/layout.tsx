import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Work Showcase",
  description: "Explore Biswajit Panday's projects featuring innovative full-stack solutions, .NET applications, React apps, and cloud implementations. View live projects and source code.",
  keywords: [
    "projects",
    "portfolio",
    "full-stack development",
    ".NET projects",
    "React applications",
    "cloud solutions",
    "open source",
    "software development"
  ],
  openGraph: {
    title: "Projects - Biswajit Panday's Work Showcase",
    description: "Explore innovative full-stack projects, .NET applications, React apps, and cloud solutions",
    url: "https://biswajitpanday.github.io/projects",
  },
  twitter: {
    title: "Projects - Biswajit Panday's Work Showcase",
    description: "Explore innovative full-stack projects, .NET applications, React apps, and cloud solutions",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 