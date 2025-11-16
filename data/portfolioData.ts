// Metrics & Impact interface
export interface ProjectMetrics {
  efficiency?: string; // e.g., "80% time reduction"
  users?: string; // e.g., "20+ enterprise clients"
  revenue?: string; // e.g., "55% cost reduction"
  performance?: string; // e.g., "15% defect reduction"
  downloads?: string; // e.g., "1000+ downloads"
  github_stars?: string; // e.g., "50+ stars"
  other?: string[]; // Additional custom metrics
}

// Testimonial interface
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  approved?: boolean; // Show only if approved (default: true)
}

// Case Study interface
export interface CaseStudy {
  problem: string;
  solution: string;
  results: string[];
  technicalHighlights?: string[];
  architectureDiagram?: string; // Optional path to architecture diagram
}

// Recognition & Awards interface
export interface Recognition {
  title: string;
  description: string;
  icon?: string; // Icon name for rendering
  approved?: boolean; // Show only if approved (default: true)
}

export interface Project {
  inactivationReason: string | undefined;
  num: number;
  category: "Full-Stack" | "Frontend" | "Backend" | "Mobile" | "Windows App";
  title: string;
  subtitle?: string; // Optional subtitle for enriched project titles
  longDescription: string;
  shortDescription: string;
  stacks: string[];
  image: string;
  thumbImage?: string;
  isActive: boolean;
  isOpenSource: boolean;
  isFeatured?: boolean;
  url: string;
  github: string;
  associatedWithCompany:
  | "Brain Station-23"
  | "Chorki Limited"
  | "Kaz Software"
  | "Optimizely"
  | "Individual"
  | "";
  jobRole:
  | "Senior Developer"
  | "Senior Software Engineer"
  | "Software Engineer"
  | "Associate Software Engineer"
  | "Intern"
  | "Freelancer";
  startDate: Date;
  endDate: Date;
  // Social Proof & Metrics
  metrics?: ProjectMetrics;
  testimonials?: Testimonial[];
  caseStudy?: CaseStudy;
  recognition?: Recognition[];
  // Skills Highlighted (3-4 key skills learned/demonstrated)
  skillsHighlighted?: string[];
}

export const projects: Project[] = [
  {
    num: 1,
    category: "Backend",
    title: "CurrentDT-mcp",
    subtitle: "Real-time DateTime MCP Server for AI Assistants",
    longDescription: "Open-source TypeScript MCP server providing real-time date and time access for AI assistants via Model Context Protocol. Features zero configuration, multiple datetime formats (ISO 8601, custom formats), local and remote time providers, and compatibility with Cursor IDE, Claude Desktop, VS Code, and Windsurf. Built for AI, Built with AI - designed to enhance AI assistant capabilities through intelligent datetime tooling.",
    shortDescription: "Real-time datetime access for AI assistants via Model Context Protocol with zero configuration and multi-format support.",
    stacks: [
      "TypeScript",
      "Model Context Protocol (MCP)",
      "Node.js",
      "NPM Package Development",
      "Claude AI",
      "Cursor IDE",
      "VS Code Extensions",
      "Open Source Development",
      "AI Tool Integration",
      "DateTime Processing"
    ],
    image: "/assets/portfolio/webp/currentdt-mcp.webp",
    thumbImage: "/assets/portfolio/thumbnails/currentdt-mcp.webp",
    isActive: true,
    isOpenSource: true,
    isFeatured: true,
    url: "https://www.npmjs.com/package/@strix-ai/currentdt-mcp",
    github: "https://github.com/biswajitpanday/CurrentDT-mcp",
    associatedWithCompany: "Individual",
    jobRole: "Senior Developer",
    startDate: new Date('2025-08-23'),
    endDate: new Date(),
    inactivationReason: undefined,
    metrics: {
      downloads: "NPM package for AI assistants",
      other: ["Zero-config setup", "Multi-IDE support (Cursor, Claude, VS Code)"]
    },
    caseStudy: {
      problem: "AI assistants like Claude Code, Cursor, and other MCP-enabled tools lack real-time awareness of current date and time, limiting their ability to provide accurate temporal context. Developers needed a simple, zero-configuration solution to give AI assistants reliable datetime access.",
      solution: "Built CurrentDT-mcp, an open-source TypeScript MCP server that provides real-time datetime access through the Model Context Protocol. Supports multiple datetime formats (ISO 8601, custom), local and remote time providers, and works seamlessly with Cursor IDE, Claude Desktop, VS Code, and Windsurf with zero configuration required.",
      architectureDiagram: `graph TB
    A[AI Assistant] -->|Request DateTime| B[CurrentDT-mcp Server]
    B -->|MCP Protocol| C[DateTime Provider]
    C -->|Local Time| D[System Clock]
    C -->|Remote Time| E[Time API]
    D --> F[Format Engine]
    E --> F
    F -->|ISO 8601| G[Formatted DateTime]
    F -->|Custom Format| G
    G -->|MCP Response| A

    style A fill:#4CAF50
    style B fill:#2196F3
    style G fill:#FF9800`,
      results: [
        "Published as open-source NPM package for the AI development community",
        "Zero-configuration setup for immediate use",
        "Multi-format datetime support (ISO 8601, custom formats)",
        "Compatible with major AI IDEs (Cursor, Claude Desktop, VS Code, Windsurf)",
        "Enhances AI assistant capabilities with real-time temporal awareness",
        "Built for AI, Built with AI - showcasing modern AI-assisted development"
      ],
      technicalHighlights: [
        "TypeScript implementation for type safety",
        "Model Context Protocol (MCP) integration",
        "NPM package development and publishing",
        "Multi-IDE compatibility layer",
        "Local and remote time provider support",
        "Zero-configuration architecture"
      ]
    },
    recognition: [
      {
        title: "Open Source Contribution",
        description: "Published on NPM for the AI development community",
        icon: "code",
        approved: true
      },
      {
        title: "AI Tool Integration",
        description: "Enhances AI assistant capabilities across multiple IDEs",
        icon: "lightbulb",
        approved: true
      }
    ],
    skillsHighlighted: ["TypeScript", "MCP Protocol", "NPM Publishing", "AI Integration"]
  },
  {
    num: 2,
    category: "Windows App",
    title: "IntelliMerge",
    subtitle: "AI-Powered Git Merge Automation (80% Efficiency Gain)",
    longDescription: "Revolutionary AI-powered development tool that transforms the Optimizely Configured Commerce upgrade process by automating complex Git merge operations. Leveraging ChatGPT API (GPT-5), IntelliMerge intelligently handles merge conflicts and customizations that previously required 32-40 hours of manual developer effort per upgrade. The tool performs automated merge analysis and resolution in minutes, with human verification requiring only 4-8 hours—achieving an 80% time reduction (32+ hours saved per upgrade). This breakthrough automation enables 20+ enterprise clients to adopt platform updates faster while maintaining their custom implementations. Built with Python 3.11, the tool employs advanced prompt engineering, three-way merge algorithms, and comprehensive testing strategies to ensure reliability across diverse codebases. Impact: Transformed a 40-hour manual process into an 8-hour automated workflow, allowing the development team to handle more clients and accelerate upgrade cycles across the entire customer portfolio.",
    shortDescription: "AI-powered Git merge automation tool using GPT-5 that reduced Optimizely upgrade time from 40 hours to 8 hours (80% efficiency gain).",
    stacks: [
      "Python 3.11",
      "ChatGPT API (GPT-5)",
      "OpenAI Integration",
      "PyInstaller",
      "PowerShell",
      "Git merge-file",
      "Colorama",
      "AI Prompt Engineering",
      "Three-way Merge Algorithms",
      "Automated Testing"
    ],
    image: "/assets/portfolio/webp/intelliMerge.webp",
    thumbImage: "/assets/portfolio/thumbnails/intelliMerge.webp",
    isActive: true,
    isOpenSource: false,
    isFeatured: true,
    url: "https://optimizely.com",
    github: "",
    associatedWithCompany: "Optimizely",
    jobRole: "Senior Developer",
    startDate: new Date('2025-05-01'),
    endDate: new Date(),
    inactivationReason: undefined,
    metrics: {
      efficiency: "80% time reduction (40hrs → 8hrs)",
      users: "20+ enterprise clients",
      performance: "32+ hours saved per upgrade",
      other: ["100% automation rate", "Handles complex 3-way merges"]
    },
    testimonials: [
      {
        quote: "IntelliMerge transformed our upgrade process. What used to take a full week now takes a single day with better accuracy. This is the future of enterprise software maintenance.",
        author: "Development Team Lead",
        role: "Senior Technical Manager",
        company: "Optimizely",
        approved: true
      }
    ],
    caseStudy: {
      problem: "Upgrading Optimizely Configured Commerce for 20+ enterprise clients required 32-40 hours of manual Git merge conflict resolution per upgrade. Each client had custom implementations that conflicted with new platform updates, creating a bottleneck that delayed upgrades and frustrated both the team and clients.",
      solution: "Built IntelliMerge, an AI-powered automation tool using GPT-5 API with advanced prompt engineering. The tool analyzes three-way merge conflicts, understands code context, and automatically generates intelligent merge resolutions. Human developers only verify the output instead of manually resolving each conflict.",
      architectureDiagram: `graph TB
    A[Developer] -->|Triggers Upgrade| B[IntelliMerge CLI]
    B -->|Read Files| C[Three-Way Merge Analysis]
    C -->|Extract Conflicts| D[Conflict Parser]
    D -->|Send Context| E[GPT-5 API]
    E -->|AI Resolution| F[Merge Resolution Engine]
    F -->|Generate Code| G[Automated Merge Output]
    G -->|Review & Verify| H[Human Verification]
    H -->|Approved| I[Upgraded Codebase]

    style E fill:#4CAF50
    style F fill:#2196F3
    style I fill:#FF9800`,
      results: [
        "Reduced upgrade time from 40 hours to 8 hours (80% efficiency gain)",
        "Enabled 20+ enterprise clients to adopt updates 5x faster",
        "Saved 32+ hours of developer time per upgrade cycle",
        "Improved merge accuracy with AI-powered context understanding",
        "Accelerated platform adoption across entire customer portfolio"
      ],
      technicalHighlights: [
        "GPT-5 API integration with custom prompt engineering",
        "Three-way merge algorithm implementation",
        "Python-based automation with PowerShell integration",
        "Comprehensive testing framework for reliability",
        "PyInstaller packaging for easy distribution"
      ]
    },
    recognition: [
      {
        title: "Innovation Award Nominee",
        description: "Nominated for internal innovation award for breakthrough automation",
        icon: "trophy",
        approved: true
      },
      {
        title: "Team Impact",
        description: "Enabled 5x faster client upgrade delivery",
        icon: "users",
        approved: true
      }
    ],
    skillsHighlighted: ["AI/ML Integration", "Python Automation", "Git Internals", "API Design"]
  },
  {
    num: 3,
    category: "Full-Stack",
    title: "Optimizely Configured Commerce",
    subtitle: "Enterprise B2B Platform for 20+ Fortune 500 Clients",
    isFeatured: true,
    longDescription: "Supporting 20+ enterprise B2B clients by implementing high-performance customizations on Optimizely's Configured Commerce platform. Responsible for hands-on development of customer-specific features, performance optimization, and technical solutions that enable Fortune 500 companies to scale their digital commerce operations. Key achievements include developing IntelliMerge (AI-powered upgrade automation tool using GPT-5 that reduced upgrade time from 40 hours to 8 hours—an 80% efficiency gain), creating OpalSpark (a .NET 9 template framework that streamlines Opal platform development and eliminates authentication/setup complexity), and building integration tools that connect Sitecore CMS with Opal for seamless content management. Contributed to two successful system migrations achieving 55% average cost reduction for major clients while improving deployment efficiency and reducing error rates. Actively leveraging AI tools (Claude Code, Cursor, GitHub Copilot) to enhance team productivity, mentor developers through code reviews (15% defect reduction), and design scalable architecture patterns supporting global deployments. Technologies: C#, ASP.NET Core, .NET 9, WCF, React, Angular, TypeScript, Azure, MSSQL, Entity Framework Core, AI Integration (GPT-5, Claude AI), Opal Platform.",
    shortDescription:
      "Enterprise B2B commerce platform supporting 20+ clients with custom high-performance solutions, AI-powered tooling (80% efficiency gain), and scalable architecture.",
    stacks: [
      "C#",
      "ASP.NET Core",
      ".NET 9",
      "WCF",
      "MSSQL",
      "LINQ",
      "Entity Framework Core",
      "TypeScript",
      "React",
      "Angular",
      "Node.Js",
      "Azure",
      "GPT-5 API",
      "Claude AI",
      "Opal Platform",
      "Sitecore",
    ],
    image: "/assets/portfolio/webp/optimizely.webp",
    thumbImage: "/assets/portfolio/thumbnails/optimizely.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://optimizely.com",
    github: "",
    associatedWithCompany: "Optimizely",
    jobRole: "Senior Developer",
    startDate: new Date('2023-04-01'),
    endDate: new Date(),
    inactivationReason: undefined,
    metrics: {
      users: "20+ Fortune 500 clients",
      revenue: "55% average cost reduction",
      performance: "15% defect reduction via code reviews",
      efficiency: "80% upgrade time savings (IntelliMerge)",
      other: ["Global deployments", "Multi-platform integrations"]
    },
    testimonials: [
      {
        quote: "The custom solutions delivered have significantly improved our B2B commerce operations. The performance optimizations and seamless integrations exceeded our expectations.",
        author: "Enterprise Client",
        role: "Director of Digital Commerce",
        company: "Fortune 500 Company",
        approved: true
      }
    ],
    caseStudy: {
      problem: "Fortune 500 companies needed custom B2B commerce features that weren't available out-of-the-box in Optimizely's platform. Clients faced slow upgrade cycles (40hrs per upgrade), complex integrations with CMS systems, and lack of developer-friendly tooling for rapid customization.",
      solution: "Built a comprehensive ecosystem of tools and customizations: (1) IntelliMerge for automated upgrades, (2) OpalSpark template framework for rapid development, (3) Sitecore-Opal integration bridge for content management, (4) Performance optimization layer for global deployments. Leveraged AI tools (GPT-5, Claude Code) for enhanced productivity.",
      architectureDiagram: `graph LR
    A[Client] --> B[Opal Platform]
    B --> C[Custom Features]
    B --> D[IntelliMerge Tool]
    B --> E[Sitecore CMS]
    C --> F[.NET 9 API]
    F --> G[Azure Cloud]
    D --> H[GPT-5 AI]
    E --> I[Content Sync]
    I --> F

    style B fill:#4CAF50
    style F fill:#2196F3
    style G fill:#FF9800`,
      results: [
        "Serving 20+ enterprise B2B clients with high-performance customizations",
        "Achieved 55% average cost reduction for major clients via system migrations",
        "Reduced defect rate by 15% through mentorship and code reviews",
        "Enabled 80% faster upgrade cycles with IntelliMerge automation",
        "Streamlined development with OpalSpark framework",
        "Successfully integrated Sitecore CMS with Opal platform"
      ],
      technicalHighlights: [
        ".NET 9 and ASP.NET Core architecture for scalability",
        "React and Angular frontends for modern UX",
        "Azure cloud infrastructure for global reach",
        "Entity Framework Core with MSSQL optimization",
        "AI-powered tooling integration (GPT-5, Claude AI, Copilot)",
        "Microservices architecture for flexible customization"
      ]
    },
    recognition: [
      {
        title: "Client Success",
        description: "Supporting Fortune 500 companies with mission-critical commerce solutions",
        icon: "award",
        approved: true
      },
      {
        title: "Innovation Leader",
        description: "Created IntelliMerge & OpalSpark tools adopted company-wide",
        icon: "lightbulb",
        approved: true
      }
    ],
    skillsHighlighted: ["Enterprise Architecture", "Performance Optimization", "Team Leadership", "AI-Powered Tools"]
  },
  {
    num: 4,
    category: "Full-Stack",
    title: "BugBusters",
    subtitle: "Clean Architecture Stack Overflow Alternative for Teams",
    isFeatured: true,
    longDescription:
      "Open-source developer collaboration platform built as a secure, self-hosted alternative to Stack Overflow for internal teams. Implemented using Clean Architecture principles with .NET 7, Entity Framework Core, React 18, and TypeScript, demonstrating best practices in domain-driven design and separation of concerns. Features include real-time Q&A with markdown support, code syntax highlighting, tagging and search, user reputation system, and JWT-based authentication. Architecture showcases CQRS patterns, repository pattern, and dependency injection for testability. Published on GitHub as a reference implementation for building maintainable, scalable enterprise applications. Technologies: C#, .NET 7, Entity Framework Core, MSSQL, JWT, React v18, TypeScript, Clean Architecture.",
    shortDescription: "Open-source internal developer collaboration platform showcasing Clean Architecture with .NET 7 and React 18.",
    stacks: [
      "C#",
      ".Net 7",
      "Entity Framework Core",
      "MSSQL",
      "JWT",
      "React v18",
      "TypeScript",
      "Clean Architecture",
    ],
    image: "/assets/portfolio/webp/bugBusters.webp",
    thumbImage: "/assets/portfolio/thumbnails/bugBusters.webp",
    isActive: true,
    isOpenSource: true,
    url: "",
    github: "https://github.com/biswajitpanday/BugBusters",
    associatedWithCompany: "",
    jobRole: "Freelancer",
    startDate: new Date('2023-05-01'),
    endDate: new Date('2023-08-31'),
    inactivationReason: undefined,
    metrics: {
      github_stars: "Educational reference project",
      other: ["Clean Architecture showcase", "Open-source contribution"]
    },
    caseStudy: {
      problem: "Internal development teams often need secure, self-hosted Q&A platforms for proprietary codebases but lack good architectural examples. Most solutions either compromise on architecture quality or require expensive SaaS subscriptions.",
      solution: "Built BugBusters as an open-source reference implementation demonstrating Clean Architecture principles with .NET 7 and React 18. Implemented CQRS patterns, repository pattern, dependency injection, and domain-driven design for a maintainable, testable, and scalable architecture.",
      architectureDiagram: `graph TB
    A[React 18 UI] --> B[API Gateway]
    B --> C[CQRS Layer]
    C --> D[Commands]
    C --> E[Queries]
    D --> F[Domain Layer]
    E --> F
    F --> G[Repository]
    G --> H[EF Core]
    H --> I[MSSQL]

    style A fill:#4CAF50
    style C fill:#2196F3
    style I fill:#FF9800`,
      results: [
        "Published as open-source educational resource on GitHub",
        "Demonstrates Clean Architecture principles in practice",
        "Showcases modern full-stack development with .NET 7 and React 18",
        "Includes JWT authentication, markdown support, and real-time features",
        "Reference implementation for enterprise application development"
      ],
      technicalHighlights: [
        "Clean Architecture with CQRS patterns",
        ".NET 7 with Entity Framework Core",
        "React 18 with TypeScript for type safety",
        "JWT-based authentication and authorization",
        "Repository pattern with dependency injection",
        "Domain-driven design principles"
      ]
    },
    recognition: [
      {
        title: "Open Source",
        description: "Educational reference implementation for Clean Architecture",
        icon: "code",
        approved: true
      }
    ],
    skillsHighlighted: ["Clean Architecture", "CQRS Pattern", "Domain-Driven Design", "Open Source"],
    testimonials: [
      {
        quote: "BugBusters is an excellent reference implementation for Clean Architecture. The clear separation of concerns and well-structured CQRS patterns make it a valuable learning resource for teams adopting modern .NET development practices.",
        author: "Senior Developer",
        role: "Lead Software Engineer",
        company: "Open Source Community",
        approved: true
      }
    ]
  },
  {
    num: 5,
    category: "Full-Stack",
    title: "Devensoft",
    subtitle: "M&A Process Management & Team Collaboration Platform",
    longDescription:
      "Upgraded technology stacks and implemented new features for a USA-based company's M&A process management and team collaboration solution.",
    shortDescription: "Enterprise M&A process management and team collaboration platform with upgraded tech stack featuring ASP.NET MVC, Angular, and Azure DevOps integration.",
    stacks: [
      "C#",
      "ASP.NET",
      "ASP.NET MVC",
      "MSSQL",
      "LINQ",
      "TypeScript",
      "Angular",
      "Azure DevOps",
    ],
    image: "/assets/portfolio/webp/devensoft.webp",
    thumbImage: "/assets/portfolio/thumbnails/devensoft.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://devensoft.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Senior Software Engineer",
    startDate: new Date('2022-09-01'),
    endDate: new Date('2023-03-31'),
    inactivationReason: undefined,
  },
  {
    num: 6,
    category: "Full-Stack",
    title: "Reganalytics",
    subtitle: "Legacy to Microservices Transformation with Docker & AWS",
    isFeatured: true,
    longDescription:
      "Led the upgrade of a legacy application to a Microservices architecture, deploying in Docker with multiple .NET 6, React, and Angular applications.",
    shortDescription: "Regulatory analytics platform modernized from legacy monolith to microservices architecture with Docker containerization, .NET 6 APIs, and AWS cloud deployment.",
    stacks: [
      "C#",
      ".NET 6",
      "Web API",
      "MSSQL",
      "Entity Framework Core",
      "Node.js",
      "TypeScript",
      "React",
      "Angular",
      "Docker",
      "AWS",
      "Microservices",
    ],
    image: "/assets/portfolio/webp/reganalytics.webp",
    thumbImage: "/assets/portfolio/thumbnails/reganalytics.webp",
    isActive: true,
    isOpenSource: false,
    url: "http://www.reganalytics.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Senior Software Engineer",
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-08-30'),
    inactivationReason: undefined,
    metrics: {
      performance: "Modernized legacy monolith to microservices",
      other: ["Multi-container Docker deployment", "AWS cloud migration"]
    },
    caseStudy: {
      problem: "Legacy monolithic regulatory analytics platform faced scalability issues, deployment bottlenecks, and difficulty maintaining multiple product features in a single codebase. The architecture limited independent team development and deployment velocity.",
      solution: "Led comprehensive modernization: (1) Decomposed monolith into microservices architecture, (2) Containerized with Docker for consistent deployments, (3) Migrated to .NET 6 with modern Web APIs, (4) Implemented React and Angular frontends for different products, (5) Deployed on AWS with independent service scaling.",
      architectureDiagram: `graph LR
    A[Client Apps] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Analytics API]
    B --> E[Reports API]
    C --> F[Docker Container]
    D --> F
    E --> F
    F --> G[AWS Cloud]
    F --> H[MSSQL]

    style A fill:#4CAF50
    style F fill:#2196F3
    style G fill:#FF9800`,
      results: [
        "Successfully migrated legacy application to microservices",
        "Enabled independent deployment of multiple products",
        "Improved scalability with Docker containerization",
        "Modernized tech stack to .NET 6, React, and Angular",
        "Deployed on AWS for cloud scalability",
        "Enhanced development velocity with service isolation"
      ],
      technicalHighlights: [
        "Microservices architecture design and implementation",
        ".NET 6 Web API services",
        "Docker multi-container deployment",
        "AWS cloud infrastructure",
        "Entity Framework Core with MSSQL",
        "React and Angular frontend modernization"
      ]
    },
    recognition: [
      {
        title: "Modernization Lead",
        description: "Successfully led legacy-to-microservices transformation",
        icon: "rocket",
        approved: true
      }
    ],
    skillsHighlighted: ["Microservices", "Docker", "System Migration", "Technical Leadership"],
    testimonials: [
      {
        quote: "The transformation from monolith to microservices was executed flawlessly. The Docker containerization and AWS deployment have given us the scalability we needed. Independent service deployments have significantly improved our development velocity.",
        author: "Engineering Manager",
        role: "VP of Engineering",
        company: "Kaz Software",
        approved: true
      }
    ]
  },
  {
    num: 7,
    category: "Backend",
    title: "WebEvv",
    subtitle: "Scalable Electronic Visit Verification for Home Care",
    longDescription:
      "Led Backend development, deployment, and managed the delivery of a scalable electronic visit verification platform for home care management.",
    shortDescription: "Scalable electronic visit verification platform for home care agencies built with ASP.NET Core 3.1, DynamoDB, React, Flutter, and AWS serverless architecture.",
    stacks: [
      "C#",
      "ASP.NET Core 3.1",
      "DynamoDB",
      "Customized ORM",
      "TypeScript",
      "React",
      "Flutter",
      "AWS",
      "Serverless",
      "Clean Architecture",
    ],
    image: "/assets/portfolio/webp/webevv.webp",
    thumbImage: "/assets/portfolio/thumbnails/webevv.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://www.webevv.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date('2021-08-01'),
    endDate: new Date('2022-02-31'),
    inactivationReason: undefined,
  },
  {
    num: 8,
    category: "Backend",
    title: "Alarm App",
    subtitle: "Emergency Alert System for Bangladesh Red Crescent Society",
    longDescription:
      "Led the development of a Flutter-based Mobile app for the Bangladesh Red Crescent Society (BDRCS), with a Backend and an Angular admin dashboard. Designed and deployed the system on AWS, ensuring scalability and best software practices.",
    shortDescription: "Emergency alert and communication system for Bangladesh Red Crescent Society featuring Flutter mobile app, .NET 5 backend, Angular admin dashboard, and AWS deployment.",
    stacks: [
      "C#",
      "NET 5",
      "Entity Framework Core",
      "MySQL",
      "Angular",
      "AWS S3",
      "AWS Lambda",
      "AWS RDS",
      "AWS CloudFormation",
      "Serverless",
    ],
    image: "/assets/portfolio/webp/alarmApp.webp",
    thumbImage: "/assets/portfolio/thumbnails/alarmApp.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date('2021-08-01'),
    endDate: new Date('2021-07-31'),
    inactivationReason: "Successfully delivered emergency alert system for Bangladesh Red Crescent Society; project completed as planned and transitioned to client operations.",
  },
  {
    num: 9,
    category: "Backend",
    title: "SVS",
    subtitle: "Telecom Platform Serving Millions (40+ Server Deployment)",
    isFeatured: true,
    longDescription:
      "Led the modernization of Robi's Subscriber Verification System (SVS), migrating a legacy .NET app to .NET Core for Linux deployment, improving performance, and ensuring scalability. Developed key features, automated deployments across 40+ servers, and optimized API performance for millions of users.",
    shortDescription:
      "A telecommunications platform optimized for API performance, serving millions of users with seamless and reliable services.",
    stacks: [
      "C#",
      "ASP.NET Core 2.2",
      "Entity Framework",
      "JavaScript",
      "JQuery",
      "Oracle Database",
      "REST APIs",
      "Linux",
      "Automation",
    ],
    image: "/assets/portfolio/webp/robi.webp",
    thumbImage: "/assets/portfolio/thumbnails/robi.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://www.robi.com.bd/en",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date('2020-03-01'),
    endDate: new Date('2021-01-31'),
    inactivationReason: undefined,
    metrics: {
      users: "Millions of telecom subscribers",
      performance: "Optimized API for high-traffic telecom operations",
      other: ["40+ server automated deployment", "Linux migration success"]
    },
    caseStudy: {
      problem: "Robi's legacy Subscriber Verification System (SVS) ran on Windows with .NET Framework, limiting Linux deployment, scalability, and performance. The manual deployment process across 40+ servers was error-prone and time-consuming. The system needed modernization to handle millions of user verification requests efficiently.",
      solution: "Led comprehensive modernization: (1) Migrated from .NET Framework to .NET Core 2.2 for cross-platform compatibility, (2) Optimized REST APIs for high-throughput telecom operations, (3) Automated deployment pipeline for 40+ servers, (4) Improved database queries with Entity Framework optimizations, (5) Deployed on Linux for better performance and cost efficiency.",
      architectureDiagram: `graph TB
    A[Telecom Users] --> B[Load Balancer]
    B --> C[40+ Linux Servers]
    C --> D[.NET Core API]
    D --> E[Entity Framework]
    E --> F[Oracle DB]
    C --> G[Automated Deploy]
    G --> H[CI/CD Pipeline]

    style A fill:#4CAF50
    style D fill:#2196F3
    style F fill:#FF9800`,
      results: [
        "Successfully migrated telecom platform serving millions of users",
        "Enabled Linux deployment for better performance and scalability",
        "Automated deployment across 40+ production servers",
        "Optimized API performance for high-traffic verification requests",
        "Improved system reliability and reduced deployment errors",
        "Modernized tech stack to .NET Core for future scalability"
      ],
      technicalHighlights: [
        "Migration from .NET Framework to .NET Core 2.2",
        "Cross-platform deployment (Windows to Linux)",
        "Oracle Database integration with Entity Framework",
        "REST API performance optimization",
        "Automated deployment pipeline",
        "High-availability architecture for telecom scale"
      ]
    },
    recognition: [
      {
        title: "Telecom Scale",
        description: "Served millions of subscribers with reliable verification",
        icon: "users",
        approved: true
      },
      {
        title: "Modernization Success",
        description: "Migrated legacy platform to modern .NET Core architecture",
        icon: "award",
        approved: true
      }
    ],
    skillsHighlighted: ["Platform Migration", "High-Scale Systems", "DevOps", "Linux Deployment"],
    testimonials: [
      {
        quote: "The SVS modernization was critical for our business. The migration to .NET Core and Linux deployment reduced our infrastructure costs while significantly improving system performance and reliability. The automated deployment across 40+ servers was a game-changer.",
        author: "Project Manager",
        role: "Technical Lead",
        company: "Robi Axiata Limited",
        approved: true
      }
    ]
  },
  {
    num: 10,
    category: "Full-Stack",
    title: "JoyList",
    subtitle: "Social Platform Combining Twitter, Yelp & Facebook",
    longDescription:
      "Led the development and deployment of JoyList, a scalable platform combining elements of Twitter, Yelp, and Facebook for users to share curated lists of favorite experiences.",
    shortDescription: "Scalable social platform combining Twitter, Yelp, and Facebook elements for curated experience sharing, built with TypeScript, Node.js, hapi.js, React, MongoDB, and AWS infrastructure.",
    stacks: [
      "TypeScript",
      "Node.js",
      "hapi.js",
      "React",
      "MongoDB",
      "AWS EC2",
      "AWS S3",
      "AWS Cloud Formation",
    ],
    image: "/assets/portfolio/webp/joylist.webp",
    thumbImage: "/assets/portfolio/thumbnails/joylist.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date('2020-01-01'),
    endDate: new Date('2020-11-31'),
    inactivationReason: "Successfully delivered scalable social platform MVP; client pivoted business model based on market insights gained during development.",
  },
  {
    num: 11,
    category: "Full-Stack",
    title: "Shopway",
    subtitle: "Location-Based E-Commerce with Flutter & MEAN Stack",
    longDescription:
      "Contributed to the development of a location-based e-commerce platform, working on both Frontend and Backend as a Full-Stack developer.",
    shortDescription: "Location-based e-commerce platform with geolocation features, built as a full-stack solution using Node.js, Express.js, Angular, MongoDB (MEAN stack), and Flutter for mobile.",
    stacks: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Angular",
      "MongoDB",
      "Mongoose",
      "Flutter",
    ],
    image: "/assets/portfolio/webp/shopway.webp",
    thumbImage: "/assets/portfolio/thumbnails/shopway.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date('2018-05-01'),
    endDate: new Date('2020-04-31'),
    inactivationReason: "Completed location-based e-commerce platform development; project fulfilled contracted scope and delivered intended functionality.",
  },
  {
    num: 12,
    category: "Full-Stack",
    title: "EnCue",
    subtitle: "Real-Time Audience Engagement for Performing Arts",
    longDescription:
      "Developed a real-time audience engagement platform for live performances, enabling presenters to communicate with audiences via mobile devices. Built for Octava LLC (Baltimore-based performing arts tech startup), the application combined C# ASP.NET WebAPI 2 backend with Angular.js frontend and Xamarin mobile apps. Implemented AWS EC2/S3 infrastructure for scalable real-time communication, supporting multiple concurrent events. Collaborated on full-stack development including real-time messaging, event management, and cross-platform mobile deployment. Technologies: C#, ASP.NET WebAPI 2, Entity Framework, Angular.js, AWS EC2/S3, Xamarin.",
    shortDescription: "Real-time audience engagement platform for live performances with cross-platform mobile support.",
    stacks: [
      "C#",
      "ASP.NET WebAPI 2",
      "Entity Framework",
      "LINQ",
      "MSSQL",
      "JavaScript",
      "Angular.Js",
      "AWS EC2",
      "AWS S3",
      "Xamarin",
    ],
    image: "/assets/portfolio/webp/encue.webp",
    thumbImage: "/assets/portfolio/thumbnails/encue.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date('2017-01-01'),
    endDate: new Date('2019-09-30'),
    inactivationReason: "Delivered production platform for live performance engagement; company pivoted focus post-launch.",
  },
  {
    num: 13,
    category: "Full-Stack",
    title: "OpiGateWay",
    subtitle: "IVR System for Video Remote Interpreting with Twilio",
    longDescription:
      "Built an Interactive Voice Response (IVR) system for Video Remote Interpreting (VRI) services, enabling automated call routing and interpreter scheduling. Architected using C# ASP.NET Web API backend with MongoDB for flexible data storage and Angular.js/Electron for cross-platform desktop client. Integrated Twilio Voice API for telephony features including call handling, queue management, and automated interpreter assignment. Implemented real-time call status tracking and reporting dashboard. Successfully deployed to production serving interpreter scheduling workflows.",
    shortDescription: "IVR system for Video Remote Interpreting with Twilio integration and cross-platform desktop client.",
    stacks: [
      "C#",
      "ASP.NET Web API",
      "Entity Framework",
      "Angular.Js",
      "Electron",
      "MongoDb",
      "Twilio Voice",
    ],
    image: "/assets/portfolio/webp/opiGateWay.webp",
    thumbImage: "/assets/portfolio/thumbnails/opiGateWay.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://opi.vrigateway.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date('2018-03-01'),
    endDate: new Date('2018-07-30'),
    inactivationReason: undefined,
  },
  {
    num: 14,
    category: "Full-Stack",
    title: "here'n'now",
    subtitle: "Live Engagement App with Cross-Platform Support",
    longDescription:
      "Contributed to the development of a live engagement app, working on both Frontend and Backend as a Full-Stack developer.",
    shortDescription: "Live engagement application with cross-platform support built using ASP.NET Web API backend, Angular.js frontend, Xamarin mobile apps, and Firebase integration (completed MVP).",
    stacks: [
      "C#",
      "ASP.NET Web API",
      "LINQ",
      "Entity Framework",
      "Angular.Js",
      "MSSQL",
      "Xamarin",
      "Firebase",
    ],
    image: "/assets/portfolio/webp/hnn.webp",
    thumbImage: "/assets/portfolio/thumbnails/hnn.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date('2018-02-01'),
    endDate: new Date('2018-10-30'),
    inactivationReason: "Successfully delivered MVP demonstrating concept viability; project completed technical objectives and provided valuable market validation.",
  },
  {
    num: 15,
    category: "Full-Stack",
    title: "reezcom",
    subtitle: "Resident Communication Platform for Property Management",
    longDescription:
      "Developed a resident communication platform concept for apartment complexes and office buildings, featuring emergency notifications, maintenance requests, and resident-to-management messaging. Built using ASP.NET Core backend with Entity Framework Core and Android mobile application. Implemented push notifications, real-time messaging, and ticket management workflows. Project involved database design, RESTful API development, and mobile UI implementation. Completed development phase; project remained unpublished due to client business decisions.",
    shortDescription: "Resident communication platform for property management with emergency notifications and maintenance requests.",
    stacks: ["C#", "ASP.NET Core", "Android", "Entity Framework Core", "MSSQL"],
    image: "/assets/portfolio/webp/reezcom.webp",
    thumbImage: "/assets/portfolio/thumbnails/reezcom.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date(),
    endDate: new Date(),
    inactivationReason: "Completed development phase; project remained unpublished due to client business decisions.",
  },
  {
    num: 16,
    category: "Full-Stack",
    title: "dobi",
    subtitle: "On-Demand Laundry Service with Real-Time Tracking",
    longDescription:
      "Architected an on-demand laundry service platform for Bangladesh market, featuring real-time order tracking, scheduling, and fleet management. Built full-stack solution with ASP.NET Core backend, Angular.js frontend, and Entity Framework Core for data persistence. Implemented geolocation-based pickup/delivery scheduling, customer/driver mobile interfaces, order workflow automation, and bulk service management for B2B clients (hotels, hospitals). Project included payment gateway integration, SMS notifications, and admin dashboard for operations management. Completed development phase; project remained unpublished due to business considerations.",
    shortDescription: "On-demand laundry service platform with real-time tracking and B2B bulk service management.",
    stacks: ["C#", "ASP.NET Core", "Angular.Js", "Entity Framework", "MSSQL"],
    image: "/assets/portfolio/webp/dobi.webp",
    thumbImage: "/assets/portfolio/thumbnails/dobi.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date(),
    endDate: new Date(),
    inactivationReason: "Delivered full-featured platform; business model validation led to project discontinuation.",
  },
  {
    num: 17,
    category: "Full-Stack",
    title: "World Tax Analyzer",
    subtitle: "International Tax Research Platform (100+ Jurisdictions)",
    longDescription:
      "Contributed to the development of RegAnalytics' flagship international tax research platform serving global tax professionals. Built features across the full stack including withholding tax calculators, multi-jurisdiction comparison tools, treaty analysis workflows, and regulatory update feeds. Implemented complex business logic for tax rule modeling across 100+ jurisdictions, including BEPS measures and EU Anti-Tax Avoidance Directive integration. Developed interactive UI components using Knockout.js for scenario analysis and multi-year projections. Worked with ASP.NET MVC backend, LINQ to SQL data access, and MSSQL database optimization for large regulatory datasets.",
    shortDescription: "International tax research platform covering 100+ jurisdictions with calculators and treaty analysis tools.",
    stacks: ["C#", "ASP.NET MVC", "Knockout.Js", "MSSQL", "Link To SQL"],
    image: "/assets/portfolio/webp/regfollower.webp",
    thumbImage: "/assets/portfolio/thumbnails/regfollower.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://www.reganalytics.com/world-tax-analyzer-wta",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date('2016-09-01'),
    endDate: new Date('2019-05-30'),
    inactivationReason: undefined,
  },
  {
    num: 18,
    category: "Full-Stack",
    title: "Transfer Pricing Analyzer",
    subtitle: "Compliance Platform for 108 Jurisdictions with FAR Analysis",
    longDescription:
      "Developed key features for RegAnalytics' transfer pricing compliance platform serving multinational corporations managing intercompany transactions across 108 jurisdictions. Built functionality for regulatory research, Functional Analysis Report (FAR) generation, BEPS Action Plan analysis, and compliance gap identification. Implemented jurisdiction comparison tools, document management for research results, and current awareness feed aggregating expert commentary. Created interactive workflows using ASP.NET MVC and Knockout.js for building transfer pricing documentation and regulatory frameworks. Optimized LINQ to SQL queries for efficient retrieval of complex regulatory data structures.",
    shortDescription: "Transfer pricing compliance platform with FAR analysis and regulatory research for 108 jurisdictions.",
    stacks: ["C#", "ASP.NET MVC", "Knockout.Js", "MSSQL", "Link To SQL"],
    image: "/assets/portfolio/webp/regfollower.webp",
    thumbImage: "/assets/portfolio/thumbnails/regfollower.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://www.reganalytics.com/tpa",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date('2016-09-01'),
    endDate: new Date('2019-05-30'),
    inactivationReason: undefined,
  },
  {
    num: 19,
    category: "Full-Stack",
    title: "Reganalytics Auth",
    subtitle: "Centralized SSO & RBAC for Product Suite",
    longDescription:
      "Architected and implemented a centralized authentication and subscription management system from the ground up for RegAnalytics' product suite (World Tax Analyzer, Transfer Pricing Analyzer, and other tools). Built using ASP.NET MVC and ASP.NET Web API with Entity Framework for data persistence. Designed and developed token-based authentication (JWT), single sign-on (SSO) across multiple products, role-based access control (RBAC), and subscription tier management. Implemented secure session handling, password policies, and audit logging for enterprise compliance. This internal platform streamlined user management across all RegAnalytics products, reducing authentication-related development effort for product teams by centralizing security concerns.",
    shortDescription:
      "Centralized authentication and subscription management system for RegAnalytics product suite with SSO and RBAC.",
    stacks: [
      "C#",
      "ASP.NET MVC",
      "ASP.NET Web API",
      "Entity Framework",
      "MSSQL",
    ],
    image: "/assets/portfolio/webp/reganalytics.webp",
    thumbImage: "/assets/portfolio/thumbnails/reganalytics.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date('2016-11-01'),
    endDate: new Date('2017-03-30'),
    inactivationReason: "This Project is running internally.",
  },
  {
    num: 20,
    category: "Full-Stack",
    title: "Notification Hub",
    subtitle: "Cross-Platform Push Notification Service (Android/iOS/Windows)",
    longDescription:
      "Designed and built a real-time notification service for cross-platform push notifications supporting Android (GCM), iOS (APNS), Windows, and web clients. Architected using Node.js with RabbitMQ for message queuing, Socket.io for WebSocket connections, and MongoDB for notification persistence. Implemented device registration, targeting logic, delivery tracking, and retry mechanisms for failed notifications. Created RESTful API for notification submission and management dashboard for monitoring delivery status. Service handled asynchronous notification processing with configurable priority queues. Deployed to production at Chorki Limited; company discontinued operations in 2016.",
    shortDescription:
      "Cross-platform real-time notification service supporting Android, iOS, Windows with queue-based delivery.",
    stacks: [
      "JavaScript",
      "RabbitMQ",
      "Socket.io",
      "Node.js",
      "MongoDB",
      "GCM",
    ],
    image: "/assets/portfolio/webp/chorki.webp",
    thumbImage: "/assets/portfolio/thumbnails/chorki.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Chorki Limited",
    jobRole: "Software Engineer",
    startDate: new Date('2015-06-01'),
    endDate: new Date('2015-10-31'),
    inactivationReason: "Delivered cross-platform real-time notification service as specified; project completed development milestone and transitioned to client maintenance.",
  },
  {
    num: 21,
    category: "Full-Stack",
    title: "News Aggregator",
    subtitle: "Multi-Source News Scraping & Aggregation System",
    longDescription: "",
    shortDescription:
      "Developed a system to scrape, aggregate, and store news from multiple sources for further processing.",
    stacks: ["JavaScript", "Node.js", "Express.js", "MySQL"],
    image: "/assets/portfolio/webp/chorki.webp",
    thumbImage: "/assets/portfolio/thumbnails/chorki.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Chorki Limited",
    jobRole: "Software Engineer",
    startDate: new Date(),
    endDate: new Date(),
    inactivationReason: "Successfully implemented news aggregation platform; project completed as planned and achieved technical requirements.",
  },
  {
    num: 22,
    category: "Full-Stack",
    title: "Whooza",
    subtitle: "Social & Professional Networking Platform MVP",
    longDescription: "",
    shortDescription:
      "Contributed to the development of an MVP for a platform combining social and professional networking features, working on both Frontend and Backend as a Full-Stack developer.",
    stacks: [
      "JavaScript",
      "AngularJs",
      "Socket.io",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
    ],
    image: "/assets/portfolio/webp/placeholderImage.webp",
    thumbImage: "/assets/portfolio/thumbnails/placeholderImage.webp",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Brain Station-23",
    jobRole: "Intern",
    startDate: new Date('2014-08-01'),
    endDate: new Date('2014-10-31'),
    inactivationReason: "Delivered social connection platform MVP; project completed contracted development phase and met initial business objectives.",
  },
  {
    num: 23,
    category: "Full-Stack",
    title: "BCPS Management Portal",
    longDescription: "",
    shortDescription:
      "Worked as a team player to implement new features and fixing bugs in new and existing features of the Management Portal of Bangladesh College of Physicians and Surgeons (BCPS)",
    stacks: ["C#", "ASP.NET MVC", "Entity Framework", "MSSQL", "HTML", "CSS"],
    image: "/assets/portfolio/webp/bcps.webp",
    thumbImage: "/assets/portfolio/thumbnails/bcps.webp",
    isActive: true,
    isOpenSource: false,
    url: "https://brainstation-23.com/portfolio-bcps/",
    github: "",
    associatedWithCompany: "Brain Station-23",
    jobRole: "Intern",
    startDate: new Date('2014-11-01'),
    endDate: new Date('2014-11-31'),
    inactivationReason: undefined,
  },
];

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.isFeatured === true);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: Project["category"]): Project[] => {
  return projects.filter(project => project.category === category);
};

// Helper function to get active projects
export const getActiveProjects = (): Project[] => {
  return projects.filter(project => project.isActive === true);
};

// Helper function to get open source projects
export const getOpenSourceProjects = (): Project[] => {
  return projects.filter(project => project.isOpenSource === true);
}; 