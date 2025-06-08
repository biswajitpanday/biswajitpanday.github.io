"use client";
import CountUp from "react-countup";
import { timeLineItems } from "@/data/timelineData";
import { projects } from "@/data/portfolioData";
import { countAllTechnologies } from "@/data/skillsData";
import { calculateTotalExperience } from "@/helpers/utility";
import { getCertificationCounts } from "@/data/certificationsData";

const Stats = () => {
  const totalExperience = calculateTotalExperience(timeLineItems);
  const totalProjects = projects.length;
  const totalTechnologies = countAllTechnologies();
  const certCounts = getCertificationCounts();

const stats = [
  {
      num: parseInt(totalExperience.replace(/\D/g, '')), // Extract number from string like "9+ years"
    text: "Years of Development Experience",
      suffix: "+", // Makes sense as experience grows over time
  },
  {
      num: totalProjects,
    text: "Projects Delivered",
      suffix: "+", // Makes sense as more projects can be added
  },
  {
      num: totalTechnologies,
      text: "Tools & Technologies mastered",
      suffix: "+", // Makes sense as more technologies can be learned
  },
  {
      num: certCounts.total - certCounts.upcoming,
      text: "Professional Credentials",
      suffix: "+", // Will grow over time
  },
];

  return (
    <section className="pt-4 pb-12 ps-0 pe-0 xl:pt-0 xl:pb-0">
      <div className="container mx-auto ps-0 pe-0">
        <div className=" flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start border-secondary-default border border-spacing-2 border-double rounded p-5"
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  suffix={item.suffix}
                  className="text-4xl xl:text-6xl font-extrabbold"
                />
                <p
                  className={`${
                    item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-white/80`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
