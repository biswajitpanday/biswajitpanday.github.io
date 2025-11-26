interface SkillNode {
  name: string;
  metadata?: {
    icon: string;
    level?: "Expert" | "Advanced" | "Intermediate" | "Familiar";
    yearsOfExperience?: number;
    lastUsed?: string; // e.g., "2024", "Current"
  };
  children?: SkillNode[];
}

export const skills1: SkillNode = {
  name: "Skills",
  children: [
    {
      name: "Frameworks",
      metadata: { icon: "SiFramework" },
      children: [
        // .NET Frameworks
        { name: "ASP.NET Core", metadata: { icon: "SiDotnet", level: "Expert", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "ASP.NET MVC", metadata: { icon: "DiDotnet", level: "Expert", yearsOfExperience: 6, lastUsed: "Current" } },
        { name: "Blazor", metadata: { icon: "SiBlazor", level: "Intermediate", yearsOfExperience: 2, lastUsed: "2024" } },

        // Frontend Frameworks
        { name: "React", metadata: { icon: "SiReact", level: "Expert", yearsOfExperience: 7, lastUsed: "Current" } },
        { name: "Next.js", metadata: { icon: "SiNextdotjs", level: "Advanced", yearsOfExperience: 3, lastUsed: "Current" } },
        { name: "Angular", metadata: { icon: "SiAngular", level: "Expert", yearsOfExperience: 7, lastUsed: "Current" } },

        // Backend Frameworks
        { name: "Express.js", metadata: { icon: "SiExpress", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
      ],
    },
    {
      name: "Backend Runtime & Platforms",
      metadata: { icon: "FaServer" },
      children: [
        { name: ".NET Core/.NET 6/7/8/9", metadata: { icon: "SiDotnet", level: "Expert", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "Node.js", metadata: { icon: "FaNodeJs", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
      ],
    },
    {
      name: "Architectures/Patterns",
      metadata: { icon: "FaProjectDiagram" },
      children: [
        { name: "Domain Driven Design", metadata: { icon: "FaSitemap", level: "Expert", yearsOfExperience: 6, lastUsed: "Current" } },
        { name: "Microservices", metadata: { icon: "FaMicrochip", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "Serverless", metadata: { icon: "SiServerless", level: "Advanced", yearsOfExperience: 4, lastUsed: "Current" } },
        { name: "CQRS", metadata: { icon: "FaProjectDiagram", level: "Advanced", yearsOfExperience: 4, lastUsed: "Current" } },
        { name: "Event-Driven", metadata: { icon: "FaExchangeAlt", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "Clean Architecture", metadata: { icon: "FaSitemap", level: "Expert", yearsOfExperience: 6, lastUsed: "Current" } },
      ],
    },
    {
      name: "Programming Languages",
      metadata: { icon: "FaCode" },
      children: [
        { name: "C#", metadata: { icon: "TbBrandCSharp", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "TypeScript", metadata: { icon: "SiTypescript", level: "Expert", yearsOfExperience: 7, lastUsed: "Current" } },
        { name: "JavaScript", metadata: { icon: "FaJs", level: "Advanced", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "Python", metadata: { icon: "SiPython", level: "Intermediate", yearsOfExperience: 2, lastUsed: "Current" } },
        { name: "Go", metadata: { icon: "SiGo", level: "Intermediate", yearsOfExperience: 1, lastUsed: "2023" } },
        { name: "Java", metadata: { icon: "FaJava", level: "Familiar", yearsOfExperience: 1, lastUsed: "2018" } },
      ],
    },
    {
      name: "Databases",
      metadata: { icon: "FaDatabase" },
      children: [
        { name: "SQL Server", metadata: { icon: "DiMsqlServer", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "MongoDB", metadata: { icon: "SiMongodb", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "Elasticsearch", metadata: { icon: "SiElasticsearch", level: "Intermediate", yearsOfExperience: 2, lastUsed: "2023" } },
        { name: "DynamoDB", metadata: { icon: "SiAmazondynamodb", level: "Intermediate", yearsOfExperience: 3, lastUsed: "Current" } },
        { name: "MySQL", metadata: { icon: "SiMysql", level: "Intermediate", yearsOfExperience: 4, lastUsed: "2024" } },
        { name: "BigQuery", metadata: { icon: "FaDatabase", level: "Intermediate", yearsOfExperience: 2, lastUsed: "2024" } },
        { name: "SQLite", metadata: { icon: "SiSqlite", level: "Familiar", yearsOfExperience: 2, lastUsed: "2023" } },
      ],
    },
    {
      name: "Agile Methodologies",
      metadata: { icon: "FaArrowsSpin" },
      children: [
        { name: "Scrum", metadata: { icon: "DiScrum", level: "Expert", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "Kanban", metadata: { icon: "PiKanban", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
      ],
    },
    {
      name: "Other Skills",
      metadata: { icon: "GiCogsplosion" },
      children: [
        { name: "Entity Framework Core", metadata: { icon: "SiDotnet", level: "Expert", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "gRPC", metadata: { icon: "SiTrpc", level: "Advanced", yearsOfExperience: 4, lastUsed: "Current" } },
        { name: "SignalR & Socket.io", metadata: { icon: "SiDotnet", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "REST API Design", metadata: { icon: "FaExchangeAlt", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "LINQ", metadata: { icon: "TbBrandLinqpad", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "RabbitMQ", metadata: { icon: "SiRabbitmq", level: "Intermediate", yearsOfExperience: 3, lastUsed: "2024" } },
        { name: "Redis", metadata: { icon: "DiRedis", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "Linux", metadata: { icon: "FaLinux", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
      ],
    },
  ],
};

export const skills2: SkillNode = {
  name: "Skills",
  children: [
    {
      name: "AI/ML Technologies",
      metadata: { icon: "RiRobot3Fill" },
      children: [
        // Published NPM packages & MCP expertise
        { name: "Model Context Protocol (MCP)", metadata: { icon: "MCP", level: "Expert", yearsOfExperience: 2, lastUsed: "Current" } },
        { name: "AI Tool Development", metadata: { icon: "RiRobot3Fill", level: "Advanced", yearsOfExperience: 2, lastUsed: "Current" } },

        // AI API & Agent Development
        { name: "ChatGPT API Integration", metadata: { icon: "SiOpenai", level: "Advanced", yearsOfExperience: 2, lastUsed: "Current" } },
        { name: "Claude AI & Agent Development", metadata: { icon: "ClaudeAI", level: "Advanced", yearsOfExperience: 1, lastUsed: "Current" } },
        { name: "AI Prompt Engineering", metadata: { icon: "SiOpenai", level: "Advanced", yearsOfExperience: 2, lastUsed: "Current" } },

        // AI-Powered IDEs
        { name: "GitHub Copilot", metadata: { icon: "GoCopilot", level: "Advanced", yearsOfExperience: 2, lastUsed: "Current" } },
        { name: "Cursor IDE & AI Rules", metadata: { icon: "Cursor", level: "Advanced", yearsOfExperience: 1, lastUsed: "Current" } },
      ],
    },
    {
      name: "Cloud Platforms",
      metadata: { icon: "FaCloud" },
      children: [
        {
          name: "Azure",
          metadata: { icon: "VscAzure", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" },
          children: [
            { name: "Azure Active Directory", metadata: { icon: "VscAzure", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
            { name: "Azure DevOps", metadata: { icon: "VscAzureDevops", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
            { name: "App Services", metadata: { icon: "VscAzure", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
            { name: "Azure Functions", metadata: { icon: "FaServer", level: "Intermediate", yearsOfExperience: 4, lastUsed: "Current" } },
            { name: "Virtual Machine", metadata: { icon: "GrVirtualMachine", level: "Intermediate", yearsOfExperience: 5, lastUsed: "Current" } },
          ],
        },
        {
          name: "AWS",
          metadata: { icon: "FaAws", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" },
          children: [
            { name: "AWS Lambda", metadata: { icon: "SiAwslambda", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
            { name: "Amazon S3", metadata: { icon: "SiAmazons3", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" } },
            { name: "Identity and access management (IAM)", metadata: { icon: "MdSecurity", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" } },
            { name: "Amazon Elastic Compute Cloud (EC2)", metadata: { icon: "SiAmazonec2", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" } },
            { name: "Amazon Simple Notification Service (SNS)", metadata: { icon: "MdNotifications", level: "Intermediate", yearsOfExperience: 5, lastUsed: "Current" } },
            { name: "Amazon Simple Queue Service (SQS)", metadata: { icon: "SiAmazonsqs", level: "Intermediate", yearsOfExperience: 5, lastUsed: "Current" } },
            { name: "Amazon Simple Email Service (SES)", metadata: { icon: "SiAmazonsimpleemailservice", level: "Intermediate", yearsOfExperience: 4, lastUsed: "2024" } },
          ],
        },
      ],
    },
    {
      name: "Front-End Technologies",
      metadata: { icon: "SiFrontendmentor" },
      children: [
        { name: "Redux", metadata: { icon: "SiRedux", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "React Query", metadata: { icon: "SiReactquery", level: "Advanced", yearsOfExperience: 3, lastUsed: "Current" } },
        { name: "Bootstrap", metadata: { icon: "FaBootstrap", level: "Advanced", yearsOfExperience: 8, lastUsed: "2024" } },
        { name: "Tailwind CSS", metadata: { icon: "TbBrandTailwind", level: "Advanced", yearsOfExperience: 3, lastUsed: "Current" } },
        { name: "Framer Motion", metadata: { icon: "SiFramer", level: "Advanced", yearsOfExperience: 2, lastUsed: "Current" } },
      ],
    },
    {
      name: "DevOps & Containerization",
      metadata: { icon: "FaDocker" },
      children: [
        { name: "Docker", metadata: { icon: "FaDocker", level: "Advanced", yearsOfExperience: 3, lastUsed: "Current" } },
        { name: "Docker Compose", metadata: { icon: "FaDocker", level: "Advanced", yearsOfExperience: 3, lastUsed: "Current" } },
        { name: "Git & GitHub", metadata: { icon: "FaGitAlt", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "Azure DevOps Pipelines", metadata: { icon: "VscAzureDevops", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
        { name: "CI/CD", metadata: { icon: "FaCodeBranch", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
        { name: "Jenkins", metadata: { icon: "SiJenkins", level: "Intermediate", yearsOfExperience: 3, lastUsed: "2024" } },
        { name: "IIS", metadata: { icon: "FaServer", level: "Advanced", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "Kubernetes (basics)", metadata: { icon: "SiKubernetes", level: "Familiar", yearsOfExperience: 1, lastUsed: "2024" } },
      ],
    },
    {
      name: "Testing Tools",
      metadata: { icon: "SiTestinglibrary" },
      children: [
        { name: "Playwright", metadata: { icon: "FaVial", level: "Intermediate", yearsOfExperience: 2, lastUsed: "Current" } },
        { name: "xUnit", metadata: { icon: "GrTest", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
        { name: "NUnit", metadata: { icon: "FaFunnelDollar", level: "Advanced", yearsOfExperience: 7, lastUsed: "2024" } },
        { name: "Postman", metadata: { icon: "SiPostman", level: "Advanced", yearsOfExperience: 8, lastUsed: "Current" } },
      ],
    },
    {
      name: "Project Management Tools",
      metadata: { icon: "SiJira" },
      children: [
        { name: "Jira", metadata: { icon: "SiJira", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" } },
        { name: "Confluence", metadata: { icon: "SiConfluence", level: "Advanced", yearsOfExperience: 6, lastUsed: "Current" } },
        { name: "Azure Boards", metadata: { icon: "VscAzureDevops", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
      ],
    },
  ],
};

// Helper function to count all technologies from skills data
export const countAllTechnologies = () => {
  const countSkillsRecursively = (skillNode: SkillNode): number => {
    let count = 0;

    if (skillNode.children && skillNode.children.length > 0) {
      // If it has children, count them recursively
      skillNode.children.forEach((child: SkillNode) => {
        count += countSkillsRecursively(child);
      });
    } else {
      // If it's a leaf node (no children), count it as 1 technology
      count = 1;
    }

    return count;
  };

  // Count technologies from both skill trees
  const skills1Count = skills1.children?.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0) || 0;

  const skills2Count = skills2.children?.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0) || 0;

  return skills1Count + skills2Count;
};
