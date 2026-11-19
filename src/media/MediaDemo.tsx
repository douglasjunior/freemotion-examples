import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, Video } from 'freemotion';

import { colors, fonts } from '../theme';


export const MEDIA_DEMO_DURATION = 180;

export const MediaDemo = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [162, 179], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <>
      <Video
        src={staticFile('audio-video-demo.mp4')}
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Audio
        src={staticFile('audio-video-demo.mp3')}
        volume={audioFrame => interpolate(audioFrame, [0, 15, 165, 180], [0, 0.6, 0.6, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(90deg, rgba(11, 11, 18, 0.88), rgba(11, 11, 18, 0.08) 80%), linear-gradient(0deg, rgba(11, 11, 18, 0.8), transparent 35%)',
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'space-between',
          padding: 80,
          boxSizing: 'border-box',
          color: colors.text,
          fontFamily: fonts.sans,
          opacity: fadeIn * fadeOut,
        }}
      >
        <div>
          <div style={{ color: colors.cyan, fontFamily: fonts.mono, fontSize: 20, letterSpacing: 4 }}>
            FREEMOTION · MEDIA
          </div>
          <div style={{ marginTop: 24, fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>
            Sound in sync.
          </div>
          <div style={{ marginTop: 16, color: colors.muted, fontSize: 28 }}>
            One composition. Two synchronized tracks.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div style={{ display: 'grid', gap: 12, fontFamily: fonts.mono, fontSize: 18 }}>
            <span>VIDEO · audio-video-demo.mp4</span>
            <span style={{ color: colors.amber }}>AUDIO · audio-video-demo.mp3</span>
          </div>
          <div style={{ color: colors.muted, fontFamily: fonts.mono, fontSize: 18 }}>
            00:06 · 30 FPS
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};
