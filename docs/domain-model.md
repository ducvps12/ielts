# Domain Model and Invariants

## Bounded modules

### Identity
Owns users, credentials, sessions, email verification, password reset, and account status.

### Authorization
Owns roles, permissions, role assignments, policy evaluation, and privileged-action requirements.

### Goals
Owns a learner's target, baseline, deadline, constraints, and lifecycle.

### Campaigns
Owns a time-bounded learning journey generated from a versioned template.

### Quests
Owns quest templates, assignments, recurrence, prerequisites, submissions, reviews, and completion state.

### Gamification
Owns XP, Gold, streaks, achievements, reward rules, and reconciliation. Reward balances are derived data.

### Evidence
Owns uploaded files, links, text evidence, virus-scan state, review state, and retention metadata.

### Content
Owns IELTS learning content, provenance, licensing, publication state, versioning, and skill taxonomy.

### Notifications
Owns user preferences, notification intents, channel delivery, outbox state, retries, and provider receipts.

### Settings
Owns typed product settings and feature flags editable by authorized admins.

### Moderation
Owns evidence/content review queues, decisions, reasons, escalation, and bulk-operation safety.

### Audit
Owns immutable records of privileged mutations and security-relevant events.

## Core relationships

- A `User` may own many `Goals`; only one IELTS goal may be active in v1.
- A `Goal` may instantiate one active `Campaign` from a specific `CampaignTemplateVersion`.
- A `Campaign` contains generated `QuestAssignment` records derived from versioned quest templates.
- A `QuestAssignment` may receive multiple submissions, but only one accepted completion result.
- Accepted completion may emit reward ledger entries through an idempotent domain transaction.
- Settings and feature flags affect future decisions; historical records retain the effective rule/version used at the time.

## Non-negotiable invariants

1. **Server authority** — clients never decide permissions, completion, rewards, or balances.
2. **Idempotent mutation** — externally retryable commands carry an idempotency key or have a natural unique key.
3. **Append-only rewards** — XP and Gold are represented by immutable ledger entries. Corrections use compensating entries.
4. **One accepted completion** — a quest assignment cannot grant its completion reward more than once.
5. **Versioned templates** — published campaign, quest, rubric, and scoring definitions are never silently edited in place.
6. **Immutable audit facts** — privileged actions create audit records in the same transactional boundary where feasible.
7. **Timezone explicitness** — campaign days, streaks, reminders, and deadlines use the learner's IANA timezone; storage timestamps remain UTC.
8. **Money uses integers** — any future real-money amount uses integer minor units plus currency, never floating point.
9. **Uploads are untrusted** — evidence is private by default and unavailable to reviewers until validation/scanning policy permits it.
10. **Settings are typed** — every setting has a schema, default, scope, editor permission, and audit history.
11. **Soft deletion is deliberate** — security/audit/ledger facts are retained according to policy; user-facing entities may be archived instead of erased.
12. **Content provenance** — publishable IELTS material must include source, license/permission status, and owner.

## Suggested aggregate roots

- `User`
- `Goal`
- `Campaign`
- `QuestAssignment`
- `ContentItem`
- `NotificationIntent`
- `ProductSetting`

Cross-module updates should use domain services and, where asynchronous delivery is required, an outbox event. Modules may read stable IDs from another module but must not reach into another module's private tables through arbitrary queries.

## Initial roles

- `learner`
- `support_agent`
- `moderator`
- `content_editor`
- `product_admin`
- `super_admin`

Permissions should be action-oriented, for example `users.read`, `users.suspend`, `roles.assign`, `quests.publish`, `evidence.review`, `settings.write`, and `audit.read`. Avoid hard-coding behavior based only on role names.
