"use client";

import GitHubActivityGraph from "@/components/GitHubActivityGraph";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import { FaChartLine, FaFireAlt } from "react-icons/fa";

export default function ActivityPage() {
  return (
    <section className="min-h-screen relative overflow-hidden py-8">
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
        {/* Page Header */}
        <SectionHeader
          title="Activity"
          highlightText="Graph"
          description={
            <>
              A visual representation of{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                portfolio development activity
              </span>{" "}
              and{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                continuous learning
              </span>{" "}
              over the past year
            </>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaChartLine className="text-emerald-400" />
                <p className="text-xs text-white/60 font-medium">Tracking</p>
              </div>
              <p className="text-xl font-bold text-emerald-300">365 Days</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaFireAlt className="text-orange-400" />
                <p className="text-xs text-white/60 font-medium">Consistency</p>
              </div>
              <p className="text-xl font-bold text-orange-300">Active</p>
            </div>
          </div>
        </SectionHeader>

        {/* Activity Graph Component */}
        <GitHubActivityGraph />
      </div>
    </section>
  );
}
