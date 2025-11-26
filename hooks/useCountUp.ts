import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number; // in milliseconds
  start?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  suffix = '',
  prefix = ''
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const [lastAnimatedEnd, setLastAnimatedEnd] = useState<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  // Observe visibility
  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  // Animate when visible AND end value changes (handles async data loading)
  useEffect(() => {
    // Only animate if visible and end value has changed
    if (!isVisible || end === lastAnimatedEnd) return;

    // Skip animation if end is 0 (waiting for data)
    if (end === 0 && lastAnimatedEnd === null) {
      setCount(0);
      return;
    }

    setLastAnimatedEnd(end);

    const startTime = Date.now();
    const startValue = count; // Animate from current value
    const diff = end - startValue;

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = startValue + diff * easedProgress;

      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isVisible, end, duration, lastAnimatedEnd, count]);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count: formattedCount, ref: elementRef };
};
