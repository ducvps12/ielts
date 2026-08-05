# Internationalization Architecture

## Separation of concepts

The platform distinguishes three independent values:

- `uiLocale`: language used by product navigation and system copy;
- `learningLanguage`: language the learner is studying;
- `nativeLanguage`: language used for translations and explanations.

Changing one must not silently change the others.

## Initial catalogue

### UI locales

- `vi` — Vietnamese
- `en` — English
- `zh-CN` — Simplified Chinese
- `fr` — French

### Initial learning languages

- English (`en`)
- Mandarin Chinese (`zh-CN`)
- French (`fr`)
- Spanish (`es`)
- German (`de`)
- Japanese (`ja`)
- Korean (`ko`)
- Vietnamese (`vi`)

The catalogue is data-driven. A language may be visible for one feature and unavailable for another depending on content, speech, dictionary and moderation capability.

## Message organization

```text
packages/i18n/
  src/
    locales.ts
    formatters.ts
    messages/
      vi.ts
      en.ts
      zh-CN.ts
      fr.ts
```

Product copy uses stable message keys. Demo learning content remains outside the message catalogue because it is domain content, not interface text.

## Formatting rules

- Use `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat` and `Intl.PluralRules`.
- Store timestamps in UTC and user timezones as IANA names.
- Store monetary values as integer minor units plus ISO currency code.
- Do not concatenate translated sentence fragments.
- Components must allow longer labels without clipping.
- Directionality is explicit so future RTL support does not require rewriting components.

## Routing sequence

Phase 1 keeps current stable routes and persists locale in user preference/cookie.

Phase 2 may add locale-prefixed public routes after redirects, canonical URLs, sitemap, legal-copy ownership and SEO migration are defined.

Authenticated routes should not change URL solely because the learner changes the language being studied.

## Accessibility

- `html[lang]` follows `uiLocale`.
- Pronunciation buttons have language-specific accessible labels.
- Transcript segments expose language metadata where practical.
- Captions and translations are distinguishable without relying only on color.
