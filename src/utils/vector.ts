export function sub(
  [x1, y1]: [number | string, number | string],
  [x0, y0]: [number | string, number | string],
): [number | string, number | string] {
  return [Number(x1) - Number(x0), Number(y1) - Number(y0)];
}

export function closeTo(x: number | string, y: number | string, tol = 1e-5) {
  return Math.abs(Number(x) - Number(y)) < tol;
}

export function equal(
  [x0, y0]: [number | string, number | string],
  [x1, y1]: [number | string, number | string],
) {
  return closeTo(x0, x1) && closeTo(y0, y1);
}

export function dist(
  [x0, y0]: [number | string, number | string],
  [x1 = 0, y1 = 0]: [number | string, number | string],
) {
  return Math.sqrt((Number(x0) - Number(x1)) ** 2 + (Number(y0) - Number(y1)) ** 2);
}

export function angle([x, y]: [number | string, number | string]) {
  const theta = Math.atan2(Number(y), Number(x));
  return theta;
}

export function angleBetween(
  v0: [number | string, number | string],
  v1: [number | string, number | string],
) {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a1 > a0) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
}

export function degree(radian: number | string) {
  return (Number(radian) * 180) / Math.PI;
}

export function unique(
  points: Array<{ x: number | string; y: number | string; text: string }>,
  x = (d: { x: number | string; y: number | string; text: string }) => d.x,
  y = (d: { x: number | string; y: number | string; text: string }) => d.y,
): Array<{ x: number | string; y: number | string; text: string }> {
  const overloap = (
    a: { x: number | string; y: number | string; text: string },
    b: { x: number | string; y: number | string; text: string },
  ) => closeTo(x(a), x(b)) && closeTo(y(a), y(b));
  return points.filter((d, index) => points.findIndex((p) => overloap(p, d)) === index);
}
