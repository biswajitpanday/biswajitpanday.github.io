"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      <div className="absolute top-20 left-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-8xl xl:text-9xl font-bold text-transparent bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text animate-gradient mb-4">
            404
          </h1>
          <div className="w-20 h-1 bg-secondary-default mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg xl:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back to exploring my work.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative overflow-hidden bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25"
          >
            <span className="relative z-10">Go Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-secondary-default opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link
            href="/portfolio"
            className="border border-secondary-default text-secondary-default font-semibold px-8 py-3 rounded hover:bg-secondary-default hover:text-primary transition-all duration-300 transform hover:scale-105"
          >
            View Portfolio
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-white/60 mb-4">Or explore these sections:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Skills', href: '/skills' },
              { name: 'Career', href: '/career' },
              { name: 'Contact', href: '/contact' },
              { name: 'Services', href: '/services' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-secondary-default hover:text-white transition-colors duration-300 text-sm underline underline-offset-4 hover:no-underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 