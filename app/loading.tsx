"use client";
import React from 'react';
import { Triangle } from 'react-loader-spinner';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0  pointer-events-none" />
      
      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold text-white"
        >
          Panday<span className="text-secondary-default">.</span>
        </motion.h1>
        
        {/* Triangle Spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#00bfff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </motion.div>
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-white/60 text-sm font-medium"
        >
          Loading amazing content...
        </motion.p>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />
    </div>
  );
} 