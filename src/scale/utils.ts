export function normalize(value: number | string, start: number | string, stop: number | string) {
  return (Number(value) - Number(start)) / (Number(stop) - Number(start));
}

export function ticks(min: number | string, max: number | string, count: number | string) {
  const step = tickStep(min, max, count);
  const start = Math.ceil(Number(min) / step);
  const end = Math.floor(Number(max) / step);
  const n = end - start + 1;
  const values = new Array<number>(n);

  for (let i = 0; i < values.length; i++) {
    values[i] = round((start + i) * step);
  }
  return values;
}

// step0 是生成指定数量的刻度的间隔
// step1 是最后生成的刻度的间隔
// 我们希望 step1 满足两个条件：
// 1. step1 = 10 ^ n * b (其中 b=1,2,5)
// 2. step0 和 step1 的误差尽量的小
export function tickStep(min: number | string, max: number | string, count: number | string) {
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  // 获得目标间隔 step0，设 step0 = 10 ^ m
  const step0 = Math.abs(Number(max) - Number(min)) / Math.max(0, Number(count));
  // 获得 step1 的初始值 = 10 ^ n < step0，其中 n 为满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  // 计算 step1 和 step0 的误差，error = 10 ^ m / 10 ^ n = 10 ^ (m - n)
  const error = step0 / step1;
  // 根据当前的误差改变 step1 的值，从而减少误差
  // 1. 当 m - n >= 0.85 = log(e10) 的时候，step1 * 10
  // 可以减少log(10) = 1 的误差
  if (error >= e10) step1 *= 10;
  // 2. 当 0.85 > m - n >= 0.5 = log(e5) 的时候，step1 * 5
  // 可以减少 log(5) = 0.7 的误差
  else if (error >= e5) step1 *= 5;
  // 3. 当 0.5 > m - n >= 0.15 = log(e2) 的时候，step1 * 2
  // 那么可以减少 log(2) = 0.3 的误差
  else if (error >= e2) step1 *= 2;
  // 4. 当 0.15 > m - n > 0 的时候，step1 * 1
  return step1;
}

export function nice(
  domain: [number | string, number | string],
  interval: {
    ceil: (n: number | string) => number;
    floor: (n: number | string) => number;
  },
) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

export function floor(n: number | string, base: number | string) {
  return Number(base) * Math.floor(Number(n) / Number(base));
}

export function ceil(n: number | string, base: number | string) {
  return Number(base) * Math.ceil(Number(n) / Number(base));
}

// 简单解决 js 的精读问题：0.1 + 0.2 !== 0.3
export function round(n: number | string) {
  return Math.round(Number(n) * 1e12) / 1e12;
}

export function equal(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}
