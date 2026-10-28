import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'freemotion';
import type { CSSProperties, ReactNode } from 'react';

import { colors, fonts, gradient, windowStyle } from './theme';


/** Soft glows drifting behind everything. Pass `seed` to give each scene its own drift. */
export const Glow = ({ seed = 0 }: { readonly seed?: number }) => {
  const frame = useCurrentFrame() + seed;
  const a = Math.sin(frame / 50) * 4;
  const b = Math.cos(frame / 60) * 4;
  return (
    <AbsoluteFill
      style={{
        background: [
          `radial-gradient(circle at ${22 + a}% ${28 + b}%, ${colors.pink}38, transparent 42%)`,
          `radial-gradient(circle at ${80 - b}% ${75 - a}%, ${colors.amber}2b, transparent 42%)`,
          colors.background,
        ].join(', '),
      }}
    />
  );
};

/** The freemotion mark: a rounded square with a play triangle. */
export const Logo = ({ size, style }: { readonly size: number; readonly style?: CSSProperties }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: gradient,
      display: 'grid',
      placeItems: 'center',
      boxShadow: `0 ${size * 0.15}px ${size * 0.5}px ${colors.pink}55`,
      ...style,
    }}
  >
    <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 10 10">
      <path d="M2 1v8l7-4z" fill="#fff" strokeLinejoin="round" stroke="#fff" strokeWidth={0.8} />
    </svg>
  </div>
);

export const Window = ({ title, children, style }: { readonly title: string; readonly children: ReactNode; readonly style?: CSSProperties }) => (
  <div style={{ ...windowStyle, ...style }}>
    <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', borderBottom: `1px solid ${colors.line}` }}>
      {['#ff5f57', '#febc2e', '#28c840'].map(color => (
        <span key={color} style={{ width: 12, height: 12, borderRadius: 6, background: color, opacity: 0.85 }} />
      ))}
      <span style={{ marginLeft: 10, fontFamily: fonts.mono, fontSize: 15, color: colors.muted }}>{title}</span>
    </div>
    {children}
  </div>
);

/** Slides and fades in on mount, with a spring. */
export const Enter = ({ delay = 0, distance = 30, children, style }: {
  readonly delay?: number;
  readonly distance?: number;
  readonly children: ReactNode;
  readonly style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, delay, config: { damping: 16 } });
  return <div style={{ opacity: Math.min(1, progress * 1.4), transform: `translateY(${(1 - progress) * distance}px)`, ...style }}>{children}</div>;
};

/** A blinking block cursor, on for half a second, off for the other half. */
export const Cursor = ({ color = colors.text }: { readonly color?: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const on = Math.floor(frame / (fps / 2)) % 2 === 0;
  return <span style={{ display: 'inline-block', width: '0.55em', height: '1.1em', verticalAlign: 'text-bottom', background: color, opacity: on ? 0.9 : 0 }} />;
};
