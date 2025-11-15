import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { PersonSchema, WebSiteSchema, OrganizationSchema } from "@/components/StructuredData";
import DebugMode from "@/components/DebugMode";
import SEOOptimizer from "@/components/SEOOptimizer";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AIChatbot from "@/components/AIChatbot";
import ResumeAnalyticsLoader from "@/components/ResumeAnalyticsLoader";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Biswajit Panday - Senior .NET Architect & AI Solutions Engineer",
    template: "%s | Biswajit Panday"
  },
  description: "Senior full-stack developer with 10+ years specializing in .NET, React, and cloud solutions (Azure/AWS). Built scalable enterprise applications and developed IntelliMerge, an AI tool achieving 80-90% efficiency gains.",
  keywords: [
    "Biswajit Panday",
    ".NET Architect",
    "Senior .NET Developer",
    "AI Solutions Engineer",
    "Enterprise Architecture",
    "Cloud Migration Expert",
    "Microservices Architecture",
    "Azure Architect",
    "AWS Solutions Architect",
    "DevOps Engineer",
    "Microsoft Certified",
    "Legacy System Modernization",
    "AI Integration",
    "Fortune 500 Experience",
    "C# Expert",
    "React Developer",
    "TypeScript",
    "Full-Stack Developer",
    "Software Architecture",
    "Dhaka Bangladesh",
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
    title: "Biswajit Panday - Senior .NET Architect & AI Solutions Engineer",
    description: "Senior full-stack developer with 10+ years specializing in .NET, React, and cloud solutions. Built IntelliMerge, an AI tool achieving 80-90% efficiency gains for development teams at Optimizely. Microsoft Certified.",
    url: "https://biswajitpanday.github.io",
    siteName: "Biswajit Panday Portfolio",
    images: [
      {
        url: "https://biswajitpanday.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Biswajit Panday - Full-Stack .NET Developer & Cloud Solutions Expert",
        type: "image/png",
      },
      {
        url: "https://biswajitpanday.github.io/assets/profile/profile-large.png",
        width: 1200,
        height: 630,
        alt: "Biswajit Panday - Professional Profile",
        type: "image/png",
      },
      {
        url: "https://biswajitpanday.github.io/assets/profile/profile-medium.png",
        width: 800,
        height: 600,
        alt: "Biswajit Panday - Professional Profile",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Bangladesh",
  },
  twitter: {
    card: "summary_large_image",
    site: "@biswajitpanday",
    creator: "@biswajitpanday",
    title: "Biswajit Panday - Full-Stack .NET Developer & Cloud Expert",
    description: "🚀 Expert Full-Stack .NET Developer | 10+ years experience | .NET, React, Azure, AWS | Microsoft Certified | Building scalable cloud solutions",
    images: {
      url: "https://biswajitpanday.github.io/twitter-image.png",
      alt: "Biswajit Panday - Full-Stack .NET Developer",
      width: 1200,
      height: 600,
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
    'og:image:secure_url': 'https://biswajitpanday.github.io/og-image.png',
    'article:author': 'Biswajit Panday',
    'profile:first_name': 'Biswajit',
    'profile:last_name': 'Panday',
    'profile:gender': 'male',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonSchema />
        <WebSiteSchema />
        <OrganizationSchema />
        <link rel="sitemap" href="/sitemap.xml" />
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
      <body className={jetBrainsMono.variable}>
        <GoogleAnalytics />
        <Header />
        {/* <StairTransition /> */}
        <PageTransition>{children}</PageTransition>
        <SEOOptimizer />
        <WebVitalsTracker />
        <ResumeAnalyticsLoader />
        <DebugMode />
        <AIChatbot />
      </body>
    </html>
  );
}
