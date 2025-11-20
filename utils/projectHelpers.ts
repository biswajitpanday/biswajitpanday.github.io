import { Project } from "@/data/portfolioData";
import { FaRocket, FaUsers, FaChartLine } from "react-icons/fa";
import type { IconType } from "react-icons";

/**
 * Interface for primary metric badge data
 */
export interface PrimaryMetric {
  icon: IconType;
  text: string;
  label: "Efficiency" | "Impact" | "Performance" | "Cost Savings" | "Downloads";
}

/**
 * Extracts the primary metric from a project's metrics object
 * Priority: efficiency > users > performance > revenue > downloads
 *
 * @param project - Project object with optional metrics
 * @returns Primary metric object or null if no metrics exist
 */
export function getPrimaryMetric(project: Project): PrimaryMetric | null {
  if (!project.metrics) return null;

  if (project.metrics.efficiency) {
    return {
      icon: FaRocket,
      text: project.metrics.efficiency,
      label: "Efficiency"
    };
  }

  if (project.metrics.users) {
    return {
      icon: FaUsers,
      text: project.metrics.users,
      label: "Impact"
    };
  }

  if (project.metrics.performance) {
    return {
      icon: FaChartLine,
      text: project.metrics.performance,
      label: "Performance"
    };
  }

  if (project.metrics.revenue) {
    return {
      icon: FaChartLine,
      text: project.metrics.revenue,
      label: "Cost Savings"
    };
  }

  if (project.metrics.downloads) {
    return {
      icon: FaUsers,
      text: project.metrics.downloads,
      label: "Downloads"
    };
  }

  return null;
}

/**
 * Gets Tailwind CSS classes for metric badge styling based on label
 *
 * @param label - Metric label type
 * @returns Tailwind CSS class string for badge styling
 */
export function getMetricBadgeClasses(label: string): string {
  const metricColors: Record<string, string> = {
    "Efficiency": "bg-gradient-to-r from-emerald-500/50 to-green-500/50 border-emerald-400/60 text-white",
    "Impact": "bg-gradient-to-r from-blue-500/50 to-cyan-500/50 border-blue-400/60 text-white",
    "Downloads": "bg-gradient-to-r from-blue-500/50 to-cyan-500/50 border-blue-400/60 text-white",
    "Performance": "bg-gradient-to-r from-purple-500/50 to-pink-500/50 border-purple-400/60 text-white",
    "Cost Savings": "bg-gradient-to-r from-orange-500/50 to-amber-500/50 border-orange-400/60 text-white",
  };

  return metricColors[label] || "bg-gradient-to-r from-secondary-default/50 to-blue-500/50 border-secondary-default/60 text-white";
}

/**
 * Gets lighter version of metric badge classes for Timeline view
 *
 * @param label - Metric label type
 * @returns Tailwind CSS class string for lighter badge styling
 */
export function getMetricBadgeClassesLight(label: string): string {
  const metricColors: Record<string, string> = {
    "Efficiency": "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/50 text-emerald-200",
    "Impact": "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 text-blue-200",
    "Downloads": "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 text-blue-200",
    "Performance": "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 text-purple-200",
    "Cost Savings": "bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-400/50 text-orange-200",
  };

  return metricColors[label] || "bg-gradient-to-r from-secondary-default/20 to-blue-500/20 border-secondary-default/50 text-secondary-default";
}
