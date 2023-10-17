export function curry(fn: (...args: any[]) => any) {
  const arity = fn.length;
  return function curried(...args: any[]): any {
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
}

export function identity(x: any) {
  return x;
}

export function compose(...fns: Array<(...args: any[]) => any>) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity);
}

// 简单解决 js 的精读问题：0.1 + 0.2 !== 0.3
export function round(n: number | string) {
  return Math.round(Number(n) * 1e12) / 1e12;
}

export function normalize(value: string | number, start: string | number, stop: string | number) {
  return (Number(value) - Number(start)) / (Number(stop) - Number(start));
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

// 生成以base为底 x 的对数
export function log(x: number | string, base: number | string) {
  return Math.log(Number(x)) / Math.log(Number(base));
}

export function assignDefined(target: Record<string, any>, source: Record<string, any>) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) target[key] = value;
  }
}

export function map(object: Record<string, any>, transform: (...args: any[]) => any = identity) {
  return Object.entries(object).reduce(
    (obj, [key, value]) => {
      obj[key] = transform(value, key);
      return obj;
    },
    {} as Record<string, any>,
  );
}

export function defined(d: any) {
  return d !== undefined && !Number.isNaN(d);
}
