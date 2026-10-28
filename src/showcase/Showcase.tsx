import { AbsoluteFill, Easing, interpolate, Series, spring, useCurrentFrame, useVideoConfig } from 'freemotion';
import type { ReactNode } from 'react';

import { Cursor, Enter, Glow, Logo, Window } from '../components';
import { colors, fonts, gradient } from '../theme';

import { CODE, CODE_LENGTH, LINE_STARTS, TOKEN_STARTS } from './code';


const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Fades a scene in over its first frames and out over its last ones. */
const Scene = ({ duration, children }: { readonly duration: number; readonly children: ReactNode }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, duration - 10, duration], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{ opacity, fontFamily: fonts.sans, color: colors.text }}>{children}</AbsoluteFill>;
};

const Heading = ({ children }: { readonly children: ReactNode }) => (
  <Enter style={{ position: 'absolute', top: 54, left: 0, right: 0, textAlign: 'center', fontSize: 40, fontWeight: 650, letterSpacing: -1 }}>
    {children}
  </Enter>
);

const Wordmark = ({ size, delay = 0 }: { readonly size: number; readonly delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: 'flex', fontSize: size, fontWeight: 750, letterSpacing: -size * 0.04 }}>
      {[...'freemotion'].map((letter, i) => {
        const progress = spring({ frame, fps, delay: delay + i * 2, config: { damping: 14 } });
        return (
          <span key={i} style={{ display: 'inline-block', opacity: progress, transform: `translateY(${(1 - progress) * size * 0.5}px)` }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mark = spring({ frame, fps, config: { damping: 11, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      <Logo size={128} style={{ transform: `scale(${mark}) rotate(${(1 - mark) * -40}deg)` }} />
      <Wordmark size={112} delay={8} />
      <Enter delay={30}>
        <div style={{ fontSize: 38, color: colors.muted }}>Make videos with React.</div>
      </Enter>
    </AbsoluteFill>
  );
};

/** The snippet, revealed character by character, with the cursor on the line being typed. */
const TypedCode = ({ visible }: { readonly visible: number }) => (
  <pre style={{ margin: 0, padding: '22px 26px', fontFamily: fonts.mono, fontSize: 19, lineHeight: 1.75, fontVariantLigatures: 'none' }}>
    {CODE.map((line, row) => {
      const typing = visible < CODE_LENGTH && visible >= LINE_STARTS[row]! && visible < LINE_STARTS[row + 1]!;
      return (
        <div key={row} style={{ minHeight: '1.75em', whiteSpace: 'pre' }}>
          {line.map(([text, color], i) => (
            <span key={i} style={{ color }}>{text.slice(0, Math.max(0, visible - TOKEN_STARTS[row]![i]!))}</span>
          ))}
          {typing && <Cursor color={colors.pink} />}
        </div>
      );
    })}
  </pre>
);

const Preview = ({ frame }: { readonly frame: number }) => {
  const x = interpolate(frame, [0, 60], [0, 360], { easing: Easing.inOut(Easing.cubic), ...clamp });
  return (
    <div style={{ height: `calc(${CODE.length} * 1.75 * 19px + 44px)`, padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ position: 'relative', height: 120, marginTop: 20 }}>
        <div style={{ position: 'absolute', top: 59, left: 30, right: 30, height: 2, background: colors.line }} />
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: x,
            width: 60,
            height: 60,
            borderRadius: 30,
            background: gradient,
            boxShadow: `0 10px 30px ${colors.pink}66`,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.mono, fontSize: 17, color: colors.muted }}>
        <span>frame <b style={{ color: colors.amber, fontWeight: 600 }}>{String(Math.round(frame)).padStart(2, '0')}</b></span>
        <span>x = <b style={{ color: colors.cyan, fontWeight: 600 }}>{x.toFixed(0)}</b></span>
      </div>
    </div>
  );
};

const Code = () => {
  const frame = useCurrentFrame();
  const visible = Math.floor(interpolate(frame, [6, 66], [0, CODE_LENGTH], clamp));
  // Once the code is typed, the preview plays it: 60 frames of motion, a short rest, and again.
  const previewFrame = Math.max(0, (frame - 62) % 80);
  return (
    <AbsoluteFill>
      <Heading>Every frame is a function of time.</Heading>
      <div style={{ position: 'absolute', top: 150, left: 50, right: 50, display: 'flex', gap: 26, alignItems: 'flex-start' }}>
        <Enter delay={2} style={{ flex: 1.35 }}>
          <Window title="Ball.tsx"><TypedCode visible={visible} /></Window>
        </Enter>
        <Enter delay={8} style={{ flex: 1 }}>
          <Window title="preview"><Preview frame={previewFrame} /></Window>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};

const Render = () => {
  const frame = useCurrentFrame();
  const command = 'npx freemotion render Showcase';
  const typed = command.slice(0, Math.floor(interpolate(frame, [4, 24], [0, command.length], clamp)));
  const progress = interpolate(frame, [30, 56], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const done = frame >= 58;
  const total = 300;
  return (
    <AbsoluteFill>
      <Heading>Render to MP4, WebM, GIF or PNG.</Heading>
      <Enter delay={2} style={{ position: 'absolute', top: 160, left: 150, right: 150 }}>
        <Window title="zsh">
          <div style={{ padding: '26px 30px', fontFamily: fonts.mono, fontSize: 22, lineHeight: 1.9, minHeight: 230 }}>
            <div>
              <span style={{ color: colors.pink }}>$ </span>
              {typed}
              {frame < 27 && <Cursor />}
            </div>
            {frame >= 27 && <div style={{ color: colors.muted }}>Bundling compositions…</div>}
            {frame >= 30 && !done && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <span style={{ color: colors.muted }}>Showcase · {Math.round(progress * total)}/{total} frames</span>
                <span style={{ flex: 1, height: 8, borderRadius: 4, background: colors.raised, overflow: 'hidden' }}>
                  <span style={{ display: 'block', width: `${progress * 100}%`, height: '100%', background: gradient }} />
                </span>
              </div>
            )}
            {done && (
              <Enter distance={10}>
                <span style={{ color: colors.green }}>✔ </span>
                Showcase · {total} frames in 6.4s → <span style={{ color: colors.cyan }}>out/Showcase.mp4</span>
              </Enter>
            )}
          </div>
        </Window>
      </Enter>
    </AbsoluteFill>
  );
};

const Outro = () => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 30 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      <Enter><Logo size={96} /></Enter>
      <Wordmark size={96} delay={3} />
    </div>
    <Enter delay={14}>
      <div style={{ display: 'flex', gap: 16, fontSize: 26 }}>
        <span style={{ fontFamily: fonts.mono, padding: '10px 22px', borderRadius: 12, background: colors.raised, boxShadow: `inset 0 0 0 1px ${colors.line}` }}>
          <span style={{ color: colors.pink }}>$ </span>npx freemotion init
        </span>
        <span style={{ padding: '10px 22px', borderRadius: 12, color: colors.muted, boxShadow: `inset 0 0 0 1px ${colors.line}` }}>MIT licensed</span>
      </div>
    </Enter>
  </AbsoluteFill>
);

export const SHOWCASE_DURATION = 300;

export const Showcase = () => (
  <AbsoluteFill>
    <Glow />
    <Series>
      <Series.Sequence durationInFrames={80}><Scene duration={80}><Intro /></Scene></Series.Sequence>
      <Series.Sequence durationInFrames={125}><Scene duration={125}><Code /></Scene></Series.Sequence>
      <Series.Sequence durationInFrames={70}><Scene duration={70}><Render /></Scene></Series.Sequence>
      <Series.Sequence durationInFrames={25}><Scene duration={1000}><Outro /></Scene></Series.Sequence>
    </Series>
  </AbsoluteFill>
);
