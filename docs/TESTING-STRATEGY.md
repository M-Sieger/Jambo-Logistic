# Jambo Logistics – Testing-Strategie

**Version:** 1.0  
**Letzte Aktualisierung:** 30.10.2025  
**Status:** 📋 Geplant (wird in Phase 2 implementiert)

---

## Inhaltsverzeichnis

1. [Testing-Philosophie](#1-testing-philosophie)
2. [Test-Pyramide](#2-test-pyramide)
3. [Unit-Tests](#3-unit-tests)
4. [Integration-Tests](#4-integration-tests)
5. [E2E-Tests](#5-e2e-tests)
6. [Visual-Regression-Tests](#6-visual-regression-tests)
7. [Performance-Tests](#7-performance-tests)
8. [Test-Tooling](#8-test-tooling)
9. [CI/CD-Integration](#9-cicd-integration)
10. [Coverage-Ziele](#10-coverage-ziele)

---

## 1. Testing-Philosophie

### Grundprinzipien

**1. Test-Driven Development (TDD) – Selektiv**
- ✅ TDD für komplexe Business-Logic (z.B. Validation, Calculations)
- ⚠️ Nicht für alle UI-Komponenten (UI-Tests sind teuer)

**2. Write Tests, Not Too Many, Mostly Integration**
- ✅ Integration-Tests sind wertvoll (testen reale User-Flows)
- ✅ Unit-Tests für isolierte Logik
- ⚠️ Nicht jede Function testen (Cost/Benefit beachten)

**3. Tests als Living Documentation**
- Tests dokumentieren, wie Code funktioniert
- Test-Namen sind klar und beschreibend

**4. Fail Fast, Fix Fast**
- Tests müssen schnell sein (<5 Min für alle Tests)
- Klare Fehlermeldungen

---

## 2. Test-Pyramide

```
        ┌─────────────┐
        │   E2E Tests │  <-- 10% (wenige, kritische Flows)
        │   (Playwright)│
        └─────────────┘
       ┌───────────────────┐
       │ Integration Tests │  <-- 30% (Components + API)
       │   (Vitest + RTL)  │
       └───────────────────┘
     ┌───────────────────────────┐
     │      Unit Tests           │  <-- 60% (Functions, Hooks)
     │      (Vitest)             │
     └───────────────────────────┘
```

### Verteilung (Ziel)

| Test-Type | Anzahl | Laufzeit | Fokus |
|-----------|--------|----------|-------|
| **Unit** | ~60% | <1s pro Test | Functions, Hooks, Utils |
| **Integration** | ~30% | 1-5s pro Test | Components + Context |
| **E2E** | ~10% | 10-30s pro Test | Kritische User-Flows |

---

## 3. Unit-Tests

### Was wird getestet?

**1. Utility-Functions**
```typescript
// src/utils/validation.ts
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// src/utils/__tests__/validation.test.ts
import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../validation';

describe('isValidEmail', () => {
  it('should return true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user+tag@domain.co.uk')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(' ')).toBe(false);
  });
});
```

**2. Custom Hooks**
```typescript
// src/hooks/__tests__/useActiveSection.test.ts
import { renderHook } from '@testing-library/react';
import { useActiveSection } from '../useActiveSection';

describe('useActiveSection', () => {
  it('should return empty string initially', () => {
    const { result } = renderHook(() => useActiveSection(['hero', 'services']));
    expect(result.current).toBe('');
  });

  it('should update active section on scroll', () => {
    // Mock window.scrollY
    // Trigger scroll event
    // Assert active section changed
  });
});
```

**3. Data-Transformation-Functions**
```typescript
// src/services/__tests__/contact.service.test.ts
import { describe, it, expect, vi } from 'vitest';
import { contactService } from '../contact.service';

describe('contactService', () => {
  it('should submit valid contact data', async () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    };

    const response = await contactService.submit(data);
    expect(response.success).toBe(true);
  });

  it('should throw validation error for invalid data', async () => {
    const invalidData = {
      name: 'A',  // Too short
      email: 'invalid',
      message: '',
    };

    await expect(contactService.submit(invalidData)).rejects.toThrow();
  });
});
```

### Unit-Test-Regeln

**✅ DO:**
- Test pure functions (keine Side-Effects)
- Test edge cases (empty, null, undefined)
- Mock externe Dependencies (API, localStorage)
- Verwende aussagekräftige Test-Namen

**❌ DON'T:**
- Teste nicht Implementation-Details
- Keine Tests für triviale Getter/Setter
- Keine Tests für Third-Party-Libraries

---

## 4. Integration-Tests

### Was wird getestet?

**1. Components + Context**
```typescript
// src/components/__tests__/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from '../Contact';

describe('ContactForm', () => {
  it('should render all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('should show validation errors on invalid submit', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const mockSubmit = vi.fn();
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message with enough characters' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with enough characters',
      });
    });
  });
});
```

**2. Header-Navigation**
```typescript
// src/components/__tests__/Header.test.tsx
describe('Header', () => {
  it('should highlight active section on scroll', () => {
    render(<Header />);
    
    // Simulate scroll to services section
    window.scrollTo(0, 800);
    fireEvent.scroll(window);

    const servicesLink = screen.getByText(/services/i);
    expect(servicesLink).toHaveClass('navLinkActive');
  });

  it('should open mobile menu on hamburger click', () => {
    render(<Header />);
    
    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    expect(screen.getByRole('dialog')).toBeVisible();
  });
});
```

### Integration-Test-Regeln

**✅ DO:**
- Teste User-Interaktionen (Click, Type, Submit)
- Teste Async-Behavior (API-Calls, Loading-States)
- Mock API-Responses (MSW – Mock Service Worker)

**❌ DON'T:**
- Teste nicht CSS-Styling (verwende Visual-Tests)
- Keine Tests für Animations-Timing

---

## 5. E2E-Tests

### Was wird getestet?

**Kritische User-Flows:**
1. **Kontaktformular-Flow**
2. **Navigation zwischen Sections**
3. **Mobile-Menu-Interaktion**
4. (Später) **Login/Logout**
5. (Später) **Dashboard-CRUD-Operations**

### Playwright-Setup

**Installation:**
```bash
pnpm add -D @playwright/test
npx playwright install
```

**Config:** `playwright.config.ts`
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5174',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm run dev',
    port: 5174,
    reuseExistingServer: true,
  },
});
```

### E2E-Test-Beispiel

```typescript
// e2e/contact-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form Flow', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact section
    await page.click('a[href="#contact"]');
    await page.waitForSelector('#contact', { state: 'visible' });

    // Fill form
    await page.fill('input[name="name"]', 'E2E Test User');
    await page.fill('input[name="email"]', 'e2e@test.com');
    await page.fill('textarea[name="message"]', 'This is a test message from E2E test');

    // Submit
    await page.click('button[type="submit"]');

    // Assert success message
    await expect(page.locator('text=Nachricht gesendet')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#contact"]');

    // Submit empty form
    await page.click('button[type="submit"]');

    // Assert error messages
    await expect(page.locator('text=Name ist erforderlich')).toBeVisible();
    await expect(page.locator('text=E-Mail ist erforderlich')).toBeVisible();
  });
});
```

### E2E-Test-Regeln

**✅ DO:**
- Teste komplette User-Journeys
- Verwende Page-Object-Pattern für Wiederverwendbarkeit
- Teste auf mehreren Browsern (Chromium, Firefox, WebKit)

**❌ DON'T:**
- Keine Unit-Test-Logik in E2E-Tests
- Nicht jede kleine Interaktion testen (zu langsam)

---

## 6. Visual-Regression-Tests

### Tools (optional, Phase 3+)

**Option A: Playwright Screenshots**
```typescript
test('Hero section looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero')).toHaveScreenshot('hero-desktop.png');
});
```

**Option B: Chromatic (Storybook + Visual Testing)**
- Storybook-Komponenten erstellen
- Chromatic CI-Integration
- Automatische Screenshot-Diffing

### Wann Visual-Tests?

**✅ Sinnvoll für:**
- Design-System-Komponenten (Buttons, Cards, etc.)
- Landing-Page (Hero, Services, Footer)
- Dashboard-UI (sobald vorhanden)

**❌ Weniger sinnvoll für:**
- Formular-Validation-Errors (zu dynamisch)
- Animations (zu flaky)

---

## 7. Performance-Tests

### Lighthouse CI (PFLICHT ab Phase 2)

**Setup:**
```bash
pnpm add -D @lhci/cli
```

**Config:** `lighthouserc.json`
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:5174/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

**GitHub Actions:**
```yaml
- name: Run Lighthouse CI
  run: |
    pnpm run build
    pnpm run preview &
    npx @lhci/cli autorun
```

### Load-Testing (später, Phase 4+)

**Tools:** k6, Artillery

**Szenarien:**
- 100 gleichzeitige Contact-Form-Submissions
- 1000 Users browsen Landing Page
- Dashboard mit 10.000 Requests

---

## 8. Test-Tooling

### Testing-Stack

| Tool | Zweck | Status |
|------|-------|--------|
| **Vitest** | Unit + Integration Tests | 🔵 Phase 2 |
| **@testing-library/react** | Component-Tests | 🔵 Phase 2 |
| **Playwright** | E2E-Tests | 🔵 Phase 2 |
| **MSW** | API-Mocking | 🔵 Phase 2 |
| **Lighthouse CI** | Performance-Tests | 🔵 Phase 2 |
| **Chromatic** | Visual-Tests | ⚪ Phase 3+ |
| **k6** | Load-Tests | ⚪ Phase 4+ |

### Installation (Phase 2)

```bash
# Unit + Integration
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# E2E
pnpm add -D @playwright/test
npx playwright install

# API-Mocking
pnpm add -D msw

# Coverage
pnpm add -D @vitest/coverage-v8
```

### Vite-Config für Tests

**`vite.config.js`:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

---

## 9. CI/CD-Integration

### GitHub Actions Workflow

**`.github/workflows/test.yml`:**
```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Install Dependencies
        run: pnpm install

      - name: Run Unit Tests
        run: pnpm run test:unit

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3

      - name: Install Dependencies
        run: pnpm install

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E Tests
        run: pnpm run test:e2e

      - name: Upload Test Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2

      - name: Build Project
        run: |
          pnpm install
          pnpm run build

      - name: Run Lighthouse CI
        run: |
          pnpm run preview &
          npx @lhci/cli autorun
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:lighthouse": "lhci autorun"
  }
}
```

---

## 10. Coverage-Ziele

### Coverage-Targets (Progressiv)

| Phase | Unit-Coverage | Integration-Coverage | E2E-Coverage |
|-------|---------------|---------------------|--------------|
| **Phase 2** | 50% | 30% | 2-3 kritische Flows |
| **Phase 3** | 70% | 50% | 5 kritische Flows |
| **Phase 4+** | 80% | 70% | 10+ Flows |

### Was MUSS getestet werden?

**Critical Path (100% Coverage):**
- ✅ Kontaktformular-Submission
- ✅ Input-Validation (Frontend + Backend)
- ✅ API-Error-Handling
- ✅ Auth-Login/Logout (ab Phase 3)
- ✅ Dashboard-CRUD (ab Phase 4)

**Nice-to-Have (<70% Coverage):**
- Header-Navigation
- Footer-Links
- Animations
- Mobile-Menu

**Nicht testen:**
- Design-Tokens (CSS Variables)
- Third-Party-Libraries (Radix UI, AOS)
- Simple Presentational Components (nur Props → JSX)

---

## Test-Workflow (Entwickler-Perspektive)

### Development-Flow

```
1. Feature-Branch erstellen
2. Feature implementieren
3. Tests schreiben (Unit → Integration → E2E)
4. Tests lokal ausführen: `pnpm run test`
5. PR erstellen
6. CI/CD läuft automatisch
7. Code-Review (inkl. Test-Coverage-Check)
8. Merge nach develop
```

### Pre-Commit-Hook (Husky)

**`.husky/pre-commit`:**
```bash
#!/bin/sh
pnpm run lint
pnpm run test:unit --run
```

---

## Zusammenfassung

**Testing-Prioritäten:**
1. ✅ **Phase 2:** Unit-Tests + E2E-Setup (Contact-Form)
2. ✅ **Phase 3:** Integration-Tests (Components + Context)
3. ✅ **Phase 4:** E2E-Tests (Dashboard-Flows)
4. ⚪ **Phase 5+:** Visual-Tests + Load-Tests

**Erfolgsmetriken:**
- ✅ CI/CD-Pipeline grün bei jedem PR
- ✅ 80% Test-Coverage für kritische Features
- ✅ <5 Min Test-Laufzeit (gesamt)
- ✅ 0 Flaky-Tests

---

**Nächstes Dokument:** `/.github/copilot-instructions.md` – Copilot-Konfiguration
