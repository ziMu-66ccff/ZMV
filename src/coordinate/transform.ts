export function transform(
  type: string,
  transformer: (arr: [number | string, number | string]) => [number, number],
) {
  const subTransformer = ([x, y]: [number | string, number | string]) => transformer([x, y]);
  subTransformer.type = () => type;
  return subTransformer;
}

export function translate(tx: number | string = 0, ty: number | string = 0) {
  return transform('translate', ([x, y]: [number | string, number | string]) => [
    Number(x) + Number(tx),
    Number(y) + Number(ty),
  ]);
}

export function scale(sx: number | string, sy: number | string) {
  return transform('scale', ([x, y]: [number | string, number | string]) => [
    Number(sx) * Number(x),
    Number(sy) * Number(y),
  ]);
}

export function reflect() {
  return transform('reflect', scale(-1, -1));
}

export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

export function transpose() {
  return transform('transpose', ([x, y]: [number | string, number | string]) => [
    Number(y),
    Number(x),
  ]);
}

export function polar() {
  return transform('polar', ([theta, radius]: [number | string, number | string]) => [
    Number(radius) * Math.cos(Number(theta)),
    Number(radius) * Math.sin(Number(theta)),
  ]);
}
