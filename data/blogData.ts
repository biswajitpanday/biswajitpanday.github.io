export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content?: string; // Full markdown content (optional for now)
  category: "AI/ML" | "Cloud & DevOps" | "Full-Stack" | "Architecture" | "Best Practices";
  tags: string[];
  coverImage?: string;
  publishedDate: Date;
  readTime: number; // in minutes
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  externalUrl?: string; // If hosted on Medium, Dev.to, etc.
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building SpireWiz: How AI Reduced Merge Conflicts by 90%",
    subtitle: "A deep dive into creating an AI-powered git merge tool",
    excerpt: "Learn how I built SpireWiz using Claude AI to intelligently resolve merge conflicts, reducing developer time by 80-90%. Explore the architecture, challenges, and lessons learned from integrating AI into development workflows.",
    category: "AI/ML",
    tags: ["AI", "Git", "DevOps", "Claude AI", "Automation"],
    publishedDate: new Date("2024-11-15"),
    readTime: 8,
    author: {
      name: "Biswajit Panday",
      role: "Senior Software Engineer"
    },
    featured: true
  },
  {
    id: "2",
    title: "Optimizing Cloud Costs: 55% Savings Through Infrastructure Redesign",
    subtitle: "Real-world strategies for cloud cost optimization",
    excerpt: "A practical guide to reducing cloud infrastructure costs without sacrificing performance. Covers auto-scaling, resource optimization, containerization, and monitoring strategies that achieved 55% cost reduction in production.",
    category: "Cloud & DevOps",
    tags: ["AWS", "Azure", "Cost Optimization", "DevOps", "Infrastructure"],
    publishedDate: new Date("2024-10-20"),
    readTime: 10,
    author: {
      name: "Biswajit Panday",
      role: "Senior Software Engineer"
    },
    featured: true
  },
  {
    id: "3",
    title: "Scaling React Applications: Patterns from 20M+ User Platform",
    subtitle: "Performance optimization techniques for large-scale React apps",
    excerpt: "Best practices for building React applications that scale to millions of users. Covers code splitting, lazy loading, state management, caching strategies, and performance monitoring techniques.",
    category: "Full-Stack",
    tags: ["React", "Performance", "Scalability", "Frontend", "Next.js"],
    publishedDate: new Date("2024-09-10"),
    readTime: 12,
    author: {
      name: "Biswajit Panday",
      role: "Senior Software Engineer"
    },
    featured: true
  },
  {
    id: "4",
    title: "Microservices Architecture: Lessons from Enterprise Implementation",
    subtitle: "Building resilient distributed systems at scale",
    excerpt: "Key insights from designing and implementing microservices architecture for enterprise applications. Discusses service boundaries, inter-service communication, data consistency, and deployment strategies.",
    category: "Architecture",
    tags: [".NET", "Microservices", "Architecture", "Docker", "Kubernetes"],
    publishedDate: new Date("2024-08-05"),
    readTime: 15,
    author: {
      name: "Biswajit Panday",
      role: "Senior Software Engineer"
    },
    featured: false
  },
  {
    id: "5",
    title: "Modern CI/CD Pipelines: From Commit to Production in Minutes",
    subtitle: "Automating deployment workflows for faster delivery",
    excerpt: "Build robust CI/CD pipelines using GitHub Actions, Docker, and cloud platforms. Covers automated testing, security scanning, progressive deployment, and rollback strategies.",
    category: "Cloud & DevOps",
    tags: ["CI/CD", "GitHub Actions", "Docker", "DevOps", "Automation"],
    publishedDate: new Date("2024-07-15"),
    readTime: 9,
    author: {
      name: "Biswajit Panday",
      role: "Senior Software Engineer"
    },
    featured: false
  },
  {
    id: "6",
    title: "TypeScript Best Practices: Writing Type-Safe Code at Scale",
    subtitle: "Advanced TypeScript patterns for enterprise applications",
    excerpt: "Master TypeScript for building maintainable, type-safe applications. Covers advanced types, generics, utility types, strict mode configuration, and integration with popular frameworks.",
    category: "Best Practices",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Code Quality"],
    publishedDate: new Date("2024-06-20"),
    readTime: 11,
    author: {
      name: "Biswajit Panday",
      role: "Senior Software Engineer"
    },
    featured: false
  }
];

// Helper functions
export const getFeaturedPosts = (limit?: number): BlogPost[] => {
  const featured = blogPosts.filter(post => post.featured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getPostsByCategory = (category: BlogPost["category"]): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, limit);
};
