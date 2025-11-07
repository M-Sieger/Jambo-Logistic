# Jambo Logistics – Angepasste Roadmap (Realistisch)

**Version:** 1.1 (Updated nach Situations-Analyse)  
**Datum:** 30.10.2025  
**Status:** MVP-Phase (Validierung läuft)

---

## 🎯 Situations-Update

**Was wissen wir:**
- ✅ MVP Landing Page fertig und zeigbar
- ⚠️ Geschäftsmodell läuft aktuell über Macha persönlich
- ⚠️ Prozesse sind rudimentär (Diaspora + kleine Händler)
- 🎯 Ziel: Schrittweise professionalisieren, nicht sofort "Enterprise"

**Strategie:** **"Learn & Build"** statt "Build & Hope"

---

## 📅 Phase 0: MVP-Validierung (AKTUELL - 2 Wochen)

### Ziel: Klarheit schaffen + erste Optimierungen

**Woche 1: Quick Wins**
- [x] MVP Landing Page fertig
- [ ] WhatsApp-Button prominent (Sticky auf Mobile)
- [ ] Hero: Unter-CTA "Kostenlose Beratung"
- [ ] Trust-Section: 1-2 echte Testimonials
- [ ] Services: "Preise auf Anfrage" klarer zeigen

**Woche 2: Macha-Gespräch + Entscheidungen**

**Kritische Fragen klären:**

**🔹 Geschäftsmodell:**
- Preisgestaltung: Pauschal oder nach Gewicht/Volumen?
- Abrechnung: Vorab-Zahlung oder Rechnung?
- Container-Frequenz: Wöchentlich/monatlich/bei Bedarf?

**🔹 Prozesse:**
- Annahme: Kunden bringen zu Macha oder Abholung?
- Nairobi: Eigenes Lager oder Partner vor Ort?
- Kommunikation: WhatsApp-Updates manuell oder automatisiert?

**🔹 Zielgruppe:**
- Hauptkunden: % Diaspora vs. % Händler?
- Häufigste Sendungen: Pakete (<30kg) oder Container?
- Akquise-Kanäle: Mundpropaganda, WhatsApp-Gruppen, Google?

**🔹 Vision:**
- 12-Monats-Ziel: Mehr Volumen oder bessere Prozesse?
- Priorität: Skalierung oder Professionalisierung zuerst?

**Output:** Entscheidung für Phase 1A oder 1B

---

## 🎨 Phase 0.1: Warm Professional Brand Refresh (Iteration)

**Ziel:** Die bestehende Landing Page optisch und funktional an das geplante „Warm Professional“-Branding anzugleichen, bevor Backend-Arbeiten starten.

**Status (Stand: 07.11.2025):** 🔄 In Umsetzung

**Bereits umgesetzt:**
- ✅ Sprachumschalter Desktop: Emoji → Textcodes mit hohem Kontrast (Sprache: DE | EN | SW)
- ✅ Sprachumschalter Mobile: Codes + Langnamen, größere Touch-Flächen, aktiver Orange-Verlauf
- ✅ Navigation Desktop: Flex-Wrap + dynamische Abstände verhindern Cut-Off bei längeren Swahili-Bezeichnungen
- ✅ Kontaktbereich: Orange WhatsApp-Kontaktkarte wird auf Mobile vollständig ausgeblendet (nur Sticky-CTA aktiv)

**Offene UX-Aufgaben (Warm Professional):**
- [ ] Mobile Menü neu gestalten (Gradient #1a2f3a → #0f1f28, aktive States, strukturierte Links)
- [ ] Globales Color-Token-Update in `src/styles/variables.css` (Navy, Orange, Sand, Kente-Akzente)
- [ ] Typografie-Feintuning (Schriftgrößen, Zeilenhöhen, Kontrastprüfung für DE/EN/SW)
- [ ] Trust-Section erweitern (Testimonials mit Portraits, Social Proof Badges)
- [ ] Sticky WhatsApp Button optisch harmonisieren (Icon + Copy, Schatten, Border)

**Deliverables:**
- Styleboard & Guidelines (`docs/BRANDING-WARM.md`, neu anzulegen)
- Aktualisierte Komponenten (Header, Mobile Menu, Buttons, Cards)
- Visual QA-Checkliste (Desktop, Tablet, Mobile, High-Contrast)

---

## 📋 Phase 1A: Lean MVP (wenn Prozesse SEHR rudimentär)

**Zeitraum:** Monat 1-2  
**Fokus:** Vertrauen aufbauen + Lead-Generierung (KEIN Backend)

### Sprint 1.1: Content-Optimierung (Woche 1-2)

**Ziel:** Landing Page reflektiert reale Situation

**Änderungen:**
- Hero: "Persönlicher Service seit 2020" (keine Über-Versprechungen)
- Services: "Individuelle Lösungen" betonen (keine starren Pakete)
- Prozess: "Anfrage → Beratung → Maßgeschneiderte Lösung"
- Trust: Echte Fotos von Kunden/Sendungen, kleine Erfolgsgeschichten
- Contact: WhatsApp als Haupt-CTA

**Deliverables:**
- ✅ Realistische Value-Props
- ✅ Vertrauensaufbau durch Authentizität
- ✅ Klare Erwartungen (keine falschen Versprechen)

### Sprint 1.2: Analog-Prozess-Optimierung (Woche 3-4)

**Ziel:** Macha's Workflow verbessern (ohne Code)

**Tools:**
- Google Sheets: Anfragen-Tracking (Name, Kontakt, Status)
- WhatsApp Business: Automatische Antworten, Labels
- Google Forms: Strukturierte Anfragen (statt Chaos)

**Output:**
- ✅ Anfragen werden nicht vergessen
- ✅ Kunden bekommen schnellere Antworten
- ✅ Grundlage für spätere Digitalisierung

**Entscheidung nach 2 Monaten:**
- Wenn Volumen steigt → Phase 2A (Backend)
- Wenn Prozesse sich stabilisieren → Phase 1B

---

## 📋 Phase 1B: Strukturiertes MVP (wenn Prozesse klarer sind)

**Zeitraum:** Monat 1-2  
**Fokus:** Klarheit schaffen + Self-Service vorbereiten

### Sprint 1.1: Content-Präzisierung (Woche 1-2)

**Ziel:** Konkrete Pakete/Services zeigen

**Änderungen:**
- Hero: "Wöchentliche Abfahrten ab Essen nach Nairobi"
- Services: Konkrete Pakete (z.B. "5-20kg ab 59€" – falls Preise feststehen)
- Prozess: "Online anfragen → Paket abgeben → Tracking per WhatsApp"
- Trust: Zahlen konkretisieren ("200+ Container seit 2020, 98% Zufriedenheit")
- Contact: Formular mit Dropdown (Paket/Container/Auto)

**Deliverables:**
- ✅ Klare Erwartungen
- ✅ Self-Service-Vorbereitung
- ✅ Basis für Preisrechner (später)

### Sprint 1.2: Airtable CRM-Light (Woche 3-4)

**Ziel:** Anfragen strukturiert erfassen (ohne eigenes Backend)

**Setup:**
- Airtable Base: "Anfragen", "Kunden", "Sendungen"
- Kontaktformular → Airtable-Integration (Zapier/Make)
- Views: "Offen", "In Bearbeitung", "Abgeschlossen"
- Auto-E-Mail: Bestätigung an Kunden + Notification an Macha

**Deliverables:**
- ✅ Keine Anfrage geht verloren
- ✅ Macha sieht alles auf einen Blick
- ✅ Historie pro Kunde

**Entscheidung nach 2 Monaten:**
- Wenn Self-Service gewünscht → Phase 2B (Backend + Buchung)
- Wenn Tracking wichtig wird → Phase 2C (Tracking)

---

## 📋 Phase 2A: Backend-Integration (Monat 3-4)

**Voraussetzung:** Prozesse sind geklärt + Volumen steigt

### Sprint 2.1: Contact-API (Woche 1-2)

**Ziel:** Anfragen in eigener DB speichern

**Backend:**
- FastAPI (Python) oder Express (Node.js)
- PostgreSQL oder SQLite
- Endpoint: `POST /api/contact`
- E-Mail-Versand (Nodemailer/AWS SES)

**Frontend:**
- Contact-Form → API-Integration
- Success-Message: "Wir melden uns in 24h"
- Error-Handling + Retry-Logik

### Sprint 2.2: Admin-Panel (Woche 3-4)

**Ziel:** Macha kann Anfragen verwalten

**Features:**
- Login (einfaches Auth, kein OAuth)
- Anfragen-Liste (CRUD)
- Status-Updates (Neu → Bearbeitung → Abgeschlossen)
- Export (CSV für Buchhaltung)

**Deliverables:**
- ✅ Eigene Infrastruktur (kein Airtable-Lock-in)
- ✅ Macha arbeitet effizienter
- ✅ Basis für Kundendashboard (später)

---

## 📋 Phase 2B: Self-Service-Buchung (Monat 3-5)

**Voraussetzung:** Preise stehen fest + Payment-Methode geklärt

### Sprint 2.1: Preisrechner (Woche 1-2)

**Ziel:** Kunden sehen sofort Preis

**Features:**
- Eingabe: Gewicht, Volumen, Ziel
- Ausgabe: Preis-Indikator (z.B. "59-89 €")
- CTA: "Jetzt buchen" oder "Anfrage stellen"

### Sprint 2.2: Payment-Integration (Woche 3-5)

**Ziel:** Online-Zahlung möglich

**Optionen:**
- Stripe (wenn internationale Karten akzeptiert)
- PayPal (Diaspora-freundlich)
- Wise (günstig für DE↔Kenya)

**Flow:**
1. Kunde gibt Daten ein
2. Sieht Preis
3. Zahlt online
4. Bekommt Bestätigung + Instruktionen

**Deliverables:**
- ✅ Automatisierte Buchungen
- ✅ Macha hat weniger manuellen Aufwand
- ✅ Skalierung möglich

---

## 📋 Phase 2C: Tracking-System (Monat 3-5)

**Voraussetzung:** Kunden fragen oft nach Status

### Sprint 2.1: Tracking-Backend (Woche 1-2)

**Ziel:** Status-Updates erfassen

**Features:**
- Shipment-Model (Status: Angenommen, Transit, Zoll, Zugestellt)
- Timeline-Tracking (Datum + Ort pro Status-Änderung)
- API: `GET /api/tracking/:id`

### Sprint 2.2: Tracking-Frontend (Woche 3-4)

**Ziel:** Kunde kann Status abrufen

**Features:**
- Tracking-Page: `/tracking/:id`
- Timeline-Visualisierung (ähnlich wie DHL)
- WhatsApp-Integration: Auto-Update bei Status-Änderung

**Sprint 2.3: Admin-Integration (Woche 5)

**Ziel:** Macha kann Status updaten

**Features:**
- Admin-Panel: Sendung auswählen → Status ändern
- Auto-Notification: Kunde bekommt WhatsApp/E-Mail

**Deliverables:**
- ✅ Transparenz für Kunden
- ✅ Weniger Support-Anfragen ("Wo ist mein Paket?")
- ✅ Professioneller Eindruck

---

## 📋 Phase 3+: Skalierung & Automatisierung (Monat 6+)

**Abhängig von Erfolg der Phase 1-2**

### Mögliche Features (priorisiert nach Bedarf):

**A) Kundendashboard:**
- Login für Stammkunden
- Sendungshistorie einsehen
- Wiederholungs-Buchungen

**B) Partner-Integration:**
- API-Anbindung zu Logistik-Partnern (DHL, etc.)
- Automatische Preis-Updates
- Live-Tracking von Partnern

**C) Automatisierung:**
- n8n/Zapier-Workflows
- Auto-E-Mails bei Status-Änderungen
- SMS-Notifications

**D) Expansion:**
- Weitere Zielländer (Tanzania, Uganda)
- Mehr Service-Optionen (Express, Versicherung)
- B2B-Features (Firmen-Accounts, Rechnungen)

---

## 🎯 Entscheidungsbaum

```
Sind Prozesse klar?
├─ Nein → Phase 1A (Lean MVP)
│   └─ Nach 2 Monaten: Klarer?
│       ├─ Ja → Phase 1B
│       └─ Nein → Weiter iterieren
│
└─ Ja → Phase 1B (Strukturiertes MVP)
    └─ Nach 2 Monaten: Was fehlt am meisten?
        ├─ Volumen steigt → Phase 2A (Backend)
        ├─ Self-Service gewünscht → Phase 2B (Buchung)
        └─ Tracking-Anfragen → Phase 2C (Tracking)
```

---

## ✅ Nächste Schritte (JETZT)

1. **Diese Woche:**
   - [ ] Quick Wins umsetzen (siehe `/docs/QUICK-WINS-MVP.md`)
   - [ ] MVP Macha zeigen
   - [ ] Gespräch führen (Fragen-Katalog abarbeiten)

2. **Nächste Woche:**
   - [ ] Roadmap finalisieren (1A oder 1B?)
   - [ ] Priorisierung festlegen
   - [ ] Sprint 1.1 starten

3. **Monat 1-2:**
   - [ ] Phase 1A oder 1B durchführen
   - [ ] Learnings sammeln
   - [ ] Entscheidung für Phase 2

---

## 📊 Success-Metriken (angepasst)

### Phase 0 (MVP-Validierung):
- ✅ Macha findet Landing Page gut
- ✅ Erste 5 Anfragen über Website (statt nur WhatsApp)
- ✅ Klarheit über nächste Schritte

### Phase 1A/1B:
- ✅ 20+ Anfragen pro Monat über Website
- ✅ Macha arbeitet effizienter (weniger Chaos)
- ✅ Kunden-Feedback positiv

### Phase 2A/B/C:
- ✅ 50+ Anfragen pro Monat
- ✅ 50% Self-Service-Quote (wenn Buchung implementiert)
- ✅ Support-Anfragen sinken um 30% (wenn Tracking implementiert)

---

**Fazit:** Diese Roadmap ist **flexibel** und **realistisch**. Wir bauen nur, was wirklich gebraucht wird, basierend auf echtem Feedback und echten Prozessen.
