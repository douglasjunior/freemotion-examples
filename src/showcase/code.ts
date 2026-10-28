import { colors } from '../theme';


export type Token = readonly [text: string, color: string];

const k = (text: string): Token => [text, colors.pink];
const f = (text: string): Token => [text, colors.cyan];
const n = (text: string): Token => [text, colors.amber];
const t = (text: string): Token => [text, colors.text];
const p = (text: string): Token => [text, colors.muted];

/** The snippet typed in the editor, already split into highlighted tokens. */
export const CODE: readonly (readonly Token[])[] = [
  [k('export const '), f('Ball'), p(' = () => {')],
  [k('  const '), t('frame'), p(' = '), f('useCurrentFrame'), p('();')],
  [k('  const '), t('x'), p(' = '), f('interpolate'), p('('), t('frame'), p(', ['), n('0'), p(', '), n('60'), p('], ['), n('0'), p(', '), n('360'), p('], {')],
  [t('    easing'), p(': '), t('Easing'), p('.'), f('inOut'), p('('), t('Easing'), p('.'), t('cubic'), p('),')],
  [p('  });')],
  [k('  return '), p('<'), f('Circle'), t(' x'), p('={'), t('x'), p('} />;')],
  [p('};')],
];

// Character offsets where each token and each line start; every line ends with one (invisible) newline.
export const TOKEN_STARTS: number[][] = [];
export const LINE_STARTS: number[] = [];
let offset = 0;
for (const line of CODE) {
  LINE_STARTS.push(offset);
  TOKEN_STARTS.push(line.map(([text]) => {
    const start = offset;
    offset += text.length;
    return start;
  }));
  offset += 1;
}
LINE_STARTS.push(offset);

export const CODE_LENGTH = offset;
