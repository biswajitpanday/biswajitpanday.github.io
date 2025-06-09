/**
 * Schema.org structured data configurations for better SEO
 */

export const baseUrl = 'https://biswajitpanday.github.io';

// Person schema for the portfolio owner
export const personSchema = {
  name: 'Biswajit Panday',
  jobTitle: 'Full-Stack .NET Developer',
  url: baseUrl,
  sameAs: [
    'https://github.com/biswajitpanday',
    'https://www.linkedin.com/in/biswajitpanday/',
    // Add other social profiles here
  ],
  image: `${baseUrl}/assets/photo.png`,
  description: 'Full-Stack .NET Developer with expertise in cloud solutions, React, and DevOps.',
  knowsAbout: ['.NET Core', 'React', 'Azure', 'AWS', 'DevOps'],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Your University Name', // Replace with your actual university
    }
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Your Current Company', // Replace with your current company
  }
};

// Website schema
export const websiteSchema = {
  name: 'Biswajit Panday - Portfolio',
  url: baseUrl,
  description: 'Professional portfolio of Biswajit Panday, a skilled Full-Stack .NET Developer with 10+ years experience specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS.',
  potentialAction: {
    '@type': 'SearchAction',
    'target': `${baseUrl}/?search={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

// Organization schema
export const organizationSchema = {
  '@type': 'Organization',
  name: 'Biswajit Panday',
  url: baseUrl,
  logo: `${baseUrl}/assets/photo.png`,
  sameAs: personSchema.sameAs
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
  image: images.length > 0 ? images : [`${baseUrl}/assets/photo.png`]
}); 