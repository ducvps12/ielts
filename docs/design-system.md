# Frontend Design Foundation

## Direction

LevelUp uses a calm, premium learning-system aesthetic. Gamification is visible through progress, rewards and challenge language, but the interface must remain credible for adult IELTS learners.

The light theme is the primary product theme. A dark token set is available for admin and future user preference support, but dark mode is not the priority for the first learner release.

## Token source

Shared CSS variables live in:

```text
packages/ui/src/styles/tokens.css
```

Applications import the package stylesheet once from their root layout:

```ts
import "@levelup/ui/styles.css";
```

Page and component styles must consume semantic variables such as `--color-surface`, `--color-text-muted`, `--space-6` and `--radius-lg`. Do not introduce repeated raw colors or arbitrary spacing values unless the value is documented as a deliberate exception.

## Color roles

- Canvas: page background.
- Surface: cards, panels and inputs.
- Surface muted: grouped or lower-emphasis regions.
- Text, muted text and subtle text: three readable hierarchy levels.
- Primary: high-confidence product actions.
- Accent: progress and motivational emphasis, not every clickable control.
- Success, warning, danger and info: semantic state only.
- Focus: keyboard focus ring.

Color must never be the only signal for status.

## Typography

- Body and interface: `--font-sans`.
- Display headings: `--font-display`.
- Technical identifiers: `--font-mono`.
- Use the shared type scale from `--text-xs` through `--text-6xl`.
- Long-form content should remain within `--container-reading`.
- Body copy should normally use `--leading-normal` or `--leading-relaxed`.

## Spacing and layout

The spacing scale is based on 4 px and exposed from `--space-1` through `--space-32`.

Container widths:

- Reading: 720 px.
- Standard content: 1120 px.
- Wide dashboard: 1280 px.

Required review widths:

- 375 px.
- 430 px.
- 768 px.
- 1024 px.
- 1280 px.
- 1440 px.

Responsive behavior must be designed for each class of device; desktop layouts must not simply be squeezed into mobile.

## Radius and elevation

- Small controls: `--radius-sm`.
- Standard cards and inputs: `--radius-md` or `--radius-lg`.
- Hero and major surfaces: `--radius-xl` or `--radius-2xl`.
- Pills: `--radius-full`.
- Elevation is restrained. Use borders before shadows for ordinary grouping.

## Z-index

Use only the shared levels:

- Base: 0.
- Sticky navigation: 20.
- Dropdown: 40.
- Overlay: 60.
- Modal: 80.
- Toast: 100.

Do not invent large z-index values.

## Motion

Motion communicates state and hierarchy, not decoration.

- Instant: 80 ms.
- Fast: 140 ms.
- Standard: 220 ms.
- Slow: 320 ms.

All shared motion is disabled or reduced when the user requests reduced motion.

## Accessibility baseline

The shared base stylesheet provides:

- predictable box sizing;
- explicit focus-visible ring;
- reduced-motion behavior;
- skip-link utility;
- visually hidden utility;
- readable text rendering and minimum page width.

Every interactive component must retain a visible focus state, keyboard access, semantic HTML and an accessible name.

## Theme usage

```html
<html data-theme="light">
```

or:

```html
<html data-theme="dark">
```

Theme selection will later move behind user preferences. Applications must not directly duplicate the complete token set.
