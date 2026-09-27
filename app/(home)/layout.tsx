import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
  description: "Professional portfolio of Biswajit Panday, a senior backend engineer (C#/.NET, TypeScript/Node.js, AI/LLM integration) with 11 years in software. Based in Berlin, Germany.",
  keywords: [
    "Biswajit Panday",
    "Full-Stack Developer", 
    ".NET Developer",
    "React Developer",
    "Azure Developer",
    "AWS Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Microsoft Certified",
    "Azure Certification",
    "Projects",
    "Software Development",
    "Web Development",
    "Cloud Solutions",
    "Berlin Germany",
    "Germany"
  ],
  openGraph: {
    title: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
    description: "Senior backend engineer: C#/.NET, TypeScript/Node.js and AI/LLM integration. 11 years in software; based in Berlin, Germany.",
    url: "https://biswajitpanday.github.io",
  },
  twitter: {
    title: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
    description: "Senior backend engineer: C#/.NET, TypeScript/Node.js and AI/LLM integration. 11 years in software; based in Berlin, Germany.",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 