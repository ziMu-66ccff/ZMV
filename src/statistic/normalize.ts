import { group } from '@/utils';

export function createNormalizeY() {
  return ({
    index,
    values,
  }: {
    index: Array<number | string>;
    values: Record<string, Array<number | string>>;
  }) => {
    const { x: X } = values;
    const series = Array.from(group(index, (i) => X[i]).values());
    const newValues = Object.fromEntries(
      ['y', 'y1'].filter((key) => values[key]).map((key) => [key, new Array(index.length)]),
    );
    for (const I of series) {
      const Y = I.flatMap((i: number) => Object.keys(newValues).map((key) => values[key][i]));
      const n = Math.max(...Y);
      for (const i of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i] = Number(values[key][i]) / n;
        }
      }
    }
    return { index, values: { ...values, ...newValues } };
  };
}
