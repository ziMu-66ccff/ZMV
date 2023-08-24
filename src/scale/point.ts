import { createBand } from './band';

export function createPoint({
  domain,
  range,
}: {
  domain: any[];
  range: [number | string, number | string];
}) {
  return createBand({ domain, range, padding: 1 });
}
