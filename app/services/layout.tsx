import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Expertise",
  description: "Comprehensive software development services including web development, mobile apps, desktop applications, and AI solutions by Biswajit Panday.",
  keywords: [
    "Web Development Services",
    "Mobile App Development",
    "Desktop Application Development",
    "AI Development",
    "Full-Stack Development Services",
    ".NET Services",
    "React Development Services",
    "Software Engineering",
    "Development Consultation"
  ],
  openGraph: {
    title: "Services & Expertise | Biswajit Panday",
    description: "Professional software development services including web, mobile, desktop applications and AI solutions",
    url: "https://biswajitpanday.github.io/services",
  },
  twitter: {
    title: "Services & Expertise | Biswajit Panday",
    description: "Professional software development services including web, mobile, desktop applications and AI solutions",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 