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

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Biswajit Panday - Full-Stack .NET Developer | Portfolio",
    template: "%s | Biswajit Panday"
  },
  description: "Professional portfolio of Biswajit Panday, a skilled Full-Stack .NET Developer with 10+ years experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.",
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
    "Portfolio",
    "Software Development",
    "Web Development",
    "Cloud Solutions",
    "Dhaka Bangladesh",
    "TypeScript",
    "C# Developer",
    "SQL Server",
    "MongoDB",
    "API Development",
    "Microservices",
    "Docker",
    "CI/CD",
    "Agile Development",
    "ASP.NET Core",
    "Next.js Developer",
    "Software Engineer",
    "Software Developer",
    "Software Architect",
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
    title: "Biswajit Panday - Full-Stack .NET Developer & Cloud Solutions Expert",
    description: "Expert Full-Stack .NET Developer with 10+ years experience. Specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS. Microsoft Certified.",
    url: "https://biswajitpanday.github.io",
    siteName: "Biswajit Panday Portfolio",
    images: [
      {
        url: "https://biswajitpanday.github.io/assets/profile/profile-large.webp",
        width: 1200,
        height: 630,
        alt: "Biswajit Panday - Full-Stack .NET Developer & Cloud Solutions Expert",
        type: "image/webp",
      },
      {
        url: "https://biswajitpanday.github.io/assets/profile/profile-medium.webp", 
        width: 800,
        height: 600,
        alt: "Biswajit Panday - Professional Profile",
        type: "image/webp",
      },
      {
        url: "https://biswajitpanday.github.io/assets/photo.webp",
        width: 400,
        height: 400,
        alt: "Biswajit Panday - Profile Photo",
        type: "image/webp",
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
      url: "https://biswajitpanday.github.io/assets/profile/profile-large.webp",
      alt: "Biswajit Panday - Full-Stack .NET Developer",
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
    'og:image:secure_url': 'https://biswajitpanday.github.io/assets/profile/profile-large.webp',
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
        <DebugMode />
      </body>
    </html>
  );
}
