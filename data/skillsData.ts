interface SkillNode {
  name: string;
  metadata?: { icon: string };
  children?: SkillNode[];
}

export const skills1 = {
  name: "",
  children: [
    {
      name: "Programming Languages",
      children: [
        { name: "C#", icon: "TbBrandCSharp" },
        { name: "JavaScript", icon: "FaJs" },
        { name: "TypeScript", icon: "SiTypescript" },
      ],
      icon: "FaCode",
    },
    {
      name: "Frameworks & Libraries",
      children: [
        { name: ".NET Core", icon: "DiDotnet" },
        { name: "ASP.NET Core", icon: "SiDotnet" },
        { name: "Entity Framework", icon: "SiFramework" },
        { name: "React", icon: "FaReact" },
        { name: "Angular", icon: "FaAngular" },
        { name: "Blazor", icon: "SiBlazor" },
        { name: "Bootstrap", icon: "FaBootstrap" },
        { name: "Material UI", icon: "SiModal" },
        { name: "Express.js", icon: "SiExpress" },
        { name: "Next.js", icon: "FaGlobe" },
        { name: "Redux", icon: "SiRedux" },
        { name: "tRPC", icon: "SiTrpc" },
      ],
      icon: "FaRegBuilding",
    },
    {
      name: "Architectures & Patterns",
      children: [
        { name: "Microservices", icon: "FaMicrochip" },
        { name: "Clean Architecture", icon: "FaSitemap" },
        { name: "Domain-Driven Design", icon: "FaProjectDiagram" },
        { name: "CQRS", icon: "FaExchangeAlt" },
        { name: "Event Sourcing", icon: "GiCogsplosion" },
        { name: "RESTful APIs", icon: "FaRestroom" },
        { name: "GraphQL", icon: "FaServer" },
        { name: "Serverless", icon: "SiServerless" },
      ],
      icon: "FaSitemap",
    },
    {
      name: "Databases",
      children: [
        { name: "SQL Server", icon: "DiMsqlServer" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "MySQL", icon: "SiMysql" },
        { name: "DynamoDB", icon: "SiAmazondynamodb" },
        { name: "SQLite", icon: "SiSqlite" },
        { name: "Redis", icon: "DiRedis" },
      ],
      icon: "FaDatabase",
    },
  ],
  icon: "FaFolder",
};

export const skills2 = {
  name: "",
  children: [
    {
      name: "Cloud Platforms",
      children: [
        { name: "Microsoft Azure", icon: "VscAzure" },
        { name: "Azure Functions", icon: "GrVirtualMachine" },
        { name: "Amazon Web Services", icon: "FaAws" },
        { name: "EC2", icon: "SiAmazonec2" },
        { name: "Lambda", icon: "SiAwslambda" },
        { name: "S3", icon: "SiAmazons3" },
        { name: "SNS", icon: "MdNotifications" },
        { name: "SQS", icon: "SiAmazonsqs" },
        { name: "SES", icon: "SiAmazonsimpleemailservice" },
        { name: "IAM", icon: "MdSecurity" },
      ],
      icon: "FaCloud",
    },
    {
      name: "DevOps & Tools",
      children: [
        { name: "Git", icon: "FaGitAlt" },
        { name: "Docker", icon: "FaDocker" },
        { name: "Kubernetes", icon: "SiKubernetes" },
        { name: "Jenkins", icon: "SiJenkins" },
        { name: "Azure DevOps", icon: "VscAzureDevops" },
        { name: "JIRA", icon: "SiJira" },
      ],
      icon: "FaTools",
    },
    {
      name: "Front-End Technologies",
      children: [
        { name: "HTML5/CSS3", icon: "SiFrontendmentor" },
        { name: "React", icon: "SiReact" },
        { name: "Angular", icon: "SiAngular" },
        { name: "Redux", icon: "SiRedux" },
      ],
      icon: "SiFrontendmentor",
    },
    {
      name: "Other Skills",
      children: [
        { name: "Message Queues", icon: "SiRabbitmq" },
        { name: "Payment Integration", icon: "FaFunnelDollar" },
        { name: "Unit Testing", icon: "GrTest" },
        { name: "Linux", icon: "FaLinux" },
        { name: "LINQPad", icon: "TbBrandLinqpad" },
      ],
      icon: "GiCogsplosion",
    },
    {
      name: "Agile Methodologies",
      children: [
        { name: "Agile", icon: "FaArrowsSpin" },
        { name: "Scrum", icon: "DiScrum" },
        { name: "Kanban", icon: "PiKanban" },
      ],
      icon: "FaArrowsSpin",
    },
  ],
  icon: "FaFolder",
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