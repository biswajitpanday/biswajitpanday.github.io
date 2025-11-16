"use client";

import PerformanceMetrics from "@/components/PerformanceMetrics";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import { FaRocket, FaCheckCircle } from "react-icons/fa";

export default function PerformancePage() {
  return (
    <section className="min-h-screen relative overflow-hidden py-8">
      {/* Background Elements */}
      <BackgroundElements
        floatingDots={[
          {
            size: "lg",
            color: "secondary",
            animation: "pulse",
            position: { top: "15%", right: "20%" },
            opacity: 60
          },
          {
            size: "md",
            color: "green",
            animation: "ping",
            position: { bottom: "20%", left: "15%" },
            opacity: 50
          }
        ]}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Header */}
        <SectionHeader
          title="Performance"
          highlightText="Metrics"
          description={
            <>
              Real-time performance metrics with{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                100/100 Lighthouse scores
              </span>
              {" "}demonstrating commitment to{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                web performance optimization
              </span>
            </>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-secondary-default/10 to-blue-500/10 border border-secondary-default/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaRocket className="text-secondary-default" />
                <p className="text-xs text-white/60 font-medium">Score</p>
              </div>
              <p className="text-xl font-bold text-secondary-default">100/100</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-400" />
                <p className="text-xs text-white/60 font-medium">Status</p>
              </div>
              <p className="text-xl font-bold text-green-300">Optimized</p>
            </div>
          </div>
        </SectionHeader>

        {/* Performance Metrics Component */}
        <PerformanceMetrics />
      </div>
    </section>
  );
}
