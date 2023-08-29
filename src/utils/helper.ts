export function curry(fn: (...args: any[]) => any) {
  const arity = fn.length;
  return function curried(...args: any[]): any {
    const newArgs = args.length === 0 ? [undefined] : args;
    return newArgs.length >= arity ? fn(...newArgs) : curried.bind(null, ...newArgs);
  };
}
