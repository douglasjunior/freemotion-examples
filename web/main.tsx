import { ScrollPlayer } from 'freemotion';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Logo } from '../src/components';
import { showcase } from '../src/compositions';

import './style.css';


const GITHUB = 'https://github.com/douglasjunior/freemotion';
const NPM = 'https://www.npmjs.com/package/freemotion';

const QUICK_START = `npx freemotion init my-video
cd my-video
npm install
npm run studio     # preview with hot reload
npm run render     # out/HelloWorld.mp4`;

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
      <div className="brand">
        <Logo size={56} />
        <span className="eyebrow">freemotion</span>
      </div>
      <h1>Make videos with React.</h1>
      <p>
        Write videos as React components. Every frame is a function of time, so you can <b>preview</b> them live
        in the studio, <b>render</b> them to MP4, WebM, GIF or PNG, and <b>play</b> them inside any web page, even
        driven by the scroll.
      </p>
      <ul className="pitch">
        <li><b>It's just React.</b> Components, props, hooks, CSS, SVG, fonts and any npm package.</li>
        <li><b>Frame-perfect.</b> Everything derives from <code>useCurrentFrame()</code>, so renders are deterministic and run in parallel.</li>
        <li><b>MIT, all of it.</b> The studio, the renderer and the player are free for any use. No tiers, no seats, no render fees.</li>
      </ul>
      <pre className="quick-start"><code>{QUICK_START}</code></pre>
      <nav className="links">
        <a className="button" href={GITHUB}>GitHub</a>
        <a className="button secondary" href={NPM}>npm</a>
      </nav>
      <span className="scroll-cue">Scroll ↓ to play the video below with your scroll</span>
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
      Made with <a href={GITHUB}>freemotion</a>. This page is the <code>web/</code> example of{' '}
      <a href="https://github.com/douglasjunior/freemotion-examples">freemotion-examples</a>.
    </footer>
  </main>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
