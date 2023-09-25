import { angleBetween, dist, sub } from '@/utils/vector';

export function line([p0, ...points]: Array<[number | string, number | string]>) {
  return [['M', ...p0], ...points.map((point) => ['L', ...point])];
}

export function area(points: Array<[number | string, number | string]>) {
  return [...line(points), ['Z']];
}

export function sector([c, p0, p1, p2, p3]: Array<[number | string, number | string]>) {
  const r = dist(p0, c);
  const r1 = dist(p2, c);
  const a = angleBetween(sub(p0, c), sub(p1, c));
  const l = a > Math.PI ? 1 : 0;
  const l1 = a > Math.PI ? 1 : 0;
  return [
    ['M', p0[0], p0[1]],
    ['A', r, r, 0, l, 1, p1[0], p1[1]],
    ['L', p2[0], p2[1]],
    ['A', r1, r1, 0, l1, 0, p3[0], p3[1]],
    ['Z'],
  ];
}

export function ring([c, [r1, r2]]: Array<[number | string, number | string]>) {
  const [cx, cy] = c;
  const p0 = [cx, Number(cy) - Number(r2)];
  const p1 = [cx, Number(cy) + Number(r2)];
  const p2 = [cx, Number(cy) + Number(r1)];
  const p3 = [cx, Number(cy) - Number(r1)];
  return [
    ...sector([c, p0, p1, p2, p3] as Array<[number | string, number | string]>),
    ...sector([c, p1, p0, p3, p2] as Array<[number | string, number | string]>),
  ];
}
