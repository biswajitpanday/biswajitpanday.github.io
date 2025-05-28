interface SkillNode {
  name: string;
  metadata?: { icon: string };
  children?: SkillNode[];
}

export const skills1 = {
  name: "Skills",
  children: [
    {
      name: "Programming Languages",
      metadata: { icon: "FaCode" },
      children: [
        { name: "C#", metadata: { icon: "TbBrandCSharp" } },
        { name: "JavaScript", metadata: { icon: "FaJs" } },
        { name: "TypeScript", metadata: { icon: "SiTypescript" } },
      ],
    },
    {
      name: "Frameworks",
      metadata: { icon: "SiFramework" },
      children: [
        { name: "ASP.NET Core", metadata: { icon: "SiDotnet" } },
        { name: "ASP.NET MVC", metadata: { icon: "DiDotnet" } },
        { name: "Blazor", metadata: { icon: "SiBlazor" } },
        { name: "Express.js", metadata: { icon: "SiExpress" } },
      ],
    },
    {
      name: "Architectures/Patterns",
      metadata: { icon: "FaProjectDiagram" },
      children: [
        { name: "Domain Driven Design", metadata: { icon: "FaSitemap" } },
        { name: "Microservices", metadata: { icon: "FaMicrochip" } },
        { name: "Client-Server", metadata: { icon: "FaServer" } },
        { name: "Event-Driven", metadata: { icon: "FaExchangeAlt" } },
        { name: "CQRS", metadata: { icon: "FaProjectDiagram" } },
        { name: "Serverless", metadata: { icon: "SiServerless" } },
      ],
    },
    {
      name: "Databases",
      metadata: { icon: "FaDatabase" },
      children: [
        {
          name: "MSSQL (Proficient)",
          metadata: { icon: "DiMsqlServer" },
        },
        { name: "MongoDB", metadata: { icon: "SiMongodb" } },
        { name: "MySQL", metadata: { icon: "SiMysql" } },
        { name: "DynamoDB", metadata: { icon: "SiAmazondynamodb" } },
        { name: "SQLite", metadata: { icon: "SiSqlite" } },
      ],
    },
    {
      name: "Cloud Platforms",
      metadata: { icon: "FaCloud" },
      children: [
        {
          name: "Azure",
          metadata: { icon: "VscAzure" },
          children: [
            {
              name: "Virtual Machine",
              metadata: { icon: "GrVirtualMachine" },
            },
            {
              name: "Azure Active Directory",
              metadata: { icon: "VscAzure" },
            },
            {
              name: "Azure DevOps",
              metadata: { icon: "VscAzureDevops" },
            },
            {
              name: "App Services",
              metadata: { icon: "VscAzure" },
            },
          ],
        },
        {
          name: "AWS",
          metadata: { icon: "FaAws" },
          children: [
            {
              name: "Identity and access management (IAM)",
              metadata: { icon: "MdSecurity" },
            },
            {
              name: "Amazon Elastic Compute Cloud (EC2)",
              metadata: { icon: "SiAmazonec2" },
            },
            {
              name: "AWS Lambda",
              metadata: { icon: "SiAwslambda" },
            },
            {
              name: "Amazon S3",
              metadata: { icon: "SiAmazons3" },
            },
            {
              name: "Amazon Simple Notification Service (SNS)",
              metadata: { icon: "MdNotifications" },
            },
            {
              name: "Amazon Simple Queue Service (SQS)",
              metadata: { icon: "SiAmazonsqs" },
            },
            {
              name: "Amazon Simple Email Service (SES)",
              metadata: { icon: "SiAmazonsimpleemailservice" },
            },
          ],
        },
      ],
    },
  ],
};

export const skills2 = {
  name: "Skills",
  children: [
    {
      name: "DevOps & Tools",
      metadata: { icon: "FaTools" },
      children: [
        { name: "Git", metadata: { icon: "FaGitAlt" } },
        { name: "Azure DevOps", metadata: { icon: "VscAzureDevops" } },
        { name: "Docker", metadata: { icon: "FaDocker" } },
        { name: "Jenkins", metadata: { icon: "SiJenkins" } },
        { name: "IIS", metadata: { icon: "FaServer" } },
        { name: "Jira", metadata: { icon: "SiJira" } },
      ],
    },
    {
      name: "Front-End Technologies",
      metadata: { icon: "SiFrontendmentor" },
      children: [
        { name: "React", metadata: { icon: "SiReact" } },
        { name: "Angular", metadata: { icon: "SiAngular" } },
        { name: "Redux", metadata: { icon: "SiRedux" } },
        { name: "Bootstrap", metadata: { icon: "FaBootstrap" } },
      ],
    },
    {
      name: "Other Skills",
      metadata: { icon: "GiCogsplosion" },
      children: [
        { name: "SignalR & Socket.io", metadata: { icon: "SiDotnet" } },
        { name: "Entity Framework Core", metadata: { icon: "SiDotnet" } },
        { name: "REST", metadata: { icon: "FaExchangeAlt" } },
        { name: "gRPC", metadata: { icon: "SiTrpc" } },
        { name: "LINQ", metadata: { icon: "TbBrandLinqpad" } },
        { name: "RabbitMQ", metadata: { icon: "SiRabbitmq" } },
        { name: "Redis", metadata: { icon: "DiRedis" } },
        { name: "NUnit", metadata: { icon: "FaFunnelDollar" } },
        { name: "xUnit", metadata: { icon: "GrTest" } },
        { name: "Linux", metadata: { icon: "FaLinux" } },
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
  const skills1Count = skills1.children.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0);

  const skills2Count = skills2.children.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0);

  return skills1Count + skills2Count;
}; 