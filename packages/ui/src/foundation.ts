export const breakpoints = {
  mobile: 375,
  mobileWide: 430,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1440,
} as const;

export const containerWidths = {
  reading: 720,
  content: 1120,
  wide: 1280,
} as const;

export const motion = {
  instant: 80,
  fast: 140,
  standard: 220,
  slow: 320,
} as const;

export type BreakpointName = keyof typeof breakpoints;
