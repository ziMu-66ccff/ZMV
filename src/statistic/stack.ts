import { group } from '@/utils';

export function createStackY() {
  return ({
    index,
    values,
  }: {
    index: Array<number | string>;
    values: Record<string, Array<number | string>>;
  }) => {
    const { x: X, y: Y } = values;
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newY = new Array(index.length);
    const newY1 = new Array(index.length);
    for (const I of series) {
      for (let py = 0, i = 0; i < I.length; py = newY[I[i]], i++) {
        const index = I[i];
        newY1[index] = py;
        newY[index] = Number(py) + Number(Y[index]);
      }
    }
    return { index, values: { ...values, y1: newY1, y: newY } };
  };
}
