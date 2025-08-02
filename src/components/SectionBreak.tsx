// src/components/SectionBreak.tsx
import React from 'react';

type SectionBreakProps = {
  fill?: string;        // z. B. "#00443f" für Afrika-Grün
  flip?: boolean;       // true = invertiert (z. B. oben vs. unten)
};

export default function SectionBreak({ fill = '#00443f', flip = false }: SectionBreakProps) {
  return (
    <div
      className="section-break"
      style={{
        transform: flip ? 'rotate(180deg)' : 'none',
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <path
          fill={fill}
          fillOpacity="1"
          d="M0,224L1440,96L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}
