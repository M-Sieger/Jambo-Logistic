// ---------------------------------------------------------
// Datei: TrustSection.tsx
// Zweck: Trust-Section mit Metriken (Social Proof) und optionalem Quote
// Besonderheiten:
// - Zeigt 3 Metriken (z.B. 200+ Container, 5+ Jahre, 100% Zufriedenheit)
// - Optional: Partner-Logos (noch nicht implementiert)
// - Optional: Kundenzitat mit Highlight-Effekt
// - AOS-Animation optional steuerbar via Prop
// Stand: 05.11.2025
// ---------------------------------------------------------

import React, { useMemo } from 'react';

import { useLanguage } from '../contexts/language-context';
import styles from './TrustSection.module.css';

export type TrustMetric = {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  description?: string;
};

export type Testimonial = {
  text: string;
  author: string;
  service: string;
};

export type TrustSectionProps = {
  title?: string;
  subtitle?: string;
  metrics?: TrustMetric[];
  testimonials?: Testimonial[]; // ✅ Neu
  aos?: boolean;
};

const IconStar = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M12 3.6l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.6 6.6 20.4l1-6.1L3.2 10l6.1-.9L12 3.6z" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M12 2l8 3v6c0 5-3.4 9.7-8 11-4.6-1.3-8-6-8-11V5l8-3z" />
  </svg>
);
const IconHandshake = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M8.5 12.5l3-3 1.8 1.8 2.2-2.2 4.5 4.5-2.1 2.1-2.4-2.4-.9.9 2.4 2.4-2.1 2.1-2.4-2.4-.9.9 2.4 2.4-2.1 2.1-4.6-4.6-3.3-3.3 2.1-2.1 2.4 2.4z" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z" />
  </svg>
);

const ICON_COMPONENTS = [IconStar, IconShield, IconHandshake, IconBolt];

const TrustSection: React.FC<TrustSectionProps> = ({
  title,
  subtitle,
  metrics,
  testimonials,
  aos = true,
}) => {
  const { translations: t } = useLanguage();

  const translatedMetrics = useMemo<TrustMetric[]>(
    () => [
      {
        label: t.trust.metrics.rating.label,
        value: t.trust.metrics.rating.value,
        description: t.trust.metrics.rating.description,
      },
      {
        label: t.trust.metrics.secure.label,
        description: t.trust.metrics.secure.description,
      },
      {
        label: t.trust.metrics.support.label,
        description: t.trust.metrics.support.description,
      },
      {
        label: t.trust.metrics.response.label,
        value: t.trust.metrics.response.value,
        description: t.trust.metrics.response.description,
      },
    ],
    [t]
  );

  const translatedTestimonials = useMemo<Testimonial[]>(
    () => [
      {
        text: t.trust.testimonials.customer1.text,
        author: t.trust.testimonials.customer1.author,
        service: t.trust.testimonials.customer1.service,
      },
      {
        text: t.trust.testimonials.customer2.text,
        author: t.trust.testimonials.customer2.author,
        service: t.trust.testimonials.customer2.service,
      },
    ],
    [t]
  );

  const resolvedMetrics = metrics ?? translatedMetrics;
  const resolvedTestimonials = testimonials ?? translatedTestimonials;

  const metricsWithIcons = useMemo(
    () =>
      resolvedMetrics.map((metric, index) => {
        const IconComponent = ICON_COMPONENTS[index % ICON_COMPONENTS.length];
        return {
          ...metric,
          icon: metric.icon ?? <IconComponent />,
        };
      }),
    [resolvedMetrics]
  );

  const resolvedTitle = title ?? t.trust.title;
  const resolvedSubtitle = subtitle ?? t.trust.subtitle;
  const testimonialsTitle = t.trust.testimonialsTitle;

  return (
    <section id="trust" className={`section section--alt ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>{resolvedTitle}</h2>
          {resolvedSubtitle && <p className={styles.subtitle}>{resolvedSubtitle}</p>}
        </header>

        <ul className={styles.grid} {...(aos ? { "data-aos": "fade-up" } : {})}>
          {metricsWithIcons.map((m, i) => (
            <li
              key={`${m.label}-${i}`}
              className={styles.card}
              style={{ transitionDelay: aos ? `${i * 100}ms` : undefined }}
              {...(aos ? { "data-aos": "fade-up" } : {})}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                {m.icon}
              </div>
              <div className={styles.cardText}>
                <div className={styles.cardLabel}>{m.label}</div>
                {(m.value || m.description) && (
                  <div className={styles.cardMeta}>
                    {m.value && <span className={styles.value}>{m.value}</span>}
                    {m.description && <span className={styles.description}>{m.description}</span>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* ✅ Testimonials */}
        {resolvedTestimonials.length > 0 && (
          <div className={styles.testimonialsSection} {...(aos ? { "data-aos": "fade-up", "data-aos-delay": "200" } : {})}>
            <h3 className={styles.testimonialsTitle}>{testimonialsTitle}</h3>
            <div className={styles.testimonialsGrid}>
              {resolvedTestimonials.map((testimonial, i) => (
                <blockquote key={i} className={styles.testimonial}>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                  <footer className={styles.testimonialFooter}>
                    <cite className={styles.testimonialAuthor}>{testimonial.author}</cite>
                    <span className={styles.testimonialService}>{testimonial.service}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustSection;
