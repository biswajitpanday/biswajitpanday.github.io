import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biswajit Panday - Full-Stack .NET Developer",
  description: "Professional portfolio of Biswajit Panday, a skilled Full-Stack .NET Developer with 10+ years experience in building modern web applications and cloud solutions.",
  keywords: [
    "Biswajit Panday",
    "Full-Stack Developer", 
    ".NET Developer",
    "React Developer",
    "Software Engineer",
    "Portfolio",
    "Home",
    "Dhaka Bangladesh"
  ],
  openGraph: {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 10+ years of experience in .NET, React, and cloud technologies",
    url: "https://biswajitpanday.github.io",
  },
  twitter: {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 10+ years of experience in .NET, React, and cloud technologies",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 