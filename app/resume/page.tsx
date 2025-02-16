"use client";

import { FaCss3, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { calculateDuration } from "@/helpers/utility";

const about = {
  title: "About me",
  description:
    "I am Biswajit Panday, a seasoned software developer with over 10 years of experience in the industry. I specialize in web, mobile, and desktop application development, and have a strong background in artificial intelligence. I am passionate about creating innovative solutions that drive business success. I am available for freelance projects and fluent in both English and Bengali.",
  info: [
    { fieldName: "Name", fieldValue: "Biswajit Panday" },
    { fieldName: "Phone", fieldValue: "+880 1681642502" },
    { fieldName: "Skype", fieldValue: "biswajit_panday" },
    { fieldName: "Experience", fieldValue: "10+ Years" },
    { fieldName: "Nationality", fieldValue: "Bangladeshi" },
    { fieldName: "Email", fieldValue: "biswajitmailid@gmail.com" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Language", fieldValue: "English, Bengali" },
  ],
};

const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description: "sei sei experience ache amar.",
  items: [
    {
      company: "Optimizely",
      position: "Senior Developer",
      location: "Dhaka, Bangladesh",
      startDate: new Date(2023, 3, 1),
      endDate: new Date(),
    },
    {
      company: "Kaz Software",
      position: "Senior Software Engineer",
      location: "Dhaka, Bangladesh",
      startDate: new Date(2016, 5, 1),
      endDate: new Date(2023, 2, 30),
    },
    {
      company: "Chorki Limited",
      position: "Software Engineer",
      location: "Dhaka, Bangladesh",
      startDate: new Date(2015, 5, 1),
      endDate: new Date(2016, 4, 30),
    },
    {
      company: "Brain Station-23",
      position: "Intern",
      location: "Dhaka, Bangladesh",
      startDate: new Date(2014, 8, 1),
      endDate: new Date(2014, 11, 31),
    },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description: "",
  items: [
    {
      institution: "Ahsanullah Unviersity of Science and Technology",
      degree: "Computer Science and Engineering",
      startDate: new Date(2011, 3, 1),
      endDate: new Date(2015, 8, 30),
    },
  ],
};

const onlineEducation = {
  icon: "/assets/resume/cap.svg",
  title: "My Online Education",
  description: "",
  items: [
    {
      institution: "Linkedin Learning",
      degree: "Microsoft Certified: Azure Fundamentals",
      startDate: new Date(2024, 10, 1),
      endDate: new Date(2024, 11, 20),
      link: "",
    },
    {
      institution: "Pluralsight",
      degree: "Some Course Name",
      startDate: new Date(2024, 10, 1),
      endDate: new Date(2024, 11, 20),
      link: "",
    },
    {
      institution: "Udemy",
      degree: "Certified XYZ Developer",
      startDate: new Date(2024, 10, 1),
      endDate: new Date(2024, 11, 20),
      link: "",
    },
  ],
};

const skills = {
  icon: "/assets/resume/cap.svg",
  title: "My Skills",
  description: "",
  items: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px] items-baseline py-16 xl:py-0"
        >
          {/* Vertical Tabs List */}
          <TabsList className="flex flex-col w-full max-w-[360px] mx-auto xl:mx-0 gap-6 bg-default">
            <TabsTrigger value="experience" className="custom-tab">
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="custom-tab">
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="custom-tab">
              Skills
            </TabsTrigger>
            <TabsTrigger value="about" className="custom-tab">
              About me
            </TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full py-12 xl:py-0">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-secondary-default">
                            {calculateDuration(item.startDate, item.endDate)}
                          </span>
                          <h3 className="text-xl min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex w-full items-center justify-center xl:justify-start gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-secondary-default text-center"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-1 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-secondary-default">
                            {calculateDuration(item.startDate, item.endDate)}
                          </span>
                          <h3 className="text-xl min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex w-full items-center justify-center xl:justify-start gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-secondary-default text-center"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4 ">
                  {skills.items.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-secondary-default transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
