export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
  description?: string;
  skills?: string[];
  featured: boolean;
  image?: string;
  thumbImage?: string;
  category: "Professional" | "Course" | "Training";
  isUpcoming?: boolean;
  issuerLogo?: string;
  status?: "Active" | "Expired" | "Upcoming";
  onlineVerifiable?: boolean;
  certificationNumber?: string;
}


export const certifications: Certification[] = [
  // Professional Certifications (Featured)
  {
    id: 1,
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "2024-12",
    credentialId: "733CAA4F32A38510",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/biswajitpanday/733CAA4F32A38510",
    description: "Validated fundamental knowledge of cloud concepts, Azure services, Azure workloads, security and privacy in Azure, as well as Azure pricing and support.",
    skills: ["Cloud Computing", "Microsoft Azure", "Azure DevOps Services"],
    featured: true,
    image: "/assets/certificates/webp/microsoft-certified-fundamentals-badge.webp",
    thumbImage: "/assets/certificates/microsoft-certified-fundamentals-badge.svg",
    category: "Professional",
    issuerLogo: "/assets/logos/webp/microsoft.webp",
    status: "Active",
    onlineVerifiable: true,
    certificationNumber: "EDV661-807157"
  },
  {
    id: 2,
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "2025-06",
    description: "Planning to achieve this certification, demonstrating ability to design, build, test, and maintain cloud applications and services on Microsoft Azure.",
    skills: ["Azure App Service", "Azure Functions", "Azure Storage", "Azure Cosmos DB", "Azure Security"],
    featured: false,
    image: "/assets/certificates/microsoft-certified-associate-badge.svg",
    thumbImage: "/assets/certificates/microsoft-certified-associate-badge.svg",
    category: "Professional",
    isUpcoming: true,
    issuerLogo: "/assets/logos/webp/microsoft.webp",
    status: "Upcoming"
  },
  
  // LinkedIn Learning Certifications (Cloud & Azure)
  {
    id: 3,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 1 Cloud Concepts",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/b38946730810fd16bf9393b882fd6ba6405eafb0ab278f8a554b8e6d105e4c01?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering cloud computing concepts, models, and services.",
    skills: ["Cloud Computing", "Microsoft Azure", "IaaS", "PaaS", "SaaS"],
    featured: false,
    image: "/assets/certificates/webp/AZ-900_Cert_Prep-1.webp",
    thumbImage: "/assets/certificates/thumbnails/AZ-900_Cert_Prep-1.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 4,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 2 Azure Architecture and Security",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/29630430a80d2cc7fa742381da7a93f542fe0b6d6eb72f53350044f8bc511311?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering Azure architecture components and security features.",
    skills: ["Azure Architecture", "Azure Security", "Cloud Security"],
    featured: false,
    image: "/assets/certificates/webp/AZ-900_Cert_Prep-2.webp",
    thumbImage: "/assets/certificates/thumbnails/AZ-900_Cert_Prep-2.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 5,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 3 Azure Services",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/c02c3d84b3ce5f3e8d4d5ca40d8fa3ae853ed5ad90b8573ec5d6d3e19a8f1e1a?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering the core Azure services and products.",
    skills: ["Azure Services", "Cloud Computing", "Azure Solutions"],
    featured: false,
    image: "/assets/certificates/webp/AZ-900_Cert_Prep-3.webp",
    thumbImage: "/assets/certificates/thumbnails/AZ-900_Cert_Prep-3.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 6,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 4 Azure Management and Governance",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/1a2687046392f7ca9ef323dd6958ed6507dd5e950c6c9d41dd389761fdc1ccec?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering Azure management and governance capabilities.",
    skills: ["Azure Management", "Azure Governance", "Cost Management"],
    featured: false,
    image: "/assets/certificates/webp/AZ-900_Cert_Prep-4.webp",
    thumbImage: "/assets/certificates/thumbnails/AZ-900_Cert_Prep-4.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  
  // LinkedIn Learning Certifications (AI & Development)
  {
    id: 7,
    name: "AI Automation with Anthropic Claude API's Agentic Computer Use",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/3e42cd0c6527e43cd261f09aaa0df0e01bb0c6a2918920f58b8813cdec3285ba?trk=share_certificate",
    description: "Learned how to use Anthropic's Claude AI assistant APIs to build agentic applications that can perform computer tasks.",
    skills: ["AI Productivity", "Automation", "Application Programming Interfaces (API)", "Generative AI"],
    featured: true,
    image: "/assets/certificates/webp/ai-automation-with-antropic-claude-api.webp",
    thumbImage: "/assets/certificates/thumbnails/ai-automation-with-antropic-claude-api.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 8,
    name: "C# & .NET: Programming",
    issuer: "LinkedIn Learning",
    date: "2021-04",
    link: "https://www.linkedin.com/learning/certificates/f06b7d25ae718aab106abe4a89e90a9642a401dd0180a30e34a0c4a9a6848692?trk=share_certificate",
    description: "Comprehensive course covering C# programming fundamentals within the .NET ecosystem.",
    skills: ["ASP.NET MVC", "ASP.NET Web API", ".NET", ".NET Core", "Programming", ".NET Framework", "REST APIs", "Object-Oriented Programming (OOP)", "C#", "Clean code", "Visual Studio"],
    featured: false,
    image: "/assets/certificates/webp/c-sharp-and-dot-net.webp",
    thumbImage: "/assets/certificates/thumbnails/c-sharp-and-dot-net.png",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 9,
    name: "Advanced Design Patterns: Design Principles",
    issuer: "LinkedIn Learning",
    date: "2024-03",
    link: "https://www.linkedin.com/learning/certificates/b8e80a85b07e115f46e3615ccd7cdb40f3b2eeaf37e9d07ac030ca2edf1b29f5?trk=share_certificate",
    description: "Explored fundamental object-oriented design principles like encapsulation, inheritance, polymorphism, and SOLID principles.",
    skills: ["Software Design Patterns", "Java", "Object-Oriented Programming"],
    featured: false,
    image: "/assets/certificates/webp/advanced-design-patterns.webp",
    thumbImage: "/assets/certificates/thumbnails/advanced-design-patterns.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 10,
    name: "Software Architecture: Domain-Driven Design",
    issuer: "LinkedIn Learning",
    date: "2024-02",
    link: "https://www.linkedin.com/learning/certificates/66602a246a32525b7d000e517701c43333db58dbf6f42ae7b9cf3da7b72b88f5?trk=share_certificate",
    description: "Learned DDD architectural approaches for agile environments and microservices architecture.",
    skills: ["Domain-Driven Design (DDD)", "Software Architecture", "Microservices"],
    featured: false,
    image: "/assets/certificates/webp/domain-driven-design.webp",
    thumbImage: "/assets/certificates/thumbnails/domain-driven-design.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 11,
    name: "Git from Scratch",
    issuer: "LinkedIn Learning",
    date: "2023-09",
    link: "https://www.linkedin.com/learning/certificates/f1686ddc92a1117ace713d1365d0c69382583959ec0bd5a88f251755a71acd5a?trk=share_certificate",
    description: "Covered Git version control fundamentals and best practices for collaborative development.",
    skills: ["Git", "Version Control", "Software Development"],
    featured: false,
    image: "/assets/certificates/webp/git-from-scratch.webp",
    thumbImage: "/assets/certificates/thumbnails/git-from-scratch.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 12,
    name: "Learning BigQuery",
    issuer: "LinkedIn Learning",
    date: "2023-11",
    link: "https://www.linkedin.com/learning/certificates/24c4bbac905d8789d28f655fe8153c002ed5c33330898eb08b47b752e3f239e8?trk=share_certificate",
    description: "Explored Google BigQuery for large-scale data analytics and SQL querying.",
    skills: ["BigQuery", "Data Analytics", "SQL", "Cloud Computing"],
    featured: false,
    image: "/assets/certificates/webp/learning-bigquery.webp",
    thumbImage: "/assets/certificates/thumbnails/learning-bigquery.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 13,
    name: "C#: Design Patterns Part 1",
    issuer: "LinkedIn Learning",
    date: "2022-06",
    link: "https://www.linkedin.com/learning/certificates/e1725d9d8c545e555beba7a1a610682e21d8fddf119afe619a80acf8adbd79e7?trk=share_certificate",
    description: "Covered essential design patterns implementation in C# including creational and structural patterns.",
    skills: ["C#", "Design Patterns", "Software Architecture"],
    featured: false,
    image: "/assets/certificates/webp/csharp-design-patterns-1.webp",
    thumbImage: "/assets/certificates/thumbnails/csharp-design-patterns-1.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  
  // Pluralsight Certifications
  {
    id: 14,
    name: "Design Patterns Overview",
    issuer: "Pluralsight",
    date: "2020-06",
    link: "",
    description: "Mastered common design patterns implementation in C# for building maintainable and scalable applications.",
    skills: ["C#", "Design Patterns", "SOLID Principles"],
    featured: false,
    image: "/assets/certificates/webp/Pluralsight_Design-patterns-overview_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Pluralsight_Design-patterns-overview_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 15,
    name: "Building Cloud Native Solutions for Azure with Visual Studio",
    issuer: "Pluralsight",
    date: "2020-05",
    link: "",
    description: "Learned techniques for developing cloud-native applications using Visual Studio and Azure services.",
    skills: ["Azure", "Cloud-Native", "Visual Studio", ".NET"],
    featured: false,
    image: "/assets/certificates/webp/Building-cloud-native-solutions-azure-visual-studio_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Building-cloud-native-solutions-azure-visual-studio_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 16,
    name: "C# Generics",
    issuer: "Pluralsight",
    date: "2020-04",
    link: "",
    description: "Deep dive into C# generics for type-safe, reusable code patterns.",
    skills: ["C#", "Generics", ".NET"],
    featured: false,
    image: "/assets/certificates/webp/Csharp-generics_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Csharp-generics_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 17,
    name: "Docker and Kubernetes: The Big Picture",
    issuer: "Pluralsight",
    date: "2021-02",
    link: "",
    description: "Overview of container technologies and orchestration with Docker and Kubernetes.",
    skills: ["Docker", "Kubernetes", "Containerization", "DevOps"],
    featured: false,
    image: "/assets/certificates/webp/Docker and Kubernetes The Big Picture_Certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Docker and Kubernetes The Big Picture_Certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 18,
    name: "NPM Playbook",
    issuer: "Pluralsight",
    date: "2019-11",
    link: "",
    description: "Comprehensive guide to Node Package Manager for JavaScript development.",
    skills: ["NPM", "JavaScript", "Node.js"],
    featured: false,
    image: "/assets/certificates/webp/Npm-playbook_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Npm-playbook_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 19,
    name: "Object-Oriented Programming Fundamentals in C#",
    issuer: "Pluralsight",
    date: "2019-08",
    link: "",
    description: "Fundamentals of OOP concepts and implementation in C#.",
    skills: ["C#", "Object-Oriented Programming", "Software Design"],
    featured: false,
    image: "/assets/certificates/webp/Object-oriented-programming-fundamentals-csharp_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Object-oriented-programming-fundamentals-csharp_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 20,
    name: "React: The Big Picture",
    issuer: "Pluralsight",
    date: "2020-07",
    link: "",
    description: "Overview of React library, its ecosystem, and core concepts for front-end development.",
    skills: ["React", "JavaScript", "Front-End Development"],
    featured: false,
    image: "/assets/certificates/webp/React-big-picture_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/React-big-picture_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  
  // Other Training
  // {
  //   id: 21,
  //   name: "The Media Tech Challenge - Bootcamp 2019",
  //   issuer: "DW Akademie",
  //   date: "2019-03",
  //   link: "https://photos.google.com/share/AF1QipMfjpDJc24HF7qmJqWPpPze2C33m1_aqmi2BVmrnkP3jFOzSzcQ2ZX8Lr9PV2Xerg/photo/AF1QipOFmYBWp3wf3WkERvzrw8mvDTZVUD9deZMCVSH8?key=OVBSQXBFZW8zcnYybUpIVVFmeVVCaXg5c0tLWXFn",
  //   description: "Intensive bootcamp focused on media technology solutions and development.",
  //   skills: ["Media Technology", "Software Development", "Innovation"],
  //   featured: false,
  //   image: "/assets/certificates/webp/media-tech-challenge.jpg",
  //   category: "Training",
  //   issuerLogo: "/assets/logos/webp/dw-akademie.png",
  //   status: "Active"
  // },
  // {
  //   id: 22,
  //   name: "Training Program on OOP (MVC) PHP with CodeIgniter Framework",
  //   issuer: "BASIS",
  //   date: "2013-04",
  //   description: "Comprehensive training on object-oriented PHP development using the CodeIgniter MVC framework.",
  //   skills: ["Software Development Methodologies", "PHP", "CodeIgniter", "MVC"],
  //   featured: false,
  //   image: "/assets/certificates/webp/php-codeigniter.jpg",
  //   category: "Training",
  //   issuerLogo: "/assets/logos/webp/basis.png",
  //   status: "Active"
  // }
  
  // Additional Pluralsight Certifications from Extra directory
  {
    id: 21,
    name: "Object-Oriented Programming",
    issuer: "Pluralsight",
    date: "2020-03",
    link: "",
    description: "Comprehensive coverage of object-oriented programming principles and practices for modern software development.",
    skills: ["Object-Oriented Programming", "Software Design", "C#"],
    featured: false,
    image: "/assets/certificates/webp/OOP-Pluralsight_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/OOP-Pluralsight_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 22,
    name: "C# Design Patterns: Command Pattern",
    issuer: "Pluralsight",
    date: "2020-01",
    link: "",
    description: "In-depth study of the Command design pattern implementation in C# for encapsulating method calls as objects.",
    skills: ["C#", "Design Patterns", "Command Pattern", "Software Architecture"],
    featured: false,
    image: "/assets/certificates/webp/C-sharp-command-pattern_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/C-sharp-command-pattern_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 23,
    name: "C# Design Patterns: Strategy Pattern",
    issuer: "Pluralsight",
    date: "2020-02",
    link: "",
    description: "Mastering the Strategy pattern in C# to define a family of algorithms, encapsulate each one, and make them interchangeable.",
    skills: ["C#", "Design Patterns", "Strategy Pattern", "Software Architecture"],
    featured: false,
    image: "/assets/certificates/webp/C-sharp-design-patterns-strategy_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/C-sharp-design-patterns-strategy_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 24,
    name: "C# Design Patterns: Singleton Pattern",
    issuer: "Pluralsight",
    date: "2020-01",
    link: "",
    description: "Implementation of the Singleton design pattern in C# to ensure a class has only one instance while providing a global point of access to it.",
    skills: ["C#", "Design Patterns", "Singleton Pattern", "Software Architecture"],
    featured: false,
    image: "/assets/certificates/webp/C-sharp-design-patterns-singleton_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/C-sharp-design-patterns-singleton_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 25,
    name: "C# Fundamentals with C# 5.0",
    issuer: "Pluralsight",
    date: "2019-05",
    link: "",
    description: "Complete fundamentals of C# 5.0 programming, covering syntax, types, constructs, and language features.",
    skills: ["C#", ".NET Framework", "Visual Studio", "Programming Fundamentals"],
    featured: false,
    image: "/assets/certificates/webp/Csharp-fundamentals-csharp5_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Csharp-fundamentals-csharp5_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 26,
    name: "Entity Framework Migrations",
    issuer: "Pluralsight",
    date: "2019-09",
    link: "",
    description: "Understanding and implementing database migrations using Entity Framework for effective schema evolution.",
    skills: ["Entity Framework", "Database Migrations", ".NET", "C#"],
    featured: false,
    image: "/assets/certificates/webp/Efmigrations_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Efmigrations_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 27,
    name: "Authentication and Authorization in ASP.NET Core",
    issuer: "Pluralsight",
    date: "2020-05",
    link: "",
    description: "Implementing secure authentication and authorization mechanisms in ASP.NET Core applications.",
    skills: ["ASP.NET Core", "Authentication", "Authorization", "Security", "Identity"],
    featured: false,
    image: "/assets/certificates/webp/Authentication-authorization-aspnet-core_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Authentication-authorization-aspnet-core_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 28,
    name: "Azure Developer: Create Azure App Service Web Apps",
    issuer: "Pluralsight",
    date: "2020-08",
    link: "",
    description: "Creating and deploying web applications using Azure App Service with best practices and optimization techniques.",
    skills: ["Azure App Service", "Cloud Development", "Web Apps", "Azure", "DevOps"],
    featured: false,
    image: "/assets/certificates/webp/Azure-developer-create-azure-app-service-web-apps_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Azure-developer-create-azure-app-service-web-apps_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 29,
    name: "Microsoft Azure Developer: Implement IaaS Solutions",
    issuer: "Pluralsight",
    date: "2020-09",
    link: "",
    description: "Implementing Infrastructure as a Service (IaaS) solutions on Microsoft Azure including virtual machines, networking, and storage.",
    skills: ["Azure", "IaaS", "Cloud Infrastructure", "Virtual Machines", "Azure Networking"],
    featured: false,
    image: "/assets/certificates/webp/Microsoft-azure-developer-implement-iaas-solutions_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Microsoft-azure-developer-implement-iaas-solutions_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 30,
    name: "Angular and Web API: Front to Back",
    issuer: "Pluralsight",
    date: "2019-11",
    link: "",
    description: "Building complete web applications using Angular for front-end and ASP.NET Web API for back-end services.",
    skills: ["Angular", "ASP.NET Web API", "Full-Stack Development", "RESTful Services"],
    featured: false,
    image: "/assets/certificates/webp/Angular-web-api-front-back_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Angular-web-api-front-back_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 31,
    name: "AngularJS Line of Business Applications",
    issuer: "Pluralsight",
    date: "2019-10",
    link: "",
    description: "Developing enterprise-grade line of business applications using AngularJS framework.",
    skills: ["AngularJS", "Enterprise Applications", "Front-End Development", "JavaScript"],
    featured: false,
    image: "/assets/certificates/webp/Angularjs-line-of-business-applications_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Angularjs-line-of-business-applications_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 32,
    name: "Algorithms and Data Structures - Part 1",
    issuer: "Pluralsight",
    date: "2019-07",
    link: "",
    description: "Fundamentals of algorithms and data structures, including complexity analysis, arrays, linked lists, stacks, and queues.",
    skills: ["Algorithms", "Data Structures", "Computer Science", "Programming Fundamentals"],
    featured: false,
    image: "/assets/certificates/webp/Algorithms and Data Structures - Part 1_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Algorithms and Data Structures - Part 1_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 33,
    name: "Play by Play: Node.js and Web API with John Papa and Sam Artioli",
    issuer: "Pluralsight",
    date: "2019-06",
    link: "",
    description: "Expert demonstration of building Web APIs with Node.js by industry experts John Papa and Sam Artioli.",
    skills: ["Node.js", "Web API", "RESTful Services", "JavaScript", "Backend Development"],
    featured: false,
    image: "/assets/certificates/webp/Play-by-play-node-web-api-john-papa-sam-artioli_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Play-by-play-node-web-api-john-papa-sam-artioli_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 34,
    name: "Grunt: Introduction",
    issuer: "Pluralsight",
    date: "2019-04",
    link: "",
    description: "Introduction to Grunt.js task runner for automating JavaScript build processes and workflows.",
    skills: ["Grunt", "JavaScript", "Build Automation", "Web Development", "DevOps"],
    featured: false,
    image: "/assets/certificates/webp/Grunt-introduction_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Grunt-introduction_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 35,
    name: "Getting Started with Docker",
    issuer: "Pluralsight",
    date: "2020-10",
    link: "",
    description: "Introduction to Docker containers, images, and basic containerization concepts for application deployment.",
    skills: ["Docker", "Containerization", "DevOps", "Microservices", "CI/CD"],
    featured: false,
    image: "/assets/certificates/webp/Getting Started with Docker_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Getting Started with Docker_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 36,
    name: "Getting Started with Kubernetes",
    issuer: "Pluralsight",
    date: "2021-01",
    link: "",
    description: "Fundamentals of Kubernetes container orchestration platform for automating deployment, scaling, and management of containerized applications.",
    skills: ["Kubernetes", "Container Orchestration", "DevOps", "Cloud-Native", "Microservices"],
    featured: false,
    image: "/assets/certificates/webp/Getting Started with Kubernetes_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Getting Started with Kubernetes_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 37,
    name: "Kubernetes Installation and Configuration",
    issuer: "Pluralsight",
    date: "2021-02",
    link: "",
    description: "Detailed guide to installing, configuring, and maintaining Kubernetes clusters in production environments.",
    skills: ["Kubernetes", "Container Orchestration", "DevOps", "System Administration", "Cloud Infrastructure"],
    featured: false,
    image: "/assets/certificates/webp/Kubernetes Installation and Configuration_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Kubernetes Installation and Configuration_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 38,
    name: "Jira 8 Getting Started",
    issuer: "Pluralsight",
    date: "2021-03",
    link: "",
    description: "Introduction to Jira 8 for project management, issue tracking, and agile development workflows.",
    skills: ["Jira", "Project Management", "Agile Methodology", "Scrum", "Kanban"],
    featured: false,
    image: "/assets/certificates/webp/Jira 8 Getting Started_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Jira 8 Getting Started_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 39,
    name: "Managing Your Emotions at Work",
    issuer: "LinkedIn Learning",
    date: "2022-03",
    link: "https://www.linkedin.com/learning/certificates/06efe1bfab1804f793073aefabf34b6e2688e9be549fdeb92b2456fd9c8652f2?trk=share_certificate",
    description: "Strategies for effectively managing emotions in professional settings to improve workplace interactions and productivity.",
    skills: ["Emotional Intelligence", "Professional Development", "Workplace Communication", "Stress Management"],
    featured: false,
    image: "/assets/certificates/webp/CertificateOfCompletion_Managing Your Emotions at Work.webp",
    thumbImage: "/assets/certificates/thumbnails/CertificateOfCompletion_Managing Your Emotions at Work.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/linkedin.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 40,
    name: "NgConf Enterprise Session 05",
    issuer: "Pluralsight",
    date: "2019-02",
    link: "",
    description: "Advanced Angular concepts and best practices for enterprise applications from NgConf conference.",
    skills: ["Angular", "Enterprise Applications", "Front-End Development", "TypeScript"],
    featured: false,
    image: "/assets/certificates/webp/Ng-conf-enterprise-session-05_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Ng-conf-enterprise-session-05_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  },
  {
    id: 41,
    name: "NgConf Enterprise Session 07",
    issuer: "Pluralsight",
    date: "2019-03",
    link: "",
    description: "Enterprise-focused Angular development strategies and patterns from NgConf conference.",
    skills: ["Angular", "Enterprise Architecture", "Component Design", "State Management"],
    featured: false,
    image: "/assets/certificates/webp/Ng-conf-enterprise-session-07_certificate.webp",
    thumbImage: "/assets/certificates/thumbnails/Ng-conf-enterprise-session-07_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/webp/pluralsight.webp",
    status: "Active",
    onlineVerifiable: false
  }
];

// Helper function to get featured certifications
export const getFeaturedCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.featured);
};

// Helper function to get professional certifications
export const getProfessionalCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.category === "Professional");
};

// Helper function to get course certifications
export const getCourseCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.category === "Course");
};

// Helper function to get training certifications
export const getTrainingCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.category === "Training");
};

// Helper function to get upcoming certifications
export const getUpcomingCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.isUpcoming);
};

// Get the most recent certification (for banner)
export const getMostRecentCertification = (): Certification => {
  return certifications
    .filter(cert => cert.featured && !cert.isUpcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

// Get total certification counts by category
export const getCertificationCounts = () => {
  return {
    total: certifications.length,
    professional: getProfessionalCertifications().length,
    course: getCourseCertifications().length,
    training: getTrainingCertifications().length,
    upcoming: getUpcomingCertifications().length
  };
}; 