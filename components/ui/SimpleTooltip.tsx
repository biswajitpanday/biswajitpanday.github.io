"use client";

import React from "react";
import { Z_INDEX_CLASSES } from "@/constants/zIndex";

export interface SimpleTooltipProps {
  /**
   * Content to display in the tooltip
   */
  content: string | React.ReactNode;

  /**
   * Position of the tooltip relative to the trigger element
   * @default "top"
   */
  position?: "top" | "bottom" | "left" | "right";

  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes for the tooltip content
   */
  className?: string;

  /**
   * Additional CSS classes for the trigger wrapper
   */
  wrapperClassName?: string;

  /**
   * Border color scheme for the tooltip
   * @default "default"
   */
  colorScheme?: "default" | "green" | "purple" | "amber" | "red" | "blue";

  /**
   * Maximum width preset (optional - auto by default)
   * @default undefined (auto-sizing based on content)
   */
  maxWidth?: "narrow" | "normal" | "wide" | "auto";
}

const maxWidthClasses = {
  auto: "max-w-xs", // Auto-sizing with reasonable max width (320px)
  narrow: "max-w-[200px]",
  normal: "max-w-[256px]",
  wide: "max-w-[320px]",
};

const borderColorClasses = {
  default: "border-white/10",
  green: "border-green-400/30",
  purple: "border-purple-400/30",
  amber: "border-amber-400/30",
  red: "border-red-400/30",
  blue: "border-blue-400/30",
};

/**
 * Lightweight CSS-based Tooltip Component
 *
 * Simple, performant tooltip using CSS transitions.
 * Perfect for badge tooltips and icon hover states.
 *
 * @example
 * ```tsx
 * <SimpleTooltip content="This is a tooltip" position="top">
 *   <button>Hover me</button>
 * </SimpleTooltip>
 * ```
 */
export function SimpleTooltip({
  content,
  position = "top",
  children,
  className = "",
  wrapperClassName = "",
  colorScheme = "default",
  maxWidth = "auto",
}: SimpleTooltipProps) {
  // Position classes for different tooltip positions
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  const positionClass = positionClasses[position];
  const maxWidthClass = maxWidthClasses[maxWidth];
  const borderColorClass = borderColorClasses[colorScheme];

  return (
    <div className={`relative group/tooltip inline-block ${wrapperClassName}`}>
      {children}

      {/* Tooltip */}
      <div
        className={`
          absolute ${positionClass}
          px-3 py-1.5
          bg-gray-900/95 backdrop-blur-sm
          text-white text-xs
          rounded-md shadow-xl
          border ${borderColorClass}
          transition-all duration-200
          opacity-0 invisible
          group-hover/tooltip:opacity-100 group-hover/tooltip:visible
          pointer-events-none
          whitespace-nowrap
          ${maxWidthClass}
          ${Z_INDEX_CLASSES.TOOLTIP}
          ${className}
        `}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}

/**
 * Tooltip with wider max-width for longer content
 */
export function WideTooltip(props: Omit<SimpleTooltipProps, "maxWidth">) {
  return <SimpleTooltip {...props} maxWidth="wide" />;
}

/**
 * Compact tooltip for short content (icon-only badges)
 */
export function IconTooltip(props: Omit<SimpleTooltipProps, "maxWidth">) {
  return <SimpleTooltip {...props} maxWidth="narrow" />;
}
