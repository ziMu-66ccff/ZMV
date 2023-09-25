import { createChannel, createChannels } from './channel';
import { channelStyles } from './style';
import { rect } from './shape';
import { createGeometry } from './geometry';
import type { Coordinate, Renderer, Scale } from '@/types';
import type { createBand } from '@/scale';

const channels = createChannels({
  x: createChannel({ name: 'x', scale: 'band', optional: false }),
  z: createChannel({ name: 'z', scale: 'band' }),
  y1: createChannel({ name: 'y1', optional: false }),
});

function render(
  renderer: Renderer,
  I: number[],
  scales: Record<string, Scale>,
  values: Record<string, Array<number | string>>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {
    z: 0,
    x: 0,
  };
  const { x, z } = scales;
  const { x: X, y: Y, y1: Y1, z: Z = [] } = values;
  const groupWidth = (x as ReturnType<typeof createBand>).bandWidth();
  const intervalWidth = z ? (z as ReturnType<typeof createBand>).bandWidth() : 1;
  const width = groupWidth * intervalWidth;
  return Array.from(I, (i) => {
    const { z: dz, x: dx, ...restDefaults } = defaults;
    const offset = (Number(Z[i]) || Number(dz)) * groupWidth; // 计算偏移
    const x1 = (Number(X[i]) || Number(dx)) + offset;
    return rect(renderer, coordinate, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1,
      y1: Y[i],
      x2: Number(x1) + width,
      y2: Y1[i],
    });
  });
}

export const interval = createGeometry(channels, render);
