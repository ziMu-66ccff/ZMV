export function interpolateNumber(t: number, start: number | string, stop: number | string) {
  return Number(start) * (1 - t) + Number(stop) * t;
}

export function interpolateColor(t: any, d0: any, d1: any) {
  const [r0, g0, b0] = hexToRgb(d0);
  const [r1, g1, b1] = hexToRgb(d1);
  const r = interpolateNumber(t, r0, r1);
  const g = interpolateNumber(t, g0, g1);
  const b = interpolateNumber(t, b0, b1);
  return rgbToHex(parseInt(r as any), parseInt(g as any), parseInt(b as any));
}

function hexToRgb(hex: any) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
  }
  return rgb;
}

function rgbToHex(r: any, g: any, b: any) {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`;
}
