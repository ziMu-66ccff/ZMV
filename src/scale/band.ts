import { createOrdinal } from './ordinal';
import { band } from './utils';

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
  scale.bandWidth = bandWidth;
  scale.step = step;

  return scale;
}
