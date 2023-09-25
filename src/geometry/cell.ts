import type { Coordinate, Renderer, Scale } from '@/types';
import { createChannel, createChannels } from './channel';
import type { createBand } from '@/scale';
import { rect } from './shape';
import { channelStyles } from './style';
import { createGeometry } from './geometry';

const channels = createChannels({
  x: createChannel({ name: 'x', optional: false, scale: 'band' }),
  y: createChannel({ name: 'y', optional: false, scale: 'band' }),
});

function render(
  renderer: Renderer,
  I: number[],
  scales: Record<string, Scale>,
  values: Record<string, Array<number | string>>,
  directStyles: Record<string, string>,
  coordinate: Coordinate,
) {
  const defaults = {};
  const { x, y } = scales;
  const { x: X, y: Y } = values;
  const width = (x as ReturnType<typeof createBand>).bandWidth();
  const height = (y as ReturnType<typeof createBand>).bandWidth();
  return Array.from(I, (i) =>
    rect(renderer, coordinate, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: Number(X[i]) + width,
      y2: Number(Y[i]) + height,
    }),
  );
}

export const cell = createGeometry(channels, render);
