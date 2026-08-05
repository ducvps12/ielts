# Codex Execution Playbook

Use this file when assigning work to a coding agent. Do not ask an agent to “build the whole platform”. Give it exactly one vertical slice.

## Required task prompt structure

```text
Repository: ducvps12/ielts
Phase: <roadmap phase>
Goal: <one observable result>
Allowed scope: <directories and modules>
Must preserve: <invariants and compatibility>
Acceptance criteria:
1. ...
2. ...
Tests required:
- ...
Documentation required:
- ...
Forbidden:
- unrelated refactors
- placeholder production data
- business rules in React components
- permission checks only in the UI
Output:
- implementation
- tests
- migration notes
- commands run
- known limitations
```

## Agent workflow

1. Read `AGENTS.md`, `docs/ROADMAP.md`, `docs/domain-model.md`, and relevant local `AGENTS.md` files.
2. Inspect existing code before proposing new abstractions.
3. State the smallest implementation plan.
4. Implement one coherent slice.
5. Add or update tests in the same change.
6. Run formatting, lint, typecheck, tests, and affected builds.
7. Report exact failures instead of claiming success.
8. Update docs when contracts, routes, environment variables, or operational steps change.

## Review checklist

- Does the change belong to the correct module?
- Is authorization enforced server-side?
- Is retry behavior idempotent where necessary?
- Are audit and ledger invariants preserved?
- Are timezones explicit?
- Are loading, empty, error, forbidden, and responsive states covered where UI changed?
- Are migrations safe for existing data?
- Can operators understand and recover from failure?
- Did the agent avoid unrelated formatting churn?

## Recommended implementation order

1. Workspace/infrastructure and quality gates.
2. Shared design tokens and application shells.
3. Identity/session foundation.
4. RBAC and audit.
5. Goal onboarding.
6. Campaign and quest generation.
7. Submission/evidence.
8. Reward ledger and streak calculation.
9. Learner daily loop.
10. Admin operations.
11. Notifications/worker reliability.
12. Content engine and release hardening.

## Stop conditions

An agent must stop and document the blocker rather than invent behavior when:
- a product rule affects rewards, money, privacy, or account deletion and is unspecified;
- a migration could destroy or reinterpret existing data;
- required credentials or external provider contracts are unavailable;
- legal wording is requested as final approved advice;
- tests reveal an architectural conflict that cannot be resolved inside the assigned slice.
