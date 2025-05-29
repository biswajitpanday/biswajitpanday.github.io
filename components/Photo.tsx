"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PERFORMANCE_VARIANTS } from "@/constants";

const Photo = () => {
  return (
    <div className="w-full h-full relative rounded-full overflow-hidden">
      <motion.div
        variants={PERFORMANCE_VARIANTS.fadeInFast}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={PERFORMANCE_VARIANTS.fadeInFast}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
        >
          <Image
            src="/assets/Panday.png"
            priority
            quality={100}
            fill
            alt="Biswajit Panday"
            className="object-contain"
          />
        </motion.div>
        <motion.svg
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
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          ></motion.circle>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
