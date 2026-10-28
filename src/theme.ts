import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import type { CSSProperties } from 'react';


export const colors = {
  background: '#0b0b12',
  surface: '#14141d',
  raised: '#1c1c28',
  line: 'rgba(255, 255, 255, 0.09)',
  text: '#f4f4f8',
  muted: '#9a9ab0',
  faint: '#5d5d73',
  pink: '#ff4f7b',
  amber: '#ffb547',
  cyan: '#4fd1ff',
  green: '#5ee6a8',
  violet: '#a78bfa',
};

export const fonts = {
  sans: '"Inter Variable", system-ui, sans-serif',
  mono: '"JetBrains Mono Variable", ui-monospace, monospace',
};

export const gradient = `linear-gradient(135deg, ${colors.amber}, ${colors.pink})`;

/** A card with a window title bar, used for the code editor, the preview and the terminal. */
export const windowStyle: CSSProperties = {
  background: colors.surface,
  borderRadius: 18,
  boxShadow: `0 30px 80px rgba(0, 0, 0, 0.45), inset 0 0 0 1px ${colors.line}`,
  overflow: 'hidden',
};
