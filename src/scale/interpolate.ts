export function interpolateNumber(t: number, start: number | string, stop: number | string) {
  return Number(start) * (1 - t) + Number(stop) * t;
}
export function interpolateColor(
  t: number,
  start: Array<number | string>,
  stop: Array<number | string>,
) {
  const r = interpolateNumber(t, start[0], stop[0]);
  const g = interpolateNumber(t, start[1], stop[1]);
  const b = interpolateNumber(t, start[2], stop[2]);
  if (start[3] && stop[3]) {
    const a = interpolateNumber(t, start[3], stop[3]);
    return `rgb(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
