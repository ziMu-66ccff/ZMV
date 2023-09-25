export function createOrdinal({ domain, range }: { domain: any[]; range: any[] }) {
  const key = JSON.stringify;
  const indexMap = new Map(domain.map((d, i) => [key(d), i]));
  return (x: any) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = indexMap.get(key(x))!;
    return range[index % range.length];
  };
}
