"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LIGHTWEIGHT_VARIANTS } from "@/constants";

const Photo = () => {
  return (
    <div className="w-full h-full relative rounded-full overflow-hidden">
      <motion.div
        {...LIGHTWEIGHT_VARIANTS.fadeIn}
      >
        <div className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute">
          <Image
            src="/assets/profile/profile-large.png"
            priority
            quality={80}
            fill
            alt="Biswajit Panday"
            className="object-contain"
            sizes="(max-width: 1280px) 298px, 498px"
          />
        </div>
        
        {/* Simplified SVG animation - reduced complexity */}
        <svg
          className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://wwww.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="var(--color-secondary-default)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12, // Slower animation for less processing
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Photo;
