# Jambo Logistics – Coding-Standards & Best Practices

**Version:** 1.0  
**Letzte Aktualisierung:** 30.10.2025  
**Inspiriert von:** 360Volt RAILGUARD.md (Dokumentations-Standards)

---

## Inhaltsverzeichnis

1. [Projekt-Philosophie](#1-projekt-philosophie)
2. [TypeScript-Regeln](#2-typescript-regeln)
3. [Component-Struktur](#3-component-struktur)
4. [Naming-Conventions](#4-naming-conventions)
5. [CSS-Standards](#5-css-standards)
6. [Git-Workflow](#6-git-workflow)
7. [Code-Review-Checkliste](#7-code-review-checkliste)
8. [Error-Handling](#8-error-handling)
9. [Performance-Guidelines](#9-performance-guidelines)
10. [Accessibility (A11y)](#10-accessibility-a11y)

---

## 1. Projekt-Philosophie

### Leitprinzipien

**1. KISS (Keep It Simple, Stupid)**
- ✅ Einfache Lösungen bevorzugen
- ✅ Keine Overengineering
- ✅ Code für Menschen schreiben, nicht für Maschinen

**2. DRY (Don't Repeat Yourself)**
- ✅ Wiederholten Code in Functions/Components extrahieren
- ✅ Shared Logic in Custom Hooks auslagern
- ✅ Design-Tokens in CSS Variables zentral definieren

**3. YAGNI (You Ain't Gonna Need It)**
- ✅ Features nur bauen, wenn sie jetzt gebraucht werden
- ✅ Keine spekulativen Abstraktionen

**4. Fail Fast**
- ✅ Fehler früh werfen (TypeScript Strict Mode)
- ✅ Input-Validation sofort durchführen
- ✅ Keine defensiven Checks für "kann nie passieren"

**5. Progressive Enhancement**
- ✅ Mobile-First CSS
- ✅ Core-Funktionalität ohne JavaScript
- ✅ Accessibility von Anfang an

---

## 2. TypeScript-Regeln

### Strict Mode (PFLICHT)

**`tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**✅ Status:** Bereits aktiviert im Projekt!

### Type-Safety-Regeln

#### 1. Keine `any`-Types (außer in absoluten Ausnahmefällen)

**❌ Falsch:**
```typescript
function processData(data: any) {
  return data.map((item: any) => item.value);
}
```

**✅ Richtig:**
```typescript
interface DataItem {
  value: string;
  id: number;
}

function processData(data: DataItem[]): string[] {
  return data.map((item) => item.value);
}
```

**Ausnahme (selten):**
- Drittanbieter-Libs ohne Types
- Temporär beim Prototyping (muss dokumentiert werden mit `// TODO: Type properly`)

#### 2. Explizite Return-Types für Functions

**❌ Falsch:**
```typescript
function calculateTotal(items) {  // Implizite Types
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**✅ Richtig:**
```typescript
interface CartItem {
  price: number;
  quantity: number;
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

#### 3. Interfaces für alle Component-Props

**❌ Falsch:**
```typescript
const Header = ({ logo, navItems, onSearch }) => { /* ... */ };
```

**✅ Richtig:**
```typescript
interface NavigationItem {
  label: string;
  href: string;
  id: string;
}

interface HeaderProps {
  logo: string;
  navItems: NavigationItem[];
  onSearch?: (query: string) => void;  // Optional mit ?
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ logo, navItems, onSearch, className }) => {
  // ...
};
```

#### 4. Enums für bekannte Werte

**❌ Falsch:**
```typescript
const status = 'pending';  // String-Literal (fehleranfällig)
```

**✅ Richtig:**
```typescript
enum OrderStatus {
  Pending = 'pending',
  InTransit = 'in-transit',
  Delivered = 'delivered',
}

const status: OrderStatus = OrderStatus.Pending;
```

#### 5. Utility-Types nutzen

```typescript
// Pick: Subset von Properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;

// Omit: Properties ausschließen
type UserWithoutPassword = Omit<User, 'password'>;

// Partial: Alle Properties optional
type PartialUser = Partial<User>;

// Required: Alle Properties pflicht
type RequiredUser = Required<User>;

// Readonly: Immutable
type ImmutableUser = Readonly<User>;
```

### TypeScript-ESLint-Rules

**Aktivierte Rules (`.eslintrc.json`):**
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-assertion": "error"
  }
}
```

---

## 3. Component-Struktur

### File-Header-Kommentar (PFLICHT für komplexe Komponenten)

**Format (Deutsch):**
```typescript
// ---------------------------------------------------------
// Datei: Header.tsx
// Zweck: Fixierte Navigation mit Smooth-Scrolling und Mobile-Menu
// Besonderheiten:
// - Active Section Highlighting beim Scrollen
// - Fullscreen Mobile-Overlay mit Language-Switcher
// - Responsive Logo und CTA-Button
// Stand: 30.10.2025
// ---------------------------------------------------------
```

**Wann Header hinzufügen?**
- ✅ Alle Components in `/src/components` (außer triviale wie `SectionDivider`)
- ✅ Alle Custom Hooks
- ✅ Komplexe Utility-Functions
- ❌ Nicht für `/src/components/ui` (Radix-Primitives)

### Component-Template

```typescript
// ---------------------------------------------------------
// Datei: ServiceCard.tsx
// Zweck: Wiederverwendbare Service-Card mit Icon, Title, Description
// Besonderheiten:
// - AOS-Animation on Scroll
// - Hover-Effekt mit Gradient-Shift
// Stand: 30.10.2025
// ---------------------------------------------------------

import React from 'react';
import styles from './ServiceCard.module.css';

// ===== Interfaces =====
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

// ===== Component =====
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  variant = 'primary',
  className = '',
}) => {
  // ===== State (falls nötig) =====
  // const [isHovered, setIsHovered] = useState(false);

  // ===== Handlers =====
  // const handleClick = () => { /* ... */ };

  // ===== Render =====
  return (
    <div
      className={[styles.card, styles[variant], className].join(' ')}
      data-aos="fade-up"
    >
      <img src={icon} alt={title} className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ServiceCard;
```

### Component-Organisation (Sections)

```typescript
// ===== Imports =====
import React, { useState, useEffect } from 'react';
import styles from './Component.module.css';

// ===== Types/Interfaces =====
interface Props { /* ... */ }

// ===== Constants =====
const MAX_ITEMS = 10;

// ===== Component =====
const Component: React.FC<Props> = ({ /* ... */ }) => {
  // ===== State =====
  const [state, setState] = useState();

  // ===== Effects =====
  useEffect(() => { /* ... */ }, []);

  // ===== Handlers =====
  const handleClick = () => { /* ... */ };

  // ===== Helpers (private) =====
  const formatData = (data) => { /* ... */ };

  // ===== Render =====
  return <div>...</div>;
};

export default Component;
```

---

## 4. Naming-Conventions

### Allgemeine Regeln

| Type | Convention | Beispiel |
|------|------------|----------|
| **Components** | PascalCase | `Header.tsx`, `ServiceCard.tsx` |
| **CSS Modules** | kebab-case | `header.module.css`, `service-card.module.css` |
| **Functions** | camelCase | `calculateTotal()`, `handleSubmit()` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |
| **Interfaces** | PascalCase | `HeaderProps`, `User` |
| **Enums** | PascalCase | `OrderStatus`, `UserRole` |
| **CSS Classes** | camelCase (in Module) | `.navLink`, `.ctaButton` |
| **CSS Variables** | kebab-case | `--color-primary-500`, `--spacing-md` |

### Component-Naming

**Struktur:** `[Feature][Type].tsx`

**Beispiele:**
- `Header.tsx` (eindeutig, kein Suffix nötig)
- `ContactForm.tsx` (nicht `Form.tsx` – zu generisch)
- `TrackingPage.tsx` (Page-Komponenten mit `Page`-Suffix)
- `useActiveSection.ts` (Hooks mit `use`-Prefix)

### Props-Naming

**Callbacks:** `on[Event]`
```typescript
interface Props {
  onSubmit: (data: FormData) => void;
  onChange: (value: string) => void;
  onError?: (error: Error) => void;
}
```

**Booleans:** `is[State]` / `has[Feature]` / `should[Action]`
```typescript
interface Props {
  isLoading: boolean;
  hasErrors: boolean;
  shouldAutoFocus: boolean;
}
```

**Varianten:** `variant` / `size` / `theme`
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}
```

### Function-Naming

**Event-Handlers:** `handle[Event]`
```typescript
const handleSubmit = (event: FormEvent) => { /* ... */ };
const handleClick = () => { /* ... */ };
const handleInputChange = (value: string) => { /* ... */ };
```

**Data-Fetching:** `fetch[Data]` / `get[Data]`
```typescript
const fetchUserData = async (userId: string) => { /* ... */ };
const getShipmentStatus = (id: string) => { /* ... */ };
```

**Data-Transformation:** `[verb][Noun]`
```typescript
const formatDate = (date: Date) => { /* ... */ };
const validateEmail = (email: string) => { /* ... */ };
const parseResponse = (response: Response) => { /* ... */ };
```

---

## 5. CSS-Standards

### CSS Modules Pattern

**Datei:** `Header.module.css`
```css
/* ===== Base Styles ===== */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--color-neutral-50);
  z-index: var(--z-fixed);
}

/* ===== Modifiers ===== */
.header.scrolled {
  box-shadow: var(--shadow-md);
}

/* ===== Children ===== */
.navLink {
  color: var(--color-text-primary);
  transition: var(--transition-fast);
}

.navLink:hover {
  color: var(--color-primary-500);
}

.navLinkActive {
  color: var(--color-primary-500);
  font-weight: 600;
}

/* ===== Responsive ===== */
@media (min-width: 768px) {
  .header {
    padding: var(--spacing-lg) var(--spacing-xl);
  }
}
```

### Design-Token-Pflicht

**❌ Nie hartcodierte Werte:**
```css
.button {
  background: #e67e22;  /* ❌ Hart-coded */
  padding: 16px;         /* ❌ Hart-coded */
}
```

**✅ Immer Design-Tokens:**
```css
.button {
  background: var(--color-primary-500);  /* ✅ Token */
  padding: var(--spacing-md);            /* ✅ Token */
}
```

### CSS-Struktur-Reihenfolge

```css
.element {
  /* 1. Positioning */
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;

  /* 2. Box Model */
  display: flex;
  width: 100%;
  padding: var(--spacing-md);
  margin: 0;

  /* 3. Typography */
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);

  /* 4. Visual */
  background: var(--color-neutral-100);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

  /* 5. Misc */
  transition: var(--transition-normal);
  cursor: pointer;
}
```

### Responsive Breakpoints

```css
/* Mobile First (default: 320px–767px) */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1200px) {
  /* Large Desktop */
}
```

---

## 6. Git-Workflow

### Branch-Strategie

```
main (Production)
  ├── develop (Integration)
  │   ├── feature/contact-form-validation
  │   ├── feature/dashboard-ui
  │   ├── bugfix/header-scroll-bug
  │   └── chore/update-dependencies
```

**Branch-Naming:**
```
feature/beschreibung-in-kebab-case
bugfix/problem-beschreibung
chore/wartungsaufgabe
docs/dokumentations-update
```

### Conventional Commits (PFLICHT)

**Format:**
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat`: Neue Feature
- `fix`: Bug-Fix
- `docs`: Dokumentation
- `style`: Code-Formatting (keine Logic-Änderung)
- `refactor`: Code-Refactoring (keine neue Feature, kein Bug-Fix)
- `test`: Tests hinzufügen/ändern
- `chore`: Build-Process, Dependencies, Tooling

**Beispiele:**
```bash
# Feature
git commit -m "feat(contact): Add email validation to contact form"

# Bug-Fix
git commit -m "fix(header): Fix mobile menu not closing on link click"

# Dokumentation
git commit -m "docs(readme): Update installation instructions"

# Chore
git commit -m "chore(deps): Upgrade vite to 6.3.5"

# Breaking Change
git commit -m "feat(api): Change contact endpoint response format

BREAKING CHANGE: Response now returns { success, data } instead of direct data"
```

### Commit-Größe

**Regel:** **Ein Commit = Eine logische Änderung**

**✅ Gute Commit-Größe:**
- "Add email validation to contact form"
- "Fix header scroll bug on mobile"
- "Update dependencies"

**❌ Zu große Commits:**
- "Implement entire dashboard feature" (besser: mehrere Commits)

**❌ Zu kleine Commits:**
- "Fix typo"
- "Add semicolon" (zusammenfassen mit nächstem logischen Commit)

### Pull Request (PR) Template

```markdown
## Beschreibung
<!-- Was ändert dieser PR? -->

## Type of Change
- [ ] Bug-Fix (non-breaking)
- [ ] New Feature (non-breaking)
- [ ] Breaking Change
- [ ] Documentation Update

## Checklist
- [ ] Code follows coding standards
- [ ] Tests hinzugefügt/aktualisiert
- [ ] Documentation aktualisiert
- [ ] No console.log/debugger statements
- [ ] ESLint passing
- [ ] TypeScript compiling

## Screenshots (falls UI-Änderungen)
<!-- Screenshot einfügen -->

## Related Issues
Closes #123
```

---

## 7. Code-Review-Checkliste

### Reviewer-Checklist

**Funktionalität:**
- [ ] Feature funktioniert wie beschrieben
- [ ] Edge-Cases behandelt (leere Arrays, null-Werte, etc.)
- [ ] Error-Handling vorhanden

**Code-Quality:**
- [ ] Code ist lesbar und verständlich
- [ ] Keine Code-Duplizierung
- [ ] TypeScript-Types korrekt
- [ ] Naming-Conventions eingehalten

**Performance:**
- [ ] Keine unnötigen Re-Renders (React.memo falls nötig)
- [ ] Keine Memory-Leaks (useEffect Cleanup)
- [ ] Lazy-Loading wo sinnvoll

**Testing:**
- [ ] Unit-Tests vorhanden (falls komplexe Logik)
- [ ] E2E-Tests für kritische Flows

**Dokumentation:**
- [ ] Header-Kommentare vorhanden (falls nötig)
- [ ] Komplexe Logik kommentiert
- [ ] README/Docs aktualisiert

---

## 8. Error-Handling

### Frontend Error-Handling

**1. Try-Catch für API-Calls:**
```typescript
const submitForm = async (data: FormData) => {
  try {
    const response = await contactService.submit(data);
    toast.success('Nachricht gesendet!');
    return response;
  } catch (error) {
    if (error instanceof ValidationError) {
      toast.error('Bitte überprüfe deine Eingaben.');
    } else if (error instanceof NetworkError) {
      toast.error('Netzwerkfehler. Bitte versuche es später erneut.');
    } else {
      toast.error('Ein unerwarteter Fehler ist aufgetreten.');
      console.error('Unexpected error:', error);
    }
    throw error;  // Re-throw für weitere Behandlung
  }
};
```

**2. Error-Boundaries für React:**
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('React Error:', error, errorInfo);
    // Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

**3. Validation-Errors klar kommunizieren:**
```typescript
const schema = z.object({
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
  phone: z.string().regex(/^\+?\d{10,15}$/, 'Ungültige Telefonnummer.'),
});
```

---

## 9. Performance-Guidelines

### React-Performance

**1. Memo für teure Komponenten:**
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  // Nur re-rendert, wenn data sich ändert
  return <ComplexVisualization data={data} />;
});
```

**2. useCallback für Callbacks:**
```typescript
const handleSubmit = useCallback((data: FormData) => {
  // Funktion wird nicht bei jedem Render neu erstellt
  submitForm(data);
}, [submitForm]);
```

**3. useMemo für teure Berechnungen:**
```typescript
const sortedData = useMemo(() => {
  return data.sort((a, b) => b.timestamp - a.timestamp);
}, [data]);
```

**4. Code-Splitting:**
```typescript
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### CSS-Performance

**1. Avoid Layout-Thrashing:**
```css
/* ❌ Vermeiden (triggert Layout) */
.element {
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-right: 10px;
}

/* ✅ Besser (nur Paint) */
.element {
  width: 100%;
  padding: 0 10px;
}
```

**2. GPU-Beschleunigung für Animationen:**
```css
/* ✅ will-change für Animationen */
.animated {
  will-change: transform, opacity;
  transition: transform 300ms, opacity 300ms;
}

.animated:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
```

---

## 10. Accessibility (A11y)

### Keyboard-Navigation

**✅ Alle interaktiven Elemente fokusierbar:**
```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Submit form"
>
  Submit
</button>
```

### ARIA-Attributes

```tsx
// Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirmation</h2>
</div>

// Navigation
<nav aria-label="Main navigation">
  <button aria-current="page">Home</button>
</nav>

// Loading State
<button aria-busy="true" disabled>
  Loading...
</button>
```

### Semantic HTML

**❌ Falsch:**
```tsx
<div onClick={handleClick}>Click me</div>
```

**✅ Richtig:**
```tsx
<button onClick={handleClick}>Click me</button>
```

---

## Zusammenfassung: Do's & Don'ts

### ✅ DO

- ✅ TypeScript Strict Mode nutzen
- ✅ Header-Kommentare für komplexe Komponenten (Deutsch)
- ✅ Design-Tokens aus `variables.css` verwenden
- ✅ Conventional Commits schreiben
- ✅ Code-Reviews durchführen
- ✅ Tests schreiben (ab Phase 2)
- ✅ Accessibility beachten
- ✅ Performance messen (Lighthouse)

### ❌ DON'T

- ❌ Keine `any`-Types (außer absoluter Notfall)
- ❌ Keine hartcodierten Werte in CSS
- ❌ Keine Inline-Styles (außer dynamische Werte)
- ❌ Keine console.log in Production
- ❌ Keine großen Commits ("Fix everything")
- ❌ Kein ungetes teter Code in main/develop
- ❌ Keine Accessibility-Ignoranz

---

**Nächstes Dokument:** `/docs/TESTING-STRATEGY.md` – Unit-Tests, E2E-Tests, CI-Integration
