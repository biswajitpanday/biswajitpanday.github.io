import type { Metadata } from "next";
// import { JetBrains_Mono, M_PLUS_Code_Latin  } from "next/font/google";
import { JetBrains_Mono  } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { PersonSchema, WebSiteSchema, OrganizationSchema } from "@/components/StructuredData";
import DebugMode from "@/components/DebugMode";
import SEOOptimizer from "@/components/SEOOptimizer";
import WebVitalsTracker from "@/components/WebVitalsTracker";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

// const mPlusCodeLatin = M_PLUS_Code_Latin({
//   variable: "--font-jetbrains-mono",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

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
    "Kubernetes",
    "CI/CD",
    "Agile Development"
  ],
  authors: [{ name: "Biswajit Panday" }],
  creator: "Biswajit Panday",
  publisher: "Biswajit Panday",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://biswajitpanday.github.io"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 10+ years of experience in .NET, React, and cloud technologies with professional certifications.",
    url: "https://biswajitpanday.github.io",
    siteName: "Biswajit Panday Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://biswajitpanday.github.io/assets/photo.png",
        width: 400,
        height: 400,
        alt: "Biswajit Panday - Full-Stack .NET Developer",
      },
      {
        url: "https://biswajitpanday.github.io/assets/profile/profile-large.png",
        width: 600,
        height: 600,
        alt: "Biswajit Panday - Professional Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 10+ years of experience in .NET, React, and cloud technologies with certifications.",
    images: ["https://biswajitpanday.github.io/assets/photo.png"],
    creator: "@biswajitpanday",
    site: "@biswajitpanday",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "6KDQC-2OeS6NjVA21G1MJ-svIYpHNBhnsWBS0LG85a4", // Get this from Google Search Console after adding your site
  },
  category: "technology",
  classification: "Business",
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': 'Biswajit Panday Portfolio',
    'apple-mobile-web-app-title': 'Biswajit Panday',
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
        <link rel="sitemap" href="/sitemap-index.xml" />
        <link rel="preload" href="/assets/photo.png" as="image" />
        <link rel="preload" href="/assets/profile/profile-large.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#00ff99" />
        <meta name="msapplication-TileColor" content="#00ff99" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={jetBrainsMono.variable}>
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
