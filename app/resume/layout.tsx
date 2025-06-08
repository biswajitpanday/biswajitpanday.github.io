import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Resume",
  description: "Comprehensive resume of Biswajit Panday showcasing 10+ years of software development experience, technical skills, work history, education, and certifications.",
  keywords: [
    "Resume",
    "Professional Experience", 
    "Software Engineer CV",
    "Technical Skills",
    "Work History",
    "Education Background",
    "Career Timeline",
    "Developer Experience",
    ".NET Developer Resume",
    "Full-Stack Resume"
  ],
  openGraph: {
    title: "Professional Resume | Biswajit Panday",
    description: "Comprehensive overview of 10+ years experience in software development, skills, and career achievements",
    url: "https://biswajitpanday.github.io/resume",
  },
  twitter: {
    title: "Professional Resume | Biswajit Panday",
    description: "Comprehensive overview of 10+ years experience in software development, skills, and career achievements",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 