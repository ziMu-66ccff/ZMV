import { identity, round } from '.';

export function group(arr: any[], key: (d: any) => any = (d) => d) {
  const keyGroups = new Map();
  for (const item of arr) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
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
  // 这里简单解释一下使用 Math.sqrt(50)，Math.sqrt(10) 以及 Math.sqrt(2) 作为误差标准的原因（这里只是推断，仅供参考）。

  // 通过下面的注释我们可以看出，为了让 step0 和 step1 之间误差尽量的少，就是让 Math.abs(m - n) 尽量为 0。因为我们希望间隔是以 1或者2或者5乘上10的 n 次方数，所以只能通过乘 2，5或者10来减少误差。

  // 乘10 就相当于乘 10 **  log10 可以减少 log10 的误差(这里的误差就是下面 error = 10 ^ (m -n) 中的 m - n) ，
  // 乘5 就相当于乘 10 ** log5 可以减少 log5 的误差(这里的误差就是下面 error = 10 ^ (m -n) 中的 m - n)
  // 乘2 就相当于乘 10 ** log2 可以减少 log2 的误差(这里的误差就是下面 error = 10 ^ (m -n) 中的 m - n)
  // 我们用数列 0，log2，log5 和 log10 两两之间的平均数来作为选择需要改变的误差的标准。也就是:
  // (0 + log2) / 2 = log(Math.sqrt(2)) 所以 （m - n）的需要改变误差的标准就是log(Math.sqrt(2)) 又因为误差error = 10 ^ (m -n) 所以error的需要改变误差的标准就是 10 ^ log(Math.sqrt(2)) = Math.sqrt(2)
  // (log2 + log5) / 2 = log(Math.sqrt(2 * 5)) 所以 （m - n）的需要改变误差的标准就是log(Math.sqrt(2 * 5)) 又因为误差error = 10 ^ (m -n) 所以error的需要改变误差的标准就是 10 ^ log(Math.sqrt(2 * 5)) = Math.sqrt(10)
  // (log5 + log10) / 2 = log(Math.sqrt(5 * 10)) 所以 （m - n）的需要改变误差的标准就是log(Math.sqrt(5 * 10)) 又因为误差error = 10 ^ (m -n) 所以error的需要改变误差的标准就是 10 ^ log(Math.sqrt(5 * 10)) = Math.sqrt(50)
  // 即 e2 = Math.sqrt(2), e5 = Math.sqrt(10) 和 e10 = Math.sqrt(50)
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  // 获得目标间隔 step0，设 step0 = 10 ^ m
  const step0 = Math.abs(Number(max) - Number(min)) / Math.max(0, Number(count));
  // 获得 step1 的初始值 = 10 ^ n < step0，其中 n 为满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log10(step0));
  // 计算 step1 和 step0 的误差，error = 10 ^ m / 10 ^ n = 10 ^ (m - n)
  const error = step0 / step1;
  // 根据当前的误差改变 step1 的值，从而减少误差
  // 1. 当 error = 10 ^ (m - n) > e10 = 10 ^ log(e10)的时候 也就意味着 m - n >= 0.85 = log(e10)
  // step1 * 10可以减少log(10) = 1 的误差（这里的误差指的是 m - n的误差 也就是说实际上减少的是 10 ^ 1的误差）
  if (error >= e10) step1 *= 10;
  // 2. 当 e10 = 10 ^ log(e10) > error = 10 ^ (m - n) > e5 = 10 ^ log(e5)的时候 也就意味着 log(e10) = 0.85 > m - n >= 0.5 = log(e5)
  // step1 * 5可以减少 log(5) = 0.7 的误差（这里的误差指的是 m - n的误差 也就是说实际上减少的是 10 ^ 0.7的误差）
  else if (error >= e5) step1 *= 5;
  // 3. 当 e5 = 10 ^ log(e5) > error = 10 ^ (m - n) > e2 = 10 ^ log(e2)的时候 也就意味着  log(e5) = 0.5 > m - n >= 0.15 = log(e2)
  // step1 * 2可以减少 log(2) = 0.3 的误差（这里的误差指的是 m - n的误差 也就是说实际上减少的是 10 ^ 0.3的误差）
  else if (error >= e2) step1 *= 2;
  // 4. 当 e2 = 10 ^ log(e2) > error = 10 ^ (m - n) > 0的时候 0.15 > m - n > 0 的时候，step1 * 1
  return step1;
}

export function lastOf(arr: any[]) {
  return arr[arr.length - 1];
}

export function firstOf(arr: any[]) {
  return arr[0];
}

export function bisect(array: any[], x: any, i = 0, j = array.length, accessor = identity) {
  while (i < j) {
    const mid = (i + j) >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}

export function min(arr: any[], accessor: (arr: any) => any) {
  return Math.min(...arr.map(accessor));
}

export function max(arr: any[], accessor: (arr: any) => any) {
  return Math.max(...arr.map(accessor));
}
