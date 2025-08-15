import React from 'react';

import cls from './SectionDivider.module.css';

/**
 * Public API der Komponente:
 * - variant: bestimmt die Form/Art des Dividers
 * - height: optionale Höhen-Override (z. B. "72px", "10vh"); Default steht im CSS
 * - aosAnim: AOS-Effekt. Wenn du AOS global initialisiert hast, wird's hier angewandt
 * - className: optionale Zusatzklassen (Spacing/Position IM Parent steuern, nicht hier)
 * - invert: Fallback, wenn mal KEIN data-theme gesetzt wurde (bevorzugt: automatisches Theme via data-theme am Parent)
 */
export type SectionDividerProps = {
  variant: 'wave' | 'diagonal' | 'straight';
  height?: string;
  aosAnim?: 'fade-up' | 'fade-in' | 'none';
  className?: string;
  invert?: boolean;
};

/**
 * SectionDivider – dekoratives Trenner‑Element zwischen Sections.
 * Prinzipien:
 * - CLS‑frei: reservierte Höhe über --divider-h (CSS‑Var)
 * - Token‑basiert: KEINE harten Farbcodes im JSX; Farben/Verläufe kommen über CSS‑Variablen
 * - Theme‑Steuerung: bevorzugt automatisch über `data-theme="light|dark"` am ELTERN‑Container
 * - A11y: rein dekorativ → aria-hidden, role="presentation"
 */
const SectionDivider: React.FC<SectionDividerProps> = ({
  variant,
  height,
  aosAnim = 'fade-up',
  className = '',
  invert = false,
}) => {
  // Höhen‑Override als CSS‑Variable (bleibt theming‑freundlich)
  const style = height
    ? ({ ['--divider-h' as any]: height } as React.CSSProperties)
    : undefined;

  // AOS nur setzen, wenn nicht explizit "none"
  const aosAttr = aosAnim === 'none' ? undefined : aosAnim;

  return (
    <div
      className={[
        cls.divider,
        cls[`variant_${variant}`],
        invert ? cls.invert : '',
        className,
      ].filter(Boolean).join(' ')}
      {...(aosAttr ? { 'data-aos': aosAttr } : {})}
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
