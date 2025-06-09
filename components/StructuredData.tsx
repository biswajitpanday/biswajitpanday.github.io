"use client";

import React from 'react';
import { personSchema, websiteSchema, organizationSchema } from '@/data/schemaData';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'WebPage' | 'Organization' | 'Article';
  data: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  // Base structure based on type
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  // Convert the object to a JSON string
  const jsonLdString = JSON.stringify(jsonLd);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
};

export default StructuredData;

// Pre-configured schema components
export const PersonSchema = () => (
  <StructuredData
    type="Person"
    data={personSchema}
  />
);

export const WebSiteSchema = () => (
  <StructuredData
    type="WebSite"
    data={websiteSchema}
  />
);

export const OrganizationSchema = () => (
  <StructuredData
    type="Organization"
    data={organizationSchema}
  />
);

// Generate WebPage schema for specific pages
export const WebPageSchema = (title: string, description: string, path: string, images: string[] = []) => (
  <StructuredData
    type="WebPage"
    data={{
      name: title,
      description: description,
      url: `https://biswajitpanday.github.io${path}`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Biswajit Panday - Portfolio',
        url: 'https://biswajitpanday.github.io'
      },
      image: images.length > 0 ? images : ['https://biswajitpanday.github.io/assets/photo.png']
    }}
  />
); 