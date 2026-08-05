# Route Map

Routes are product contracts. New routes require an owner module, permission model, loading/empty/error behavior, and analytics/privacy review where relevant.

## Public web — `apps/web`

- `/` — marketing home.
- `/cach-hoat-dong` — product explanation.
- `/thu-thach/ielts-75` — IELTS campaign landing page.
- `/bang-gia` — reserved; hidden while commerce is disabled.
- `/gioi-thieu` — about.
- `/tro-giup` — help centre index.
- `/tro-giup/[slug]` — help article.
- `/dieu-khoan` — terms draft.
- `/quyen-rieng-tu` — privacy draft.
- `/cookie` — cookie policy draft.
- `/dang-nhap` — login.
- `/dang-ky` — registration.
- `/xac-minh-email` — email verification state.
- `/quen-mat-khau` — reset request.
- `/dat-lai-mat-khau` — reset completion.

## Learner app — `apps/web/app/*`

- `/app/hom-nay` — daily command center.
- `/app/onboarding` — diagnostic and goal setup.
- `/app/ke-hoach` — campaign calendar and plan.
- `/app/nhiem-vu/[assignmentId]` — quest detail and submission.
- `/app/luyen-tap` — skill hub.
- `/app/luyen-tap/listening`
- `/app/luyen-tap/reading`
- `/app/luyen-tap/writing`
- `/app/luyen-tap/speaking`
- `/app/tien-do` — analytics and milestones.
- `/app/thanh-tich` — achievements.
- `/app/thong-bao` — notification inbox.
- `/app/ho-so` — learner profile.
- `/app/cai-dat` — account, timezone, accessibility, and notification preferences.

## Admin — `apps/admin`

- `/login` — admin login entry.
- `/` — operational dashboard.
- `/users` and `/users/[userId]` — user operations.
- `/roles` — roles and permissions.
- `/goals` — goal search and diagnostics.
- `/campaigns` — learner campaigns.
- `/templates/campaigns` — campaign templates and versions.
- `/templates/quests` — quest templates and versions.
- `/content` — IELTS content library.
- `/moderation/evidence` — evidence review queue.
- `/notifications` — templates, delivery status, and failures.
- `/jobs` — worker failures and safe replay.
- `/settings` — typed product settings.
- `/feature-flags` — rollout and emergency controls.
- `/cms/pages` — static pages and legal drafts.
- `/support` — support cases.
- `/audit` — privileged action history.
- `/system/health` — dependency and version status.

## REST API — `apps/api`

All endpoints are under `/v1`. Error responses use one envelope and stable machine-readable codes.

### System
- `GET /v1/health/live`
- `GET /v1/health/ready`
- `GET /v1/version`

### Auth and identity
- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`
- `POST /v1/auth/logout-all`
- `POST /v1/auth/verify-email`
- `POST /v1/auth/password/forgot`
- `POST /v1/auth/password/reset`
- `GET /v1/me`
- `PATCH /v1/me`
- `PATCH /v1/me/preferences`

### Goal and campaign
- `POST /v1/goals`
- `GET /v1/goals/current`
- `PATCH /v1/goals/:goalId`
- `POST /v1/goals/:goalId/activate`
- `GET /v1/campaigns/current`
- `GET /v1/campaigns/current/calendar`

### Quests and evidence
- `GET /v1/quest-assignments/today`
- `GET /v1/quest-assignments/:assignmentId`
- `POST /v1/quest-assignments/:assignmentId/submissions`
- `POST /v1/uploads/presign`
- `POST /v1/evidence/:evidenceId/complete-upload`

### Progress and gamification
- `GET /v1/progress/overview`
- `GET /v1/progress/skills`
- `GET /v1/rewards/balance`
- `GET /v1/rewards/ledger`
- `GET /v1/streaks/current`
- `GET /v1/achievements`

### Admin namespace
Admin endpoints live under `/v1/admin/*` and require explicit permissions. Initial resources: users, roles, goals, campaigns, templates, content, evidence reviews, settings, feature flags, notifications, jobs, support cases, and audit events.

## API conventions

- Cursor pagination for unbounded feeds; page pagination is acceptable for bounded admin tables.
- `Idempotency-Key` required for reward-affecting or externally retryable commands.
- `X-Request-Id` accepted and returned; generated when absent.
- Timestamps are ISO 8601 UTC. User timezone is a named IANA zone.
- Validation errors identify fields without leaking internal implementation details.
- Admin exports are permissioned, audited, size-limited, and asynchronous when large.
