// src/components/Services.tsx
// ✅ React + TypeScript + CSS Modules
// ✅ Card-Images kompakter: 16:9 + max-height (Desktop), CLS-frei (width/height + aspect-ratio im CSS)
// ✅ Keine Klassennamens-Kollisionen (services*, card*), AOS-Stagger 0/100/200/300
// ✅ CTA-Box unverändert, #contact als Primär-CTA

import React from 'react';

import AOS from 'aos';

// CTA-Bild
import ctaImgJpg from '../assets/beratung.jpeg';
// Service-Bilder
import pkgImg from '../assets/boxload.jpg';
import ctrImg from '../assets/containerload.jpeg';
import homeImg from '../assets/deliver.jpeg';
import textImg from '../assets/warehouse.jpg';
import styles from './Services.module.css';

// Datenmodell
type ServiceItem = {
  id: string;
  title: string;
  desc: string;     // 1-Zeile, kurz & klar
  imgSrc: string;
  imgAlt: string;
};

export interface ServicesProps {
  items?: ServiceItem[];
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
}

// Default-Items (MVP-ready)
const defaultItems: ServiceItem[] = [
  {
    id: "pkg",
    title: "Paketversand",
    desc: "Sicher & fair nach Nairobi – privat & geschäftlich.",
    imgSrc: pkgImg,
    imgAlt: "Pakete für den Versand vorbereitet",
  },
  {
    id: "ctr",
    title: "Containertransport",
    desc: "Planbar, dokumentiert, mit persönlichem Update.",
    imgSrc: ctrImg,
    imgAlt: "Containerverladung im Hafen",
  },
  {
    id: "home",
    title: "Haushalt & Elektronik",
    desc: "Sorgfältig verpackt, transparent abgewickelt.",
    imgSrc: homeImg,
    imgAlt: "Transport von Haushaltsgeräten",
  },
  {
    id: "text",
    title: "Kleidung & Textilien",
    desc: "Sammelpakete, faire Tarife, klare Prozesse.",
    imgSrc: textImg,
    imgAlt: "Karton mit Kleidung im Lager",
  },
];

const Services: React.FC<ServicesProps> = ({
  items = defaultItems,
  primaryCtaHref = "#contact",
  secondaryCtaHref = "#process",
}) => {
  // AOS init (defensiv, falls nicht global initialisiert)
  React.useEffect(() => {
    if (typeof window !== "undefined" && (AOS as any)?.init) {
      AOS.init({ once: true, duration: 520, easing: "ease-out" });
    }
  }, []);

  return (
    <div className={styles.services}>
      {/* Überschrift */}
      <div className={styles.header}>
        <h2 className={styles.sectionTitle} data-aos="fade-up">
          Unsere Services
        </h2>
      </div>

      {/* Cards */}
      <div className={styles.servicesGrid}>
        {items.slice(0, 4).map((it, idx) => (
          <article
            key={it.id}
            className={styles.serviceCard}
            tabIndex={0}
            data-aos="fade-up"
            data-aos-delay={String(idx * 100)} // 0/100/200/300
            aria-label={it.title}
          >
            {/* Bild: CLS-frei (breite/höhe) + 16:9 + max-height via CSS */}
            <div className={styles.cardImageWrap}>
              <img
                className={styles.cardImage}
                src={it.imgSrc}
                alt={it.imgAlt}
                width={800}
                height={450}      // 16:9
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Text */}
            <h3 className={styles.cardTitle}>{it.title}</h3>
            <p className={styles.cardDescription} title={it.desc}>
              {it.desc}
            </p>

            {/* Sekundäre Aktion (optional) */}
            <span className={styles.cardAction} aria-hidden="true">
              <span className={styles.actionText}>Mehr erfahren</span>
              <span className={styles.actionArrow}>→</span>
            </span>
          </article>
        ))}
      </div>

      {/* CTA-Box */}
      <section
        className={styles.ctaSection}
        data-aos="fade-up"
        data-aos-delay="200"
        aria-label="Direktkontakt & Beratung"
      >
        <div className={styles.ctaCard}>
          {/* CTA-Bild */}
          <div className={styles.ctaImageWrap}>
            <img
              className={styles.ctaImage}
              src={ctaImgJpg}
              width={1200}
              height={675}  // 16:9
              loading="lazy"
              decoding="async"
              alt="Persönliche Versandberatung: freundlich, klar und zuverlässig."
            />
          </div>

          {/* CTA-Text + Buttons */}
          <div className={styles.ctaTextBlock}>
            <h3 className={styles.ctaTitle}>Fragen zum Versand?</h3>
            <p className={styles.ctaDescription}>
              Wir beraten dich persönlich – schnell, klar und ohne Fachjargon.
            </p>
            <div className={styles.ctaActions}>
              <a href={primaryCtaHref}>
                <button className={styles.ctaBtnPrimary}>Jetzt Kontakt aufnehmen</button>
              </a>
              <a href={secondaryCtaHref}>
                <button className={styles.ctaBtnSecondary}>Ablauf ansehen</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
