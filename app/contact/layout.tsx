import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Get In Touch",
  description: "Contact Biswajit Panday for collaboration, project inquiries, or professional opportunities. Based in Dhaka, Bangladesh. Available for remote work worldwide.",
  keywords: [
    "contact",
    "hire developer",
    "collaboration",
    "project inquiry",
    "freelance developer",
    "remote work",
    "Dhaka Bangladesh",
    "software development services"
  ],
  openGraph: {
    title: "Contact - Get In Touch with Biswajit Panday",
    description: "Contact for collaboration, project inquiries, or professional opportunities. Available for remote work worldwide.",
    url: "https://biswajitpanday.github.io/contact",
  },
  twitter: {
    title: "Contact - Get In Touch with Biswajit Panday",
    description: "Contact for collaboration, project inquiries, or professional opportunities. Available for remote work worldwide.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 