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
  FaRocket,
  FaCogs,
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
import { skills1, skills2, countAllTechnologies } from "@/data/skillsData";

import React, { JSX } from "react";
import { PiKanban } from "react-icons/pi";

const withStyle = (Icon: JSX.Element) =>
  React.cloneElement(Icon, { className: "mr-3 text-secondary-default" });

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
  TbBrandLinqpad: withStyle(<TbBrandLinqpad />),

  // Agile Methodologies
  FaArrowsSpin: withStyle(<FaArrowsSpin />),
  DiScrum: withStyle(<DiScrum />),
  PiKanban: withStyle(<PiKanban />),
};

const Skills = () => {
  const data1 = flattenTree(skills1);
  const data2 = flattenTree(skills2);
  const totalTechnologies = countAllTechnologies();
  const totalCategories = skills1.children.length + skills2.children.length;

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      <div className="absolute top-20 left-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Skills Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Technical{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Expertise
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            A comprehensive overview of{" "}
            <span className="text-secondary-default font-semibold">
              technologies and frameworks
            </span>{" "}
            mastered through years of hands-on experience and{" "}
            <span className="text-secondary-default font-semibold">
              continuous learning
            </span>
          </motion.p>

          {/* Skills Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <div className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
              <div className="flex items-center gap-3">
                <FaCogs className="text-secondary-default text-xl group-hover:animate-spin" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalTechnologies}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Technologies
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
              <div className="flex items-center gap-3">
                <FaRocket className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalCategories}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Categories
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Trees */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-8 mb-5"
        >
          {/* First Skills Tree */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10 hover:scale-[1.02]"
          >
            {/* Category Badge */}
            {/* <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-default/15 to-blue-500/15 backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded text-sm font-semibold hover:bg-secondary-default/20 transition-all duration-300">
                <FaCode className="text-lg" />
                Core Technologies
              </span>
            </div> */}

            <TreeView
              data={data1}
              defaultExpandedIds={data1.map((node) => node.id)}
              aria-label="Core Technologies Skills Tree"
              nodeRenderer={({ element, getNodeProps, level }) => {
                const isParent = element.children.length > 0;

                return (
                  <motion.div
                    {...getNodeProps()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + level * 0.1, duration: 0.4 }}
                    style={{
                      paddingLeft: 40 * (level - 1),
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={
                      isParent
                        ? "text-lg font-bold leading-none text-white group hover:text-secondary-default cursor-pointer transition-all duration-300 mb-2 mt-1 hover:bg-white/5 p-2 rounded"
                        : "text-sm text-white/70 group hover:text-white/90 hover:bg-white/5 transition-all duration-300 mb-1 p-1 rounded cursor-default"
                    }
                  >
                    {typeof element.metadata?.icon === "string" ? (
                      iconMap[element.metadata.icon]
                    ) : (
                      <FaCode className="mr-3 text-secondary-default" />
                    )}
                    <span className="select-none">{element.name}</span>
                  </motion.div>
                );
              }}
            />
          </motion.div>

          {/* Second Skills Tree */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10 hover:scale-[1.02]"
          >
            {/* Category Badge */}
            {/* <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/15 to-secondary-default/15 backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded text-sm font-semibold hover:bg-secondary-default/20 transition-all duration-300">
                <FaTools className="text-lg" />
                Tools & Methodologies
              </span>
            </div> */}

            <TreeView
              data={data2}
              defaultExpandedIds={data2.map((node) => node.id)}
              aria-label="Tools & Methodologies Skills Tree"
              nodeRenderer={({ element, getNodeProps, level }) => {
                const isParent = element.children.length > 0;

                return (
                  <motion.div
                    {...getNodeProps()}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + level * 0.1, duration: 0.4 }}
                    style={{
                      paddingLeft: 40 * (level - 1),
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={
                      isParent
                        ? "text-lg font-bold leading-none text-white group hover:text-secondary-default cursor-pointer transition-all duration-300 mb-2 mt-1 hover:bg-white/5 p-2 rounded"
                        : "text-sm text-white/70 group hover:text-white/90 hover:bg-white/5 transition-all duration-300 mb-1 p-1 rounded cursor-default"
                    }
                  >
                    {typeof element.metadata?.icon === "string" ? (
                      iconMap[element.metadata.icon]
                    ) : (
                      <FaCode className="mr-3 text-secondary-default" />
                    )}
                    <span className="select-none">{element.name}</span>
                  </motion.div>
                );
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
