import { createThreshold } from './threshold';

export function createQuantize({
  domain: [d0, d1],
  range,
}: {
  domain: [number | string, number | string];
  range: string[];
}) {
  const n = range.length - 1;
  const step = (Number(d1) - Number(d0)) / range.length;
  const quantizeDomain = new Array(n).fill(0).map((value, index) => step * (index + 1));
  return createThreshold({ domain: quantizeDomain, range });
}
