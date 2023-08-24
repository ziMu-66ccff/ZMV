import { createLinear } from '.';
import { log, nice, ticks } from './utils';

export function createLog({
  domain,
  base = Math.E,
  range,
}: {
  domain: [number | string, number | string];
  range: [number | string, number | string];
  base?: number;
}) {
  const transform = (x: number | string) => Math.log(Number(x));
  let linear = createLinear({
    domain: domain.map((d) => transform(d)) as [number, number],
    range,
  });
  const scale = (x: number | string) => linear(transform(x));

  scale.ticks = (tickCount: number | string = 5) => {
    const [min, max] = domain.map((d) => log(d, base));
    return ticks(min, max, tickCount).map((x) => base ** x);
  };

  scale.nice = () => {
    domain = nice(domain, {
      ceil: (x: number | string) => base ** Math.ceil(log(x, base)),
      floor: (x: number | string) => base ** Math.floor(log(x, base)),
    }) as [number, number];
    linear = createLinear({ domain: domain.map(transform) as [number, number], range });
  };
  return scale;
}
