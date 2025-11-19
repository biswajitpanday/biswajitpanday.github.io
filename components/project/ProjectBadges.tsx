"use client";

import React from "react";
import Image from "next/image";
import {
  FaStar,
  FaCodeBranch,
  FaTrophy,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import { SimpleTooltip, WideTooltip } from "@/components/ui/SimpleTooltip";
import { getCategoryColor, getCompanyLogo } from "@/constants/projectConstants";
import { getPrimaryMetric, getMetricBadgeClasses, getMetricBadgeClassesLight } from "@/utils/projectHelpers";
import type { PrimaryMetric } from "@/utils/projectHelpers";
import type { Project, Recognition } from "@/data/portfolioData";
import {
  STATUS_BADGE_CLASSES,
  FEATURED_BADGE_CLASSES,
  OPEN_SOURCE_BADGE_CLASSES,
  RECOGNITION_BADGE_CLASSES,
  PRIMARY_METRIC_BADGE_CLASSES,
  PRIMARY_METRIC_BADGE_MODAL_CLASSES,
  CATEGORY_BADGE_CLASSES,
} from "@/constants/badgeSizes";

/**
 * Category Badge - Shows project category with color coding
 */
export function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 shadow-sm border ${CATEGORY_BADGE_CLASSES} ${getCategoryColor(
        category
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {category}
    </span>
  );
}

/**
 * Open Source Badge - Icon-only with tooltip
 */
export function OpenSourceBadge({ variant = "icon" }: { variant?: "icon" | "text" }) {
  if (variant === "icon") {
    return (
      <SimpleTooltip content="Open Source Project" position="top" colorScheme="green">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 transition-colors cursor-help">
          <FaCodeBranch className="text-sm text-green-300" />
        </span>
      </SimpleTooltip>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/40 text-green-300 ${OPEN_SOURCE_BADGE_CLASSES}`}>
      <FaCodeBranch className="text-xs" />
      <span>Open Source</span>
    </span>
  );
}

/**
 * Recognition/Awards Badge - Shows award count with tooltip
 */
export function RecognitionBadge({
  recognitions
}: {
  recognitions: Recognition[]
}) {
  const approvedRecognitions = recognitions.filter(r => r.approved !== false);
  const count = approvedRecognitions.length;

  if (count === 0) return null;

  return (
    <div className="relative group/awards">
      <span className={`inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-400/30 text-amber-200 shadow-sm cursor-help ${RECOGNITION_BADGE_CLASSES}`}>
        <FaTrophy className="text-[10px] text-amber-300" />
        <span>{count} {count === 1 ? 'Award' : 'Awards'}</span>
      </span>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-gray-900/95 backdrop-blur-sm rounded-lg border border-amber-400/30 opacity-0 invisible group-hover/awards:opacity-100 group-hover/awards:visible transition-all duration-200 z-[150] shadow-xl pointer-events-none">
        <div className="space-y-2">
          {approvedRecognitions.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <FaTrophy className="text-amber-300 text-xs mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white text-xs font-semibold">{rec.title}</div>
                {rec.description && (
                  <div className="text-white/70 text-xs mt-0.5">{rec.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Status Badge - Active or Completed
 */
export function StatusBadge({
  isActive,
  inactivationReason
}: {
  isActive: boolean;
  inactivationReason?: string;
}) {
  if (isActive) {
    return (
      <span className={`inline-flex items-center gap-1 bg-green-500/90 text-white ${STATUS_BADGE_CLASSES}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Active
      </span>
    );
  }

  if (inactivationReason) {
    return (
      <WideTooltip content={inactivationReason} position="top" colorScheme="red">
        <span className={`inline-flex items-center gap-1 bg-red-500/90 text-white cursor-help ${STATUS_BADGE_CLASSES}`}>
          Completed
        </span>
      </WideTooltip>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 bg-red-500/90 text-white ${STATUS_BADGE_CLASSES}`}>
      Completed
    </span>
  );
}

/**
 * Status Badge for Image Overlay - Icon-only version with tooltip
 */
export function StatusBadgeIcon({
  isActive,
  inactivationReason,
}: {
  isActive: boolean;
  inactivationReason?: string;
}) {
  if (isActive) {
    return (
      <SimpleTooltip content="Active Project" position="bottom" colorScheme="green">
        <div className="bg-green-500/95 text-white backdrop-blur-sm shadow-lg w-7 h-7 rounded-md flex items-center justify-center cursor-help">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        </div>
      </SimpleTooltip>
    );
  }

  return (
    <WideTooltip
      content={inactivationReason || "This project is no longer active"}
      position="bottom"
      colorScheme="red"
    >
      <div className="bg-red-500/95 text-white backdrop-blur-sm shadow-lg w-7 h-7 rounded-md flex items-center justify-center cursor-help">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
    </WideTooltip>
  );
}

/**
 * Featured Badge - Can be icon-only or with text
 */
export function FeaturedBadge({ variant = "icon" }: { variant?: "icon" | "text" }) {
  if (variant === "icon") {
    return (
      <SimpleTooltip content="Featured Project" position="bottom" colorScheme="purple">
        <div className="bg-gradient-to-r from-purple-500/95 to-pink-500/95 backdrop-blur-sm text-white w-7 h-7 rounded-md shadow-lg shadow-purple-500/30 flex items-center justify-center cursor-help">
          <FaStar className="text-white text-sm" />
        </div>
      </SimpleTooltip>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500/25 to-pink-500/25 border border-purple-500/50 text-purple-200 shadow-sm shadow-purple-500/20 ${FEATURED_BADGE_CLASSES}`}>
      <FaStar className="text-[10px]" />
      <span>Featured</span>
    </span>
  );
}

/**
 * Primary Metric Badge - Shows key performance metric
 */
export function PrimaryMetricBadge({
  metric,
  variant = "default",
  lightMode = false,
}: {
  metric: PrimaryMetric;
  variant?: "default" | "modal";
  lightMode?: boolean;
}) {
  const badgeClasses = variant === "modal"
    ? PRIMARY_METRIC_BADGE_MODAL_CLASSES
    : PRIMARY_METRIC_BADGE_CLASSES;

  const colorClasses = lightMode
    ? getMetricBadgeClassesLight(metric.label)
    : getMetricBadgeClasses(metric.label);

  return (
    <span className={`inline-flex items-center gap-2 backdrop-blur-md shadow-lg border flex-shrink-0 ${badgeClasses} ${colorClasses}`}>
      <metric.icon className={variant === "modal" ? "text-base" : "text-xs"} />
      <span>{metric.text}</span>
    </span>
  );
}

/**
 * Company Logo/Icon - Shows company association
 */
export function CompanyIcon({ company }: { company: string }) {
  const logo = getCompanyLogo(company);

  return (
    <SimpleTooltip content={`@ ${company}`} position="bottom">
      {logo ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          width={20}
          height={20}
          className="rounded-sm opacity-80 hover:opacity-100 transition-opacity cursor-help"
        />
      ) : (
        <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center cursor-help">
          {company.toLowerCase().includes('individual') ||
           company.toLowerCase().includes('freelance') ||
           company.toLowerCase().includes('personal') ? (
            <FaUser className="text-[10px] text-blue-300" />
          ) : (
            <FaBuilding className="text-[10px] text-blue-300" />
          )}
        </div>
      )}
    </SimpleTooltip>
  );
}

/**
 * Badge Separator - Consistent divider between badges
 */
export function BadgeSeparator() {
  return <span className="text-white/30 text-xs flex items-center">|</span>;
}

/**
 * Badge Row - Consistent container for badge groups
 */
export function BadgeRow({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {children}
    </div>
  );
}
