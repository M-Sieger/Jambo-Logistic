// Animation utilities for AOS integration

export interface AOSConfig {
  animation: string;
  delay?: number;
  duration?: number;
  easing?: string;
  offset?: number;
  once?: boolean;
}

export const createAOSProps = (config: AOSConfig) => {
  const props: Record<string, string | number> = { 'data-aos': config.animation };
  if (config.delay !== undefined) props['data-aos-delay'] = config.delay;
  if (config.duration !== undefined) props['data-aos-duration'] = config.duration;
  if (config.easing) props['data-aos-easing'] = config.easing;
  if (config.offset !== undefined) props['data-aos-offset'] = config.offset;
  if (config.once !== undefined) props['data-aos-once'] = config.once;
  return props;
};

export const animations = {
  fadeUp: (delay = 0): AOSConfig => ({ animation: 'fade-up', delay, duration: 600 }),
  fadeIn: (delay = 0): AOSConfig => ({ animation: 'fade-in', delay, duration: 600 }),
};

