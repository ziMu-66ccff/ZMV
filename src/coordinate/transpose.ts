import { curry } from '@/utils/helper';
import { reflectY, translate, transpose as transposeT } from './transform';

function coordinate(
  transformOptions:
    | {
        innerRadius: number | string;
        outerRadius: number | string;
        startAngle: number | string;
        endAngle: number | string;
      }
    | undefined,
  canvasOptions:
    | {
        x?: number | string;
        y?: number | string;
        width: number | string;
        height: number | string;
      }
    | undefined,
) {
  return [translate(0, -0.5), reflectY(), translate(0, 0.5), transposeT()];
}

export const transpose = curry(coordinate);
