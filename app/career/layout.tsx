import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Journey - Professional Experience",
  description: "Discover Biswajit Panday's professional journey spanning 9+ years in software development, featuring roles at leading companies and career milestones in .NET and cloud technologies.",
  keywords: [
    "career",
    "professional experience",
    "software engineer",
    "career timeline",
    ".NET developer",
    "professional journey",
    "work experience",
    "career progression"
  ],
  openGraph: {
    title: "Career Journey - Biswajit Panday's Professional Experience",
    description: "Discover 9+ years of professional journey in software development, featuring roles at leading companies",
    url: "https://biswajitpanday.github.io/career",
  },
  twitter: {
    title: "Career Journey - Biswajit Panday's Professional Experience",
    description: "Discover 9+ years of professional journey in software development, featuring roles at leading companies",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 