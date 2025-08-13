// src/hooks/useActiveSection.ts
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * useActiveSection
 * ------------------------------------------------------------
 * Liefert die ID der aktuell "aktiven" Section – stabil bei
 * Sticky-Header, kurzen/überlappenden Bereichen und Resize.
 *
 * Strategie:
 * 1) Bevorzugt IntersectionObserver (Viewport-Mitte via rootMargin)
 * 2) Fallback auf ScrollSpy (Viewport-Mitte berechnet)
 *
 * Rückgabe: activeId (string | null)
 */

export interface UseActiveSectionOptions {
  /**
   * Sticky-Header-Höhe (px), um die "Treffzone" nach unten zu schieben.
   * Beispiel: 80–96px. Wird automatisch in rootMargin eingerechnet.
   */
  headerOffset?: number;

  /**
   * Threshold für IntersectionObserver. 0.01 reicht idR.
   */
  threshold?: number;

  /**
   * Fallback-ScrollSpy: throttle (ms) für Scroll/Resize.
   */
  scrollThrottleMs?: number;
}

export function useActiveSection(
  sectionIds: string[],
  {
    headerOffset = 96,
    threshold = 0.01,
    scrollThrottleMs = 120,
  }: UseActiveSectionOptions = {}
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Memoisierte DOM-Refs (IDs → Elements). Wird neu aufgebaut, wenn IDs sich ändern.
  const elements = useMemo(
    () => sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[],
    [sectionIds]
  );

  // Kleine rAF-basierte Throttle-Hilfe (performanter als setTimeout bei Scroll)
  const rafLockRef = useRef<number | null>(null);
  const lastRunRef = useRef<number>(0);
  const throttled = (fn: () => void) => {
    const now = performance.now();
    if (now - lastRunRef.current < scrollThrottleMs) {
      if (rafLockRef.current == null) {
        rafLockRef.current = requestAnimationFrame(() => {
          rafLockRef.current = null;
          fn();
          lastRunRef.current = performance.now();
        });
      }
      return;
    }
    fn();
    lastRunRef.current = now;
  };

  // 1) IntersectionObserver – bevorzugter Weg
  useEffect(() => {
    if (!elements.length) return;

    // IO nur, wenn verfügbar
    if ('IntersectionObserver' in window) {
      /**
       * Wir legen die "Treffzone" in die Mitte des Screens:
       * rootMargin top/bottom negativ → oben/unten wird abgeschnitten,
       * so dass nur ein mittlerer Streifen zählt.
       *
       * Beispiel: headerOffset=96 → top = -96px
       * Der untere Rand schneiden wir stärker ab, damit der Wechsel
       * gefühlt etwas später passiert (stabileres UX).
       */
      const topCut = Math.max(0, headerOffset);
      const bottomCut = Math.max(0, Math.round(window.innerHeight * 0.55));
      const rootMargin = `-${topCut}px 0px -${bottomCut}px 0px`;

      const observer = new IntersectionObserver(
        (entries) => {
          // Wir wählen den Eintrag mit der höchsten intersectionRatio,
          // der gleichzeitig "isIntersecting" ist.
          let best: IntersectionObserverEntry | null = null;
          for (const e of entries) {
            if (e.isIntersecting) {
              if (best == null || e.intersectionRatio > best.intersectionRatio) {
                best = e;
              }
            }
          }
          if (best?.target) {
            const match = sectionIds.find((id) => id === (best!.target as HTMLElement).id);
            if (match && match !== activeId) {
              setActiveId(match);
            }
          }
        },
        { root: null, rootMargin, threshold }
      );

      elements.forEach((el) => observer.observe(el));

      // Initiale Aktivierung bei Deep-Link/Hash
      // (z. B. /#services) – wenn vorhanden, direkt setzen.
      if (location.hash) {
        const hashId = location.hash.replace('#', '');
        if (sectionIds.includes(hashId)) {
          setActiveId(hashId);
        }
      }

      return () => observer.disconnect();
    }
  }, [elements, sectionIds, headerOffset, threshold]); // IO-Setup neu bei relevanten Änderungen

  // 2) Fallback: ScrollSpy – wenn IO nicht vorhanden
  useEffect(() => {
    if (!elements.length) return;
    if ('IntersectionObserver' in window) return; // IO aktiv → Fallback nicht nötig

    const computeActive = () => {
      // Viewport-Mitte (um Header-Offset korrigiert)
      const viewportCenter = window.scrollY + Math.max(0, window.innerHeight / 2 - headerOffset);

      // Kandidat: die Section, deren [top, bottom] den Center einschließt
      let candidate: { id: string; distance: number } | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + Math.max(1, el.offsetHeight); // min 1px, um 0-Höhen zu vermeiden

        // Distance vom Center zur Section-Mitte
        const center = top + (bottom - top) / 2;
        const distance = Math.abs(center - viewportCenter);

        // Center im Bereich? (tolerant)
        const inRange = viewportCenter >= top && viewportCenter <= bottom;

        // Auswahl: inRange bevorzugen, sonst geringste Distanz
        if (inRange) {
          candidate = { id, distance: -1 }; // inRange gewinnt immer
          break;
        } else if (candidate == null || distance < candidate.distance) {
          candidate = { id, distance };
        }
      }

      if (candidate && candidate.id !== activeId) {
        setActiveId(candidate.id);
      }
    };

    const onScroll = () => throttled(computeActive);
    const onResize = () => throttled(computeActive);

    // Init
    computeActive();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafLockRef.current != null) {
        cancelAnimationFrame(rafLockRef.current);
      }
      rafLockRef.current = null;
    };
  }, [elements, sectionIds, headerOffset, scrollThrottleMs, activeId]);

  return activeId;
}
