"use client";
import {
  calculateTotalExperience,
} from "@/helpers/utility";
import { timeLineItems } from "@/data/timelineData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaRocket,
  FaAward,
} from "react-icons/fa";
import { motion } from "framer-motion";
import TimelineElement from "@/components/TimelineElement";
import BackgroundElements from "@/components/BackgroundElements";
import { useCountUp } from "@/hooks/useCountUp";

const Career = () => {
  const totalExperience = calculateTotalExperience(timeLineItems);
  const totalCompanies = timeLineItems.length;
  const leadershipRoles = timeLineItems.filter(item =>
    item.position.toLowerCase().includes('lead') ||
    item.position.toLowerCase().includes('senior')
  ).length;
  const totalAchievements = timeLineItems.reduce((acc, item) => acc + item.responsibilities.length, 0);

  // Animated counters for stats
  const experienceYears = parseInt(totalExperience.split('y')[0]) || 0;
  const experienceCount = useCountUp({ end: experienceYears, duration: 2000 });
  const companiesCount = useCountUp({ end: totalCompanies, duration: 1900 });
  const leadershipCount = useCountUp({ end: leadershipRoles, duration: 1800 });
  const achievementsCount = useCountUp({ end: totalAchievements, duration: 2000 });

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-6">
      {/* Enhanced Background Elements */}
      <BackgroundElements
        floatingDots={[
          {
            size: "md",
            color: "secondary",
            animation: "ping",
            position: { top: "25%", right: "10%" },
            opacity: 60
          },
          {
            size: "sm",
            color: "emerald",
            animation: "pulse",
            position: { bottom: "20%", left: "15%" },
            opacity: 40
          }
        ]}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Professional Header - Left Aligned like Project Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex-1 mb-4">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
              Professional Journey
            </h1>
            <p className="text-sm font-medium leading-relaxed">
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Transforming ideas into scalable solutions through{" "}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                {totalExperience}
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}of engineering excellence
              </span>
            </p>
          </div>
        </motion.div>

        {/* Career Stats - Match Project Page Design with Count-Up Animation */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Experience Stat */}
              <div ref={experienceCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                  <FaCalendarAlt className="text-[#00BFFF] text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">
                    {experienceCount.count}y+
                  </div>
                  <div className="text-xs text-white/60">Experience</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Companies Stat */}
              <div ref={companiesCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FaBriefcase className="text-emerald-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tabular-nums">
                    {companiesCount.count}
                  </div>
                  <div className="text-xs text-white/60">Companies</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Leadership Roles */}
              <div ref={leadershipCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FaAward className="text-purple-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums">
                    {leadershipCount.count}
                  </div>
                  <div className="text-xs text-white/60">Leadership Roles</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Achievements */}
              <div ref={achievementsCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <FaRocket className="text-orange-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 tabular-nums">
                    {achievementsCount.count}
                  </div>
                  <div className="text-xs text-white/60">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Simple Timeline Design - Matching Project Timeline */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.fadeInFast}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on md+ - Purple at top, fades to transparent at bottom */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-6">
              {timeLineItems.map((item, index) => (
                <TimelineElement
                  key={index}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Career;
