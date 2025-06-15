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
    "CI/CD",
    "Agile Development",
    "ASP.NET Core",
    "Next.js Developer",
    "Software Engineer",
    "Software Developer",
    "Software Architect",
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
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional Full-Stack .NET Developer with 10+ years experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.",
    url: "https://biswajitpanday.github.io",
    siteName: "Biswajit Panday Portfolio",
    images: [
      {
        url: "https://biswajitpanday.github.io/assets/photo.webp",
        width: 1200,
        height: 630,
        alt: "Biswajit Panday - Full-Stack .NET Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional Full-Stack .NET Developer with 10+ years experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.",
    images: ["https://biswajitpanday.github.io/assets/photo.webp"],
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
    google: "google-site-verification-code-here",
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
