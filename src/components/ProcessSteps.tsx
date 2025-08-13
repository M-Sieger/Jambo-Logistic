// src/components/ProcessSteps.tsx
// ✅ Konsistent mit Services-Section: 16:9-Bilder, AOS-Stagger, ruhige Cards
// ✅ CLS-frei dank width/height am <img> + aspect-ratio (in CSS)
// ✅ Robust: Default-Schritte, falls keine Props übergeben werden
// ✅ A11y: aria-labelledby + sinnvolle Alt-Texte
// ✅ Performance: loading="lazy" + decoding="async" + sizes für responsive Auswahl

import React from 'react';

import AOS from 'aos';

// 🖼 Schrittbilder (lokal aus /assets)
import step1Image from '../assets/step1-anfrage.jpg';
import step2Image from '../assets/step2-abholung.jpg';
import step3Image from '../assets/step3-container.jpg';
import step4Image from '../assets/step4-nairobi.jpg';
import styles from './ProcessSteps.module.css';

// 🔹 Typen für Props
type Step = {
  icon?: string;        // z. B. "📩" (optional, dekorativ)
  title: string;        // z. B. "Annahme"
  description: string;  // kurz & klar, 1–2 Zeilen
  imgSrc?: string;      // optional – wenn gesetzt, überschreibt Default-Image
  imgAlt?: string;      // optional – sonst aus title generiert
};

type ProcessStepsProps = {
  steps?: Step[];       // optional – wir liefern Default-Schritte
};

// 🧱 Default-Schritte (MVP-ready, i18n-geeignet)
const defaultSteps: Step[] = [
  {
    icon: '📩',
    title: 'Annahme',
    description:
      'Bring dein Paket nach Essen (NRW) oder sende es per Post. Abholung in NRW folgt bald.',
    imgSrc: step1Image,
  },
  {
    icon: '🚚',
    title: 'Transport',
    description:
      'Dein Paket reist sicher im Container nach Kenia. Persönliche Updates statt Tracking‑App.',
    imgSrc: step2Image,
  },
  {
    icon: '🚢',
    title: 'Ankunft',
    description:
      'Eingang in Nairobi – transparente Abwicklung mit klaren Zeiten & Dokumenten.',
    imgSrc: step3Image,
  },
  {
    icon: '📍',
    title: 'Zustellung',
    description:
      'Wir melden uns, sobald dein Paket angekommen ist – Abholung im Lager ganz einfach.',
    imgSrc: step4Image,
  },
];

// 🔄 Zyklische Fallbacks (falls >4 Steps)
const stepImages = [step1Image, step2Image, step3Image, step4Image];
const stepIcons = ['📩', '🚚', '🚢', '📍'];

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps = defaultSteps }) => {
  // 🚀 AOS initialisieren (defensiv, falls globales init fehlt)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && (AOS as any)?.init) {
      AOS.init({ once: true, duration: 520, easing: 'ease-out' });
    }
  }, []);

  // ❎ Guard: keine Steps → nichts rendern
  if (!steps || steps.length === 0) return null;

  // 🔈 A11y: Überschrift-ID für aria-labelledby
  const headingId = 'process-heading';

  return (
    /**
     * 🌍 EINZIGE Section mit id="process"
     * CSS (global): #process { scroll-margin-top: 96px; } // Header-Höhe
     */
    <section
      id="process"
      role="region"
      aria-labelledby={headingId}
      className="section"
      data-section="process"
    >
      <div className="container">
        <div className={styles.steps} aria-label="So einfach funktioniert's">
          {/* Überschrift */}
          <h2 id={headingId} className={styles.headline} data-aos="fade-up">
            So einfach funktioniert&apos;s
          </h2>

          {/* Timeline / Cards */}
          <div className={styles.timeline}>
            {steps.map((step, i) => {
              const icon = step.icon ?? stepIcons[i % stepIcons.length];
              // Wenn ein Schritt ein eigenes Bild mitbringt → nutzen, sonst zyklisches Default
              const imgSrc = step.imgSrc ?? stepImages[i % stepImages.length];
              const imgAlt =
                step.imgAlt ?? `${step.title} – Illustration zum Schritt`;

              return (
                <article
                  key={`${step.title}-${i}`}
                  className={styles.timelineItem}
                  data-aos="fade-up"
                  data-aos-delay={String(i * 100)} // 0/100/200/300
                >
                  {/* Dekorativer Marker/Line (wird per CSS gezeichnet) */}
                  <div className={styles.marker} aria-hidden="true">
                    <span className={styles.dot} />
                    {i < steps.length - 1 && <span className={styles.line} />}
                  </div>

                  {/* Card-Inhalt */}
                  <div className={styles.cardContent}>
                    {/* Emoji/Icon (dekorativ) */}
                    <div className={styles.cardIcon} aria-hidden="true">
                      {icon}
                    </div>

                    {/* Step-Bild – 16:9 + CLS-frei (Breite/Höhe gesetzt) */}
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.stepImage}
                        src={imgSrc}
                        alt={imgAlt}
                        width={800}
                        height={450} // 16:9, passend zur Services-Section
                        loading="lazy"
                        decoding="async"
                        // 🔍 responsive Auswahl: mobil groß, sonst moderate Zielbreite
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 400px"
                      />
                    </div>

                    {/* Titel + Beschreibung */}
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardText}>{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA-Bereich (ruhiger Abschluss der Section) */}
          <div
            className={styles.ctaContainer}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className={styles.ctaContent}>
              <h3>Bereit für deine erste Lieferung?</h3>
              <p>
                Hol dir noch heute dein unverbindliches Angebot und starte deine
                Reise mit Jambo Logistics.
              </p>
              <div className={styles.buttonGroup}>
                <a href="#contact" className={styles.buttonPrimary}>
                  Jetzt anfragen
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* /steps wrapper */}
      </div>
      {/* /container */}
    </section>
  );
};

export default ProcessSteps;
