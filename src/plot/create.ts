import { createBinX, createNormalizeY, createStackY, createSymmetryY } from '@/statistic';
import { area, cell, interval, line, link, path, point, rect, text } from '../geometry';
import { cartesian, polar, transpose } from '@/coordinate';
import {
  createBand,
  createIdentity,
  createLinear,
  createLog,
  createOrdinal,
  createPoint,
  createQuantile,
  createQuantize,
  createThreshold,
  createTime,
} from '@/scale';
import { axisX, axisY, legendRamp, legendSwatches } from '@/guide';
import type { Coordinate, Renderer, Scale } from '@/types';

export function create(options: ((...args: any[]) => any) | { type?: string; [key: string]: any }) {
  if (typeof options === 'function') return options;
  const { type, ...rest } = options;

  // geomertries
  if (type === 'interval') return interval;
  if (type === 'line') return line;
  if (type === 'area') return area;
  if (type === 'text') return text;
  if (type === 'link') return link;
  if (type === 'cell') return cell;
  if (type === 'rect') return rect;
  if (type === 'point') return point;
  if (type === 'path') return path;

  // facet
  if (type === 'facet') {
    const facet = () => {};
    facet.channels = () => ({
      x: { name: 'x', optional: true },
      y: { name: 'y', optional: true },
    });
    return facet;
  }

  // statistics
  if (type === 'stackY') return createStackY();
  if (type === 'normalizeY') return createNormalizeY();
  if (type === 'symmetryY') return createSymmetryY();
  if (type === 'binX') return createBinX(rest);

  // coordinates
  if (type === 'cartesian') return cartesian(rest);
  if (type === 'transpose') return transpose(rest);
  if (type === 'polar') return polar(rest);

  // scales
  if (type === 'linear') return createScaleQ(createLinear, rest);
  if (type === 'time') return createScaleQ(createTime, rest);
  if (type === 'log') return createScaleQ(createLog, rest);
  if (type === 'identity') return createIdentity();
  if (type === 'ordinal') return createOrdinal(rest as any);
  if (type === 'band') return createBand(rest as any);
  if (type === 'dot') return createPoint(rest as any);
  if (type === 'threshold') return createThreshold(rest as any);
  if (type === 'quantize') return createQuantize(rest as any);
  if (type === 'quantile') return createQuantile(rest as any);

  // guides
  if (type === 'axisX') return createGuide(axisX, rest);
  if (type === 'axisY') return createGuide(axisY, rest);
  if (type === 'legendSwatches') return createGuide(legendSwatches, rest);
  if (type === 'legendRamp') return createGuide(legendRamp, rest);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Unknown node type: ${options.type}`);
}

export function createGuide(
  guide: typeof axisX | typeof axisY | typeof legendRamp | typeof legendSwatches,
  options: Record<string, any>,
) {
  return (renderer: Renderer, scale: Scale, coordinate: Coordinate) =>
    guide(renderer, scale, coordinate, options as any);
}

function createScaleQ(
  ctor: typeof createLinear | typeof createLog | typeof createTime,
  options: Record<string, any>,
) {
  const { nice = true, tickCount = 10 } = options;
  const scale = ctor(options as any);
  if (nice) scale.nice(tickCount);
  return scale;
}
