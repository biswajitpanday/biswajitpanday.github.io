import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biswajit Panday - Portfolio",
  description: "Senior .NET Developer | Cloud & Microservices",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className="container mt-4">{children}</main>
        <footer className="bg-dark text-light text-center p-3 mt-5">
          {/* <p>&copy; {new Date().getFullYear()} Biswajit Panday. All Rights Reserved.</p> */}
        </footer>
      </body>
    </html>
  );
}
