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
  category: "Full-Stack" | "Frontend" | "Backend" | "Mobile" | "Desktop Application";
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
  // Project-specific responsibilities and achievements
  responsibilities?: string[];
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
    responsibilities: [
      "Architected and published open-source TypeScript MCP server enabling real-time datetime access for AI assistants across multiple IDEs (Cursor, Claude Desktop, VS Code, Windsurf)",
      "Designed zero-configuration architecture with multi-format datetime support (ISO 8601, custom formats) and dual provider system (local/remote)",
      "Implemented Model Context Protocol (MCP) integration following industry standards for AI tool interoperability",
      "Published and maintained NPM package for the AI development community with comprehensive documentation and examples",
      "Built for AI, Built with AI - showcasing modern AI-assisted development workflow and best practices"
    ],
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
    category: "Desktop Application",
    title: "SpireWiz",
    subtitle: "AI-Powered Blueprint Upgrade Automation with Interactive TUI (80% Time Reduction)",
    longDescription: "Enterprise-grade AI-powered development tool that revolutionizes the Optimizely Configured Commerce (Spire) upgrade process through intelligent three-way merge automation. SpireWiz combines advanced AI conflict resolution with a professional Textual-based terminal UI, transforming 32-40 hours of manual merge work into an 8-hour automated workflow with human verification. The system employs a unified merge architecture with seven intelligent merge rules, leveraging OpenAI's GPT-4o API for semantic code analysis and conflict resolution. Built with Python 3.10+, the tool features comprehensive budget management ($5/session limit), 90%+ test coverage, and a modular provider-agnostic AI integration supporting multiple LLM backends. The interactive TUI provides real-time progress tracking, configuration management, and detailed merge analytics with success ratio reporting. Impact: Enables 20+ enterprise clients to adopt platform updates 5x faster while maintaining custom implementations, saving 32+ hours per upgrade cycle and accelerating the entire customer portfolio's upgrade timeline.",
    shortDescription: "AI-powered blueprint upgrade automation with professional TUI using GPT-4o, reducing Optimizely upgrade cycles from 40 hours to 8 hours (80% efficiency gain) for 20+ enterprise clients.",
    stacks: [
      "Python 3.10+",
      "OpenAI GPT-4o API",
      "Textual TUI Framework",
      "PyInstaller",
      "Pydantic (Type Safety)",
      "Pytest (90%+ Coverage)",
      "Git merge-file",
      "Structlog (Logging)",
      "Rich (Terminal UI)",
      "AI Prompt Engineering",
      "Three-Way Merge Algorithms",
      "Async I/O (aiohttp)"
    ],
    image: "/assets/portfolio/webp/spireWiz.webp",
    thumbImage: "/assets/portfolio/thumbnails/spireWiz.webp",
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
    responsibilities: [
      "Proactively identified upgrade process inefficiencies through daily work observation, independently architecting AI-powered solution that management later adopted company-wide",
      "Architected unified merge system (v3.0) with AI-powered conflict resolution using GPT-4o, reducing 40-hour upgrade process to 8 hours (80% efficiency gain)",
      "Designed and implemented professional Textual-based TUI with 9 interactive screens, custom widgets, and real-time merge analytics for enhanced developer experience",
      "Engineered provider-agnostic AI integration layer supporting OpenAI (primary), Gemini, and Anthropic with cost tracking, circuit breaker pattern, and $5/session budget management",
      "Developed comprehensive testing framework achieving 90%+ code coverage with unit, integration, and AI-specific test suites using pytest",
      "Built production-ready Windows executable with PyInstaller (35.5MB standalone), including PowerShell scripts for code signing and automated distribution to 20+ enterprise clients",
      "Consolidated codebase by 30.3% (4,497 lines removed), simplifying from 5-layer to 3-layer architecture while maintaining full feature parity and test coverage"
    ],
    metrics: {
      efficiency: "80% time reduction (40hrs → 8hrs)",
      users: "25+ enterprise clients",
      performance: "24+ hours saved per upgrade",
      other: [
        "90%+ test coverage",
        "30.3% codebase reduction",
        "34.4% avg success ratio",
        "$5 budget management",
        "9 interactive TUI screens"
      ]
    },
   testimonials: [
      {
        quote: "SpireWiz has completely transformed our upgrade workflow. The interactive UI makes complex merge operations intuitive, and the AI-powered conflict resolution is remarkably accurate. What used to take a full week now takes a single day.",
        author: "Development Team Lead",
        role: "Senior Technical Manager",
        company: "Optimizely",
        approved: true
      },
      {
        quote: "Both team members independently identified inefficiencies in our upgrade process and took initiative to develop solutions. This is exactly the kind of proactive thinking we need - finding ways to gain efficiencies and improve processes in daily work. The time savings and metrics they've delivered are remarkable.",
        author: "Suman Regulagadda",
        role: "Engineering Manager",
        company: "Optimizely",
        approved: false
      }
    ],
    caseStudy: {
      problem: "Upgrading Optimizely Configured Commerce blueprints for 20+ enterprise clients required 32-40 hours of manual Git three-way merge conflict resolution per upgrade cycle. This time-consuming process created a critical bottleneck preventing clients from adopting platform updates quickly, delaying the entire customer portfolio's upgrade timeline and limiting team capacity to serve multiple clients simultaneously. Each client maintained extensive customizations that conflicted with new platform updates, frustrating teams and preventing timely access to new features.",
      solution: "Built SpireWiz, a production-grade AI automation platform combining OpenAI's GPT-4o API with a professional Textual TUI. The system implements seven intelligent merge rules (preserve customizations, apply upgrades, propagate deletions, handle redundant customizations, manage refactoring, identify true conflicts, and maintain safety/failure modes) with comprehensive budget tracking and provider-agnostic architecture. Developers interact through an intuitive terminal UI with real-time progress, configuration management, and detailed analytics.",
      architectureDiagram: "graph TB\n      A[Developer] -->|Launch| B[SpireWiz Textual TUI]\n      B -->|Configure| C[Main Menu & Settings]\n      C -->|Start Merge| D[Merge Coordinator]\n      D -->|Scan Files| E[File Scanner]\n      E -->|Detect Changes| F[Change Detector]\n      F -->|Extract Conflicts| G[Conflict Extractor]\n      G -->|Send to AI| H[OpenAI GPT-4o API]\n      H -->|Resolve| I[AI Conflict Resolver]\n      I -->|Apply Rules| J[Unified Merge Engine]\n      J -->|Track Costs| K[Budget Manager]\n      K -->|Generate Output| L[Merge Results]\n      L -->|Display Analytics| M[Results Screen]\n      M -->|Review| A\n\n\n      style H fill:#4CAF50\n      style J fill:#2196F3\n      style B fill:#bd93f9\n      style M fill:#FF9800",
      results: [
        "Reduced upgrade time from 40 hours to 8 hours (80% efficiency gain, 32+ hours saved per cycle)",
        "Enabled 20+ enterprise clients to adopt platform updates 5x faster",
        "Achieved 34.4% average merge success ratio with intelligent conflict resolution",
        "Maintained 90%+ test coverage across 1,000+ lines of test code",
        "Implemented comprehensive budget management preventing cost overruns ($10/session limit)",
        "Created professional developer experience with 9-screen interactive TUI"
      ],
      technicalHighlights: [
        "Unified three-way merge architecture (1,400+ line consolidated implementation)",
        "Provider-agnostic AI integration supporting OpenAI, Gemini, Anthropic",
        "Professional Textual TUI with custom widgets, tooltips, and error recovery modals",
        "Advanced budget tracking with real-time cost monitoring and session limits",
        "Comprehensive testing: unit tests, integration tests, AI-specific test suites (90%+ coverage)",
        "Seven intelligent merge rules with semantic code analysis",
        "PyInstaller build system with code signing and automated distribution",
        "Type-safe configuration with Pydantic validation and INI format support"
      ]
    },
    recognition: [
      {
        title: "Proactive Innovation",
        description: "Self-initiated solution reducing 40-hour upgrade cycles to 8 hours",
        icon: "lightbulb",
        approved: true
      },
      {
        title: "Production Release v3.0.0",
        description: "Successfully deployed production-ready version with 30.3% codebase consolidation",
        icon: "rocket",
        approved: true
      },
      {
        title: "Architecture Innovation",
        description: "Simplified 5-layer architecture to 3-layer while maintaining feature parity",
        icon: "code",
        approved: true
      },
      {
        title: "Team Efficiency Impact",
        description: "Enabled 5x faster client upgrade delivery across entire portfolio",
        icon: "users",
        approved: true
      },
      {
        title: "Quality Excellence",
        description: "Maintained 90%+ test coverage through major refactoring",
        icon: "check-circle",
        approved: true
      }
    ],
    skillsHighlighted: [
      "AI/ML Integration",
      "Python Architecture",
      "Terminal UI/UX Design",
      "Git Internals",
      "API Design",
      "Test-Driven Development",
      "Cost Optimization"
    ]
  },
  {
    num: 3,
    category: "Full-Stack",
    title: "Configured Commerce",
    subtitle: "Enterprise B2B Platform for 20+ Fortune 500 Clients",
    isFeatured: true,
    longDescription: "Supporting 20+ enterprise B2B clients by implementing high-performance customizations on Optimizely's Configured Commerce platform. Responsible for hands-on development of customer-specific features, performance optimization, and technical solutions that enable Fortune 500 companies to scale their digital commerce operations. Key achievements include developing SpireWiz (AI-powered upgrade automation tool using GPT-5 that reduced upgrade time from 40 hours to 8 hoursâ€”an 80% efficiency gain), creating OpalSpark (a .NET 9 template framework that streamlines Opal platform development and eliminates authentication/setup complexity), and building integration tools that connect Sitecore CMS with Opal for seamless content management. Contributed to two successful system migrations achieving 55% average cost reduction for major clients while improving deployment efficiency and reducing error rates. Actively leveraging AI tools (Claude Code, Cursor, GitHub Copilot) to enhance team productivity, mentor developers through code reviews (15% defect reduction), and design scalable architecture patterns supporting global deployments. Technologies: C#, ASP.NET Core, .NET 9, WCF, React, Angular, TypeScript, Azure, MSSQL, Entity Framework Core, AI Integration (GPT-5, Claude AI), Opal Platform.",
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
    responsibilities: [
      "Architected and delivered custom B2B commerce features for 20+ Fortune 500 clients, optimizing catalog management, pricing engines, and ERP integrations at enterprise scale",
      "Led two successful system migrations achieving 55% average cost reduction for major clients while improving deployment efficiency and reducing error rates",
      "Mentored development team through rigorous code reviews and technical guidance, resulting in 15% defect reduction across key modules and improved team productivity",
      "Designed and implemented SpireWiz (AI-powered upgrade automation) and OpalSpark (.NET 9 template framework) tools adopted company-wide for development acceleration",
      "Built integration bridge connecting Sitecore CMS with Opal platform for seamless content management across global deployments",
      "Leveraged AI tools (Claude Code, Cursor, GitHub Copilot) to enhance team productivity and design scalable architecture patterns supporting worldwide operations"
    ],
    metrics: {
      users: "20+ Fortune 500 clients",
      revenue: "55% average cost reduction",
      performance: "15% defect reduction via code reviews",
      efficiency: "80% upgrade time savings (SpireWiz)",
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
      solution: "Built a comprehensive ecosystem of tools and customizations: (1) SpireWiz for automated upgrades, (2) OpalSpark template framework for rapid development, (3) Sitecore-Opal integration bridge for content management, (4) Performance optimization layer for global deployments. Leveraged AI tools (GPT-5, Claude Code) for enhanced productivity.",
      architectureDiagram: `graph LR
    A[Client] --> B[Opal Platform]
    B --> C[Custom Features]
    B --> D[SpireWiz Tool]
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
        "Enabled 80% faster upgrade cycles with SpireWiz automation",
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
        description: "Created SpireWiz & OpalSpark tools adopted company-wide",
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
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date('2023-05-01'),
    endDate: new Date('2023-08-31'),
    inactivationReason: undefined,
    responsibilities: [
      "Architected open-source Q&A platform from scratch demonstrating Clean Architecture, CQRS patterns, and domain-driven design principles",
      "Implemented full-stack solution using .NET 7 backend with Entity Framework Core and React 18 frontend with TypeScript for type safety",
      "Designed repository pattern with dependency injection for testability and maintainability across application layers",
      "Built real-time Q&A features with markdown support, code syntax highlighting, tagging/search, and JWT-based authentication",
      "Published on GitHub as reference implementation for building scalable, maintainable enterprise applications using modern best practices"
    ],
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
    responsibilities: [
      "Architected technology stack upgrade from legacy ASP.NET to modern ASP.NET MVC and Angular framework for enterprise M&A platform serving Fortune 500 clients",
      "Implemented features across 6 core modules: Pipeline Management, Due Diligence, Post-Merger Integrations, Synergy Tracking, Legal Workflow, and Reporting & Analytics",
      "Developed backend APIs and frontend Angular components delivering measurable efficiency: 56% faster due diligence, 48% shorter integrations, 7x deal volume increase",
      "Configured Azure DevOps CI/CD pipeline for automated deployments and integrated testing workflows",
      "Collaborated with USA-based client stakeholders to translate M&A process requirements into scalable technical deliverables"
    ],
    metrics: {
      efficiency: "56% faster due diligence",
      performance: "48% shorter integrations",
      other: ["7x deal volume increase", "6 integrated modules"]
    },
    skillsHighlighted: ["ASP.NET MVC", "Angular", "Azure DevOps", "M&A Platforms"],
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
    responsibilities: [
      "Led comprehensive modernization of legacy monolithic regulatory analytics platform to Microservices architecture, achieving 10x performance improvement",
      "Architected multi-container Docker deployment strategy enabling independent scaling and deployment of .NET 6, React, and Angular services",
      "Migrated platform to AWS cloud infrastructure with containerized services, enabling cross-platform deployment to both Linux and Windows environments",
      "Designed API gateway layer for microservices communication, implementing service discovery and load balancing for high availability",
      "Reduced deployment time from hours to minutes through automated CI/CD pipelines and infrastructure-as-code practices"
    ],
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
    responsibilities: [
      "Led backend development and deployment of electronic visit verification (EVV) platform for home care agencies to ensure Medicaid compliance",
      "Architected serverless backend using ASP.NET Core 3.1 with DynamoDB for flexible data storage and AWS Lambda for scalable processing",
      "Developed REST APIs supporting multi-platform clients (React web, Flutter mobile) for GPS-based visit tracking, caregiver scheduling, and patient documentation",
      "Implemented real-time visit validation workflows and automated compliance reporting for regulatory requirements",
      "Managed AWS deployment using CloudFormation for infrastructure-as-code, ensuring high availability and scalability"
    ],
    metrics: {
      performance: "Serverless AWS architecture for scalability",
      other: ["Multi-platform (Web + Mobile)", "Real-time visit verification"]
    },
    skillsHighlighted: ["AWS Lambda", "DynamoDB", "Serverless", "Healthcare Compliance"],
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
    responsibilities: [
      "Led development of emergency alert mobile application for Bangladesh Red Crescent Society (BDRCS) using Flutter with .NET 5 backend and Angular admin dashboard",
      "Architected clean architecture backend with Entity Framework Core and MySQL for reliable emergency communication workflows",
      "Designed and deployed serverless AWS infrastructure using Lambda, S3, RDS, and CloudFormation for scalability and high availability",
      "Implemented push notification system for critical emergency alerts and real-time communication features",
      "Delivered production system adhering to software best practices and disaster response requirements"
    ],
    skillsHighlighted: ["Flutter", ".NET 5", "AWS Serverless", "Emergency Systems"],
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
    responsibilities: [
      "Led modernization of Robi's Subscriber Verification System (SVS) serving millions of telecom users, migrating from .NET Framework to .NET Core 2.2 for cross-platform Linux deployment",
      "Developed and optimized REST APIs for high-throughput telecom operations, handling millions of daily verification requests with minimal latency",
      "Architected automated deployment pipeline for 40+ production servers using CI/CD practices, reducing deployment errors and downtime",
      "Implemented Entity Framework optimizations and Oracle Database query tuning for improved system performance and scalability",
      "Managed load-balanced infrastructure deployment enabling horizontal scaling for growing subscriber base"
    ],
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
    responsibilities: [
      "Led backend development for social platform combining Twitter, Yelp, and Facebook elements using Node.js, hapi.js, and MongoDB",
      "Architected scalable API layer supporting curated experience sharing, social feeds, and location-based recommendations",
      "Developed React frontend for responsive web experience with real-time updates and interactive user engagement features",
      "Deployed production infrastructure on AWS (EC2, S3, CloudFormation) ensuring high availability and performance at scale",
      "Managed full project lifecycle from architecture design through deployment and delivery"
    ],
    skillsHighlighted: ["Node.js", "hapi.js", "MongoDB", "Social Platforms"],
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
    responsibilities: [
      "Developed location-based e-commerce platform using MEAN stack (MongoDB, Express.js, Angular, Node.js) with Flutter mobile application",
      "Implemented geolocation features for proximity-based product discovery and location-aware shopping experiences",
      "Built RESTful APIs with Express.js for seamless integration between web and mobile clients",
      "Designed MongoDB schema for efficient product catalog management and user location data storage",
      "Contributed to both frontend and backend development as full-stack developer across web and mobile platforms"
    ],
    skillsHighlighted: ["MEAN Stack", "Flutter", "Geolocation", "E-Commerce"],
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
    responsibilities: [
      "Developed real-time audience engagement platform for live performances using ASP.NET WebAPI 2 backend and Angular.js frontend for USA-based performing arts startup",
      "Implemented cross-platform Xamarin mobile applications (iOS/Android) enabling real-time presenter-to-audience communication during events",
      "Built scalable AWS infrastructure (EC2, S3) supporting multiple concurrent events with real-time messaging capabilities",
      "Developed event management features, audience interaction workflows, and analytics dashboard using Entity Framework and MSSQL",
      "Contributed to full-stack development including API design, database schema, frontend UI, and mobile app deployment"
    ],
    skillsHighlighted: ["Xamarin", "ASP.NET WebAPI", "Real-Time Systems", "Event Management"],
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
    responsibilities: [
      "Developed Interactive Voice Response (IVR) system backend using ASP.NET Web API with MongoDB for VRI Gateway platform supporting 44 languages + ASL",
      "Integrated Twilio Voice API for automated call handling, intelligent queue management, and interpreter routing based on language requirements and availability",
      "Built cross-platform desktop client using Angular.js and Electron for interpreter dispatch management and real-time session monitoring",
      "Implemented call status tracking dashboard and reporting features for service quality metrics and performance analysis",
      "Delivered production system achieving 5.0/5.0 App Store rating, enabling access to hundreds of qualified interpreters globally"
    ],
    metrics: {
      performance: "Real-time interpreter routing",
      users: "44+ languages + ASL support",
      other: ["5.0/5.0 App Store rating", "Hundreds of global interpreters"]
    },
    skillsHighlighted: ["Twilio API", "Electron", "IVR Systems", "Multilingual Support"],
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
    responsibilities: [
      "Developed live engagement application using ASP.NET Web API backend with Angular.js frontend and Xamarin cross-platform mobile apps",
      "Implemented real-time features using Firebase for instant messaging and live event interactions",
      "Built authentication and authorization system using JWT with Entity Framework for user management",
      "Designed MSSQL database schema supporting engagement workflows, user profiles, and event tracking",
      "Contributed to MVP delivery demonstrating concept viability across web and mobile platforms"
    ],
    skillsHighlighted: ["Firebase", "Xamarin", "JWT Auth", "Live Engagement"],
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
    startDate: new Date('2018-06-01'),
    endDate: new Date('2018-12-31'),
    inactivationReason: "Completed development phase; project remained unpublished due to client business decisions.",
    responsibilities: [
      "Developed resident communication platform for property management using ASP.NET Core backend with Android mobile application",
      "Implemented emergency notification system with push notifications for urgent building-wide alerts and safety communications",
      "Built maintenance request workflows enabling residents to submit and track service tickets with real-time status updates",
      "Designed resident-to-management messaging system with Entity Framework Core and MSSQL for persistent communication history",
      "Completed development phase with full feature implementation for apartment complexes and office buildings"
    ],
    skillsHighlighted: ["ASP.NET Core", "Android", "Push Notifications", "Property Management"],
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
    startDate: new Date('2020-03-01'),
    endDate: new Date('2020-08-31'),
    inactivationReason: "Delivered full-featured platform; business model validation led to project discontinuation.",
    responsibilities: [
      "Architected on-demand laundry service platform for Bangladesh market using ASP.NET Core backend with Angular.js frontend",
      "Implemented geolocation-based pickup/delivery scheduling system for customer and driver mobile interfaces",
      "Developed order workflow automation supporting B2B clients (hotels, hospitals) with bulk service management capabilities",
      "Integrated payment gateway and SMS notification services for seamless customer experience and real-time order tracking",
      "Built admin dashboard for operations management using Entity Framework and MSSQL with fleet management features"
    ],
    skillsHighlighted: ["On-Demand Services", "Geolocation", "Payment Integration", "B2B Solutions"],
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
    responsibilities: [
      "Developed full-stack features for international tax research platform covering 100+ jurisdictions with 3,000+ bilateral treaty scenarios",
      "Implemented withholding tax calculators, CIT modeling, and passive income optimization tools using ASP.NET MVC backend and Knockout.js interactive UI",
      "Built complex business logic for tax rule modeling integrating BEPS measures and EU Anti-Tax Avoidance Directive requirements across jurisdictions",
      "Optimized MSSQL database queries using LINQ to SQL for efficient retrieval of large regulatory datasets including treaties, forms, and statutory excerpts",
      "Integrated with Regfollower news feed for multiple-times-weekly regulatory updates, enabling tax professionals to track compliance changes in real-time"
    ],
    metrics: {
      efficiency: "100+ jurisdictions coverage",
      performance: "3,000+ bilateral treaty scenarios",
      other: ["Weekly regulatory updates", "Multi-year tax projections"]
    },
    skillsHighlighted: ["Tax Compliance", "Knockout.js", "BEPS/ATAD", "Regulatory Research"],
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
    responsibilities: [
      "Developed transfer pricing compliance features for platform covering 108 jurisdictions, serving multinational corporations managing intercompany transactions",
      "Implemented Functional Analysis Report (FAR) data collection workflows and BEPS position assessment tools for group entities using ASP.NET MVC and Knockout.js",
      "Built regulatory framework builder enabling jurisdiction comparison with direct links to government source documents and expert commentary",
      "Created centralized project storage system for research results, compliance tracking, and curated news updates across all 108 jurisdictions",
      "Optimized LINQ to SQL queries for complex regulatory data retrieval including laws, regulations, treaty articles, and BEPS/ATAD provisions"
    ],
    metrics: {
      efficiency: "108 jurisdictions with FAR/BEPS analysis",
      performance: "Compliance gap identification",
      other: ["60% of $1B+ companies need better TP solutions", "Regulatory framework builder"]
    },
    skillsHighlighted: ["Transfer Pricing", "FAR Analysis", "BEPS Compliance", "Global Tax"],
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
    responsibilities: [
      "Architected centralized authentication and subscription management system from scratch for RegAnalytics product suite (WTA, TPA, and other tools)",
      "Implemented token-based authentication (JWT) and single sign-on (SSO) across multiple products using ASP.NET MVC and Web API",
      "Designed role-based access control (RBAC) and subscription tier management with Entity Framework for enterprise compliance",
      "Built secure session handling, password policies, and audit logging features meeting enterprise security requirements",
      "Reduced authentication-related development effort for product teams by centralizing security concerns across all RegAnalytics products"
    ],
    skillsHighlighted: ["SSO/JWT", "RBAC", "Security", "Enterprise Auth"],
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
    responsibilities: [
      "Designed and built real-time notification service supporting cross-platform push notifications (Android GCM, iOS APNS, Windows, web clients)",
      "Architected message queuing system using Node.js with RabbitMQ for asynchronous notification processing with configurable priority queues",
      "Implemented WebSocket connections using Socket.io for real-time delivery tracking and management dashboard monitoring",
      "Developed RESTful API for notification submission, device registration, targeting logic, and retry mechanisms for failed deliveries",
      "Deployed production service with MongoDB for notification persistence and delivery status tracking"
    ],
    skillsHighlighted: ["RabbitMQ", "Socket.io", "Push Notifications", "Message Queuing"],
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
    startDate: new Date('2015-06-01'),
    endDate: new Date('2015-10-31'),
    inactivationReason: "Successfully implemented news aggregation platform; project completed as planned and achieved technical requirements.",
    responsibilities: [
      "Developed multi-source news scraping and aggregation system using Node.js and Express.js for content processing pipeline",
      "Implemented web scraping algorithms extracting news articles from various sources with data normalization and deduplication",
      "Designed MySQL database schema for efficient storage and retrieval of aggregated news content with metadata indexing",
      "Built automated scheduling system for continuous news monitoring and real-time content updates"
    ],
    skillsHighlighted: ["Web Scraping", "Data Aggregation", "Content Processing", "Automation"],
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
    responsibilities: [
      "Implemented features for social and professional networking platform MVP combining Facebook-like social features with LinkedIn-style professional networking",
      "Developed full-stack features using MEAN stack (MongoDB, Express.js, Angular.js, Node.js) with real-time Socket.io messaging",
      "Fixed bugs in user profile management, connection workflows, and messaging features across frontend and backend",
      "Collaborated with development team to deliver MVP demonstrating platform concept and achieving initial business objectives"
    ],
    skillsHighlighted: ["MEAN Stack", "Socket.io", "Social Networking", "MVP Development"],
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
    responsibilities: [
      "Implemented new features for examination management system supporting FCPS/MCPS preliminary and final level exams for Bangladesh's premier medical education institution",
      "Fixed bugs in trainee registration workflows, online examination platform, and result management modules",
      "Developed administrative dashboard features for exam scheduling and candidate tracking across affiliated medical colleges and hospitals nationwide",
      "Collaborated with senior developers to deliver features supporting continuing professional development (CPD) programs and research dissertation tracking"
    ],
    metrics: {
      users: "National medical education institution",
      other: ["Since 1972", "FCPS/MCPS examination system"]
    },
    skillsHighlighted: ["ASP.NET MVC", "Entity Framework", "Medical Systems", "Education Platforms"],
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