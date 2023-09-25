import type { Renderer } from '@/types';
import { area as pathArea, line as pathLine, ring as pathRring } from './d';

export function contour(
  renderer: Renderer,
  { points, ...styles }: { points: Array<[number | string, number | string]> },
) {
  const end = points.length;
  const mid = points.length / 2;
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
  const outerStroke = renderer.path({ d: pathLine(points.slice(0, mid)), ...styles, fill: 'none' });
  const innnerStroke = renderer.path({
    d: pathLine(points.slice(mid, end)),
    ...styles,
    fill: 'none',
  });
  return [innnerStroke, contour, outerStroke];
}

export function ring(
  renderer: Renderer,
  {
    cx,
    cy,
    r1,
    r2,
    ...styles
  }: { cx: number | string; cy: number | string; r1: number | string; r2: number | string },
) {
  const ring = renderer.path({
    d: pathRring([
      [cx, cy],
      [r1, r2],
    ]),
    ...styles,
    stroke: 'none',
  });
  const innerStroke = renderer.circle({ cx, cy, r: r1, ...styles, fill: 'none' });
  const outerStroke = renderer.circle({ cx, cy, r: r2, ...styles, fill: 'none' });
  return [innerStroke, ring, outerStroke];
}
