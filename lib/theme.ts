import { hexToRgb } from './utils';

export function applyTheme(theme: any) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-primary', hexToRgb(theme.primary));
  root.style.setProperty('--color-secondary', hexToRgb(theme.secondary));
  root.style.setProperty('--color-background', hexToRgb(theme.background));
  root.style.setProperty('--color-foreground', hexToRgb(theme.foreground));
  root.style.setProperty('--color-card', hexToRgb(theme.card));
  root.style.setProperty('--color-muted', hexToRgb(theme.muted));
  root.style.setProperty('--color-border', hexToRgb(theme.border));
}
