# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Vollständige Dokumentations-Struktur nach 360Volt-Standards
  - `/docs/PROJECT-CONTEXT.md` – Projekt-Analyse und Tech-Stack-Übersicht
  - `/docs/ARCHITECTURE.md` – Architektur-Entscheidungen und Component-Struktur
  - `/docs/ROADMAP.md` – Sprint-Planung und Feature-Roadmap
  - `/docs/CODING-STANDARDS.md` – TypeScript-Regeln, Naming-Conventions, Git-Workflow
  - `/docs/TESTING-STRATEGY.md` – Unit-Tests, E2E-Tests, Performance-Tests
  - `/.github/copilot-instructions.md` – GitHub Copilot Konfiguration
- Header-Kommentare (Deutsch) für alle Components in `/src/components`:
  - `Hero.tsx` – Hero-Section mit dynamischem Text-Carousel
  - `Services.tsx` – Service-Übersicht mit CTA-Section
  - `ProcessSteps.tsx` – 3-Schritte-Prozess-Visualisierung
  - `AboutBox.tsx` – "Über uns" Section
  - `Contact.tsx` – Kontaktformular mit Validation
  - `Footer.tsx` – Footer mit Links und Social-Media
  - `TrustSection.tsx` – Trust-Metriken (Social Proof)

### Changed
- Projekt-Struktur dokumentiert und nach Best Practices organisiert
- TypeScript Strict Mode validiert (bereits aktiviert, keine Änderungen nötig)

---

## [1.0.0] - 2025-10-30

### Added
- Initial MVP Release: Landing Page für Jambo Logistics
  - Responsive Design (Mobile-optimiert)
  - Hero-Section mit CTA
  - Services-Section (3 Hauptservices)
  - 3-Schritte-Prozess-Visualisierung
  - About-Section mit Trust-Elementen
  - Kontaktformular (Formspree temporär)
  - Footer mit Sprachumschaltung (DE/EN/SW)
  - Smooth Scrolling & AOS-Animationen
  - CSS Modules + Design-System (variables.css)

### Tech Stack
- React 19.1.0
- TypeScript 5.9.2
- Vite 6.3.5
- CSS Modules
- AOS (Animate On Scroll)
- Radix UI (vorbereitet für Dashboard)

---

## Format-Legende

- **Added** – Neue Features
- **Changed** – Änderungen an bestehenden Features
- **Deprecated** – Bald zu entfernende Features
- **Removed** – Entfernte Features
- **Fixed** – Bug-Fixes
- **Security** – Sicherheits-Fixes

---

**Konventionen:**
- Commits folgen [Conventional Commits](https://www.conventionalcommits.org/)
- Version-Tags folgen [Semantic Versioning](https://semver.org/)
- CHANGELOG wird manuell gepflegt (automatisiert ab Phase 2 mit `standard-version`)
