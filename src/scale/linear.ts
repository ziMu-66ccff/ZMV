import { interpolateNumber } from './interpolate';
import { ceil, floor, nice, normalize, tickStep, ticks } from './utils';

export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}: {
  domain: [number | string, number | string];
  range: [any, any];
  interpolate?: (t: number, start: any, stop: any) => any;
}) {
  const scale: {
    (x: number | string): number;
    ticks: (tickCount: number | string) => number[];
    nice: (tickCount: number | string) => void;
  } = (x: number | string) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };
  scale.ticks = (tickCount: number | string) => ticks(d0, d1, tickCount);
  scale.nice = (tickCount: number | string) => {
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      ceil: (x: number | string) => ceil(x, step),
      floor: (x: number | string) => floor(x, step),
    });
  };
  return scale;
}
