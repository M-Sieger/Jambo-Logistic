// src/components/LocationBox.tsx
import React from 'react';

import styles from '../styles/LocationBox.module.css';

interface LocationBoxProps {
  headline?: string;
  subline?: string;
  locations: {
    flag: string;
    country: string;
    name: string;
    address: string;
  }[];
  mapEmbedUrl: string;
}

export default function LocationBox({
  headline = 'Unsere Standorte',
  subline = 'Deutschland & Kenia – lokal verbunden.',
  locations,
  mapEmbedUrl,
}: LocationBoxProps) {
  return (
    <section id="standorte" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>{headline}</h2>
          <p>{subline}</p>
          <ul>
            {locations.map((loc, idx) => (
              <li key={idx}>
                {loc.flag} <strong>{loc.country}:</strong>
                <br />
                {loc.name}
                <br />
                {loc.address}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            title="Karte"
            src={mapEmbedUrl}
            loading="lazy"
            allowFullScreen
            className={styles.map}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
