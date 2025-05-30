import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  lines = 1,
}) => {
  const baseClasses = 'bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse rounded';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    card: 'rounded-lg',
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height,
            }}
          >
            <motion.div
              className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className} relative overflow-hidden`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Specialized skeleton components
export const ProjectCardSkeleton: React.FC = () => (
  <div className="bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20">
    <Skeleton variant="rectangular" height="200px" className="mb-4" />
    <div className="space-y-3">
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="80px" height="24px" />
        <Skeleton variant="rectangular" width="100px" height="24px" />
      </div>
      <Skeleton variant="text" lines={2} />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="60px" height="20px" />
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <Skeleton variant="rectangular" width="100px" height="32px" />
        <Skeleton variant="rectangular" width="80px" height="32px" />
      </div>
    </div>
  </div>
);

export const TimelineItemSkeleton: React.FC = () => (
  <div className="bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20">
    <div className="flex items-center gap-4 mb-4">
      <Skeleton variant="circular" width="60px" height="60px" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="200px" />
        <Skeleton variant="text" width="150px" />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
    <div className="flex gap-2 mt-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" width="60px" height="20px" />
      ))}
    </div>
  </div>
);

export const StatsSkeleton: React.FC = () => (
  <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex-1 flex gap-4 items-center justify-center xl:justify-start border-secondary-default border border-spacing-2 border-double rounded p-5"
      >
        <Skeleton variant="text" width="60px" height="40px" />
        <Skeleton variant="text" lines={2} width="120px" />
      </div>
    ))}
  </div>
);

export default Skeleton; 