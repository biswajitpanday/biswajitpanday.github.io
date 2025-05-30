"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      
      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white"
        >
          Panday<span className="text-secondary-default">.</span>
        </motion.h1>
        
        {/* Loading Spinner */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-white/20 border-t-secondary-default rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary-default rounded-full"
            style={{ 
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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