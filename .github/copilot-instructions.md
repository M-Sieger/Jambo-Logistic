# Jambo Logistics – GitHub Copilot Instructions

**Version:** 1.0  
**Letzte Aktualisierung:** 30.10.2025  
**Inspiriert von:** 360Volt Copilot-Instructions (Dokumentations-Standards)

---

## 🎯 Projektkontext

### Projekt-Typ
**Jambo Logistics** ist eine moderne Logistik-Plattform für deutsch-kenianische Transportdienstleistungen (DE ↔ Kenya).

**Aktueller Status:** Phase 1 (MVP Landing Page) ✅ abgeschlossen  
**Nächste Phase:** Backend-Integration (Kontaktformular-API)

### Tech-Stack
- **Frontend:** React 19.1.0 + TypeScript 5.9.2 + Vite 6.3.5
- **Styling:** CSS Modules + CSS Custom Properties (kein Tailwind!)
- **UI-Library:** Radix UI (vorbereitet, noch nicht voll integriert)
- **Animations:** AOS (Animate On Scroll)
- **Package Manager:** pnpm
- **Backend (geplant):** FastAPI (Python) oder Express (Node.js)

### Business-Kontext
- **Zielgruppe:** B2B + B2C (Paketversand, Containertransport, Fahrzeugimport)
- **Geografischer Fokus:** Deutschland (Essen/NRW) ↔ Kenia (Nairobi)
- **USP:** Persönlicher Service, kulturelle Brücke (DE/EN/Kiswahili)

---

## 📚 Primary Source of Truth

**Control File:** [`/docs/ROADMAP.md`](/docs/ROADMAP.md)

**Secondary References (Reihenfolge):**
1. [`/docs/ARCHITECTURE.md`](/docs/ARCHITECTURE.md) – Tech-Stack, Component-Struktur
2. [`/docs/CODING-STANDARDS.md`](/docs/CODING-STANDARDS.md) – TypeScript-Regeln, Naming-Conventions
3. [`/docs/TESTING-STRATEGY.md`](/docs/TESTING-STRATEGY.md) – Testing-Plan
4. [`/docs/PROJECT-CONTEXT.md`](/docs/PROJECT-CONTEXT.md) – Analyse, Entscheidungsbegründungen

**Bei Konflikten:** ROADMAP.md > ARCHITECTURE.md > CODING-STANDARDS.md

---

## 🛠️ Coding-Regeln

### TypeScript-Standards

#### 1. Strict Mode (PFLICHT)
```typescript
// tsconfig.json ist bereits konfiguriert mit:
// - strict: true
// - noImplicitAny: true
// - strictNullChecks: true
// - noUnusedLocals: true
// - noUnusedParameters: true
```

**✅ DO:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): User | null {
  // Explicit return type, clear null-handling
}
```

**❌ DON'T:**
```typescript
function getUserById(id) {  // ❌ Implicit any
  return data.find(u => u.id === id);  // ❌ No return type
}
```

#### 2. Component-Props (Interfaces)
```typescript
interface HeaderProps {
  logo: string;
  navItems: NavigationItem[];
  onSearch?: (query: string) => void;  // Optional mit ?
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ logo, navItems, className }) => {
  // ...
};
```

#### 3. Enums für bekannte Werte
```typescript
enum OrderStatus {
  Pending = 'pending',
  InTransit = 'in-transit',
  Delivered = 'delivered',
}
```

### Component-Struktur

#### Header-Kommentar (Deutsch, PFLICHT für komplexe Komponenten)
```typescript
// ---------------------------------------------------------
// Datei: Header.tsx
// Zweck: Fixierte Navigation mit Smooth-Scrolling
// Besonderheiten:
// - Mobile Hamburger Menu mit Fullscreen-Overlay
// - Active Section Highlighting beim Scrollen
// - Language-Switcher (DE/EN/SW)
// Stand: 30.10.2025
// ---------------------------------------------------------

import React from 'react';
// ... rest of code
```

**Wann Header hinzufügen?**
- ✅ Alle Components in `/src/components` (außer triviale wie `SectionDivider`)
- ✅ Alle Custom Hooks (`/src/hooks`)
- ✅ Komplexe Utility-Functions (`/src/utils`)
- ❌ Nicht für Radix UI-Primitives (`/src/components/ui`)

#### Component-Template
```typescript
// ===== Imports =====
import React, { useState } from 'react';
import styles from './Component.module.css';

// ===== Interfaces =====
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// ===== Component =====
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // ===== State =====
  const [isActive, setIsActive] = useState(false);

  // ===== Handlers =====
  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.();
  };

  // ===== Render =====
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
};

export default Component;
```

### CSS-Standards

#### 1. Immer CSS Modules + Design-Tokens
**❌ Nie hart-coded:**
```css
.button {
  background: #e67e22;  /* ❌ */
  padding: 16px;         /* ❌ */
}
```

**✅ Immer Tokens:**
```css
.button {
  background: var(--color-primary-500);  /* ✅ */
  padding: var(--spacing-md);            /* ✅ */
}
```

#### 2. Keine Inline-Styles (außer dynamisch)
**❌ Falsch:**
```tsx
<div style={{ color: '#e67e22', padding: '16px' }}>Content</div>
```

**✅ Richtig:**
```tsx
<div className={styles.content}>Content</div>
```

**✅ Ausnahme (dynamische Werte):**
```tsx
<div style={{ transform: `translateY(${offset}px)` }}>Content</div>
```

#### 3. Mobile-First Responsive
```css
/* Mobile First (default: 320px–767px) */
.header {
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .header {
    padding: var(--spacing-lg);
  }
}
```

### Naming-Conventions

| Type | Convention | Beispiel |
|------|------------|----------|
| **Components** | PascalCase | `Header.tsx`, `ContactForm.tsx` |
| **CSS Modules** | kebab-case | `header.module.css` |
| **Functions** | camelCase | `handleSubmit()`, `calculateTotal()` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_ITEMS`, `API_URL` |
| **Interfaces** | PascalCase | `HeaderProps`, `User` |
| **CSS Classes** | camelCase (in Module) | `.navLink`, `.ctaButton` |
| **CSS Variables** | kebab-case | `--color-primary-500` |

**Event-Handlers:** `handle[Event]`
```typescript
const handleSubmit = () => { /* ... */ };
const handleClick = () => { /* ... */ };
const handleInputChange = (value: string) => { /* ... */ };
```

---

## 🔀 Git-Workflow

### Conventional Commits (PFLICHT)

**Format:**
```
<type>(<scope>): <subject>

[optional body]
```

**Types:**
- `feat`: Neue Feature
- `fix`: Bug-Fix
- `docs`: Dokumentation
- `style`: Code-Formatting (keine Logic-Änderung)
- `refactor`: Code-Refactoring
- `test`: Tests hinzufügen/ändern
- `chore`: Dependencies, Build-Process

**Beispiele:**
```bash
feat(contact): Add email validation to contact form
fix(header): Fix mobile menu not closing on link click
docs(readme): Update installation instructions
chore(deps): Upgrade vite to 6.3.5
```

### Branch-Naming
```
feature/contact-form-validation
bugfix/header-scroll-bug
chore/update-dependencies
docs/add-architecture-docs
```

---

## 📋 Code-Generierung

### Wenn ich um eine Component bitte:

**1. Prüfe ARCHITECTURE.md:**
- Welche Props braucht die Component?
- Welche Styling-Strategie? (CSS Modules!)
- Gibt es bereits ähnliche Components?

**2. Erstelle Component mit Header-Kommentar:**
```typescript
// ---------------------------------------------------------
// Datei: ServiceCard.tsx
// Zweck: Wiederverwendbare Service-Card mit Icon + Title
// Besonderheiten:
// - AOS-Animation on Scroll
// - Hover-Effekt mit Gradient-Shift
// Stand: 30.10.2025
// ---------------------------------------------------------
```

**3. Erstelle passendes CSS Module:**
- Verwende Design-Tokens aus `variables.css`
- Mobile-First Responsive
- BEM-ähnliche Struktur (`.card`, `.cardTitle`, `.cardIcon`)

**4. Füge TypeScript-Interface hinzu:**
```typescript
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
}
```

### Wenn ich um eine API-Service-Function bitte:

**1. Erstelle Service-File:**
```typescript
// src/services/contact.service.ts
import api from './api';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactService = {
  async submit(data: ContactFormData) {
    const validated = contactSchema.parse(data);
    const response = await api.post('/api/contact', validated);
    return response.data;
  },
};
```

**2. Error-Handling mit klaren Messages:**
```typescript
try {
  await contactService.submit(data);
  toast.success('Nachricht gesendet!');
} catch (error) {
  if (error instanceof ValidationError) {
    toast.error('Bitte überprüfe deine Eingaben.');
  } else {
    toast.error('Ein Fehler ist aufgetreten.');
  }
}
```

---

## 🧪 Testing (ab Phase 2)

### Wenn ich um Tests bitte:

**1. Unit-Test für Function:**
```typescript
// src/utils/__tests__/validation.test.ts
import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../validation';

describe('isValidEmail', () => {
  it('should return true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
  });
});
```

**2. Integration-Test für Component:**
```typescript
// src/components/__tests__/ContactForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../Contact';

describe('ContactForm', () => {
  it('should render all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });
});
```

**3. E2E-Test für Flow:**
```typescript
// e2e/contact-flow.spec.ts
import { test, expect } from '@playwright/test';

test('should submit contact form', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="name"]', 'Test User');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Nachricht gesendet')).toBeVisible();
});
```

---

## 🚫 DO / DON'T

### ✅ DO

- ✅ **TypeScript Strict Mode nutzen** (bereits aktiviert)
- ✅ **Header-Kommentare** für komplexe Komponenten (Deutsch)
- ✅ **Design-Tokens** aus `variables.css` verwenden
- ✅ **CSS Modules** für Styling (kein Tailwind!)
- ✅ **Conventional Commits** schreiben
- ✅ **Interfaces für Props** definieren
- ✅ **Mobile-First** Responsive Design
- ✅ **Error-Handling** mit klaren User-Messages
- ✅ **Accessibility** beachten (ARIA-Labels, Semantic HTML)

### ❌ DON'T

- ❌ **Keine `any`-Types** (außer absoluter Notfall + `// TODO: Type properly`)
- ❌ **Keine hart-codierten Werte** in CSS (immer Tokens!)
- ❌ **Keine Inline-Styles** (außer dynamische Werte)
- ❌ **Kein Tailwind CSS** (Projekt nutzt CSS Modules!)
- ❌ **Keine `console.log`** in Production-Code (nur für Debugging, dann entfernen)
- ❌ **Keine großen Commits** ("Fix everything" → besser: mehrere kleine Commits)
- ❌ **Keine Accessibility-Ignoranz** (Keyboard-Navigation, Screen-Reader)
- ❌ **Keine Third-Party-CSS-Frameworks** (Bootstrap, etc.)

---

## 🔍 Wenn ich nach Best-Practice frage:

**1. Prüfe zuerst:**
- Gibt es dazu etwas in `/docs/CODING-STANDARDS.md`?
- Wie ist es in bestehenden Components gelöst? (z.B. `Header.tsx`)

**2. Wenn nicht dokumentiert:**
- Wähle die einfachste Lösung (KISS-Prinzip)
- Orientiere dich an React/TypeScript Best-Practices
- Dokumentiere neue Patterns in CODING-STANDARDS.md

**3. Bei Unsicherheit:**
- Frage nach: "Soll ich das nach Pattern X oder Y implementieren?"

---

## 📦 Wenn ich um Dependencies bitte:

**1. Prüfe zuerst:**
- Ist die Library schon installiert? (Check `package.json`)
- Gibt es eine native Lösung? (z.B. fetch statt axios)

**2. Wenn neue Dependency:**
- Begründe warum (Dokumentiere in ARCHITECTURE.md)
- Verwende `pnpm add` (nicht npm/yarn!)
- Lock-File committen

**3. Bevorzuge:**
- ✅ Native Browser-APIs (fetch, IntersectionObserver)
- ✅ React-Hooks (useState, useEffect)
- ✅ Bereits vorhandene Libraries (Radix UI, Zod)
- ❌ Vermeide: Moment.js (use date-fns), Lodash (use native ES6)

---

## 🎨 Design-System

### Farben (aus `variables.css`)
```css
--color-primary-500: #e67e22;      /* CTA, Hover, Accents */
--color-secondary-500: #2c3e50;    /* Footer, Depth */
--color-neutral-100: #f5f5f5;      /* Backgrounds */
--color-text-primary: #2c3e50;     /* Haupttext */
```

### Spacing (8px Grid)
```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-4xl: 4rem;    /* 64px */
```

### Typography
```css
--font-family-primary: 'Inter', sans-serif;
--font-size-base: 1rem;      /* 16px */
--font-size-lg: 1.125rem;    /* 18px */
--font-size-3xl: 1.875rem;   /* 30px */
```

---

## 📝 Wenn ich um Dokumentation bitte:

**1. Update relevante Docs:**
- Neue Feature → Update ROADMAP.md (Phase-Status)
- Neue Component-Pattern → Update CODING-STANDARDS.md
- Neue Architektur-Entscheidung → Update ARCHITECTURE.md

**2. Dokumentations-Format:**
- Deutsch für Header-Kommentare
- Deutsch für User-facing Strings
- Englisch für Code-Kommentare (optional, aber klar)

**3. Commit-Message:**
```bash
docs(architecture): Add section about new component pattern
```

---

## 🔧 Projekt-Setup (für neue Contributors)

**Installation:**
```bash
git clone https://github.com/M-Sieger/Jambo-Logistic.git
cd Jambo-Logistic
pnpm install
pnpm run dev
```

**Wichtige Commands:**
```bash
pnpm run dev      # Dev-Server (Port 5174)
pnpm run build    # Production-Build
pnpm run lint     # ESLint
pnpm run preview  # Preview Production-Build
```

**Vor erstem Commit:**
1. Lies `/docs/CODING-STANDARDS.md`
2. Setup Git-Hooks (später): `npx husky install`
3. Erstelle Feature-Branch: `git checkout -b feature/meine-feature`

---

## 🎯 Kontext-Prioritäten

**Wenn ich Code generiere, beachte in dieser Reihenfolge:**

1. **ROADMAP.md** – Was ist die aktuelle Phase? Was ist geplant?
2. **ARCHITECTURE.md** – Welche Tech-Stack-Entscheidungen wurden getroffen?
3. **CODING-STANDARDS.md** – Wie soll Code strukturiert sein?
4. **Bestehender Code** – Wie ist es bereits implementiert? (z.B. `Header.tsx`)
5. **React/TypeScript Best-Practices** – Falls nicht dokumentiert

**Bei Konflikten:**
- Projekt-Dokumentation > React-Conventions
- Einfachheit > Perfektion (YAGNI-Prinzip)

---

## 💡 Spezielle Hinweise

### Language-Support
- **UI-Strings:** Deutsch (default)
- **Code-Comments:** Deutsch für Header-Kommentare, Englisch für Inline-Kommentare (optional)
- **Dokumentation:** Deutsch
- **Git-Commits:** Englisch (Conventional Commits)

### Performance
- **Lazy-Loading:** Für Bilder (`loading="lazy"`)
- **Code-Splitting:** Für große Components (React.lazy)
- **CSS:** Immer Design-Tokens (kein Re-Parsing bei Theme-Wechsel)

### Accessibility
- **Keyboard-Navigation:** Alle interaktiven Elemente fokusierbar
- **ARIA-Labels:** Für Icon-Buttons, Dialogs, Menus
- **Semantic HTML:** `<button>` statt `<div onClick>`
- **Color-Contrast:** WCAG AA (4.5:1)

---

## 🚀 Zusammenfassung für Copilot

**Wenn du Code für Jambo Logistics generierst:**

1. ✅ **TypeScript Strict** (keine `any`)
2. ✅ **CSS Modules + Design-Tokens** (kein Tailwind!)
3. ✅ **Header-Kommentare** (Deutsch, für komplexe Komponenten)
4. ✅ **Conventional Commits** (feat/fix/docs/chore)
5. ✅ **Mobile-First Responsive**
6. ✅ **Accessibility** (ARIA, Semantic HTML)
7. ✅ **Error-Handling** (klare User-Messages)
8. ✅ **Dokumentation aktualisieren** (bei neuen Patterns)

**Bei Unsicherheit:**
- Prüfe `/docs/ARCHITECTURE.md` oder `/docs/CODING-STANDARDS.md`
- Schaue wie es in `Header.tsx` oder anderen Components gemacht ist
- Frage nach: "Soll ich das nach Pattern X implementieren?"

---

**Version:** 1.0 (wird bei Bedarf aktualisiert)  
**Letzte Änderung:** 30.10.2025  
**Maintainer:** M-Sieger
