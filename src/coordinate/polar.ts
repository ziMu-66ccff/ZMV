import { curry } from '@/utils/helper';
import { polar as polarT, reflectY, scale, translate } from './transform';

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
  const { width, height } = canvasOptions;
  const {
    innerRadius = 0,
    outerRadius = 1,
    startAngle = -Math.PI / 2,
    endAngle = (Math.PI / 2) * 3,
  } = transformOptions ?? {};

  const aspect = Number(width) / Number(height);
  const sx = aspect > 1 ? 1 / aspect : 1;
  const sy = aspect > 1 ? 1 : aspect;

  return [
    translate(0, -0.5),
    reflectY(),
    translate(0, 0.5),

    scale(Number(endAngle) - Number(startAngle), Number(outerRadius) - Number(innerRadius)),
    translate(startAngle, innerRadius),
    polarT(),

    scale(sx, sy),
    scale(0.5, 0.5),

    translate(0.5, 0.5),
  ];
}

export const polar = curry(coordinate);
