// src/components/SectionBreak.tsx
import React from 'react';

type SectionBreakProps = {
  fill?: string;
  flip?: boolean;
};

export default function SectionBreak({ fill = '#fcd5a2', flip = false }: SectionBreakProps) {
  return (
    <div className="section-break" style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill={fill}
          fillOpacity="1"
          d="M0,224L1440,96L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}
