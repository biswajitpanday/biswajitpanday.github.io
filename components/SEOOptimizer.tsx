"use client";

import React from 'react';
import Script from 'next/script';

// Component to enhance SEO with additional structured data
const SEOOptimizer = () => {
  const portfolioData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Biswajit Panday",
      "jobTitle": "Full-Stack .NET Developer",
      "description": "Professional Full-Stack .NET Developer with 10+ years of experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.",
      "url": "https://biswajitpanday.github.io",
      "sameAs": [
        "https://github.com/biswajitpanday",
        "https://www.linkedin.com/in/biswajitpanday/",
        // Add other social profiles here
      ],
      "knowsAbout": [
        {
          "@type": "SoftwareApplication",
          "name": ".NET Core",
          "applicationCategory": "DeveloperApplication"
        },
        {
          "@type": "SoftwareApplication",
          "name": "React",
          "applicationCategory": "DeveloperApplication"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Azure",
          "applicationCategory": "DeveloperApplication"
        },
        {
          "@type": "SoftwareApplication",
          "name": "AWS",
          "applicationCategory": "DeveloperApplication"
        }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Microsoft Certified: Azure Fundamentals",
          "credentialCategory": "certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Microsoft"
          }
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://biswajitpanday.github.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://biswajitpanday.github.io/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Skills",
        "item": "https://biswajitpanday.github.io/skills"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Certifications",
        "item": "https://biswajitpanday.github.io/certifications"
      }
    ]
  };

  return (
    <>
      <Script 
        id="schema-portfolio" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioData) }}
        strategy="afterInteractive"
      />
      <Script 
        id="schema-breadcrumbs" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        strategy="afterInteractive"
      />
    </>
  );
};

export default SEOOptimizer; 