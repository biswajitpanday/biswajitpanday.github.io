import type { Metadata } from "next";
// import { JetBrains_Mono, M_PLUS_Code_Latin  } from "next/font/google";
import { JetBrains_Mono  } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

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
  description: "Professional portfolio of Biswajit Panday, a skilled Full-Stack .NET Developer with 9+ years experience specializing in scalable applications, cloud solutions with React, Azure & AWS.",
  keywords: [
    "Biswajit Panday",
    "Full-Stack Developer", 
    ".NET Developer",
    "React Developer",
    "Azure Developer",
    "AWS Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Portfolio",
    "Dhaka Bangladesh"
  ],
  authors: [{ name: "Biswajit Panday" }],
  creator: "Biswajit Panday",
  openGraph: {
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 9+ years of experience in .NET, React, and cloud technologies",
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
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biswajit Panday - Full-Stack .NET Developer",
    description: "Professional portfolio showcasing 9+ years of experience in .NET, React, and cloud technologies",
    images: ["https://biswajitpanday.github.io/assets/photo.png"],
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
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetBrainsMono.variable}>
        <Header />
        {/* <StairTransition /> */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
