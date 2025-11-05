// ---------------------------------------------------------
// Datei: Services.tsx
// Zweck: Service-Übersicht mit 4 Service-Cards und CTA-Section
// Besonderheiten:
// - Service-Cards mit Bildern, Lazy Loading, aspect-ratio für CLS-freies Layout
// - AOS-Stagger-Animation (0/100/200/300ms) für sanften Scroll-Effekt
// - CTA-Section mit Beratungs-Bild und zwei Buttons (Primär: Contact, Sekundär: Prozess)
// - Background-Image mit Overlay für bessere Text-Lesbarkeit
// - Multi-Language Support via useLanguage() Hook
// Stand: 05.11.2025
// ---------------------------------------------------------

import React from 'react';

import AOS from 'aos';

import { useLanguage } from '../contexts/language-context';
// CTA-Bild
import ctaImgJpg from '../assets/beratung.jpeg';
// Service-Bilder
import pkgImg from '../assets/boxload.jpg';
import ctrImg from '../assets/containerload.jpeg';
import homeImg from '../assets/deliver.jpeg';
import textImg from '../assets/warehouse.jpg';
import styles from './Services.module.css';

// 🔹 Datenmodell
type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  imgSrc: string;
  imgAlt: string;
  priceHint?: string;
};

export interface ServicesProps {
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
}

const Services: React.FC<ServicesProps> = ({
  primaryCtaHref = '#contact',
  secondaryCtaHref = '#process',
}) => {
  const { translations: t } = useLanguage();

  // 🔹 Service-Items aus Translations
  const items: ServiceItem[] = [
    {
      id: 'pkg',
      title: t.services.items.package.title,
      desc: t.services.items.package.desc,
      imgSrc: pkgImg,
      imgAlt: t.services.items.package.title,
      priceHint: t.services.items.package.priceHint,
    },
    {
      id: 'ctr',
      title: t.services.items.container.title,
      desc: t.services.items.container.desc,
      imgSrc: ctrImg,
      imgAlt: t.services.items.container.title,
      priceHint: t.services.items.container.priceHint,
    },
    {
      id: 'home',
      title: t.services.items.household.title,
      desc: t.services.items.household.desc,
      imgSrc: homeImg,
      imgAlt: t.services.items.household.title,
      priceHint: t.services.items.household.priceHint,
    },
    {
      id: 'text',
      title: t.services.items.textiles.title,
      desc: t.services.items.textiles.desc,
      imgSrc: textImg,
      imgAlt: t.services.items.textiles.title,
      priceHint: t.services.items.textiles.priceHint,
    },
  ];
  // 🔹 AOS init (defensiv, falls nicht global initialisiert)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && AOS.init) {
      AOS.init({ once: true, duration: 520, easing: 'ease-out' });
    }
  }, []);

  return (
    <div className={styles.services}>
      {/* 🔹 Überschrift */}
      <div className={styles.header}>
        <h2 className={styles.sectionTitle} data-aos="fade-up">
          {t.services.title}
        </h2>
      </div>

      {/* 🔹 Service-Cards */}
      <div className={styles.servicesGrid}>
        {items.slice(0, 4).map((it, idx) => (
          <article
            key={it.id}
            className={styles.serviceCard}
            tabIndex={0}
            data-aos="fade-up"
            data-aos-delay={String(idx * 100)} // 0/100/200/300 ms Stagger
            aria-label={it.title}
          >
            {/* Bild: CLS-frei (width/height) + aspect-ratio in CSS */}
            <div className={styles.cardImageWrap}>
              <img
                className={styles.cardImage}
                src={it.imgSrc}
                alt={it.imgAlt}
                width={800}
                height={450}       // 16:9
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            </div>

            {/* Text */}
            <h3 className={styles.cardTitle}>{it.title}</h3>
            <p className={styles.cardDescription} title={it.desc}>
              {it.desc}
            </p>

            {/* ✅ Preis-Hinweis */}
            {it.priceHint && (
              <span className={styles.priceHint}>{it.priceHint}</span>
            )}

            {/* Sekundäre Aktion */}
            <span className={styles.cardAction} aria-hidden="true">
              <span className={styles.actionText}>{t.cta.learnMore}</span>
              <span className={styles.actionArrow}>→</span>
            </span>
          </article>
        ))}
      </div>

      {/* 🔹 CTA-Box */}
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
              sizes="(max-width: 768px) 100vw, 1200px"
              alt={t.services.cta.title}
            />
          </div>

          {/* CTA-Text + Buttons */}
          <div className={styles.ctaTextBlock}>
            <h3 className={styles.ctaTitle}>{t.services.cta.title}</h3>
            <p className={styles.ctaDescription}>
              {t.services.cta.description}
            </p>
            <div className={styles.ctaActions}>
              <a href={primaryCtaHref}>
                <button className={styles.ctaBtnPrimary}>{t.services.cta.primaryBtn}</button>
              </a>
              <a href={secondaryCtaHref}>
                <button className={styles.ctaBtnSecondary}>{t.services.cta.secondaryBtn}</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
