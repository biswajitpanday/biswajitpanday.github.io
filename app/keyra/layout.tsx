import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyra — A Local, Offline Password Vault for Windows",
  description:
    "Keyra is a small password vault for Windows, free for personal use. One encrypted file on your own PC (Argon2id + AES-256-GCM), no account, no cloud, no network code. Built with .NET 10 and WPF.",
  keywords: [
    "Keyra",
    "Password Manager",
    "Password Vault",
    "Offline",
    "Windows Desktop App",
    ".NET 10",
    "WPF",
    "Argon2id",
    "AES-256-GCM",
    "Windows Hello",
    "Threat Model",
  ],
  openGraph: {
    title: "Keyra — Your passwords, in one encrypted file on your own PC",
    description:
      "A local, offline password vault for Windows: Argon2id + AES-256-GCM, Windows Hello, safe clipboard, legacy access for your family. No account, no cloud, no tracking.",
    url: "https://biswajitpanday.github.io/keyra",
    images: [
      {
        url: "https://biswajitpanday.github.io/assets/keyra/details-dark.png",
        width: 2030,
        height: 1260,
        alt: "Keyra in dark theme: the item list with a card's details panel open",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyra — A Local, Offline Password Vault for Windows",
    description:
      "One encrypted file on your own PC. No account, no cloud, no network code. Free for personal use.",
    images: ["https://biswajitpanday.github.io/assets/keyra/details-dark.png"],
  },
  alternates: {
    canonical: "https://biswajitpanday.github.io/keyra",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Keyra",
  description:
    "A local, offline password vault for Windows. One encrypted file (Argon2id + AES-256-GCM), no account, no cloud, no network code.",
  applicationCategory: "SecurityApplication",
  applicationSubCategory: "Password Manager",
  operatingSystem: "Windows 10, Windows 11",
  softwareVersion: "1.7.1",
  releaseNotes:
    "https://github.com/biswajitpanday/keyra-releases/blob/main/docs/release-notes.md",
  downloadUrl: "https://github.com/biswajitpanday/keyra-releases/releases/latest",
  installUrl:
    "https://github.com/biswajitpanday/keyra-releases/blob/main/docs/install.md",
  url: "https://biswajitpanday.github.io/keyra",
  image: "https://biswajitpanday.github.io/assets/keyra/details-dark.png",
  screenshot: [
    "https://biswajitpanday.github.io/assets/keyra/details-dark.png",
    "https://biswajitpanday.github.io/assets/keyra/vault-light.png",
    "https://biswajitpanday.github.io/assets/keyra/health-dark.png",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Person",
    name: "Biswajit Panday",
    url: "https://biswajitpanday.github.io",
  },
  license: "https://github.com/biswajitpanday/keyra-releases/blob/main/LICENSE",
};

export default function KeyraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      {children}
    </>
  );
}
