"use client";

import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative rounded-full overflow-hidden">
      <div className="animate-fade-in">
        <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute">
          <Image
            src="/assets/profile/webp/profile-large.webp"
            priority
            quality={90}
            fill
            alt="Biswajit Panday - Full-Stack .NET Developer"
            className="object-contain"
            sizes="(max-width: 1280px) 298px, 498px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            loading="eager"
            fetchPriority="high"
          />
        </div>
        
        {/* Simplified CSS animation for better performance */}
        <div className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px] relative">
          <svg
            className="w-full h-full animate-spin-slow"
            fill="transparent"
            viewBox="0 0 506 506"
            xmlns="http://wwww.w3.org/2000/svg"
          >
            <circle
              cx="253"
              cy="253"
              r="250"
              stroke="var(--color-secondary-default)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="15 120 25 25"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Photo;
