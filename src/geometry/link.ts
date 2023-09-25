import type { Coordinate, Renderer, Scale } from '@/types';
import { createChannel, createChannels } from './channel';
import { link as linkShape } from './shape';
import { channelStyles } from './style';
import { createGeometry } from './geometry';

const channels = createChannels({
  x1: createChannel({ name: 'x1', optional: false }),
  y1: createChannel({ name: 'y1', optional: false }),
});

function render(
  renderer: Renderer,
  I: number[],
  scales: Record<string, Scale>,
  values: Record<string, Array<number | string>>,
  directStyles: Record<string, string | number>,
  coordinate: Coordinate,
) {
  const defaults = {};
  const { x: X, y: Y, x1: X1, y1: Y1 } = values;
  return Array.from(I, (i) => {
    return linkShape(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: X1[i],
      y2: Y1[i],
    });
  });
}

export const link = createGeometry(channels, render);
