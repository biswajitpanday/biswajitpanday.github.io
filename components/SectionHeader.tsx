"use client";

import React, { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  highlightText: string;
  description: string | ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradientClass?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightText,
  description,
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  gradientClass = "from-secondary-default via-blue-400 to-secondary-default"
}) => {
  return (
    <div className={`text-center mb-6 animate-fade-in ${className}`}>
      {/* Main Heading */}
      <h1 className={`text-3xl xl:text-5xl font-bold text-white mb-4 leading-tight animate-fade-in-up ${titleClassName}`}>
        {title}{" "}
        <span className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent animate-gradient`}>
          {highlightText}
        </span>
      </h1>

      {/* Description */}
      <p className={`text-lg xl:text-xl text-white/80 mb-6 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animate-stagger-1 ${descriptionClassName}`}>
        {description}
      </p>

      {/* Additional Content (Stats, etc.) */}
      <div className="animate-fade-in-up animate-stagger-2">
        {children}
      </div>
    </div>
  );
};

export default SectionHeader; 