export function curry(fn: (...args: any[]) => any) {
  const arity = fn.length;
  return function curried(...args: any[]): any {
    const newArgs = args.length === 0 ? [undefined] : args;
    return newArgs.length >= arity ? fn(...newArgs) : curried.bind(null, ...newArgs);
  };
}

export function identity(x: any) {
  return x;
}

export function compose(...fns: Array<(...args: any[]) => any>) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity);
}
