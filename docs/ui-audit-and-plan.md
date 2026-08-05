# UI/UX Audit and Delivery Plan

**Repository:** `ducvps12/ielts`  
**Branch audited:** `main`  
**Audit baseline:** `dbd6dc1e34941a05e25a40ee725c6075c76dde8b`

## 1. Repository snapshot

The repository already follows a modular-monolith monorepo direction:

```text
apps/
  web/       Next.js public site and future learner client
  admin/     Next.js admin control panel
  api/       NestJS + Fastify API
  worker/    BullMQ worker
packages/
  config/    typed environment parsing
  database/  Prisma schema and deterministic seed
```

The required architecture, roadmap, domain invariants and route contracts exist. The requested `docs/domain-map.md` is currently represented by `docs/domain-model.md`; `docs/roadmap.md` is currently named `docs/ROADMAP.md`.

## 2. UI currently present

### `apps/web`

- One marketing route: `/`.
- Header, hero, product preview, three-step explanation, journey cards, CTA and footer.
- Responsive rules at approximately 900 px and 640 px.
- Light visual direction using green and lime.

### `apps/admin`

- One dashboard route: `/` on the admin application.
- Sidebar, top bar, metric placeholders, module list and service-status panel.
- Desktop, compact tablet and mobile-bottom-navigation adaptations.
- Dark visual direction using violet.

## 3. Strengths to preserve

- Clear product promise: turning an IELTS target into daily actions.
- Restrained gamification rather than a childish RPG treatment.
- Architecture already separates public/client, admin, API and worker.
- Domain documents explicitly protect server authority, idempotency, ledger integrity and template versioning.
- Existing marketing copy is direct, Vietnamese-first and avoids guaranteed-band claims.
- Both current screens already use semantic landmarks such as `header`, `nav`, `main`, `section`, `article`, `aside` and `footer`.
- The current responsive intent is a useful prototype for the final shells.

## 4. Problems found

### Component structure

- `apps/web/app/page.tsx` contains the entire marketing experience in one component.
- `apps/admin/app/page.tsx` contains navigation, dashboard cards and system panels in one component.
- Demo content is declared in page files instead of a dedicated `data/demo` boundary.
- No shared `packages/ui` exists even though both applications need the same primitives.
- There are no reusable marketing, client-shell or admin-shell layout components.

### CSS architecture

- `apps/web/app/styles.css` is one minified line and mixes tokens, reset, layout and page-specific styles.
- Both applications define unrelated local token sets, so brand and semantic colors can drift.
- Repeated hard-coded colors, spacing and radii are not governed by a documented scale.
- Global element selectors such as `footer`, `h1`, `h2` and structural selectors such as `nth-child` make later routes fragile.
- No consistent focus-visible, disabled, validation, reduced-motion or high-contrast behavior.
- No dark-theme token structure shared across applications.

### Responsive behavior

- Marketing navigation disappears on small screens without a replacement drawer.
- Admin mobile navigation hides items using `nth-child`, which is not permission-aware or route-aware.
- There is no authenticated learner shell for desktop, tablet or mobile.
- No validation at the required 375, 430, 768, 1024, 1280 and 1440 px widths.

### Accessibility

- No skip link.
- Focus states are not explicitly defined.
- The marketing preview uses an emoji for streak and text arrows as primary icons.
- Several buttons are visual placeholders without a disabled explanation or implemented action.
- No reusable alert, error, empty, loading or permission-denied pattern.
- No reduced-motion handling.

### Typography and consistency

- No documented type scale, line-height scale or maximum readable text width.
- Marketing and admin use separate visual systems with no shared product identity.
- Uppercase labels are useful but used without a consistent tracking/size contract.
- Dashboard information hierarchy is still prototype-level.

### UX flow

- Most links point to routes that do not exist yet.
- Public route names are inconsistent between source and route map, for example legal routes.
- No authentication form UI, help centre UI or legal-document template.
- No learner daily flow, journey flow, quest flow or progress flow.
- Admin navigation uses `#` links and does not expose active-route, breadcrumb or permission-aware behavior.

### Quality and technical debt

- `packages/ui` is missing.
- No shared icon library.
- `apps/web` still uses `next lint`; linting needs an explicit ESLint configuration compatible with the current Next.js setup.
- `test:e2e` is an `echo`, which is not a quality gate.
- No component tests, route smoke tests, accessibility checks or viewport tests.
- No Storybook/component catalogue.
- No `loading.tsx`, `error.tsx`, `not-found.tsx` or reusable route states.

## 5. Dependency decision

### Add now

- `lucide-react`: one consistent icon system for web and admin.
- `clsx`: predictable class composition for primitives.

### Defer until a real use case

- Chart library: use structured accessible placeholders until real API metrics and chart requirements exist.
- Headless UI suite: native HTML and small focused components are sufficient for the first foundation; add Radix only when interaction complexity justifies it.
- Tailwind migration: do not mix Tailwind into the existing global CSS ad hoc. First establish shared tokens and primitives in `packages/ui`; evaluate a controlled Tailwind adoption after the shells are stable.

## 6. Target frontend structure

```text
packages/ui/
  src/
    components/
    styles/
    utilities/
    index.ts

apps/web/
  app/
    (marketing)/
    (auth)/
    app/
  components/
    marketing/
    client/
  data/demo/
  lib/

apps/admin/
  app/
    (dashboard)/
  components/
    shell/
    dashboard/
    tables/
  data/demo/
  lib/
```

## 7. Prioritized delivery checklist

### P0 — Foundation and quality

- [ ] Create shared tokens and frontend conventions.
- [ ] Create and use `packages/ui` rather than a decorative unused package.
- [ ] Add icon library and remove emoji/text glyphs as primary icons.
- [ ] Replace obsolete/placeholder quality scripts with real lint and tests.
- [ ] Add shared loading, empty, error and permission-denied states.

### P1 — Public experience

- [ ] Refactor marketing page into focused sections.
- [ ] Add marketing header and accessible mobile drawer.
- [ ] Implement public/auth/legal route foundation.
- [ ] Move demo content out of route components.
- [ ] Align route names with `docs/route-map.md` and retain redirects/aliases where necessary.

### P1 — Learner experience

- [ ] Build desktop, tablet and mobile client shell.
- [ ] Complete `/app/hom-nay` with structured demo data.
- [ ] Implement `/app/lo-trinh`, `/app/nhiem-vu` and `/app/tien-do` foundations.
- [ ] Add remaining learner route states and navigation.

### P1 — Admin experience

- [ ] Refactor admin into shell and route components.
- [ ] Add route-aware and permission-aware navigation foundation.
- [ ] Add breadcrumb, command/search, table, filters, pagination and form states.
- [ ] Implement admin route foundations without fake business logic.

### P2 — Verification and documentation

- [ ] Add component tests.
- [ ] Add route and responsive smoke tests.
- [ ] Validate all required viewport widths.
- [ ] Add accessibility checks for critical routes.
- [ ] Document tokens, components, route states and remaining API boundaries.

## 8. Commit sequence

1. `docs(ui): audit current frontend and define phased plan`
2. `chore(ui): establish design tokens and frontend conventions`
3. `feat(ui): add shared component foundation`
4. `refactor(web): restructure marketing application`
5. `feat(web): build responsive public and auth routes`
6. `feat(client): add authenticated application shell`
7. `feat(client): implement today journey quest and progress views`
8. `refactor(admin): establish responsive admin shell`
9. `feat(admin): add dashboard and route foundations`
10. `test(ui): add component and responsive smoke tests`
11. `docs(ui): document design system and route states`

## 9. Definition of done for this UI programme

- Shared design tokens are the source of truth for both applications.
- Page components orchestrate sections but do not contain the entire product UI.
- Demo data is explicit, typed and separated from views.
- Public, client and admin shells work at all required widths.
- Keyboard navigation, focus visibility, semantic HTML and contrast are covered.
- Loading, empty, error, disabled and permission-denied states exist.
- Lint, typecheck, tests and builds run as real commands and pass before completion is claimed.
- No business logic or production metrics are fabricated in UI code.
