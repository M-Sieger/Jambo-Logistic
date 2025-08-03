// Animation utilities for AOS integration
import { useEffect, RefObject } from 'react';

export interface AOSConfig {
  animation: string;
  delay?: number;
  duration?: number;
  easing?: string;
  offset?: number;
  once?: boolean;
}

export const createAOSProps = (config: AOSConfig) => {
  const props: Record<string, string | number> = {
    'data-aos': config.animation,
  };

  if (config.delay !== undefined) {
    props['data-aos-delay'] = config.delay;
  }

  if (config.duration !== undefined) {
    props['data-aos-duration'] = config.duration;
  }

  if (config.easing) {
    props['data-aos-easing'] = config.easing;
  }

  if (config.offset !== undefined) {
    props['data-aos-offset'] = config.offset;
  }

  if (config.once !== undefined) {
    props['data-aos-once'] = config.once;
  }

  return props;
};

// Predefined animation configurations
export const animations = {
  fadeUp: (delay = 0): AOSConfig => ({
    animation: 'fade-up',
    delay,
    duration: 600,
    easing: 'ease-out',
    once: true,
  }),

  fadeLeft: (delay = 0): AOSConfig => ({
    animation: 'fade-left',
    delay,
    duration: 600,
    easing: 'ease-out',
    once: true,
  }),

  fadeRight: (delay = 0): AOSConfig => ({
    animation: 'fade-right',
    delay,
    duration: 600,
    easing: 'ease-out',
    once: true,
  }),

  zoomIn: (delay = 0): AOSConfig => ({
    animation: 'zoom-in',
    delay,
    duration: 400,
    easing: 'ease-out',
    once: true,
  }),

  slideUp: (delay = 0): AOSConfig => ({
    animation: 'slide-up',
    delay,
    duration: 500,
    easing: 'ease-out',
    once: true,
  }),

  staggered: (index: number, baseDelay = 0, increment = 100): AOSConfig => ({
    animation: 'fade-up',
    delay: baseDelay + (index * increment),
    duration: 600,
    easing: 'ease-out',
    once: true,
  }),
};

// Performance-optimized animation utilities
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getOptimizedDuration = (baseDuration: number): number => {
  return prefersReducedMotion() ? 0 : baseDuration;
};

