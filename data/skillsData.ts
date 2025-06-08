interface SkillNode {
  name: string;
  metadata?: { icon: string };
  children?: SkillNode[];
}

export const skills1 = {
  name: "Skills",
  children: [
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
        { name: "C#", metadata: { icon: "TbBrandCSharp" } },
        { name: "TypeScript", metadata: { icon: "SiTypescript" } },
        { name: "JavaScript", metadata: { icon: "FaJs" } },
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

export const skills2 = {
  name: "Skills",
  children: [
    {
      name: "AI Development Tools",
      metadata: { icon: "FaRobot" },
      children: [
        { name: "GitHub Copilot", metadata: { icon: "FaGithub" } },
        { name: "Cursor IDE", metadata: { icon: "Cursor" } },
        { name: "ChatGPT", metadata: { icon: "SiOpenai" } },
        { name: "Azure OpenAI", metadata: { icon: "VscAzure" } },
        { name: "Claude API", metadata: { icon: "FaRobot" } },
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
            { name: "Azure Active Directory", metadata: { icon: "VscAzure" } },
            { name: "Azure DevOps", metadata: { icon: "VscAzureDevops" } },
            { name: "App Services", metadata: { icon: "VscAzure" } },
            { name: "Azure Functions", metadata: { icon: "FaServer" } },
            { name: "Virtual Machine", metadata: { icon: "GrVirtualMachine" } },
          ],
        },
        {
          name: "AWS",
          metadata: { icon: "FaAws" },
          children: [
            { name: "AWS Lambda", metadata: { icon: "SiAwslambda" } },
            { name: "Amazon S3", metadata: { icon: "SiAmazons3" } },
            { name: "Identity and access management (IAM)", metadata: { icon: "MdSecurity" } },
            { name: "Amazon Elastic Compute Cloud (EC2)", metadata: { icon: "SiAmazonec2" } },
            { name: "Amazon Simple Notification Service (SNS)", metadata: { icon: "MdNotifications" } },
            { name: "Amazon Simple Queue Service (SQS)", metadata: { icon: "SiAmazonsqs" } },
            { name: "Amazon Simple Email Service (SES)", metadata: { icon: "SiAmazonsimpleemailservice" } },
          ],
        },
      ],
    },
    {
      name: "Front-End Technologies",
      metadata: { icon: "SiFrontendmentor" },
      children: [
        { name: "React", metadata: { icon: "SiReact" } },
        { name: "Next.js", metadata: { icon: "SiNextdotjs" } },
        { name: "Redux", metadata: { icon: "SiRedux" } },
        { name: "Angular", metadata: { icon: "SiAngular" } },
        { name: "Bootstrap", metadata: { icon: "FaBootstrap" } },
        { name: "Tailwind CSS", metadata: { icon: "TbBrandTailwind" } },
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
      metadata: { icon: "FaVial" },
      children: [
        { name: "Playwright", metadata: { icon: "GrTest" } },
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
  const skills1Count = skills1.children.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0);

  const skills2Count = skills2.children.reduce((total, category) => {
    return total + countSkillsRecursively(category);
  }, 0);

  return skills1Count + skills2Count;
}; 