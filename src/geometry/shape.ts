import type { Coordinate, Renderer } from '@/types';
import { line as linePath, area as pathArea, sector } from './d';
import { contour, ring } from './primitive';
import { dist, equal, sub } from '@/utils/vector';

export function circle(
  renderer: Renderer,
  coordinate: Coordinate,
  {
    cx,
    cy,
    r,
    ...styles
  }: {
    cx: number | string;
    cy: number | string;
    r: number | string;
  },
) {
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
}

export function text(
  renderer: Renderer,
  coordinate: Coordinate,
  {
    x,
    y,
    rotate,
    text,
    fontSize,
    fontWeight,
    ...styles
  }: {
    x: number | string;
    y: number | string;
    rotate: number | string;
    text: string | number;
    fontSize: number | string;
    fontWeight: number | string;
  },
) {
  const [px, py] = coordinate([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const textElement = renderer.text({
    text: text.toString(),
    x: 0,
    y: 0,
    fontSize,
    fontWeight,
    ...styles,
  });
  renderer.restore();
  return textElement;
}

export function link(
  renderer: Renderer,
  coordinate: Coordinate,
  {
    x1,
    y1,
    x2,
    y2,
    ...styles
  }: { x1: number | string; y1: number | string; x2: number | string; y2: number | string },
) {
  const [p1, p2] = [
    [x1, y1],
    [x2, y2],
  ].map(coordinate);
  return renderer.line({ x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1], ...styles });
}

export function line(
  renderer: Renderer,
  coordinate: Coordinate,
  {
    X,
    Y,
    I: I0,
    fill,
    ...styles
  }: { X: Array<number | string>; Y: Array<number | string>; I: number[]; fill: string },
) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = I.map((i) => coordinate([X[i], Y[i]]));
  const d = linePath(points);
  return renderer.path({ d, fill, ...styles });
}

export function area(
  renderer: Renderer,
  coordinate: Coordinate,
  {
    X1,
    Y1,
    X2,
    Y2,
    I: I0,
    ...styles
  }: {
    X1: Array<number | string>;
    Y1: Array<number | string>;
    X2: Array<number | string>;
    Y2: Array<number | string>;
    I: number[];
  },
) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = [
    ...I.map((i) => coordinate([X1[i], Y1[i]])),
    ...I.map((i) => coordinate([X2[i], Y2[i]])).reverse(),
  ];
  if (coordinate.isPolar()) return contour(renderer, { points, ...styles });
  return renderer.path({ d: pathArea(points), ...styles });
}

export function rect(
  renderer: Renderer,
  coordinate: Coordinate,
  {
    x1,
    y1,
    x2,
    y2,
    ...styles
  }: {
    x1: number | string;
    y1: number | string;
    x2: number | string;
    y2: number | string;
  },
) {
  const v0 = [x1, y1];
  const v1 = [x2, y1];
  const v2 = [x2, y2];
  const v3 = [x1, y2];

  const vs = coordinate.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  const ps = vs.map(coordinate);
  const [p0, p1, p2, p3] = ps;

  if (!coordinate.isPolar()) {
    const [width, height] = sub(p2, p0);
    const [x, y] = p0;
    return renderer.rect({ x, y, width, height, ...styles });
  }

  const center = coordinate.center();
  const [cx, cy] = center;
  if (!(equal(p0, p1) && equal(p2, p3))) {
    return renderer.path({ d: sector([center, ...ps]), ...styles });
  }

  const r1 = dist(p2, center as [number | string, number | string]);
  const r2 = dist(p0, center as [number | string, number | string]);

  return ring(renderer, { cx, cy, r1, r2, ...styles });
}
