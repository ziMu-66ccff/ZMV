import { group } from '@/utils';

export function createSymmetryY() {
  return ({
    index,
    values,
  }: {
    index: Array<number | string>;
    values: Record<string, Array<number | string>>;
  }) => {
    const { x: X } = values;
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newValues = Object.fromEntries(
      ['y', 'y1'].filter((key) => values[key]).map((key) => [key, new Array(index.length)]),
    );

    const M = new Array(series.length);
    for (const [i, I] of Object.entries(series)) {
      const Y = I.flatMap((i: number) => Object.keys(newValues).map((key) => values[key][i]));
      const min = Math.min(...Y);
      const max = Math.max(...Y);
      M[Number(i)] = (min + max) / 2;
    }

    const maxM = Math.max(...M);
    for (const [i, I] of Object.entries(series)) {
      const offset = maxM - M[Number(i)];
      for (const i of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i] = Number(values[key][i]) + offset;
        }
      }
    }

    return {
      index,
      values: {
        ...values,
        ...newValues,
      },
    };
  };
}
