import { curry } from '../utils/helper';
import { scale, translate } from './transform';

function coordinate(
  transformOptions:
    | {
        innerRadius?: number | string;
        outerRadius?: number | string;
        startAngle?: number | string;
        endAngle?: number | string;
      }
    | undefined,
  canvasOptions: {
    x?: number | string;
    y?: number | string;
    width: number | string;
    height: number | string;
  },
) {
  const { x = 0, y = 0, width, height } = canvasOptions;
  return [scale(width, height), translate(x, y)];
}

export const cartesian = curry(coordinate);
