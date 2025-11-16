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
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);

            const startTime = Date.now();
            const diff = end - start;

            const timer = setInterval(() => {
              const elapsedTime = Date.now() - startTime;
              const progress = Math.min(elapsedTime / duration, 1);

              // Easing function (ease-out)
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              const currentCount = start + diff * easedProgress;

              setCount(currentCount);

              if (progress >= 1) {
                clearInterval(timer);
                setCount(end);
              }
            }, 16); // ~60fps

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [end, start, duration, hasStarted]);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count: formattedCount, ref: elementRef };
};
