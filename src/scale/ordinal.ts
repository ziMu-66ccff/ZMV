import { equal } from './utils';

export function createOrdinal({ domain, range }: { domain: any[]; range: any[] }) {
  return (x: any) => {
    const index = domain.findIndex((d) => equal(d, x));
    return range[index % range.length];
  };
}
