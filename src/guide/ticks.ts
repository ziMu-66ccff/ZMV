import type { Renderer } from '@/types';
import { angle, degree, sub, unique } from '@/utils/vector';

export function ticksBottom(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  {
    tickLength,
    fontSize,
  }: { tickLength: number | string; fontSize: number | string; [key: string]: any },
) {
  for (const { x, y, text } of ticks) {
    const x2 = x;
    const y2 = Number(y) + Number(tickLength);
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' });
    renderer.text({ text, fontSize, x, y: y2, textAnchor: 'middle', dy: '1em', class: 'text' });
  }
}

export function ticksTop(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  {
    tickLength,
    fontSize,
  }: { tickLength: number | string; fontSize: number | string; [key: string]: any },
) {
  for (const { x, y, text } of ticks) {
    const x2 = x;
    const y2 = Number(y) - Number(tickLength);
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' });
    renderer.text({ text, fontSize, x, y: y2, textAnchor: 'middle', dy: '-0.3em', class: 'text' });
  }
}

export function ticksLeft(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  {
    tickLength,
    fontSize,
  }: { tickLength: number | string; fontSize: number | string; [key: string]: any },
) {
  for (const { x, y, text } of ticks) {
    const x2 = Number(x) - Number(tickLength);
    const y2 = y;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' });
    renderer.text({
      text,
      fontSize,
      x: x2,
      y,
      textAnchor: 'end',
      dy: '0.5em',
      dx: '-0.5em',
      class: 'text',
    });
  }
}

export function tickCircular(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  {
    tickLength,
    fontSize,
    center,
  }: {
    tickLength: number | string;
    fontSize: number | string;
    center: [number | string, number | string];
    [key: string]: any;
  },
) {
  for (const { x, y, text } of unique(
    ticks,
    (d) => d.x,
    (d) => d.y,
  )) {
    const { tickRotation, textRotation } = rotationOf(center, [x, y]);
    const [x2, y2] = [0, tickLength];
    const dy = textRotation === 0 ? '1.2em' : '-0.5em';

    renderer.save();
    renderer.translate(x, y);
    renderer.rotate(degree(tickRotation));

    renderer.line({
      x1: 0,
      y1: 0,
      x2,
      y2,
      stroke: 'currentColor',
      fill: 'currentColor',
      class: 'tick',
    });

    renderer.save();
    renderer.translate(x2, y2);
    renderer.rotate(degree(textRotation));

    renderer.text({
      text,
      x: 0,
      y: 0,
      textAnchor: 'middle',
      fontSize,
      dy,
      fill: 'currentColor',
      class: 'text',
    });
    renderer.restore();
    renderer.restore();
  }
}

export function rotationOf(
  center: [number | string, number | string],
  [x, y]: [number | string, number | string],
) {
  const tickRotation = angle(sub([x, y], center));
  const textRotation = tickRotation < 0 ? Math.PI : 0;
  return { tickRotation: tickRotation - Math.PI / 2, textRotation };
}
