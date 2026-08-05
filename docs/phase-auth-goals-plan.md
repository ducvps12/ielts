# Phase — Identity, sessions and custom goals

## Objective

Turn the current UI foundation into the first real product slice:

1. a user can create and verify an account;
2. a user can sign in with a revocable server-side session;
3. authenticated mutations are protected by a CSRF token;
4. a user can create and list private goals;
5. a language learner can save a language profile independently from UI locale;
6. the existing auth screens call the real API and preserve accessible states.

## Delivery order

### Commit 1 — Domain and contracts

- extend Prisma with credentials, sessions, email-verification tokens and password-reset tokens;
- add `emailVerifiedAt` and identity relations to `User`;
- add shared auth request/response contracts;
- extend goal contracts for create/list/detail payloads;
- add typed auth environment settings.

### Commit 2 — Authentication API

- register Fastify cookie support;
- add cryptographic token utilities;
- hash passwords with Argon2id;
- issue opaque sessions whose hashes are stored in PostgreSQL;
- use an httpOnly session cookie and a separate CSRF cookie;
- add register, email verification, login, session, logout, forgot-password and reset-password endpoints;
- never reveal whether an email exists in password-reset responses;
- revoke all existing sessions after a password reset.

### Commit 3 — Authenticated goal API

- add a reusable session guard and current-user decorator;
- add list/create/get/update-status goal endpoints with ownership checks;
- add list/upsert language-profile endpoints;
- write audit entries for goal creation and status changes;
- keep campaign generation outside this slice.

### Commit 4 — Web integration

- replace the auth UI-only submit handler with a typed API client;
- fetch a CSRF token before auth mutations;
- show loading, validation, API error and success states;
- support local-development verification/reset links only when the API explicitly returns a development token;
- add a custom-goal onboarding screen and client route;
- do not create fake production data.

### Commit 5 — Tests and documentation

- unit-test token hashing, password policy, email normalization and goal validation;
- test controller/service behavior without weakening production checks;
- update route and architecture documentation;
- run lint, typecheck, tests, build and responsive E2E in GitHub Actions.

### Commit 6 — Session hardening and distributed abuse protection

- protect all learner routes with server-side session validation;
- list, rotate and selectively revoke active sessions;
- add Redis-backed request quotas for registration, login and password reset;
- lock an email/IP login subject after repeated invalid credentials;
- hash rate-limit subjects so raw email and IP values are not stored in Redis keys;
- fail closed with a structured service-unavailable response when the distributed guard cannot be reached.

## Security decisions

- Passwords: Argon2id; raw passwords are never logged or stored.
- Sessions: opaque 256-bit random token; only SHA-256 digest stored in the database.
- Cookies: `httpOnly`, `secure` in production, `sameSite=lax`, explicit expiry.
- CSRF: double-submit token plus a hash bound to the authenticated session.
- Verification/reset tokens: opaque random token, one-time use, hash stored in database, short expiry.
- Enumeration resistance: login and password-reset errors do not disclose account existence beyond the minimum required UX.
- Ownership: every goal query is scoped by the authenticated user ID.
- No production email claim: local development may expose tokens only behind `AUTH_DEV_TOKENS_ENABLED=true`; production defaults to false.
- Distributed rate limits: Redis counters use atomic increment/expiry scripts and keyed fingerprints derived from `SESSION_SECRET`.

## Deferred

- Google OAuth;
- admin MFA;
- full RBAC and permission management;
- email provider delivery worker;
- campaign generation from a goal;
- payment and entitlement activation.

These are separate phases and must not be simulated in the client.
