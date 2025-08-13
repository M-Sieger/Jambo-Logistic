// TrustSection.tsx — Metrics-Version (keine Logos, keine Quote)
// Präfixierte Klassen (trust*) → keine Kollisionen mit Services/Process
// AOS optional via Prop; Default: true

import React, { useMemo } from 'react';

import styles from './TrustSection.module.css';

export type TrustMetric = {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  description?: string;
};

export type TrustSectionProps = {
  title?: string;
  subtitle?: string;
  metrics?: TrustMetric[];
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

const defaultMetrics: TrustMetric[] = [
  { icon: <IconStar />, label: "Top‑Bewertungen", value: "4,9/5", description: "Zufriedenheit" },
  { icon: <IconShield />, label: "Sicher versenden", description: "Optionale Versicherung" },
  { icon: <IconHandshake />, label: "Direkter Ansprechpartner", description: "DE & KE, WhatsApp/Telefon" },
  { icon: <IconBolt />, label: "Schnelle Antwort", value: "≤ 24 h", description: "Mo–Sa" },
];

const TrustSection: React.FC<TrustSectionProps> = ({
  title = "Verlässlich von Deutschland nach Nairobi.",
  subtitle = "Persönliche Betreuung, faire Preise und sichere Abwicklung – ohne App‑Chaos.",
  metrics = defaultMetrics,
  aos = true,
}) => {
  const metricsWithIcons = useMemo(
    () =>
      metrics.map((m, i) => ({
        ...m,
        icon:
          m.icon ??
          [<IconStar key="s" />, <IconShield key="sh" />, <IconHandshake key="h" />, <IconBolt key="b" />][i % 4],
      })),
    [metrics]
  );

  return (
    <section id="trust" className={`section section--alt ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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
      </div>
    </section>
  );
};

export default TrustSection;
