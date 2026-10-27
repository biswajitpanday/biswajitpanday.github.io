"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Badge from "@/components/Badge";
import BackgroundElements from "@/components/BackgroundElements";
import {
  FaDownload,
  FaGithub,
  FaLock,
  FaEye,
  FaCopy,
  FaClock,
  FaUsers,
  FaHistory,
  FaSearch,
  FaRobot,
  FaServer,
  FaChartLine,
  FaCheckCircle,
  FaProjectDiagram,
  FaExclamationTriangle,
  FaStar,
  FiArrowRight,
  FiKey,
  FiZap,
  MdSecurity,
  SiDotnet,
  SiCsharp,
} from "@/lib/icons";

const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
  loading: () => (
    <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
      <div className="text-white/40 text-sm">Loading diagram…</div>
    </div>
  ),
  ssr: false,
});

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-white/60 text-sm">Loading image viewer…</div>
    </div>
  ),
});

const importLightboxStyles = () => {
  if (typeof window !== "undefined") {
    import("yet-another-react-lightbox/styles.css");
  }
};

const SAVE_DIAGRAM = `graph TB
    PW(["🔑 Master password"])
    KDF["Argon2id<br/>256 MiB · 8 passes<br/>random salt"]
    KEY["256-bit key<br/>(memory only)"]
    DATA["Your items<br/>(memory only)"]
    GCM["AES-256-GCM<br/>new nonce per save<br/>header = associated data"]
    FILE[("vault.keyra<br/>header + sealed data")]
    PW --> KDF --> KEY --> GCM
    DATA --> GCM
    GCM -->|"temp file → flush → rename"| FILE`;

const REPO_URL = "https://github.com/biswajitpanday/keyra-releases";
const DOWNLOAD_URL = `${REPO_URL}/releases/latest`;
const DOCS_URL = `${REPO_URL}/blob/main/docs`;
const SECURITY_POLICY_URL = `${REPO_URL}/blob/main/SECURITY.md`;
const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

const PROBLEMS = [
  "Cloud password managers ask you to trust their servers with everything you own",
  "Passwords, card numbers and ID details end up in notes, browsers and spreadsheets",
  "If something happens to you, your family has no safe way into your accounts",
];

type Feature = {
  image?: string;
  alt?: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    image: "/assets/keyra/vault-light.png",
    alt: "Item list in light theme with types, categories, favourites and protected items",
    title: "More than passwords",
    body:
      "Logins, cards, bank accounts, secure notes and identities, all in one encrypted vault. A sidebar with types, your own categories and favourites. Rows show a short summary like \"Visa ···· 1111 · exp 08/28\"; never more than the last 4 digits.",
    icon: <FiKey className="text-pink-400" aria-hidden="true" />,
  },
  {
    image: "/assets/keyra/details-dark.png",
    alt: "Details panel of a card in dark theme, with every secret masked",
    title: "Hidden until you ask",
    body:
      "Passwords, card numbers, CVVs, PINs, IBANs and ID numbers are masked by default. A shown value hides again after 20 seconds, when you pick another item, when the window loses focus, or when the vault locks.",
    icon: <FaEye className="text-purple-400" aria-hidden="true" />,
  },
  {
    image: "/assets/keyra/health-dark.png",
    alt: "Password health panel in dark theme: an expiring passport",
    title: "A health check for your vault",
    body:
      "Finds reused, weak and old passwords, and cards, passports, ID cards and driver licences that expire soon. Problems first, each with a tip on how to fix it. It never shows a password or a number.",
    icon: <FaChartLine className="text-emerald-400" aria-hidden="true" />,
  },
  {
    image: "/assets/keyra/settings-light.png",
    alt: "Settings in light theme: Windows Hello unlock, auto-lock, clear clipboard and lock options",
    title: "Locks itself, cleans up after itself",
    body:
      "Locks after 5 minutes idle, on minimize, when Windows locks, on sleep and on exit. Copied values stay out of Windows clipboard history and cloud clipboard, and are cleared after 30 seconds. Both are yours to change.",
    icon: <FaClock className="text-yellow-500" aria-hidden="true" />,
  },
  {
    image: "/assets/keyra/import-2-dark.png",
    alt: "CSV import preview in dark theme: 9 new items, 1 already in Keyra, 1 not usable",
    title: "Import from where you are",
    body:
      "CSV exports from Chrome, Edge, Firefox, Bitwarden, KeePass, KeePassXC, LastPass and Proton Pass. Keyra shows how to export from the app you pick, previews what will be added (never a password), then deletes the plaintext CSV.",
    icon: <FaSearch className="text-cyan-400" aria-hidden="true" />,
  },
  {
    image: "/assets/keyra/trash-dark.png",
    alt: "Trash view in dark theme with one deleted item and its delete date",
    title: "Nothing lost by accident",
    body:
      "Deleted items wait in Trash for 30 days, where you can restore them. Each login also keeps its last 5 passwords, with show, copy and restore.",
    icon: <FaCopy className="text-pink-400" aria-hidden="true" />,
  },
  {
    title: "Windows Hello, if you want it",
    body:
      "Off by default. Turn it on and Windows Hello unlocks Keyra while it runs; the master password is still needed after every start and at least every 14 days. Chosen items ask for Windows Hello again before a secret is shown, copied or changed.",
    icon: <MdSecurity className="text-cyan-400" aria-hidden="true" />,
  },
  {
    title: "Invisible to screen sharing",
    body:
      "Keyra's windows are left out of screenshots, recordings and screen sharing. On by default, and always on while locked. Optionally blur the list rows you are not pointing at.",
    icon: <FaLock className="text-emerald-400" aria-hidden="true" />,
  },
  {
    title: "Backups you can trust",
    body:
      "Backups are the encrypted file only; there is no plaintext export. Keyra reminds you after 30 days without a backup. A restore keeps a copy of the current vault first.",
    icon: <FaHistory className="text-purple-400" aria-hidden="true" />,
  },
  {
    title: "Legacy access for your family",
    body:
      "Keyra makes three shares for the people you trust. Any two of them open a read-only snapshot of the items you choose; one share alone opens nothing. Built from standard parts (HKDF and AES-GCM), no home-made math.",
    icon: <FaUsers className="text-pink-400" aria-hidden="true" />,
  },
];

const METRICS = [
  {
    value: "256 MiB",
    label: "Per password guess",
    sub: "Argon2id makes every guess slow and memory-hungry",
    color: "purple",
  },
  {
    value: "0",
    label: "Network calls",
    sub: "No telemetry, no update check, no cloud",
    color: "emerald",
  },
  {
    value: "26",
    label: "Written threats",
    sub: "Each one with what Keyra does, and what it can't",
    color: "cyan",
  },
  {
    value: "2 of 3",
    label: "Legacy shares",
    sub: "Your family gets a read-only way in, without your password",
    color: "pink",
  },
] as const;

const LIMITS = [
  "Windows only, one user, one vault. No sync and no browser autofill.",
  "Nobody can recover a forgotten master password, not even Keyra. Make a backup right after setup.",
  "While unlocked, item text lives in normal .NET strings, which can't be reliably wiped from memory.",
  "The installer is signed with a self-signed certificate, so you trust it once by hand. The install guide shows how to check the file and its signer first.",
  "Updates are installed by hand; Keyra never checks for them, because it has no network code.",
];

const BUILD_STEPS = [
  {
    title: "Spec first",
    text: "Every change maps to a numbered requirement. When behaviour changes, the spec changes before the code.",
    icon: <FaCheckCircle className="text-emerald-400" aria-hidden="true" />,
  },
  {
    title: "Nine security rules",
    text: "A security constitution the AI assistant must follow: no home-made crypto, no plaintext on disk, never log a secret, fail closed, no network calls.",
    icon: <MdSecurity className="text-purple-400" aria-hidden="true" />,
  },
  {
    title: "A reviewer with fresh eyes",
    text: "A read-only security-reviewer agent checks every milestone against the spec and the rules before I commit.",
    icon: <FaRobot className="text-cyan-400" aria-hidden="true" />,
  },
  {
    title: "No \"done\" without proof",
    text: "A Stop hook runs the build and the tests whenever code changed, and blocks the assistant from finishing if they fail.",
    icon: <FiZap className="text-pink-400" aria-hidden="true" />,
  },
];

const TECH = [
  { text: ".NET 10", icon: <SiDotnet className="text-purple-400" /> },
  { text: "C#", icon: <SiCsharp className="text-purple-400" /> },
  { text: "WPF (Fluent theme)", icon: null },
  { text: "CommunityToolkit.Mvvm", icon: null },
  { text: "NSec (libsodium) Argon2id", icon: null },
  { text: "AES-256-GCM", icon: null },
  { text: "Windows Hello", icon: null },
  { text: "MSIX", icon: null },
  { text: "xUnit v3 + FsCheck", icon: null },
];

const metricColorClasses: Record<
  string,
  { border: string; gradient: string; text: string }
> = {
  purple: {
    border: "border-purple-500/30 hover:border-purple-500/50",
    gradient: "from-purple-500/10 to-transparent",
    text: "text-purple-400",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    gradient: "from-emerald-500/10 to-transparent",
    text: "text-emerald-400",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    gradient: "from-cyan-500/10 to-transparent",
    text: "text-cyan-400",
  },
  pink: {
    border: "border-pink-500/30 hover:border-pink-500/50",
    gradient: "from-pink-500/10 to-transparent",
    text: "text-pink-400",
  },
};

const HERO_IMAGE = {
  src: "/assets/keyra/details-dark.png",
  alt: "Keyra in dark theme: the item list with a card's details panel open",
};

const linkClass =
  "text-purple-300 underline underline-offset-4 hover:text-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded";

const KeyraClient = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    importLightboxStyles();
  }, []);

  const featureImages = FEATURES.filter((f): f is Feature & { image: string } => Boolean(f.image));
  const slides = [
    { src: HERO_IMAGE.src, alt: HERO_IMAGE.alt },
    ...featureImages.map((f) => ({ src: f.image, alt: f.alt ?? f.title })),
  ];

  const openLightboxForFeature = (image: string) => {
    const featureIdx = featureImages.findIndex((f) => f.image === image);
    if (featureIdx >= 0) setLightboxIndex(featureIdx + 1);
  };

  return (
    <main className="relative min-h-[calc(100vh-136px)] overflow-hidden">
      <BackgroundElements
        floatingDots={[
          { size: "md", color: "secondary", animation: "ping", position: { top: "5rem", right: "2.5rem" }, opacity: 60 },
          { size: "sm", color: "blue", animation: "pulse", position: { bottom: "8rem", left: "16rem" }, opacity: 40 },
          { size: "md", color: "secondary", animation: "bounce", position: { top: "33%", left: "2rem" }, opacity: 50 },
        ]}
      />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-32 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none hidden xl:block" aria-hidden="true" />
      <div className="absolute top-32 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none hidden xl:block" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10 py-10 xl:py-16">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-pink-500/15 to-purple-500/10 backdrop-blur-sm border border-purple-500/40 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <FaLock className="text-pink-400" aria-hidden="true" />
            <span className="text-white">Released · v1.7.1 · Windows 10/11</span>
          </div>

          <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Keyra
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 font-light mb-3 leading-snug">
            Your passwords, in one encrypted file on your own PC.
          </p>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-7 leading-relaxed">
            A small password vault for Windows. No account, no cloud, no tracking.
            Free for personal use.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            <Link
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 hover:border-purple-500/60 text-purple-200 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
            >
              <FaDownload aria-hidden="true" />
              <span>Download for Windows</span>
            </Link>
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
            >
              <FaGithub aria-hidden="true" />
              <span>View on GitHub</span>
            </Link>
          </div>
          <p className="text-xs text-white/40">v1.7.1 · Windows 10 (2004) or later · x64 · MSIX installer</p>
          <p className="mt-1 text-[11px] text-white/40 max-w-md mx-auto">
            Signed with a self-signed certificate: you check the file and trust the certificate once.{" "}
            <Link href={`${DOCS_URL}/install.md`} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/70">
              Install guide
            </Link>
          </p>

          <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-emerald-300/80">
            <span className="inline-flex items-center gap-1.5">
              <FaLock className="text-emerald-400" aria-hidden="true" />
              Encrypted
            </span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>Offline</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>No tracking</span>
          </div>

          <p className="mt-4 text-sm text-white/60">
            Built by{" "}
            <Link
              href="https://www.linkedin.com/in/biswajitpanday/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              Biswajit Panday
            </Link>
          </p>

          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label="Expand Keyra screenshot"
            className="mt-8 block w-full rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
          >
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={2030}
              height={1260}
              className="w-full h-auto transition-transform duration-500 hover:scale-[1.01]"
              priority
            />
          </button>
        </motion.section>

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaExclamationTriangle className="text-yellow-500 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-yellow-500">The problem</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <ul className="space-y-3">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/80 text-base leading-relaxed">
                  <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 pt-4 border-t border-white/10 text-sm text-white/60 leading-relaxed">
              I wanted my passwords, cards and notes encrypted, without trusting a cloud service.
              So Keyra keeps everything in one file that never leaves your PC.
            </p>
          </div>
        </motion.section>

        {/* At a glance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-emerald-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-emerald-400">At a glance</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((m) => {
              const c = metricColorClasses[m.color];
              return (
                <div
                  key={m.label}
                  className={`bg-gradient-to-br ${c.gradient} border ${c.border} rounded-xl p-5 transition-all`}
                >
                  <div className={`text-2xl xl:text-3xl font-bold ${c.text} mb-1`}>{m.value}</div>
                  <div className="text-sm text-white/70 font-medium">{m.label}</div>
                  <div className="text-xs text-white/40 mt-1">{m.sub}</div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FiKey className="text-cyan-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-cyan-400">What Keyra does</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <article
                key={f.title}
                className="group bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                {f.image && (
                  <button
                    type="button"
                    onClick={() => openLightboxForFeature(f.image!)}
                    aria-label={`Expand ${f.alt ?? f.title} image`}
                    className="block w-full overflow-hidden border-b border-white/5 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
                  >
                    <Image
                      src={f.image}
                      alt={f.alt ?? f.title}
                      width={2030}
                      height={1260}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </button>
                )}
                <div className="p-5">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-2">
                    <span className="text-lg">{f.icon}</span>
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* How it protects your data */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaProjectDiagram className="text-cyan-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-cyan-400">How it protects your data</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Your master password goes through Argon2id to make the key. AES-256-GCM seals the whole
              vault into one file, with a new nonce on every save. The header is authenticated too, so a
              single changed byte makes the file refuse to open. A failed unlock never creates a new vault
              and never overwrites the old one.
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <MermaidDiagram chart={SAVE_DIAGRAM} />
            </div>
            <p className="mt-6 text-sm text-white/60 leading-relaxed">
              Read the details:{" "}
              <Link href={`${DOCS_URL}/security.md`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                security
              </Link>
              {" · "}
              <Link href={`${DOCS_URL}/threat-model.md`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                threat model
              </Link>
              {" · "}
              <Link href={`${DOCS_URL}/vault-format.md`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                vault format
              </Link>
              {" · "}
              <Link href={`${DOCS_URL}/privacy.md`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                privacy
              </Link>
            </p>
          </div>
        </motion.section>

        {/* Honest limits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaExclamationTriangle className="text-yellow-500 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-yellow-500">What Keyra does not do</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <ul className="space-y-3">
              {LIMITS.map((l) => (
                <li key={l} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
                  <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-5 pt-4 border-t border-white/10 text-sm text-white/60 leading-relaxed">
              A security tool should say where it stops. Keyra can&apos;t protect you from malware on an
              unlocked PC or from a weak master password; the threat model lists each case.
            </p>
          </div>
        </motion.section>

        {/* How I built it */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FiArrowRight className="text-purple-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-purple-400">How I built it</h2>
          </div>
          <p className="mb-5 text-sm text-white/70 leading-relaxed max-w-4xl">
            I set the specs and the rules, I build with Claude Code, and I review every step. The checks
            are automatic, so the assistant can&apos;t skip them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUILD_STEPS.map((s) => (
              <div
                key={s.title}
                className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{s.icon}</span>
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-4xl">
            One example: a fake Windows Hello in the tests showed that the lock screen never started the
            Hello prompt by itself. I fixed it and shipped 1.7.1.
          </p>
        </motion.section>

        {/* Tech stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaServer className="text-purple-400 text-xl" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-purple-400">Built with</h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {TECH.map((t) => (
                <Badge
                  key={t.text}
                  icon={t.icon ?? undefined}
                  text={t.text}
                  color="default"
                  size="compact"
                />
              ))}
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Two layers: a WPF app on top of a core library with no UI. The app never touches the crypto,
              the file format or JSON directly; only the core does. Argon2id comes from NSec (libsodium),
              AES-256-GCM and HKDF from .NET itself.
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl xl:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Try it
            </h2>
            <p className="text-white/70 mb-6">
              Free for personal use. Windows 10/11, x64.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 hover:border-purple-500/60 text-purple-200 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
              >
                <FaDownload aria-hidden="true" />
                <span>Download v1.7.1</span>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60">
              <Link
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                <FaStar className="text-yellow-400" aria-hidden="true" />
                Star on GitHub
              </Link>
              <span className="text-white/20" aria-hidden="true">·</span>
              <Link
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                Found a bug? Open an issue
                <FiArrowRight aria-hidden="true" />
              </Link>
              <span className="text-white/20" aria-hidden="true">·</span>
              <Link
                href={SECURITY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                <MdSecurity aria-hidden="true" />
                Report a vulnerability
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/40">
              <Link
                href={LICENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                PolyForm Noncommercial license
              </Link>
              {" · "}free for personal and non-profit use; business use needs a paid license.
            </p>
          </div>
        </motion.section>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />
    </main>
  );
};

export default KeyraClient;
