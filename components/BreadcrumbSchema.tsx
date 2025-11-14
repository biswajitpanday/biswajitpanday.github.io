"use client";

import React from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  showVisual?: boolean; // Option to show visual breadcrumbs
}

/**
 * BreadcrumbSchema Component
 *
 * Provides both:
 * 1. Schema.org structured data (JSON-LD) for SEO
 * 2. Optional visual breadcrumb navigation for users
 *
 * @param items - Array of breadcrumb items (name + url)
 * @param showVisual - Whether to display visual breadcrumbs (default: true)
 */
const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({
  items,
  showVisual = true
}) => {
  const baseUrl = 'https://biswajitpanday.github.io';

  // Always include Home as the first item
  const allItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items
  ];

  // Generate Schema.org BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  };

  return (
    <>
      {/* Schema.org JSON-LD for SEO */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Visual Breadcrumb Navigation (Optional) */}
      {showVisual && allItems.length > 1 && (
        <nav
          aria-label="Breadcrumb"
          className="mb-6 animate-fade-in"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              const isHome = index === 0;

              return (
                <li key={item.url} className="flex items-center gap-2">
                  {/* Breadcrumb Item */}
                  {isLast ? (
                    <span
                      className="text-secondary-default font-medium"
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.url}
                      className="hover:text-secondary-default transition-colors duration-200 flex items-center gap-1.5"
                    >
                      {isHome && <FiHome className="text-base" />}
                      <span>{item.name}</span>
                    </Link>
                  )}

                  {/* Separator */}
                  {!isLast && (
                    <FiChevronRight className="text-white/40 text-sm" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};

export default BreadcrumbSchema;
