import { compose } from '@/utils/helper';

export function createCoordinate({
  x = 0,
  y = 0,
  width = 200,
  height = 200,
  transforms: coordinates = [],
}: {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  transforms?: any[];
}) {
  const transforms = coordinates.flatMap((coordinates) => coordinates({ x, y, width, height }));
  const output = (point: any) => compose(...transforms)(point);
  // TODO
  const types = transforms.map((d) => d.type());
  output.isPolar = () => types.includes('polar');
  output.isTranspose = () => types.reduce((is, type) => is || type === 'transpose', false);
  output.center = () =>
    [Number(x) + Number(width) / 2, Number(y) + Number(height) / 2] as [
      number | string,
      number | string,
    ];
  return output;
}
