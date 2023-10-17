import type { Coordinate, Renderer, Scale } from '@/types';
import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { path as shapePath } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  d: createChannel({ name: 'd', optional: false, scale: 'identity' }),
  fill: createChannel({ name: 'fill' }),
  stroke: createChannel({ name: 'stroke' }),
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
  const { d: D } = values;
  return Array.from(I, (i) =>
    shapePath(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      d: D[i],
    }),
  );
}

export const path = createGeometry(channels, render);
