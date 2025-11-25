"use client";

import { motion } from "framer-motion";
import GitHubActivityGraph from "@/components/GitHubActivityGraph";
import BackgroundElements from "@/components/BackgroundElements";
import { FaChartLine, FaFireAlt, FaCalendarAlt, FaCodeBranch } from "react-icons/fa";
import { useCountUp } from "@/hooks/useCountUp";
import { PERFORMANCE_VARIANTS } from "@/constants";

export default function ActivityPage() {
  // Animated counters for stats
  const trackingDaysCount = useCountUp({ end: 365, duration: 2000 });
  const activityTypesCount = useCountUp({ end: 4, duration: 1900 });

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-6">
      {/* Background Elements */}
      <BackgroundElements
        floatingDots={[
          {
            size: "lg",
            color: "secondary",
            animation: "pulse",
            position: { top: "20%", right: "15%" },
            opacity: 50
          },
          {
            size: "md",
            color: "secondary",
            animation: "ping",
            position: { bottom: "30%", left: "10%" },
            opacity: 40
          }
        ]}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Activity Header - Left Aligned matching Project/Career/Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex-1 mb-4">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
              Activity Graph
            </h1>
            <p className="text-sm font-medium leading-relaxed">
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                A visual representation of portfolio development activity and{" "}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                continuous learning
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}over the past year
              </span>
            </p>
          </div>
        </motion.div>

        {/* Activity Stats - Inline matching Project/Career/Skills */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Tracking Period */}
              <div ref={trackingDaysCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                  <FaCalendarAlt className="text-[#00BFFF] text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">
                    {trackingDaysCount.count}
                  </div>
                  <div className="text-xs text-white/60">Days Tracked</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Activity Types */}
              <div ref={activityTypesCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FaCodeBranch className="text-emerald-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tabular-nums">
                    {activityTypesCount.count}
                  </div>
                  <div className="text-xs text-white/60">Activity Types</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Continuous Learning */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                  <FaChartLine className="text-fuchsia-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Active
                  </div>
                  <div className="text-xs text-white/60">Learning</div>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-white/10"></div>

              {/* Consistency Indicator */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <FaFireAlt className="text-orange-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                    High
                  </div>
                  <div className="text-xs text-white/60">Consistency</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Graph Component */}
        <GitHubActivityGraph />
      </div>
    </section>
  );
}
