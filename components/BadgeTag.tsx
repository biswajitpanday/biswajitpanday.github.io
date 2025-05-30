"use client";

import React, { ReactNode } from "react";
import { IconType } from "react-icons";

type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "danger" 
  | "info"
  | "neutral"
  | "gradient";

type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeTagProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconType;
  iconPosition?: "left" | "right";
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  animate?: boolean;
}

const BadgeTag: React.FC<BadgeTagProps> = ({
  children,
  variant = "neutral",
  size = "sm",
  icon: Icon,
  iconPosition = "left",
  rounded = true,
  className = "",
  onClick,
  disabled = false,
  animate = true
}) => {
  // Size mappings
  const sizeClasses = {
    xs: "text-xs px-2 py-1",
    sm: "text-xs px-3 py-1.5", 
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5"
  };

  // Variant mappings
  const variantClasses = {
    primary: "bg-primary/20 border-primary/30 text-primary",
    secondary: "bg-secondary-default/20 border-secondary-default/30 text-secondary-default",
    success: "bg-green-500/20 border-green-500/30 text-green-300",
    warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    danger: "bg-red-500/20 border-red-500/30 text-red-300",
    info: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    neutral: "bg-white/10 border-white/20 text-white/80",
    gradient: "bg-gradient-to-r from-secondary-default/20 to-blue-500/10 border-secondary-default/30 text-secondary-default"
  };

  // Icon size mappings
  const iconSizeClasses = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };

  // Base classes
  const baseClasses = [
    "inline-flex items-center gap-2 font-medium border backdrop-blur-sm",
    rounded ? "rounded-full" : "rounded",
    sizeClasses[size],
    variantClasses[variant],
    animate ? "transition-all duration-300" : "",
    onClick && !disabled ? "cursor-pointer hover:scale-105" : "",
    onClick && !disabled && variant === "secondary" ? "hover:bg-secondary-default/30" : "",
    onClick && !disabled && variant === "success" ? "hover:bg-green-500/30" : "",
    onClick && !disabled && variant === "info" ? "hover:bg-blue-500/30" : "",
    onClick && !disabled && variant === "neutral" ? "hover:bg-white/20 hover:text-white" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className
  ].filter(Boolean).join(" ");

  const iconClasses = iconSizeClasses[size];

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <span 
      className={baseClasses}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {Icon && iconPosition === "left" && (
        <Icon className={iconClasses} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={iconClasses} />
      )}
    </span>
  );
};

export default BadgeTag; 