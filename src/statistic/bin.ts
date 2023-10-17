import { bisect, ceil, firstOf, floor, group, identity, max, min, tickStep, ticks } from '@/utils';

function bin(values: Array<number | string>, count: number | string = 10, accessor = identity) {
  const minValue = min(values, accessor);
  const maxValue = max(values, accessor);
  const step = tickStep(minValue, maxValue, count);
  const niceMin = floor(minValue, step);
  const niceMax = ceil(maxValue, step);
  const niceStep = tickStep(niceMin, niceMax, count);
  const thresholds = ticks(niceMin, niceMax, count);
  return Array.from(new Set([floor(niceMin, niceStep), ...thresholds, ceil(niceMax, niceStep)]));
}

export function createBinX({
  count = 10,
  channel = 'fill',
  aggreate = (value) => value.length,
}: {
  count?: number | string;
  channel?: string;
  aggreate?: (arr: any) => any;
}) {
  return ({
    index,
    values,
  }: {
    index: Array<number | string>;
    values: Record<string, Array<number | string>>;
  }) => {
    const { x: X, x1, ...rest } = values;
    const keys = Object.keys(rest);
    const thresholds = bin(X, count);
    const n = thresholds.length;
    const groups = group(index, (i) => bisect(thresholds, X[i]) - 1);
    const I = new Array(n - 1).fill(0).map((_, i) => i);
    const filtered = I.filter((i) => groups.has(i));
    return {
      index: filtered,
      values: Object.fromEntries([
        ...keys.map((key) => [
          key,
          I.map((i) => {
            if (!groups.has(i)) return undefined;
            return values[key][firstOf(groups.get(i))];
          }),
        ]),
        [
          channel,
          I.map((i) => {
            if (!groups.has(i)) return 0;
            return aggreate(groups.get(i));
          }),
        ],
        ['x', thresholds.slice(0, n - 1)],
        ['x1', thresholds.slice(1, n)],
      ]),
    };
  };
}
