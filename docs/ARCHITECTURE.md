# Jambo Logistics – Architektur-Dokumentation

**Version:** 1.0 (MVP)  
**Letzte Aktualisierung:** 30.10.2025  
**Status:** ✅ Production-Ready (Frontend)

---

## Inhaltsverzeichnis

1. [Tech-Stack](#1-tech-stack)
2. [Architektur-Überblick](#2-architektur-überblick)
3. [Ordnerstruktur](#3-ordnerstruktur)
4. [Component-Hierarchie](#4-component-hierarchie)
5. [Styling-Strategie](#5-styling-strategie)
6. [State-Management](#6-state-management)
7. [Routing & Navigation](#7-routing--navigation)
8. [Performance-Optimierungen](#8-performance-optimierungen)
9. [Deployment](#9-deployment)
10. [API-Strategie (geplant)](#10-api-strategie-geplant)
11. [Sicherheit](#11-sicherheit)
12. [Entscheidungsbegründungen](#12-entscheidungsbegründungen)

---

## 1. Tech-Stack

### Core Framework
```json
{
  "framework": "React 19.1.0",
  "language": "TypeScript 5.9.2",
  "build-tool": "Vite 6.3.5",
  "package-manager": "pnpm 10.4.1"
}
```

**Begründung:**
- **React 19:** Neueste Features (Server Components vorbereitet, bessere Performance)
- **TypeScript 5.9:** Type-Safety, Strict Mode aktiviert → weniger Runtime-Errors
- **Vite 6:** Schnellster Dev-Server, optimiertes Production-Build
- **pnpm:** 3x schneller als npm, besseres Disk-Management

### UI & Styling
```json
{
  "styling": "CSS Modules + CSS Custom Properties",
  "animations": "AOS 2.3.4",
  "icons": "lucide-react 0.510.0",
  "ui-primitives": "@radix-ui/* 1.x.x"
}
```

**Besonderheit:** Keine CSS-Frameworks (Tailwind/Bootstrap) → Native CSS für maximale Kontrolle

### Forms & Validation
```json
{
  "form-library": "react-hook-form 7.56.3",
  "validation": "zod 3.24.4"
}
```

### Development Tools
```json
{
  "linter": "ESLint 8.57.0 + TypeScript-Plugin",
  "formatter": "Prettier 3.6.2",
  "git-hooks": "Husky (geplant)"
}
```

### Future Backend (geplant)
```
Option A: FastAPI (Python 3.12+)
Option B: Express (Node.js 20+)
```

---

## 2. Architektur-Überblick

### Architektur-Pattern: Component-Based Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │         React Application (SPA)                  │   │
│  │                                                   │   │
│  │  ┌──────────────────────────────────────────┐  │   │
│  │  │  DefaultLayout (Header + Footer)         │  │   │
│  │  │                                            │  │   │
│  │  │  ┌────────────────────────────────────┐ │  │   │
│  │  │  │  Page Components (App.tsx)          │ │  │   │
│  │  │  │                                      │ │  │   │
│  │  │  │  - Hero                              │ │  │   │
│  │  │  │  - Services                          │ │  │   │
│  │  │  │  - ProcessSteps                      │ │  │   │
│  │  │  │  - AboutBox                          │ │  │   │
│  │  │  │  - TrustSection                      │ │  │   │
│  │  │  │  - Contact                           │ │  │   │
│  │  │  └────────────────────────────────────┘ │  │   │
│  │  └──────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  CSS Modules ──┐                                         │
│  AOS Animations│                                         │
│  Custom Hooks  │                                         │
│                ▼                                          │
│         Design System (variables.css)                    │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  Vite Dev Server     │  (Development)
              │  or                  │
              │  Static Build Output │  (Production)
              └─────────────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  Vercel / Netlify    │  (Deployment)
              └─────────────────────┘
```

### Datenfluss (aktuell)

```
User Interaction
       ↓
React Component State (useState)
       ↓
Event Handler (onClick, onSubmit)
       ↓
State Update → Re-Render
       ↓
DOM Update (React Reconciliation)
```

**Später (mit Backend):**
```
User Interaction → React Component
       ↓
API Service Layer (Axios/Fetch)
       ↓
Backend API (FastAPI/Express)
       ↓
Database (PostgreSQL/MongoDB)
       ↓
Response → React State Update
       ↓
UI Re-Render
```

---

## 3. Ordnerstruktur

### Aktuelle Struktur (MVP)

```
jambo-logistics/
│
├── 📁 public/                    # Statische Assets (Logo, Favicon)
│   ├── assets/
│   └── logo.png
│
├── 📁 src/
│   ├── 📁 assets/                # Bilder, Icons (Import in Components)
│   │   ├── hero-bg.jpg
│   │   ├── services-bg-savanna.jpg
│   │   ├── step1-anfrage.jpg
│   │   ├── step2-abholung.jpg
│   │   ├── step4-nairobi.jpg
│   │   ├── about-team.jpg
│   │   └── nairobi-map.png
│   │
│   ├── 📁 components/            # ✅ Reusable UI Components
│   │   ├── Header.tsx / Header.module.css
│   │   ├── Hero.tsx / Hero.module.css
│   │   ├── Services.tsx / Services.module.css
│   │   ├── ProcessSteps.tsx / ProcessSteps.module.css
│   │   ├── AboutBox.tsx / AboutBox.module.css
│   │   ├── TrustSection.tsx / TrustSection.module.css
│   │   ├── Contact.tsx / Contact.module.css
│   │   ├── Footer.tsx / Footer.module.css
│   │   ├── SectionDivider.tsx / SectionDivider.module.css
│   │   │
│   │   └── 📁 ui/                # Radix UI Primitives (Dashboard-Vorbereitung)
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── dialog.jsx
│   │       └── ... (30+ Radix-Komponenten)
│   │
│   ├── 📁 hooks/                 # Custom React Hooks
│   │   ├── useActiveSection.ts   # Scroll-basierte Navigation
│   │   └── use-mobile.ts         # Responsive Helper
│   │
│   ├── 📁 layouts/               # Layout-Wrapper
│   │   └── DefaultLayout.tsx     # Header + Children + Footer
│   │
│   ├── 📁 styles/                # ⭐ Design System (Primary SoT)
│   │   ├── variables.css         # Design-Tokens (Farben, Spacing, Fonts)
│   │   ├── base.css              # CSS-Reset + Global Styles
│   │   ├── components.module.css # Shared Component Styles
│   │   ├── GlobalPolish.module.css # Polish-Layer (Shadows, etc.)
│   │   └── CardBase.module.css   # Card-Komponente (Shared)
│   │
│   ├── 📁 utils/                 # Hilfsfunktionen
│   │   └── animations.ts         # AOS-Konfiguration
│   │
│   ├── 📁 types/                 # TypeScript Definitions
│   │   └── aos.d.ts              # AOS Type-Defs
│   │
│   ├── App.tsx                   # Main Component (Section-Orchestrierung)
│   ├── main.tsx                  # Entry Point (React.render)
│   ├── index.css                 # Global CSS Imports
│   └── App.css                   # App-Level Styles
│
├── 📁 docs/                      # ✅ Dokumentation (neu erstellt)
│   ├── PROJECT-CONTEXT.md
│   └── ARCHITECTURE.md           # Diese Datei
│
├── 📁 node_modules/              # Dependencies (nicht versioniert)
├── 📁 _unused_assets_backup/    # Alte Assets (kann gelöscht werden)
│
├── 📄 package.json               # Dependencies + Scripts
├── 📄 pnpm-lock.yaml             # Lock-File (wichtig committen!)
├── 📄 tsconfig.json              # TypeScript Config (Strict Mode)
├── 📄 vite.config.js             # Vite Config (Alias, Plugins)
├── 📄 README.md                  # Projekt-Übersicht
└── 📄 PROJECT_SUMMARY.md         # Detaillierte Feature-Liste
```

### Geplante Erweiterungen (Phase 2+)

```
src/
├── 📁 services/              # API-Layer (neu)
│   ├── api.ts               # Axios/Fetch-Wrapper
│   ├── contact.service.ts   # Contact-Form-API
│   ├── auth.service.ts      # Auth-Service
│   └── tracking.service.ts  # Tracking-API
│
├── 📁 features/             # Feature-basierte Organisation (neu)
│   ├── contact/
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   └── contact.service.ts
│   ├── tracking/
│   │   ├── TrackingPage.tsx
│   │   └── tracking.service.ts
│   └── dashboard/
│       ├── Dashboard.tsx
│       └── dashboard.service.ts
│
├── 📁 __tests__/            # Test-Organisation (neu)
│   ├── unit/
│   │   ├── Header.test.tsx
│   │   └── utils.test.ts
│   └── e2e/
│       ├── contact-flow.spec.ts
│       └── navigation.spec.ts
│
└── 📁 lib/                  # Shared Utilities (neu)
    ├── constants.ts
    └── helpers.ts
```

---

## 4. Component-Hierarchie

### Komponenten-Baum (MVP)

```
App.tsx
├── DefaultLayout
│   ├── Header
│   │   ├── Logo (Button)
│   │   ├── Desktop Navigation
│   │   │   └── NavLink (Button)
│   │   ├── Language Selector (Dropdown)
│   │   ├── CTA Button
│   │   └── Mobile Menu (Overlay)
│   │       ├── NavLink (Button)
│   │       ├── Language Pills
│   │       └── CTA Button
│   │
│   ├── Hero
│   │   ├── Background Image
│   │   ├── Headline + Subline
│   │   └── CTA Button
│   │
│   ├── SectionDivider (Variant: diagonal)
│   │
│   ├── Services
│   │   └── Service Card (3x)
│   │       ├── Icon
│   │       ├── Title
│   │       └── Description
│   │
│   ├── SectionDivider (Variant: straight)
│   │
│   ├── ProcessSteps
│   │   ├── Step (3x)
│   │   │   ├── Icon/Image
│   │   │   ├── Number Badge
│   │   │   ├── Title
│   │   │   └── Description
│   │   └── CTA Section
│   │       ├── Button (Primary)
│   │       └── Button (Secondary)
│   │
│   ├── SectionDivider (Variant: straight)
│   │
│   ├── AboutBox
│   │   ├── Headline
│   │   ├── Paragraphs (2x)
│   │   ├── Team Image
│   │   └── Features (4x)
│   │       ├── Icon
│   │       └── Text
│   │
│   ├── SectionDivider (Variant: wave)
│   │
│   ├── TrustSection
│   │   ├── Quote (optional)
│   │   ├── Stats (3x)
│   │   │   ├── Number
│   │   │   └── Label
│   │   └── Partner Logos (optional)
│   │
│   ├── SectionDivider (Variant: straight)
│   │
│   ├── Contact
│   │   ├── Contact Form (react-hook-form)
│   │   │   ├── Input (Name)
│   │   │   ├── Input (Email)
│   │   │   ├── Input (Phone)
│   │   │   ├── Textarea (Message)
│   │   │   └── Submit Button
│   │   ├── Contact Cards (3x)
│   │   │   ├── WhatsApp
│   │   │   ├── Email
│   │   │   └── Phone
│   │   └── Map Image
│   │
│   └── Footer
│       ├── Company Info
│       ├── Quick Links
│       ├── Contact Info
│       ├── Legal Links
│       └── Copyright
```

### Component-Props-Pattern

**Beispiel: Hero-Component**
```typescript
interface HeroProps {
  headline: string;
  subline: string;
  ctaLabel: string;
  imageUrl: string;
  variant?: 'light' | 'dark'; // Theme-Switch
}
```

**Beispiel: Services-Component**
```typescript
interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesProps {
  services: Service[];
  columns?: 1 | 2 | 3 | 4; // Responsive Grid
  backgroundImage?: string;
}
```

---

## 5. Styling-Strategie

### Design-System-Architektur

```
variables.css (Design Tokens)
      ↓
base.css (CSS Reset + Global Styles)
      ↓
Component.module.css (Scoped Styles)
      ↓
GlobalPolish.module.css (Polish-Layer)
```

### CSS Custom Properties (Design Tokens)

**Definiert in:** `src/styles/variables.css`

**Kategorien:**
```css
:root {
  /* Farben (Primary, Secondary, Neutral, Text) */
  --color-primary-500: #e67e22;      /* CTA, Hover, Accents */
  --color-secondary-500: #2c3e50;    /* Footer, Depth */
  --color-neutral-100: #f5f5f5;      /* Backgrounds */
  --color-text-primary: #2c3e50;     /* Haupttext */

  /* Typography */
  --font-family-primary: 'Inter', sans-serif;
  --font-size-base: 1rem;            /* 16px */
  --font-size-3xl: 1.875rem;         /* 30px */
  --line-height-normal: 1.5;

  /* Spacing (8px Grid) */
  --spacing-xs: 0.5rem;              /* 8px */
  --spacing-md: 1rem;                /* 16px */
  --spacing-xl: 2rem;                /* 32px */
  --spacing-4xl: 4rem;               /* 64px */

  /* Radius */
  --radius-md: 0.5rem;               /* 8px */
  --radius-lg: 0.75rem;              /* 12px */

  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgba(44, 62, 80, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;

  /* Z-Index Scale */
  --z-fixed: 1030;                   /* Header */
  --z-modal: 1050;                   /* Overlays */
}
```

### CSS Modules Pattern

**Vorteile:**
- ✅ Scoped Styling (keine globalen Konflikte)
- ✅ Tree-Shaking (ungenutzte Styles werden entfernt)
- ✅ TypeScript-Support (Autocomplete für Klassen)

**Beispiel:**
```tsx
// Header.tsx
import styles from './Header.module.css';

<header className={styles.header}>
  <button className={styles.navLink}>Home</button>
</header>
```

```css
/* Header.module.css */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--color-neutral-50);
  box-shadow: var(--shadow-md);
  z-index: var(--z-fixed);
}

.navLink {
  color: var(--color-text-primary);
  transition: var(--transition-fast);
}

.navLink:hover {
  color: var(--color-primary-500);
}
```

### Responsive Design

**Breakpoints:**
```css
/* Mobile First */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

**Strategie:**
- Mobile-First CSS (Basis-Styles für Mobile)
- Progressive Enhancement (Desktop-Features darüber)
- Touch-optimierte Interaktionen (min-height: 44px)

---

## 6. State-Management

### Aktuell: Component-Level State (useState)

**Begründung:** MVP benötigt kein globales State-Management

**Beispiele:**
```tsx
// Header.tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [currentLanguage, setCurrentLanguage] = useState('DE');

// Contact.tsx
const { register, handleSubmit, formState: { errors } } = useForm();
```

### Custom Hooks für Shared State

**Beispiel: `useActiveSection.ts`**
```typescript
// Viewport-basierte Scroll-Erkennung
export const useActiveSection = (sectionIds: string[], options) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Berechne welche Section aktuell sichtbar ist
      // ... Logik ...
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};
```

### Zukunft (Phase 3+): Context API oder Zustand

**Szenarien für Global State:**
- User-Authentication-Status
- Shopping-Cart (falls E-Commerce)
- Real-Time-Tracking-Updates

**Empfehlung:**
```tsx
// Option A: Context API (native)
const AuthContext = createContext();

// Option B: Zustand (lightweight)
import create from 'zustand';
const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

---

## 7. Routing & Navigation

### Aktuell: Single-Page Application (SPA)

**Navigation-Strategie:**
- **Smooth Scrolling** zu Anchor-IDs (`#services`, `#contact`)
- **Active-Section-Highlighting** basierend auf Viewport
- **Browser-History** wird nicht verändert (keine React Router)

**Implementierung:**
```tsx
const handleNavClick = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
```

### Zukunft (Phase 3+): React Router

**Geplante Routes:**
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/tracking" element={<TrackingPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
</BrowserRouter>
```

---

## 8. Performance-Optimierungen

### Aktuelle Optimierungen

1. **Vite Code-Splitting:**
   - Automatisches Chunking
   - Tree-Shaking für ungenutzte Imports
   - CSS-Extraktion

2. **Lazy Loading:**
   ```tsx
   // Bilder
   <img loading="lazy" src={heroImage} alt="..." />
   ```

3. **AOS Animation-Optimierung:**
   ```tsx
   AOS.init({
     duration: 600,      // Kurze, snappy Animationen
     easing: 'ease-out',
     once: true,         // Nur beim ersten Scroll
     offset: 100,        // Early Trigger
   });
   ```

4. **CSS Custom Properties statt Inline-Styles:**
   - Bessere Browser-Performance
   - Keine Re-Paints bei Theme-Wechsel

### Geplante Optimierungen (Phase 2)

1. **React.lazy() für Code-Splitting:**
   ```tsx
   const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
   ```

2. **Image-Optimization:**
   - WebP-Format
   - Responsive Images (`<picture>`, `srcset`)
   - CDN-Integration (Vercel Image Optimization)

3. **Service Worker (PWA):**
   - Offline-Fallback
   - Caching-Strategie

4. **Lighthouse CI:**
   - Automatische Performance-Tests
   - Regression-Erkennung

---

## 9. Deployment

### Build-Prozess

```bash
# Development
pnpm run dev              # Vite Dev Server (Port 5174)

# Production Build
pnpm run build            # TypeScript Check + Vite Build
                          # Output: /dist

# Preview Production Build
pnpm run preview          # Test Production-Build lokal
```

### Build-Output (Optimiert)

```
dist/
├── index.html            # Entry Point
├── assets/
│   ├── index-[hash].js   # Main Bundle (Code-Split)
│   ├── vendor-[hash].js  # Dependencies
│   ├── index-[hash].css  # Extracted CSS
│   └── *.jpg/png         # Optimierte Images
└── logo.png
```

### Deployment-Plattformen

**Empfohlen: Vercel**
```yaml
# vercel.json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Alternative: Netlify**
```toml
# netlify.toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### CI/CD-Pipeline (geplant)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - name: Install Dependencies
        run: pnpm install
      - name: Lint & Type-Check
        run: pnpm run lint && pnpm run build
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 10. API-Strategie (geplant)

### Backend-Architektur (Phase 2)

```
Frontend (React)
      ↓
API Service Layer (TypeScript)
      ↓
REST API (FastAPI/Express)
      ↓
Database (PostgreSQL)
```

### API-Service-Pattern

**Datei:** `src/services/api.ts`
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor für Auth-Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Datei:** `src/services/contact.service.ts`
```typescript
import api from './api';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
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

### API-Endpoints (geplant)

| Endpoint | Method | Beschreibung |
|----------|--------|--------------|
| `/api/contact` | POST | Kontaktformular-Submission |
| `/api/tracking/:id` | GET | Shipment-Status abrufen |
| `/api/auth/login` | POST | User-Login |
| `/api/auth/logout` | POST | User-Logout |
| `/api/dashboard/requests` | GET | Alle Contact-Requests (Admin) |
| `/api/dashboard/requests/:id` | PATCH | Request-Status ändern |

---

## 11. Sicherheit

### Aktuelle Maßnahmen

1. **TypeScript Strict Mode:**
   - Verhindert `undefined`/`null`-Fehler
   - Explizite Typen → weniger Runtime-Errors

2. **ESLint Security-Rules:**
   - `eslint-plugin-security` (geplant)
   - Warnung bei `dangerouslySetInnerHTML`

3. **Dependency-Management:**
   - `pnpm audit` regelmäßig ausführen
   - Lock-File committen

### Geplante Maßnahmen (Phase 2+)

1. **Input-Validation:**
   - Zod-Schemas für alle Forms
   - Server-seitige Validation (doppelt)

2. **HTTPS-Only:**
   - Content-Security-Policy (CSP)
   - Strict-Transport-Security-Header

3. **Authentication:**
   - JWT-Tokens mit HttpOnly-Cookies
   - CSRF-Protection

4. **Rate-Limiting:**
   - API-Rate-Limits (z.B. 100 Requests/Minute)
   - Schutz vor DDoS

---

## 12. Entscheidungsbegründungen

### Warum React statt Next.js?

**Begründung:**
- MVP benötigt kein SSR (Server-Side Rendering)
- Static Site ist ausreichend (keine SEO-kritischen dynamischen Inhalte)
- Next.js wäre Overengineering für Landing Page

**Wann wechseln?**
- Wenn Blog/News-Sektion hinzukommt (SEO wichtig)
- Wenn Server-Komponenten benötigt werden

### Warum CSS Modules statt Tailwind?

**Begründung:**
- Bessere Kontrolle über Design-System
- Keine Utility-Klassen-Verschmutzung
- Einfachere Wartung für Designer (natives CSS)
- Performance: Kleinere CSS-Bundles (nur genutzte Styles)

**Nachteile:**
- Mehr Boilerplate-Code
- Langsamere Prototyping-Phase

### Warum Vite statt Create-React-App?

**Begründung:**
- **5-10x schnellerer Dev-Server** (ESBuild statt Webpack)
- **Modernere Build-Tools** (Rollup-basiert)
- **Bessere TypeScript-Integration**
- CRA ist deprecated (React-Team empfiehlt Vite/Next.js)

### Warum keine Redux/MobX?

**Begründung:**
- MVP hat minimalen Shared State
- `useState` + Custom Hooks sind ausreichend
- Redux wäre Overengineering

**Wann hinzufügen?**
- Ab Dashboard-Phase (komplexer State)
- Bei Real-Time-Features (WebSockets)

---

## Zusammenfassung

**Architektur-Prinzipien:**
- ✅ **KISS (Keep It Simple, Stupid):** Nur Tools, die wirklich gebraucht werden
- ✅ **Type-Safety:** TypeScript Strict Mode
- ✅ **Skalierbarkeit:** Vorbereitet für Dashboard/CRM-Integration
- ✅ **Performance:** Code-Splitting, Lazy Loading, CSS-Optimization
- ✅ **Wartbarkeit:** CSS Modules, klare Ordnerstruktur

**Nächste Schritte:**
1. Backend-API implementieren (FastAPI)
2. Testing-Setup (Vitest + Playwright)
3. CI/CD-Pipeline (GitHub Actions)
4. Deployment (Vercel)

---

**Nächstes Dokument:** `/docs/ROADMAP.md` – Sprint-Planung & Zeitschätzungen
