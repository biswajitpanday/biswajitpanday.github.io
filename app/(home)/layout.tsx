import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biswajit Panday - Full-Stack .NET Developer",
  description: "Professional portfolio of Biswajit Panday, a skilled Full-Stack .NET Developer with 11+ years experience in building modern web applications and cloud solutions. Based in Cottbus, Germany.",
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
    "Cottbus Germany",
    "Germany"
  ],
  openGraph: {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 11+ years of experience in .NET, React, and cloud technologies",
    url: "https://biswajitpanday.github.io",
  },
  twitter: {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 11+ years of experience in .NET, React, and cloud technologies",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 