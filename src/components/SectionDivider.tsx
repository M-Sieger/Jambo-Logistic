import React from 'react';

import cls from './SectionDivider.module.css';

/**
 * Public API der Komponente:
 * - variant: bestimmt die Form/Art des Dividers (wave/diagonal/straight)
 * - height: optionale Höhen-Override (z. B. "72px", "10vh"); Default steht im CSS ( --divider-h )
 * - aosAnim: AOS-Effekt. Wenn AOS global initialisiert ist, wird der Effekt hier angewandt
 * - className: optionale Zusatzklassen (Spacing/Position IM Parent steuern, nicht hier)
 * - invert: Fallback für Theme-Tausch, wenn KEIN data-theme am Parent gesetzt wurde
 * - theme: (NEU, optional) setzt data-theme gezielt am Divider ("light" | "dark"), wenn du es nicht am Parent setzen willst
 */
export type SectionDividerProps = {
  variant: 'wave' | 'diagonal' | 'straight';
  height?: string;
  aosAnim?: 'fade-up' | 'fade-in' | 'none';
  className?: string;
  invert?: boolean;                 // bevorzugt NICHT nutzen, wenn theme/data-theme vorhanden ist
  theme?: 'light' | 'dark';         // optionaler Shortcut für data-theme am Divider selbst
};

/**
 * SectionDivider – dekoratives Trenner‑Element zwischen Sections.
 *
 * Prinzipien:
 * - CLS‑frei: reservierte Höhe über --divider-h (CSS‑Var im Modul) + optionale "height"‑Override per Prop
 * - Token‑basiert: KEINE harten Farbcodes im JSX; Farben/Verläufe kommen über CSS‑Variablen (variables.css)
 * - Theme‑Steuerung: bevorzugt automatisch über `data-theme="light|dark"` am ELTERN‑Container;
 *                    optional per `theme`‑Prop direkt am Divider (setzt data-theme am Root-Element)
 * - A11y: rein dekorativ → aria-hidden, role="presentation"
 */
const SectionDivider: React.FC<SectionDividerProps> = ({
  variant,
  height,
  aosAnim = 'fade-up',
  className = '',
  invert = false,
  theme, // neu: erlaubt gezieltes Setzen von data-theme am Divider
}) => {
  // Höhen‑Override als CSS‑Variable (bleibt theming‑freundlich und CLS‑sicher)
  const style = height
    ? ({ ['--divider-h' as any]: height } as React.CSSProperties)
    : undefined;

  // AOS nur setzen, wenn nicht explizit "none"
  const aosAttr = aosAnim === 'none' ? undefined : aosAnim;

  // Klassen robust zusammenführen
  const classes = [
    cls.divider,
    cls[`variant_${variant}`],
    invert ? cls.invert : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      // data-theme: wenn gesetzt, greifen die richtigen Farb-Tokens auch ohne Parent-Attribut
      {...(theme ? { 'data-theme': theme } : {})}
      className={classes}
      // sanfte Scroll-Animation via AOS (global initialisiert)
      {...(aosAttr ? { 'data-aos': aosAttr } : {})}
      // dekoratives Element → keine Semantik/Fokus
      role="presentation"
      aria-hidden="true"
      style={style}
    >
      {/* Variante "wave": SVG füllt die reservierte Höhe, skaliert ohne Layout-Shift */}
      {variant === 'wave' && (
        <svg
          className={cls.waveSvg}
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            {/* Verlauf aus CSS‑Variablen; keine Hardcodes */}
            <linearGradient id="dividerGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--grad-start)" />
              <stop offset="100%" stopColor="var(--grad-end)" />
            </linearGradient>
          </defs>
          {/* Weiche Welle; Pfad ist bewusst simpel (performant, keine Treppeneffekte) */}
          <path
            d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,100 L0,100 Z"
            fill="url(#dividerGradient)"
            shapeRendering="geometricPrecision"
          />
        </svg>
      )}

      {/* Variante "diagonal": Form über clip-path im CSS, Hintergrund vom Wrapper geerbt */}
      {variant === 'diagonal' && <div className={cls.diagonalShape} />}

      {/* Variante "straight": dezente Linie mit leichtem Verlauf/Shadow */}
      {variant === 'straight' && <div className={cls.straightRule} />}
    </div>
  );
};

export default SectionDivider;
