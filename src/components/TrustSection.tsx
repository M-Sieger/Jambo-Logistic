import React, { useMemo } from 'react';

import styles from './TrustSection.module.css';

/** === Types === */
export type TrustMetric = {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  description?: string;
};

export type PartnerLogo = {
  src?: string;        // optional: via import ... later
  alt: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  route?: string;
  avatarInitials?: string; // optional initials badge (e.g., "AM")
};

export type TrustSectionProps = {
  title?: string;
  subtitle?: string;
  metrics: TrustMetric[];
  partners?: PartnerLogo[];
  testimonial?: Testimonial;
  ctaText?: string;
  onCtaClick?: () => void;
  compact?: boolean;
  showLogos?: boolean;
  withQuote?: boolean;
  emphasisIndex?: number; // 0..n to visually emphasize one tile
  aos?: boolean;          // enable data-aos attrs (default true)
};

/** === Inline SVG Icons (no external assets) === */
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
    <path d="M8.5 12.5l3-3 1.8 1.8 2.2-2.2 4.5 4.5-2.1 2.1-2.4-2.4-.9.9 2.4 2.4-2.1 2.1-2.4-2.4-.9.9 2.4 2.4-2.1 2.1-4.6-4.6-3.3-3.3 2.1-2.1 2.4 2.4zM7.2 7.9l2.1-2.1 2.2 2.2-2.1 2.1-2.2-2.2z" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z" />
  </svg>
);

/** === Defaults (no assets required) === */
const defaultMetrics: TrustMetric[] = [
  { icon: <IconStar />, label: "Top‑Bewertungen", value: "4,9/5", description: "Zufriedenheit" },
  { icon: <IconShield />, label: "Sicher versenden", description: "Optionale Versicherung" },
  { icon: <IconHandshake />, label: "Direkter Ansprechpartner", description: "DE & KE, WhatsApp/Telefon" },
  { icon: <IconBolt />, label: "Schnelle Antwort", value: "≤ 24 h", description: "Mo–Sa" },
];

const defaultTestimonial: Testimonial = {
  quote:
    "Mein Paket war nach wenigen Wochen in Nairobi – Updates kamen persönlich per WhatsApp.",
  author: "Amina M.",
  route: "Berlin → Nairobi",
  avatarInitials: "AM",
};

const smoothScrollToContact = () => {
  const el = document.querySelector("#contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** === Component === */
const TrustSection: React.FC<TrustSectionProps> = ({
  title = "Verlässlich von Deutschland nach Nairobi.",
  subtitle = "Persönliche Betreuung, faire Preise und sichere Abwicklung – ohne App‑Chaos.",
  metrics = defaultMetrics,
  partners,
  testimonial = defaultTestimonial,
  ctaText = "Kostenlos beraten lassen",
  onCtaClick,
  compact = false,
  showLogos = false,
  withQuote = true,
  emphasisIndex,
  aos = true,
}) => {
  const hasLogos = showLogos && partners && partners.length > 0;
  const handleCta = () => (onCtaClick ? onCtaClick() : smoothScrollToContact());

  const metricsWithFallbackIcons = useMemo(
    () =>
      metrics.map((m, i) => ({
        ...m,
        icon:
          m.icon ??
          [<IconStar />, <IconShield />, <IconHandshake />, <IconBolt />][i % 4],
      })),
    [metrics]
  );

  return (
    <section id="trust" className={`section section--alt ${styles.section} ${compact ? styles.compact : ""}`}>
      <div className={`container ${styles.wrap}`}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        {/* Trust Tiles */}
        <ul
          className={styles.grid}
          {...(aos ? { "data-aos": "fade-up" } : {})}
        >
          {metricsWithFallbackIcons.map((m, i) => (
            <li
              key={`${m.label}-${i}`}
              className={`${styles.card} ${emphasisIndex === i ? styles.cardEmphasis : ""}`}
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
                    {m.description && (
                      <span className={styles.description}>{m.description}</span>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Partner Logos (optional or placeholders) */}
        {showLogos && (
          <div className={styles.partners} {...(aos ? { "data-aos": "fade-up" } : {})}>
            {(hasLogos ? partners! : Array.from({ length: 4 }).map((_, i) => ({ alt: `Partner ${i + 1}` }))).map(
              (p, i) => {
                const inner = p.src ? (
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className={styles.partnerImg}
                  />
                ) : (
                  <div className={styles.logoPlaceholder} aria-hidden="true">
                    {p.alt?.slice(0, 10) || "Logo"}
                  </div>
                );
                return p.href ? (
                  <a
                    key={i}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.partnerItem}
                    aria-label={`${p.alt} – öffnet neue Seite`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={i} className={styles.partnerItem} aria-label={p.alt}>
                    {inner}
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Testimonial (optional) */}
        {withQuote && testimonial && (
          <figure className={styles.quote} {...(aos ? { "data-aos": "fade-up" } : {})}>
            <div className={styles.avatar} aria-hidden="true">
              <span>{testimonial.avatarInitials || (testimonial.author || "?").slice(0, 2)}</span>
            </div>
            <blockquote className={styles.quoteText}>“{testimonial.quote}”</blockquote>
            <figcaption className={styles.quoteMeta}>
              <strong>{testimonial.author}</strong>
              {testimonial.route ? <span> • {testimonial.route}</span> : null}
            </figcaption>
          </figure>
        )}

        {/* CTA */}
        <div className={styles.ctaBox}>
          <button
            type="button"
            onClick={handleCta}
            className={styles.ctaBtn}
            aria-label="Kostenlose Beratung starten – springe zum Kontaktformular"
          >
            {ctaText}
          </button>
          <span className={styles.ctaHint}>Antwort in der Regel innerhalb von 24 h.</span>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
