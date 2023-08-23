import { createLinear } from './linear';

export function createTime({
  domain,
  range,
  interpolate,
}: {
  domain: [Date, Date];
  range: [number | string, number | string];
  interpolate?: (t: number, start: any, stop: any) => any;
}) {
  const transform = (date: Date) => date.getTime();
  const transformDomain = domain.map((date) => transform(date));
  const linear = createLinear({ domain: transformDomain as [number, number], range, interpolate });
  const scale: {
    (date: Date): number;
    ticks: (tickCount: number | string) => Date[];
    nice: (tickCount: number | string) => void;
  } = (date: Date) => linear(transform(date));
  scale.ticks = (tickCount: number | string) =>
    linear.ticks(tickCount).map((tick) => new Date(tick));
  scale.nice = (tickCount: number | string) => linear.nice(tickCount);
  return scale;
}
