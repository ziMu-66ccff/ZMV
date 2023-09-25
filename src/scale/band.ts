import { createOrdinal } from './ordinal';

export function createBand({
  domain,
  range,
  padding,
}: {
  domain: any[];
  range: [number | string, number | string];
  padding: number | string;
}) {
  const { bandWidth, step, bandRange } = band({ domain, range, padding });
  const ordinal = createOrdinal({ domain, range: bandRange });
  const scale = (x: any) => ordinal(x);
  scale.bandWidth = () => bandWidth;
  scale.step = () => step;

  return scale;
}

export function band({
  domain,
  range,
  padding,
}: {
  domain: any[];
  range: [number | string, number | string];
  padding: number | string;
}) {
  const n = domain.length;
  const [r0, r1] = range;
  // 这个padding是基于step的比例
  const step = (Number(r1) - Number(r0)) / (n + Number(padding));
  const bandWidth = step * (1 - Number(padding));
  const interval = step - bandWidth;
  const bandRange = new Array(n).fill(0).map((_, i) => Number(r0) + interval + i * step);

  return {
    bandWidth,
    step,
    bandRange,
  };
}
