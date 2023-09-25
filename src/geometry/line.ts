import type { Coordinate, Renderer, Scale } from '@/types';
import { createChannel, createChannels } from './channel';
import { group } from '@/utils';
import { line as lineShape } from './shape';
import { groupChannelStyles } from './style';
import { createGeometry } from './geometry';

const channels = createChannels({
  z: createChannel({ name: 'z' }),
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
  const { x: X, y: Y, z: Z } = values;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(series, (I) => {
    return lineShape(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...groupChannelStyles(I, values),
      X,
      Y,
      I,
      fill: 'none',
    });
  });
}

export const line = createGeometry(channels, render);
