# Route Map

Routes are product contracts. New routes require an owner module, permission model, loading/empty/error behavior, and analytics/privacy review where relevant.

Status legend:

- **Implemented** — source route and quality-gate coverage exist.
- **Foundation** — UI or contract exists, but the full business flow is not connected.
- **Planned** — reserved in architecture only.

## Public web — `apps/web`

- `/` — marketing home. **Implemented**
- `/cach-hoat-dong` — product explanation. **Implemented**
- `/thu-thach/ielts-75` — IELTS template landing page. **Implemented**
- `/bang-gia` — provider-readiness UI; checkout remains disabled. **Implemented UI**
- `/gioi-thieu` — about. **Implemented**
- `/tro-giup` — help centre index. **Implemented**
- `/lien-he` — contact foundation. **Implemented**
- `/dieu-khoan` — terms draft. **Implemented draft**
- `/quyen-rieng-tu` — privacy draft. **Implemented draft**
- `/chinh-sach-cookie` — cookie policy draft. **Implemented draft**
- `/dang-nhap` — server-backed login. **Implemented**
- `/dang-ky` — server-backed registration. **Implemented**
- `/xac-minh-email?token=...` — one-time email verification. **Implemented**
- `/quen-mat-khau` — reset request. **Implemented**
- `/dat-lai-mat-khau?token=...` — reset completion. **Implemented**

## Learner app — `apps/web/app/*`

- `/app/hom-nay` — daily command center. **Demo data foundation**
- `/app/muc-tieu-moi` — authenticated custom-goal creation. **Implemented**
- `/app/lo-trinh` — journey and arc map. **Demo template foundation**
- `/app/nhiem-vu` — quest list. **Demo data foundation**
- `/app/nhiem-vu/[questId]` — quest detail. **Demo data foundation**
- `/app/luyen-tap` — practice hub. **Foundation**
- `/app/video-lab` — permitted transcript/video lesson workspace. **UI foundation**
- `/app/tien-do` — analytics and milestones. **Demo data foundation**
- `/app/thanh-tich` — achievements. **Foundation**
- `/app/cong-dong` — private accountability community. **Foundation**
- `/app/thong-bao` — notification inbox. **Foundation**
- `/app/ho-so` — learner profile. **Foundation**
- `/app/cai-dat` — locale, learning language and preferences. **UI foundation**

The learner shell is visible before route-level authentication is added. All state-changing APIs are server-protected now; server redirects for the app shell are a later identity-hardening slice.

## Admin — `apps/admin`

The admin application is deployed separately and uses an `/admin` route namespace.

- `/admin` — operational dashboard. **Foundation**
- `/admin/users` — user operations. **Demo table foundation**
- `/admin/goals` — goal operations. **Foundation**
- `/admin/campaigns` — campaign operations. **Foundation**
- `/admin/quests` — quest operations. **Foundation**
- `/admin/content` — content operations. **Foundation**
- `/admin/community` — moderation foundation. **Foundation**
- `/admin/reports` — reporting foundation. **Foundation**
- `/admin/notifications` — delivery foundation. **Foundation**
- `/admin/settings` — typed settings foundation. **Foundation**
- `/admin/audit-logs` — privileged action history. **Foundation**

Admin authentication, MFA and server-enforced permissions remain planned and must be completed before deployment outside development.

## REST API — `apps/api`

All endpoints are under `/api/v1`. Cookie-authenticated mutations require `X-CSRF-Token`. Errors expose stable machine-readable codes when thrown by domain modules.

### System

- `GET /api/v1/health` — **Implemented**
- `GET /api/v1/health/ready` — **Implemented**
- `GET /api/v1/commerce/capabilities` — **Implemented, providers disabled**
- `GET /api/v1/video-learning/capabilities` — **Implemented, ingestion disabled**

### Auth and identity

- `GET /api/v1/auth/csrf` — issue double-submit token. **Implemented**
- `POST /api/v1/auth/register` — create pending account. **Implemented**
- `POST /api/v1/auth/verify-email` — consume one-time verification token. **Implemented**
- `POST /api/v1/auth/login` — create opaque server-side session. **Implemented**
- `GET /api/v1/auth/session` — current session. **Implemented**
- `POST /api/v1/auth/logout` — revoke current session. **Implemented**
- `POST /api/v1/auth/forgot-password` — enumeration-resistant reset request. **Implemented**
- `POST /api/v1/auth/reset-password` — rotate password and revoke sessions. **Implemented**
- OAuth, logout-all, session inventory, MFA and account deletion — **Planned**

### Goals and language profiles

- `GET /api/v1/goals` — list goals owned by current user. **Implemented**
- `POST /api/v1/goals` — create private custom goal. **Implemented**
- `GET /api/v1/goals/:goalId` — owned goal detail. **Implemented**
- `PATCH /api/v1/goals/:goalId/status` — validated lifecycle transition. **Implemented**
- `GET /api/v1/language-profiles` — list learning profiles. **Implemented**
- `PUT /api/v1/language-profiles/current` — upsert one language profile. **Implemented**
- Goal-to-campaign generation and adaptive planning — **Planned**

### Quests and evidence

- Today assignments, quest completion, evidence uploads and Error Log APIs — **Planned**

### Progress and gamification

- XP/Gold ledger, streak, progress and achievement read models — **Planned**

### Admin namespace

Admin endpoints will live under `/api/v1/admin/*` and require explicit permissions. No admin mutation API is implemented yet.

## API conventions

- Cursor pagination for unbounded feeds; page pagination is acceptable for bounded admin tables.
- `Idempotency-Key` is required for reward-affecting, payment or externally retried commands.
- Opaque authentication, verification and reset tokens are never stored raw.
- Session cookies are httpOnly; CSRF tokens use a separate same-site cookie and request header.
- Timestamps are ISO 8601 UTC. User timezone is a named IANA zone.
- Goal reads and writes are always scoped to the authenticated user ID.
- Validation errors identify fields without leaking internal implementation details.
- Admin exports will be permissioned, audited, size-limited and asynchronous when large.
