import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PersonSchema, WebSiteSchema, OrganizationSchema } from "@/components/StructuredData";
import RootLayoutClient from "@/components/RootLayoutClient";
import { fetchProjects, fetchCertifications, fetchSkillHierarchy } from "@/lib/api-client";
import type { Project, Certification } from "@/types/api";

interface SkillHierarchyNode {
  name: string;
  metadata?: {
    icon?: string;
    level?: string;
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillHierarchyNode[];
}

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
    template: "%s | Biswajit Panday"
  },
  description: "Senior backend engineer in Berlin, Germany: 11 years in software, a decade of it in C# and .NET, plus TypeScript/Node.js and AI/LLM integration. Co-engineered SpireWiz, an AI upgrade-automation tool that cut upgrade cycles by up to 80% across 25+ enterprise clients, and built DevSpace, a Windows developer-productivity app.",
  keywords: [
    "Biswajit Panday",
    "Senior Backend Engineer",
    "Senior .NET Developer",
    "Node.js Developer",
    "Enterprise Architecture",
    "Microservices Architecture",
    "DevOps Engineer",
    "Microsoft Certified",
    "Legacy System Modernization",
    "AI Integration",
    "C# Developer",
    "React Developer",
    "TypeScript",
    "Full-Stack Developer",
    "Software Architecture",
    "Berlin Germany",
    "Germany",
    "ASP.NET Core",
    "Cloud Solutions",
    "System Modernization",
    "Next.js Developer",
    "API Development",
    "Docker",
    "CI/CD",
  ],
  authors: [{ name: "Biswajit Panday" }],
  creator: "Biswajit Panday",
  publisher: "Biswajit Panday",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://biswajitpanday.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
    description: "Senior backend engineer in Berlin, Germany: 11 years in software, a decade of it in C# and .NET, plus TypeScript/Node.js and AI/LLM integration. Co-engineered SpireWiz, an AI upgrade-automation tool that cut upgrade cycles by up to 80% across 25+ enterprise clients, and built DevSpace, a Windows developer-productivity app.",
    url: "https://biswajitpanday.github.io",
    siteName: "Biswajit Panday Portfolio",
    images: [
      {
        url: "https://biswajitpanday.github.io/assets/social-preview.webp",
        width: 1200,
        height: 630,
        alt: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Germany",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
    description: "Co-engineered SpireWiz (AI upgrade automation, up to 80% shorter upgrade cycles) and built DevSpace. Senior backend engineer, 11 years in software. Microsoft Certified: Azure Fundamentals.",
    images: {
      url: "https://biswajitpanday.github.io/assets/social-preview.webp",
      alt: "Biswajit Panday - Senior Backend Engineer | Full-Stack | AI/LLM Integration",
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "6KDQC-2OeS6NjVA21G1MJ-svIYpHNBhnsWBS0LG85a4",
  },
  category: "technology",
  classification: "Business",
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': 'Biswajit Panday Portfolio',
    'apple-mobile-web-app-title': 'Biswajit Panday',
    'og:image:secure_url': 'https://biswajitpanday.github.io/assets/social-preview.webp',
    'article:author': 'Biswajit Panday',
    'profile:first_name': 'Biswajit',
    'profile:last_name': 'Panday',
    'profile:gender': 'male',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data for GlobalSearch at build time
  let projects: Project[] = [];
  let certifications: Certification[] = [];
  let skillsHierarchy: SkillHierarchyNode[] = [];

  try {
    [projects, certifications, skillsHierarchy] = await Promise.all([
      fetchProjects(),
      fetchCertifications(),
      fetchSkillHierarchy(),
    ]);
  } catch (error) {
    console.error('Failed to fetch layout data:', error);
    // Fallback to empty arrays
    projects = [];
    certifications = [];
    skillsHierarchy = [];
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonSchema />
        <WebSiteSchema />
        <OrganizationSchema />
        <link rel="sitemap" href="/sitemap.xml" />

        {/* Only prefetch critical external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <meta name="theme-color" content="#00ff99" />
        <meta name="msapplication-TileColor" content="#00ff99" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={jetBrainsMono.variable} suppressHydrationWarning>
        <RootLayoutClient
          projects={projects}
          certifications={certifications}
          skillsHierarchy={skillsHierarchy}
        >
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
