# UI/UX Implementation Report

## Scope

This report records the UI foundation implemented after the repository audit. It is intentionally explicit about demo data, missing API connections and remaining release gates.

## Architecture delivered

### Shared UI package

`packages/ui` now owns:

- light-first and dark-ready design tokens;
- typography, spacing, radius, shadow, container, z-index and motion rules;
- actions: Button, LinkButton and IconButton;
- forms: Input, Textarea, Select, Checkbox, Radio and Switch;
- surfaces: Card, Badge, Avatar, Progress and StatCard;
- feedback: Alert, Toast, Skeleton, EmptyState, ErrorState and PermissionDenied;
- overlays: Tooltip, Dropdown, Dialog and Drawer;
- navigation: Tabs, Breadcrumb and Pagination;
- data display: Table and DataTable foundation;
- one consistent Lucide icon export surface.

The package is actively used by both `apps/web` and `apps/admin`; it is not a placeholder package.

### Web application

The former single-page marketing implementation has been split into route layouts, section components, structured demo data and page-specific CSS modules by concern.

Public routes:

- `/`
- `/gioi-thieu`
- `/cach-hoat-dong`
- `/thu-thach`
- `/thu-thach/ielts-75`
- `/bang-gia`
- `/tro-giup`
- `/lien-he`
- `/dieu-khoan`
- `/quyen-rieng-tu`
- `/chinh-sach-cookie`
- `/dang-nhap`
- `/dang-ky`
- `/quen-mat-khau`
- `/dat-lai-mat-khau`
- `/xac-minh-email`

Legal documents are marked as drafts and must be reviewed by qualified Vietnamese counsel before production use.

### Learner client

Responsive application shell:

- desktop: persistent left sidebar and topbar;
- tablet: compact sidebar and adaptive content grid;
- mobile: dedicated header, bottom navigation and secondary drawer;
- shared loading, error and not-found states.

Client routes:

- `/app/hom-nay`
- `/app/lo-trinh`
- `/app/nhiem-vu`
- `/app/nhiem-vu/[questId]`
- `/app/luyen-tap`
- `/app/tien-do`
- `/app/thanh-tich`
- `/app/cong-dong`
- `/app/thong-bao`
- `/app/ho-so`
- `/app/cai-dat`

Detailed views currently implemented:

- Today dashboard;
- journey/Arc map;
- quest filters and quest detail;
- progress overview and skill cards.

### Admin application

Admin is mounted under `/admin` and has:

- permission-aware responsive navigation;
- breadcrumb and operator menu;
- command palette foundation;
- explicit dashboard empty metric states;
- chart placeholder with accessible summary;
- reusable filter bar, table and pagination foundation;
- confirmation dialog pattern;
- loading, error and not-found states;
- typed settings preview that performs no mutation.

Admin routes:

- `/admin`
- `/admin/users`
- `/admin/goals`
- `/admin/campaigns`
- `/admin/quests`
- `/admin/content`
- `/admin/community`
- `/admin/reports`
- `/admin/notifications`
- `/admin/settings`
- `/admin/audit-logs`

## Demo data

All interface-only demo data is isolated under:

- `apps/web/data/demo/marketing.ts`
- `apps/web/data/demo/client.ts`
- `apps/admin/data/demo/admin.ts`
- `apps/admin/data/demo/admin-users.ts`

Demo surfaces are labelled in the interface. The dashboard does not invent real users, retention, revenue, band results or moderation volume.

## API connections not implemented

The following remain intentionally disconnected:

- authentication and secure sessions;
- RBAC policy evaluation at API level;
- campaign and quest queries;
- quest completion and reward ledger transactions;
- evidence upload and Error Log persistence;
- learner progress aggregates;
- admin user mutations;
- template editor mutations;
- settings revision and rollback;
- audit event retrieval;
- notification delivery;
- commerce and payments.

Buttons that would perform unsafe or false mutations are disabled or show an explicit UI-foundation message.

## Accessibility and responsive contract

The UI includes semantic landmarks, skip links, labelled controls, visible focus states, keyboard-operable overlays, reduced-motion support, minimum mobile touch targets and non-colour status labels.

Responsive smoke coverage is configured for:

- 375 × 812;
- 430 × 932;
- 768 × 1024;
- 1024 × 768;
- 1280 × 900;
- 1440 × 1000.

## Quality gates

Repository commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

GitHub Actions is configured to install dependencies, generate Prisma, run the quality gates and upload the Playwright report on failure. A release must not be declared ready until the workflow result is green.

## Next implementation slice

1. Fix any failures reported by the first complete quality workflow.
2. Add first-party authentication, sessions and server-enforced RBAC.
3. Replace client demo data with read-only Goal Engine API queries.
4. Implement one idempotent quest-completion vertical slice with XP/Gold ledger entries.
5. Connect admin users and template views to permission-protected APIs.
