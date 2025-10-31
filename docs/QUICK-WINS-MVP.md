# Jambo Logistics – Quick Wins für MVP-Demo

**Datum:** 30.10.2025  
**Ziel:** Landing Page für Macha-Demo optimieren (ohne Backend-Änderungen)

---

## 🎯 Änderungen (Priorität: HOCH)

### 1. WhatsApp-Button prominent (Mobile Sticky)

**Warum:**
- Zielgruppe nutzt primär WhatsApp
- Schnellste Kontaktmöglichkeit
- Reduziert Hürde für Anfragen

**Umsetzung:**
```css
/* Neuer Sticky WhatsApp-Button (Mobile) */
.whatsappFloat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
}
```

**Datei:** `src/components/WhatsAppButton.tsx` (NEU)

---

### 2. Hero - Unter-CTA "Kostenlose Beratung"

**Aktuell:** Nur 1 CTA ("Jetzt anfragen")  
**Neu:** 2 CTAs für verschiedene Intent-Levels

```tsx
<div className={styles.ctaGroup}>
  <button className={styles.ctaPrimary}>Jetzt anfragen</button>
  <button className={styles.ctaSecondary}>Kostenlose Beratung</button>
</div>
```

**Warum:** Nicht jeder ist sofort bereit zu buchen → "Beratung" ist weniger committal

---

### 3. Services - "Preise auf Anfrage" klarer

**Aktuell:** Keine Preis-Information  
**Neu:** Erwartungsmanagement

```tsx
<div className={styles.serviceCard}>
  <h3>Paketversand</h3>
  <p>Individuelle Lösungen ab 5kg</p>
  <span className={styles.priceHint}>Preise auf Anfrage</span>
</div>
```

---

### 4. Trust-Section - Konkrete Testimonials

**Aktuell:** Nur Zahlen (200+ Container, etc.)  
**Neu:** 1-2 echte Kundenstimmen

```tsx
const testimonials = [
  {
    text: "Macha hat meinen Container pünktlich nach Nairobi gebracht. Toller Service!",
    author: "Peter M., Essen",
    service: "Container-Transport"
  },
  {
    text: "Schnell, zuverlässig und persönlich. Genau was ich gesucht habe.",
    author: "Sarah K., Diaspora",
    service: "Paketversand"
  }
];
```

**Wichtig:** Mit Macha abstimmen, ob echte Namen OK sind (sonst anonymisieren)

---

### 5. Prozess-Section - Text anpassen

**Wenn Prozesse noch rudimentär:**
```
1. Anfrage stellen → Per WhatsApp, E-Mail oder Formular
2. Persönliche Beratung → Wir besprechen deine individuellen Bedürfnisse
3. Maßgeschneiderte Lösung → Transport nach deinen Wünschen
```

**Wenn Prozesse schon klarer:**
```
1. Online anfragen → Formular ausfüllen oder WhatsApp
2. Paket/Container abgeben → In Essen oder Abholung
3. Sendung verfolgen → Updates per WhatsApp
```

---

## 📋 Offene Fragen für Macha-Gespräch

### Geschäftsmodell
- [ ] Wie läuft aktuell die Preisgestaltung? (Pauschal/nach Gewicht?)
- [ ] Abrechnung: Vorab-Zahlung oder nach Lieferung?
- [ ] Container-Frequenz: Wöchentlich/monatlich?

### Prozesse
- [ ] Annahme: Kunden bringen zu dir oder Abholung?
- [ ] Nairobi: Eigenes Lager oder Partner?
- [ ] Kommunikation: WhatsApp-Updates manuell?

### Zielgruppe
- [ ] Hauptkunden: 80% Diaspora, 20% Händler?
- [ ] Häufigste Sendungen: Pakete oder Container?
- [ ] Akquise: Mundpropaganda oder Online?

### Vision
- [ ] Wo soll es in 12 Monaten stehen?
- [ ] Skalierung oder Professionalisierung zuerst?

---

## ✅ Nächste Schritte

1. **Diese Woche:**
   - Quick Wins umsetzen (1-2 Tage)
   - MVP Macha zeigen
   - Gespräch führen (Fragen klären)

2. **Nächste Woche:**
   - Roadmap anpassen basierend auf Antworten
   - Entscheiden: Backend sofort oder später?
   - Priorisierung festlegen

3. **Danach:**
   - Phase 2 starten (nur wenn Prozesse klar)
   - Oder: Weitere MVP-Iterationen (wenn noch unklar)
