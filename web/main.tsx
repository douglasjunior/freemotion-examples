import { ScrollPlayer } from 'freemotion';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { showcase } from '../src/compositions';

import './style.css';


const SNIPPET = `import { ScrollPlayer } from 'freemotion';

<ScrollPlayer composition={showcase} scrollLength="500vh" />`;

const ScrollStory = () => {
  const [frame, setFrame] = useState(0);
  const last = showcase.durationInFrames - 1;
  return (
    <ScrollPlayer
      composition={showcase}
      scrollLength="500vh"
      onFrameChange={setFrame}
      width="var(--stage-width)"
      stickyStyle={{ gap: 14, padding: '0 20px' }}
      playerStyle={{ borderRadius: 18, boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55), 0 0 0 1px var(--line)' }}
    >
      <div className="progress"><span style={{ transform: `scaleX(${frame / last})` }} /></div>
      <p className="hint">
        frame <b>{frame}</b> / {last}
      </p>
    </ScrollPlayer>
  );
};

const Page = () => (
  <main>
    <header className="hero">
      <span className="eyebrow">freemotion · Player</span>
      <h1>The video plays as you scroll.</h1>
      <p>
        The same composition that renders to MP4 runs live in the page. Here the scroll position picks the frame,
        so every wheel step moves the animation forward or back.
      </p>
      <span className="scroll-cue">Scroll ↓</span>
    </header>

    <ScrollStory />

    <section className="explain">
      <h2>How it works</h2>
      <p>
        <code>&lt;ScrollPlayer&gt;</code> renders a tall section with the player stuck to the viewport and turns the
        scroll position inside the section into a frame. When the section ends, the video scrolls away with the page.
      </p>
      <pre><code>{SNIPPET}</code></pre>
      <p>
        For a custom layout, <code>useScrollFrame()</code> gives you the frame and you place the{' '}
        <code>&lt;Player&gt;</code> yourself. The composition lives in <code>src/showcase</code>.
      </p>
    </section>

    <footer>
      Made with <a href="https://github.com/douglasjunior/freemotion">freemotion</a>.
    </footer>
  </main>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
