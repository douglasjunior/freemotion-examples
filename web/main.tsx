import { ScrollPlayer } from 'freemotion';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Logo } from '../src/components';
import { showcase } from '../src/compositions';

import './style.css';


const GITHUB = 'https://github.com/douglasjunior/freemotion';

const QUICK_START = `npx freemotion init my-video
cd my-video
npm install
npm run studio     # preview with hot reload
npm run render     # out/HelloWorld.mp4`;

const SNIPPET = `import { ScrollPlayer } from 'freemotion';

<ScrollPlayer composition={showcase} scrollLength="500vh" />`;

const REASONS = [
  { icon: '⚛️', title: 'It\'s just React', text: 'Components, props, hooks, CSS, SVG, fonts and any npm package. If it renders in a browser, it renders in your video.' },
  { icon: '🎞️', title: 'Frame-perfect', text: 'Everything derives from useCurrentFrame(). Any frame can be drawn on its own, so renders are deterministic and run in parallel.' },
  { icon: '⚡', title: 'Fast', text: 'Several Chromium tabs capture frames at once and stream them straight into ffmpeg. The video above renders in about 5 seconds.' },
  { icon: '🔥', title: 'A live studio', text: 'Scrub the timeline, step frame by frame, switch compositions and see every edit instantly with hot reload.' },
  { icon: '🌐', title: 'Plays on the web', text: '<Player> runs any composition inside a React page, and <ScrollPlayer> turns the page scroll into the timeline.' },
  { icon: '🆓', title: 'MIT, all of it', text: 'The studio, the renderer and the player are free for any use, at any company size. No tiers, no seats, no render fees.' },
];

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
        <Logo size={64} />
        <span className="eyebrow">freemotion</span>
      </div>
      <h1>Make videos with React.</h1>
      <p>Preview live. Render to MP4. Play on the web. Free and open source.</p>
      <nav className="links">
        <a className="button" href={GITHUB}>Get started →</a>
        <code className="install">npx freemotion init my-video</code>
      </nav>
      <span className="scroll-cue">Scroll ↓ the video below plays as you scroll</span>
    </header>

    <ScrollStory />

    <section className="explain">
      <h2>You just watched a freemotion video.</h2>
      <p>
        The composition you scrolled through is a React component. The same code renders it to MP4 on the command
        line and plays it here, where <code>&lt;ScrollPlayer&gt;</code> turns the scroll position into the frame.
      </p>
      <pre><code>{SNIPPET}</code></pre>
    </section>

    <section className="reasons">
      <h2>Why freemotion?</h2>
      <ul className="cards">
        {REASONS.map(reason => (
          <li key={reason.title}>
            <span className="icon">{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </li>
        ))}
      </ul>
    </section>

    <section className="explain start">
      <h2>Get started in a minute.</h2>
      <p>You only need Node.js 20.19+. The new project comes with two compositions and a scroll-driven page like this one.</p>
      <pre><code>{QUICK_START}</code></pre>
      <nav className="links">
        <a className="button" href={GITHUB}>Get started on GitHub →</a>
        <a className="button secondary" href="https://www.npmjs.com/package/freemotion">npm</a>
      </nav>
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
