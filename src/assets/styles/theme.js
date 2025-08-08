
export const pxToRem = (px) => `${px / 16}rem`;
export const pxToMax = (px, baseVw = 1920, fontBase = 16) => {
  const rem = px / fontBase;
  const vw = (px / baseVw) * 100;
  return `max(${rem}rem, ${vw}vw)`;
};

export const clampPx = (px, vw, minPx = 12, maxPx = 32, fontBase = 16) => {
  const minRem = minPx / fontBase;
  const maxRem = maxPx / fontBase;
  const rem = px / fontBase;
  return `clamp(${minRem}rem, max(${rem}rem, ${vw}vw), ${maxRem}rem)`;
};

export const colors = {
  primary: "#E5A6A6",
  secondary: "#C8BFE7",
  accent: "#F6C6A7",
  background: "#fff",
  sidebarBg: "#f3f0f8",
  text: "#5A4E4D",
  textLight: "#fff",
  muted: "#888",
  border: "#ede7f6",
  card: "#fff",
  highlight: "#b49be0",
  warning: "#ff6b6b",
  success: "#27ae60",
  info: "#c8bfe7",
  gray: "#f0f0f0",
  dark: "#222",
};

export const fonts = {
  title: 'League Spartan, "League Spartan", Arial, sans-serif',
  body: 'Lato, "Lato", Arial, sans-serif',
};

export const fontSizes = {
  xs: `${clampPx(8, 2, 9, 14)}`,
  sm: `${clampPx(8, 3, 9, 16)}`,
  base: "16px",
  md: `${clampPx(12, 5, 16, 18)}`,
  lg: `${clampPx(14, 6, 18, 24)}`,
  xl: "32px",
  xxl: "48px",
};


export const gapSizes = {

  lg: `${clampPx(8, 2, 9, 24)}`,
  md: `${clampPx(6, 2, 7, 24)}`,
  sm: `${clampPx(2, 1, 4, 12)}`,
  xs: `${clampPx(2, 1, 2, 4)}`,
}

export const borderRadius = {
  sm: `${pxToRem(6)}`,
  md: `${pxToRem(10)}`,
  lg: `${pxToRem(16)}`,
  xl: `${pxToRem(20)}`,
}