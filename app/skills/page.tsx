"use client";
import { motion } from "framer-motion";
import {
  FaAngular,
  FaAws,
  FaBootstrap,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDocker,
  FaExchangeAlt,
  FaFolder,
  FaFunnelDollar,
  FaGitAlt,
  FaGlobe,
  FaJs,
  FaLinux,
  FaMicrochip,
  FaProjectDiagram,
  FaReact,
  FaRegBuilding,
  FaRestroom,
  FaServer,
  FaSitemap,
  FaTools,
} from "react-icons/fa";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import {
  SiTypescript,
  SiBlazor,
  SiKubernetes,
  SiFramework,
  SiModal,
  SiAmazondynamodb,
  SiAngular,
  SiDotnet,
  SiJenkins,
  SiJira,
  SiMongodb,
  SiMysql,
  SiRabbitmq,
  SiReact,
  SiRedux,
  SiSqlite,
  SiTrpc,
  SiServerless,
  SiFrontendmentor,
  SiAmazonec2,
  SiAwslambda,
  SiAmazons3,
  SiAmazonsimpleemailservice,
  SiAmazonsqs,
  SiExpress,
} from "react-icons/si";
import { GrTest, GrVirtualMachine } from "react-icons/gr";
import { DiMsqlServer, DiDotnet, DiScrum, DiRedis } from "react-icons/di";
import { GiCogsplosion } from "react-icons/gi";
import { FaArrowsSpin } from "react-icons/fa6";
import { TbBrandCSharp, TbBrandLinqpad } from "react-icons/tb";
import { MdNotifications, MdSecurity } from "react-icons/md";
import TreeView, { flattenTree } from "react-accessible-treeview";

import React, { JSX } from "react";
import { PiKanban } from "react-icons/pi";

const skills1 = {
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

const skills2 = {
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

const withStyle = (Icon: JSX.Element) =>
  React.cloneElement(Icon, { className: "mr-5 text-secondary-default" });

const iconMap: { [key: string]: JSX.Element } = {
  FaFolder: withStyle(<FaFolder />),
  FaCode: withStyle(<FaCode />),
  FaJs: withStyle(<FaJs />),
  SiTypescript: withStyle(<SiTypescript />),
  SiBlazor: withStyle(<SiBlazor />),
  FaGitAlt: withStyle(<FaGitAlt />),
  FaDocker: withStyle(<FaDocker />),
  SiKubernetes: withStyle(<SiKubernetes />),
  TbBrandCSharp: withStyle(<TbBrandCSharp />),
  FaRegBuilding: withStyle(<FaRegBuilding />),

  // Frameworks
  FaReact: withStyle(<FaReact />),
  FaAngular: withStyle(<FaAngular />),
  DiDotnet: withStyle(<DiDotnet />),
  FaBootstrap: withStyle(<FaBootstrap />),
  FaGlobe: withStyle(<FaGlobe />),
  SiModal: withStyle(<SiModal />),
  SiExpress: withStyle(<SiExpress />),

  // Architectures/Patterns
  FaSitemap: withStyle(<FaSitemap />),
  FaMicrochip: withStyle(<FaMicrochip />),
  FaServer: withStyle(<FaServer />),
  FaExchangeAlt: withStyle(<FaExchangeAlt />),
  FaProjectDiagram: withStyle(<FaProjectDiagram />),
  FaCloud: withStyle(<FaCloud />),
  SiServerless: withStyle(<SiServerless />),

  // Databases
  FaDatabase: withStyle(<FaDatabase />),
  DiMsqlServer: withStyle(<DiMsqlServer />),
  SiMongodb: withStyle(<SiMongodb />),
  SiMysql: withStyle(<SiMysql />),
  SiAmazondynamodb: withStyle(<SiAmazondynamodb />),
  SiSqlite: withStyle(<SiSqlite />),

  // Cloud Platforms
  VscAzure: withStyle(<VscAzure />),
  GrVirtualMachine: withStyle(<GrVirtualMachine />),
  FaAws: withStyle(<FaAws />),
  SiAmazonec2: withStyle(<SiAmazonec2 />),
  SiAwslambda: withStyle(<SiAwslambda />),
  SiAmazons3: withStyle(<SiAmazons3 />),
  MdNotifications: withStyle(<MdNotifications />),
  SiAmazonsqs: withStyle(<SiAmazonsqs />),
  SiAmazonsimpleemailservice: withStyle(<SiAmazonsimpleemailservice />),
  MdSecurity: withStyle(<MdSecurity />),

  // DevOps & Tools
  FaTools: withStyle(<FaTools />),
  SiJenkins: withStyle(<SiJenkins />),
  SiJira: withStyle(<SiJira />),
  VscAzureDevops: withStyle(<VscAzureDevops />),

  // Front-End Technologies
  SiFrontendmentor: withStyle(<SiFrontendmentor />),
  SiReact: withStyle(<SiReact />),
  SiAngular: withStyle(<SiAngular />),
  SiRedux: withStyle(<SiRedux />),

  // Other Skills
  GiCogsplosion: withStyle(<GiCogsplosion />),
  SiDotnet: withStyle(<SiDotnet />),
  SiFramework: withStyle(<SiFramework />),
  FaRestroom: withStyle(<FaRestroom />),
  SiTrpc: withStyle(<SiTrpc />),
  SiRabbitmq: withStyle(<SiRabbitmq />),
  DiRedis: withStyle(<DiRedis />),
  FaFunnelDollar: withStyle(<FaFunnelDollar />),
  GrTest: withStyle(<GrTest />),
  FaLinux: withStyle(<FaLinux />),
  TbBrandLinqpad : withStyle(<TbBrandLinqpad  />),

  // Agile Methodologies
  FaArrowsSpin: withStyle(<FaArrowsSpin />),
  DiScrum: withStyle(<DiScrum />),
  PiKanban: withStyle(<PiKanban />),
};

const Skills = () => {
  const data1 = flattenTree(skills1);
  const data2 = flattenTree(skills2);
  const contentHeight = 800;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.2, ease: "easeIn" },
      }}
      className={`min-h-[${contentHeight}vh] flex flex-col py-5 xl:px-0 ${
        contentHeight > 800 ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-[#27272c] p-6 rounded-xl flex flex-col justify-between">
            <TreeView
              data={data1}
              defaultExpandedIds={data1.map((node) => node.id)}
              aria-label="Skills Tree"
              nodeRenderer={({ element, getNodeProps, level }) => {
                const isParent = element.children.length > 0;

                return (
                  <div
                    {...getNodeProps()}
                    style={{
                      paddingLeft: 50 * (level - 1),
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={
                      isParent
                        ? "text-[20px] font-bold leading-none text-white group hover:text-secondary-default cursor-pointer transition-all duration-500 mb-1 mt-4"
                        : "text-sm text-white/60 group hover:text-white/80 transition-all duration-500 mb-1"
                    }
                  >
                    {typeof element.metadata?.icon === "string" ? (
                      iconMap[element.metadata.icon]
                    ) : (
                      <FaCode style={{ marginRight: 10 }} />
                    )}
                    {element.name}
                  </div>
                );
              }}
            />
          </div>
          <div className="bg-[#27272c] p-6 rounded-xl flex flex-col justify-between">
            <TreeView
              data={data2}
              defaultExpandedIds={data1.map((node) => node.id)}
              aria-label="Skills Tree"
              nodeRenderer={({ element, getNodeProps, level }) => {
                const isParent = element.children.length > 0;

                return (
                  <div
                    {...getNodeProps()}
                    style={{
                      paddingLeft: 50 * (level - 1),
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={
                      isParent
                        ? "text-[20px] font-bold leading-none text-white group hover:text-secondary-default cursor-pointer transition-all duration-500 mb-1 mt-4"
                        : "text-sm text-white/60 group hover:text-white/80 transition-all duration-500 mb-1"
                    }
                  >
                    {typeof element.metadata?.icon === "string" ? (
                      iconMap[element.metadata.icon]
                    ) : (
                      <FaCode style={{ marginRight: 10 }} />
                    )}
                    {element.name}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
