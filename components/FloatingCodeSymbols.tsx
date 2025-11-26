"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * FloatingCodeSymbols - Animated code symbols floating in the background
 *
 * Features:
 * - CSS-only animations (no heavy libraries)
 * - Random positioning and timing
 * - Code-related symbols: { } < > / = ; ( ) [ ]
 * - Subtle, non-distracting appearance
 * - Respects reduced motion preferences
 * - Client-side only rendering to prevent hydration mismatch
 */

interface FloatingCodeSymbolsProps {
  symbolCount?: number;
  className?: string;
}

const CODE_SYMBOLS = ["{", "}", "<", ">", "/", "=", ";", "(", ")", "[", "]", "//", "=>", "&&", "||", "++", "::"];

const FloatingCodeSymbols: React.FC<FloatingCodeSymbolsProps> = ({
  symbolCount = 15,
  className = "",
}) => {
  // Track if component has mounted to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate random symbol configurations only on client
  const symbols = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: symbolCount }, (_, i) => ({
      id: i,
      symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 16, // 12-28px
      opacity: 0.03 + Math.random() * 0.07, // 0.03-0.10
      duration: 15 + Math.random() * 20, // 15-35s
      delay: Math.random() * -20, // Random start offset
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360,
      yOffset: 20 + Math.random() * 40, // Vertical float distance
    }));
  }, [symbolCount, isMounted]);

  // Return empty container during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {symbols.map((symbol) => (
        <motion.span
          key={symbol.id}
          className="absolute font-mono text-[#00BFFF] select-none"
          style={{
            left: symbol.left,
            top: symbol.top,
            fontSize: `${symbol.size}px`,
            opacity: symbol.opacity,
          }}
          animate={{
            y: [0, -symbol.yOffset, 0],
            rotate: [symbol.rotateStart, symbol.rotateEnd],
            opacity: [symbol.opacity, symbol.opacity * 1.5, symbol.opacity],
          }}
          transition={{
            duration: symbol.duration,
            delay: symbol.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {symbol.symbol}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingCodeSymbols;
