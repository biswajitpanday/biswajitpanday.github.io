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
        { name: "ASP.NET Core", metadata: { icon: "SiDotnet", level: "Expert", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "ASP.NET MVC", metadata: { icon: "DiDotnet", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "Blazor", metadata: { icon: "SiBlazor", level: "Intermediate", yearsOfExperience: 2, lastUsed: "2024" } },
        { name: "Express.js", metadata: { icon: "SiExpress", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
      ],
    },
    {
      name: "Architectures/Patterns",
      metadata: { icon: "FaProjectDiagram" },
      children: [
        { name: "Domain Driven Design", metadata: { icon: "FaSitemap" } },
        { name: "Microservices", metadata: { icon: "FaMicrochip" } },
        { name: "Serverless", metadata: { icon: "SiServerless" } },
        { name: "CQRS", metadata: { icon: "FaProjectDiagram" } },
        { name: "Event-Driven", metadata: { icon: "FaExchangeAlt" } },
        { name: "Client-Server", metadata: { icon: "FaServer" } },
      ],
    },
    {
      name: "Programming Languages",
      metadata: { icon: "FaCode" },
      children: [
        { name: "C#", metadata: { icon: "TbBrandCSharp", level: "Expert", yearsOfExperience: 10, lastUsed: "Current" } },
        { name: "TypeScript", metadata: { icon: "SiTypescript", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" } },
        { name: "JavaScript", metadata: { icon: "FaJs", level: "Advanced", yearsOfExperience: 8, lastUsed: "Current" } },
        { name: "Python", metadata: { icon: "SiPython", level: "Intermediate", yearsOfExperience: 2, lastUsed: "Current" } },
      ],
    },
    {
      name: "Databases",
      metadata: { icon: "FaDatabase" },
      children: [
        { name: "MSSQL (Proficient)", metadata: { icon: "DiMsqlServer" } },
        { name: "MongoDB", metadata: { icon: "SiMongodb" } },
        { name: "DynamoDB", metadata: { icon: "SiAmazondynamodb" } },
        { name: "MySQL", metadata: { icon: "SiMysql" } },
        { name: "SQLite", metadata: { icon: "SiSqlite" } },
        { name: "BigQuery", metadata: { icon: "FaDatabase" } },
      ],
    },
    {
      name: "Agile Methodologies",
      metadata: { icon: "FaArrowsSpin" },
      children: [
        { name: "Scrum", metadata: { icon: "DiScrum" } },
        { name: "Kanban", metadata: { icon: "PiKanban" } },
      ],
    },
    {
      name: "Other Skills",
      metadata: { icon: "GiCogsplosion" },
      children: [
        { name: "Entity Framework Core", metadata: { icon: "SiDotnet" } },
        { name: "gRPC", metadata: { icon: "SiTrpc" } },
        { name: "SignalR & Socket.io", metadata: { icon: "SiDotnet" } },
        { name: "REST", metadata: { icon: "FaExchangeAlt" } },
        { name: "LINQ", metadata: { icon: "TbBrandLinqpad" } },
        { name: "RabbitMQ", metadata: { icon: "SiRabbitmq" } },
        { name: "Redis", metadata: { icon: "DiRedis" } },
        { name: "Linux", metadata: { icon: "FaLinux" } },
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
        { name: "Model Context Protocol (MCP)", metadata: { icon: "MCP" } },
        { name: "Claude AI & Agent Development", metadata: { icon: "ClaudeAI" } },
        { name: "AI Prompt Engineering", metadata: { icon: "SiOpenai" } },
        { name: "Cursor IDE & Rules", metadata: { icon: "Cursor" } },
        { name: "GitHub Copilot", metadata: { icon: "GoCopilot" } },
        { name: "AI Tool Development", metadata: { icon: "RiRobot3Fill" } },
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
        { name: "React", metadata: { icon: "SiReact", level: "Advanced", yearsOfExperience: 7, lastUsed: "Current" } },
        { name: "Next.js", metadata: { icon: "SiNextdotjs", level: "Advanced", yearsOfExperience: 4, lastUsed: "Current" } },
        { name: "Redux", metadata: { icon: "SiRedux", level: "Advanced", yearsOfExperience: 5, lastUsed: "Current" } },
        { name: "Angular", metadata: { icon: "SiAngular", level: "Advanced", yearsOfExperience: 6, lastUsed: "2024" } },
        { name: "Bootstrap", metadata: { icon: "FaBootstrap", level: "Advanced", yearsOfExperience: 8, lastUsed: "2024" } },
        { name: "Tailwind CSS", metadata: { icon: "TbBrandTailwind", level: "Advanced", yearsOfExperience: 3, lastUsed: "Current" } },
      ],
    },
    {
      name: "DevOps & Tools",
      metadata: { icon: "FaTools" },
      children: [
        { name: "Docker", metadata: { icon: "FaDocker" } },
        { name: "Git", metadata: { icon: "FaGitAlt" } },
        { name: "Azure DevOps", metadata: { icon: "VscAzureDevops" } },
        { name: "Jenkins", metadata: { icon: "SiJenkins" } },
        { name: "IIS", metadata: { icon: "FaServer" } },
        { name: "Jira", metadata: { icon: "SiJira" } },
      ],
    },
    {
      name: "Testing Tools",
      metadata: { icon: "SiTestinglibrary" },
      children: [
        { name: "Playwright", metadata: { icon: "FaVial" } },
        { name: "xUnit", metadata: { icon: "GrTest" } },
        { name: "NUnit", metadata: { icon: "FaFunnelDollar" } },
        { name: "Postman", metadata: { icon: "SiPostman" } },
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