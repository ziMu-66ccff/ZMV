export function createThreshold({
  domain,
  range,
}: {
  domain: Array<number | string>;
  range: string[];
}) {
  const n = Math.min(range.length - 1, domain.length);
  const scale = (x: number | string) => {
    const index = domain.findIndex((value) => Number(x) < Number(value));
    return range[index === -1 ? n : index];
  };
  scale.thresholds = () => domain;
  return scale;
}
