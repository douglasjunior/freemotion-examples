import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'freemotion';
import { useEffect, useState } from 'react';

import { Enter, Glow } from '../components';
import { colors, fonts, gradient } from '../theme';


type Data = {
  readonly title: string;
  readonly subtitle: string;
  readonly points: readonly { readonly label: string; readonly value: number }[];
};

/**
 * Fetches the chart data before the first frame is captured: `delayRender()` holds the renderer
 * until `continueRender()` is called, so no frame is drawn with an empty chart.
 */
function useData(path: string): Data | null {
  const [data, setData] = useState<Data | null>(null);
  const [handle] = useState(() => delayRender(`Loading ${path}`));
  useEffect(() => {
    fetch(staticFile(path))
      .then(response => response.json() as Promise<Data>)
      .then((json) => {
        setData(json);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle, path]);
  return data;
}

const formatter = new Intl.NumberFormat('en-US');

const Bar = ({ label, value, max, index, highlight }: {
  readonly label: string;
  readonly value: number;
  readonly max: number;
  readonly index: number;
  readonly highlight: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = spring({ frame, fps, delay: 20 + index * 6, config: { damping: 18, stiffness: 90 } });
  const count = interpolate(frame, [20 + index * 6, 50 + index * 6], [0, value], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const height = (value / max) * 100 * grow;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative', borderBottom: `2px solid ${colors.line}` }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: `${height}%`,
            borderRadius: '14px 14px 4px 4px',
            background: highlight ? gradient : colors.raised,
            boxShadow: highlight ? `0 0 50px ${colors.pink}55` : `inset 0 0 0 1px ${colors.line}`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: `calc(${height}% + 12px)`,
            textAlign: 'center',
            fontFamily: fonts.mono,
            fontSize: 21,
            color: highlight ? colors.text : colors.muted,
            opacity: Math.min(1, grow * 2),
          }}
        >
          {formatter.format(Math.round(count))}
        </span>
      </div>
      <span style={{ marginTop: 16, textAlign: 'center', fontSize: 24, color: colors.muted }}>{label}</span>
    </div>
  );
};

export const DataStory = ({ source }: { readonly source: string }) => {
  const data = useData(source);
  if (!data) {
    return <Glow />;
  }
  const max = Math.max(...data.points.map(point => point.value));
  const growth = data.points.at(-1)!.value / data.points[0]!.value;
  return (
    <AbsoluteFill style={{ fontFamily: fonts.sans, color: colors.text }}>
      <Glow seed={200} />
      <AbsoluteFill style={{ padding: '96px 90px 80px' }}>
        <Enter>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>{data.title}</div>
        </Enter>
        <Enter delay={6}>
          <div style={{ fontSize: 28, color: colors.muted, marginTop: 10 }}>{data.subtitle}</div>
        </Enter>
        <Enter delay={70} style={{ marginTop: 34 }}>
          <span style={{ fontSize: 30, fontWeight: 650, padding: '10px 22px', borderRadius: 999, background: `${colors.green}1f`, color: colors.green }}>
            ▲ {growth.toFixed(1)}× since {data.points[0]!.label}
          </span>
        </Enter>
        <div style={{ flex: 1, display: 'flex', gap: 22, marginTop: 60 }}>
          {data.points.map((point, index) => (
            <Bar key={point.label} {...point} max={max} index={index} highlight={point.value === max} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
