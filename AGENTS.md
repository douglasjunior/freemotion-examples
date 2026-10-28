# AGENTS: freemotion-examples

Example compositions and a scroll-driven page for [freemotion](https://github.com/douglasjunior/freemotion). Everything in the repository is written in **English**.

## Structure

```text
src/
  compositions.tsx    # Every composition (default export) plus `showcase`, reused by the web page
  theme.ts            # Colors, fonts (bundled with @fontsource) and the window style
  components.tsx      # Shared pieces: Glow, Logo, Window, Enter, Cursor
  showcase/           # README video: Series of scenes, typed code, live preview, terminal
  data-story/         # Bar chart fed by public/data.json through delayRender()
  hello/              # Same component as freemotion's init template
  banner/             # README banner: an intro whose last frame is the still
web/                  # Vite app: <ScrollPlayer> plays the showcase as the page scrolls
assets/               # Images used by the READMEs (regenerate with `npm run readme-assets`)
```

## Conventions

- Compositions derive everything from `useCurrentFrame()`: no timers, CSS animations or `Math.random()`.
- Fonts come from `@fontsource-variable/*` so renders look the same on every machine.
- When a composition changes, regenerate the README images it appears in and copy `assets/banner.png` and `assets/showcase.gif` to freemotion's `.github/assets/`.
- `freemotion` comes from npm. To try unreleased changes, run `npm install ../freemotion` temporarily and revert before committing.
- Run `npm run ts` and `npm run lint` before committing. Commit messages follow Conventional Commits in English.
