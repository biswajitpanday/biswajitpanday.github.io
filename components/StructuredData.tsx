import React from 'react';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'WebPage' | 'Article';
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

// Usage examples:

// For Person schema (your professional information)
export const PersonSchema = () => (
  <StructuredData
    type="Person"
    data={{
      name: 'Biswajit Panday',
      jobTitle: 'Full-Stack .NET Developer',
      url: 'https://biswajitpanday.github.io',
      sameAs: [
        'https://github.com/biswajitpanday',
        'https://linkedin.com/in/biswajitpanday',
        // Add other social media profiles
      ],
      image: 'https://biswajitpanday.github.io/assets/photo.png',
      description: 'Full-Stack .NET Developer with expertise in cloud solutions, React, and DevOps.',
      knowsAbout: ['.NET Core', 'React', 'Azure', 'AWS', 'DevOps'],
      worksFor: {
        '@type': 'Organization',
        name: 'Your Current Company'
      }
    }}
  />
);

// For WebSite schema
export const WebSiteSchema = () => (
  <StructuredData
    type="WebSite"
    data={{
      name: 'Biswajit Panday - Portfolio',
      url: 'https://biswajitpanday.github.io',
      description: 'Professional portfolio of Biswajit Panday, a skilled Full-Stack .NET Developer with 10+ years experience.',
      potentialAction: {
        '@type': 'SearchAction',
        'target': 'https://biswajitpanday.github.io/?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }}
  />
);

// For WebPage schema (for specific pages)
export const WebPageSchema = (title: string, description: string, url: string) => (
  <StructuredData
    type="WebPage"
    data={{
      name: title,
      description: description,
      url: url,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Biswajit Panday - Portfolio',
        url: 'https://biswajitpanday.github.io'
      }
    }}
  />
); 