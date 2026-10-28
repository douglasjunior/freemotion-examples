import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'freemotion';

import { Enter, Glow, Logo } from '../components';
import { colors, fonts, gradient } from '../theme';


const curve = Easing.inOut(Easing.cubic);
const CHART = { width: 470, height: 300 };
const STEPS = 11;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Frames where the ball leaves and reaches the end of the curve. */
const TRAVEL = [24, 84] as const;

export const BANNER_DURATION = 96;

const point = (t: number) => ({ x: t * CHART.width, y: CHART.height - curve(t) * CHART.height });

/**
 * An ease-in-out curve traced by a ball. It leaves a copy of itself at evenly spaced frames, like onion
 * skin in an animation tool, and the dotted curve is drawn as it passes.
 */
const MotionTrail = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, TRAVEL, [0, 1], clamp);
  const ball = point(progress);
  const path = Array.from({ length: 101 }, (_, i) => {
    const { x, y } = point(i / 100);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const appear = spring({ frame, fps, delay: 12, config: { damping: 14 } });

  return (
    <svg width={CHART.width + 60} height={CHART.height + 90} viewBox={`-30 -30 ${CHART.width + 60} ${CHART.height + 90}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="trail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={colors.amber} />
          <stop offset="1" stopColor={colors.pink} />
        </linearGradient>
        {/* Reveals the dotted curve up to the ball. */}
        <clipPath id="drawn">
          <rect x={-30} y={-30} width={30 + ball.x} height={CHART.height + 60} />
        </clipPath>
      </defs>
      <path d={`M0,${CHART.height} H${CHART.width}`} stroke={colors.line} strokeWidth={2} opacity={appear} />
      <path d={path} fill="none" stroke="url(#trail)" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" clipPath="url(#drawn)" />
      {Array.from({ length: STEPS }, (_, i) => {
        const t = i / (STEPS - 1);
        const { x, y } = point(t);
        // Each copy pops in as the ball goes past it; the last one is the ball itself.
        const passed = interpolate(progress, [t - 0.001, t + 0.06], [0, 1], clamp);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={CHART.height + 10} y2={CHART.height + 20} stroke={colors.faint} strokeWidth={2} opacity={appear} />
            {i < STEPS - 1 && (
              <circle cx={x} cy={y} r={14 * passed} fill="url(#trail)" opacity={interpolate(t, [0, 1], [0.18, 1])} />
            )}
          </g>
        );
      })}
      <circle cx={ball.x} cy={ball.y} r={22 * appear} fill="url(#trail)" />
      <text x={0} y={CHART.height + 50} fill={colors.faint} fontFamily={fonts.mono} fontSize={17} opacity={appear}>frame 0</text>
      <text x={CHART.width} y={CHART.height + 50} fill={colors.faint} fontFamily={fonts.mono} fontSize={17} textAnchor="end" opacity={appear}>
        frame 60
      </text>
    </svg>
  );
};

const Wordmark = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <span style={{ display: 'flex', fontSize: 84, fontWeight: 750, letterSpacing: -3.5 }}>
      {[...'freemotion'].map((letter, i) => {
        const progress = spring({ frame, fps, delay: 6 + i * 2, config: { damping: 14 } });
        return (
          <span key={i} style={{ display: 'inline-block', opacity: progress, transform: `translateY(${(1 - progress) * 40}px)` }}>
            {letter}
          </span>
        );
      })}
    </span>
  );
};

/**
 * The README banner, as a short intro: everything builds up and settles by the last frame, which is
 * the still used in the READMEs (`--frame 95`).
 */
export const Banner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mark = spring({ frame, fps, config: { damping: 11, stiffness: 120 } });
  const bar = interpolate(frame, [0, 30], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ fontFamily: fonts.sans, color: colors.text }}>
      <Glow seed={120} />
      <AbsoluteFill style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 90px 0 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <Logo size={78} style={{ transform: `scale(${mark}) rotate(${(1 - mark) * -40}deg)` }} />
            <Wordmark />
          </div>
          <Enter delay={22}>
            <div style={{ fontSize: 34, lineHeight: 1.35, color: colors.muted }}>
              Make videos with <span style={{ color: colors.text }}>React</span>.<br />
              Preview live. Render anywhere.
            </div>
          </Enter>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {['MIT', 'Studio', 'MP4 · WebM · GIF', 'Player'].map((label, i) => (
              <Enter key={label} delay={32 + i * 4} distance={16}>
                <span style={{ display: 'block', fontSize: 19, padding: '8px 16px', borderRadius: 999, color: colors.muted, boxShadow: `inset 0 0 0 1px ${colors.line}`, background: 'rgba(255, 255, 255, 0.03)' }}>
                  {label}
                </span>
              </Enter>
            ))}
          </div>
        </div>
        <MotionTrail />
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, bottom: 0, height: 6, width: `${bar * 100}%`, background: gradient }} />
    </AbsoluteFill>
  );
};
