# LevelUp Platform V2 — Global Goal Operating System

## Product thesis

LevelUp is not an IELTS-only application. It is a goal operating system that converts an outcome into a structured journey of phases, checkpoints, quests, evidence and measurable progress.

IELTS remains the first reference template, not the product boundary.

## Product layers

### 1. LevelUp Core

Owns the reusable goal loop:

- goal definition;
- baseline and constraints;
- versioned journey templates;
- daily quests;
- evidence and review;
- streaks, XP and achievements;
- progress analytics;
- notifications;
- subscription entitlements.

### 2. Language Studio

A vertical built on LevelUp Core for learning English, Mandarin Chinese, French, Spanish, German, Japanese, Korean and Vietnamese.

Language Studio adds:

- target-language and interface-language profiles;
- CEFR, HSK and exam-specific pathways;
- listening, speaking, reading, writing, vocabulary and pronunciation skills;
- spaced review;
- video-based lessons;
- source provenance and licensing metadata.

### 3. Goal Template Library

Examples:

- IELTS 7.5;
- conversational Mandarin HSK 3;
- French A2;
- complete a programming curriculum;
- build a fitness habit;
- launch a small online business.

Templates are versioned. A learner may also create a private custom goal. A template never guarantees an external result.

## International product rules

- UI locale and learning language are separate concepts.
- Initial UI locales: Vietnamese, English, Simplified Chinese and French.
- Initial learning-language catalogue may be larger than the UI-locale catalogue.
- Dates, plural rules, numbers and currency must use locale-aware formatters.
- User timezone is an IANA identifier; stored timestamps remain UTC.
- Public route slugs remain stable during the first internationalization phase. Locale-prefixed routing is introduced only after content and SEO migration plans are complete.
- No payment method is enabled globally by default. Availability is controlled by country, currency, merchant account, product and feature flag.

## Initial international navigation

- Today
- Journey
- Quests
- Practice
- Video Lab
- Progress
- Achievements
- Community
- Notifications
- Profile
- Settings

## V2 release sequence

1. Stabilize CI and existing UI foundation.
2. Generalize product language and domain contracts without destructive migrations.
3. Add internationalization foundation.
4. Add Video Lab preview and source-ingestion safety rules.
5. Add generic Goal and Language Profile persistence.
6. Add authentication and server-enforced permissions.
7. Connect read-only Today and Video Lab APIs.
8. Add provider-agnostic billing and entitlements.
9. Integrate PayPal sandbox.
10. Integrate a Vietnam bank/VietQR provider through verified webhooks.
11. Evaluate other providers only after merchant, legal, security and operational review.

## Explicit non-goals for the current slice

- scraping arbitrary YouTube captions;
- downloading or re-hosting copyrighted video;
- accepting cryptocurrency as a live Vietnamese checkout method;
- claiming automatic IELTS or language outcomes;
- enabling production payments before webhook verification, idempotency, audit and reconciliation exist.
