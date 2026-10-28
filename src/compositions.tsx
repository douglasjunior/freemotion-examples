import { defineComposition } from 'freemotion';

import { Banner, BANNER_DURATION } from './banner/Banner';
import { DataStory } from './data-story/DataStory';
import { HelloWorld, type HelloWorldProps } from './hello/HelloWorld';
import { Showcase, SHOWCASE_DURATION } from './showcase/Showcase';


export const showcase = defineComposition({
  id: 'Showcase',
  folder: 'README',
  component: Showcase,
  fps: 30,
  width: 1280,
  height: 720,
  durationInFrames: SHOWCASE_DURATION,
});

export default [
  showcase,
  defineComposition({
    id: 'Banner',
    folder: 'README',
    component: Banner,
    fps: 30,
    width: 1280,
    height: 640,
    durationInFrames: BANNER_DURATION,
  }),
  defineComposition<HelloWorldProps>({
    id: 'HelloWorld',
    folder: 'Basics',
    component: HelloWorld,
    defaultProps: { title: 'Hello, freemotion', subtitle: 'Videos made with React.' },
    fps: 30,
    width: 1920,
    height: 1080,
    durationInFrames: 120,
  }),
  defineComposition({
    id: 'DataStory',
    folder: 'Basics',
    component: DataStory,
    defaultProps: { source: 'data.json' },
    fps: 30,
    width: 1080,
    height: 1080,
    durationInFrames: 150,
  }),
];
