import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ChevronUp } from 'lucide-react';

/**
 * Top reading progress bar that fills dynamically as the user scrolls down the page.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 z-[9999] origin-left pointer-events-none shadow-sm"
      style={{ scaleX }}
    />
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

/**
 * ScrollReveal wrapper component that animates its children when they scroll into the viewport.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 32,
  className = '',
  once = true,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, x: 0, scale: 1 };
      case 'down':
        return { opacity: 0, y: -distance, x: 0, scale: 1 };
      case 'left':
        return { opacity: 0, x: distance, y: 0, scale: 1 };
      case 'right':
        return { opacity: 0, x: -distance, y: 0, scale: 1 };
      case 'scale':
        return { opacity: 0, scale: 0.92, x: 0, y: 0 };
      case 'none':
        return { opacity: 0, x: 0, y: 0, scale: 1 };
      default:
        return { opacity: 0, y: distance, x: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount: 0.12, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const, // Smooth cubic-bezier overshoot curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Container that staggers the reveal animation of its immediate StaggerItem children.
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  className = '',
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'scale';
}

/**
 * Child item inside a StaggerContainer that reacts to parent stagger timing.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  direction = 'up',
}) => {
  const variants = {
    hidden: direction === 'scale' 
      ? { opacity: 0, scale: 0.9, y: 15 }
      : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * Floating Back-to-Top Button with circular scroll progress ring indicator.
 */
export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  // Circle progress calculation (r = 18, circumference = 2 * PI * 18 ≈ 113.1)
  const circumference = 113.1;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={scrollToTop}
      title={`Scroll to top (${percentage}%)`}
      aria-label="Scroll back to top"
      className="fixed bottom-24 right-5 sm:right-6 z-40 w-12 h-12 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center cursor-pointer border border-slate-700 hover:bg-slate-800 transition-colors group"
    >
      {/* SVG Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150 ease-out"
        />
      </svg>
      <ChevronUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
    </motion.button>
  );
};

/**
 * React hook that leverages browser IntersectionObserver to track element visibility on scroll.
 */
export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
      ...options
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options.threshold, options.rootMargin]);

  return [setElement, isIntersecting] as const;
}

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

/**
 * Dedicated FadeInUp component powered by IntersectionObserver for smooth scroll reveals.
 */
export const FadeInUp: React.FC<FadeInUpProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 32,
  className = ''
}) => {
  const [ref, inView] = useIntersectionObserver();

  return (
    <div
      ref={ref as (node: HTMLElement | null) => void}
      className={`transition-all ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : `translateY(${distance}px)`,
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};
