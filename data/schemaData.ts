/**
 * Schema.org structured data configurations for better SEO
 */

const baseUrl = 'https://biswajitpanday.github.io';

// Person schema for the portfolio owner
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Biswajit Panday",
  jobTitle: "Full-Stack .NET Developer",
  description: "Professional Full-Stack .NET Developer with 10+ years of experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.",
  url: baseUrl,
  sameAs: [
    "https://github.com/biswajitpanday",
    "https://www.linkedin.com/in/biswajitpanday/",
    "https://medium.com/@biswajitpanday"
  ],
  image: `${baseUrl}/assets/photo.webp`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh"
  },
  email: "biswajitmailid@gmail.com",
  telephone: "+880 1681642502",
  knowsAbout: [
    ".NET Development",
    "React Development", 
    "Azure Cloud",
    "AWS Cloud",
    "DevOps",
    "Full-Stack Development"
  ]
};

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Biswajit Panday - Portfolio",
  description: "Professional portfolio showcasing Full-Stack .NET development expertise, cloud solutions, and innovative projects.",
  url: baseUrl,
  author: {
    "@type": "Person",
    name: "Biswajit Panday"
  },
  inLanguage: "en-US",
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    "@type": "Person", 
    name: "Biswajit Panday"
  },
  logo: `${baseUrl}/assets/photo.webp`,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// Organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Biswajit Panday - Full-Stack Development Services",
  description: "Professional Full-Stack .NET development services specializing in scalable web applications, cloud solutions, and modern development practices.",
  url: baseUrl,
  founder: {
    "@type": "Person",
    name: "Biswajit Panday"
  },
  serviceType: "Software Development",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-Stack .NET Development"
        }
      },
      {
        "@type": "Offer", 
        itemOffered: {
          "@type": "Service",
          name: "React Frontend Development"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", 
          name: "Cloud Solutions (Azure/AWS)"
        }
      }
    ]
  },
  image: [`${baseUrl}/assets/photo.webp`]
};

// Generate WebPage schema for specific pages
export const generateWebPageSchema = (
  title: string, 
  description: string, 
  path: string, 
  images: string[] = []
) => ({
  name: title,
  description: description,
  url: `${baseUrl}${path}`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Biswajit Panday - Portfolio',
    url: baseUrl
  },
  image: images.length > 0 ? images : [`${baseUrl}/assets/photo.webp`]
}); 