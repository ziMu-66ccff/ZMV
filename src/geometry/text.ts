import type { Coordinate, Renderer, Scale } from '@/types';
import { createChannel, createChannels } from './channel';
import { text as textShape } from './shape';
import { channelStyles } from './style';
import { createGeometry } from './geometry';

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  fontWeight: createChannel({ name: 'fontWeight' }),
  text: createChannel({ name: 'text', optional: false, scale: 'identity' }),
});

function renderer(
  renderer: Renderer,
  I: number[],
  scales: Record<string, Scale>,
  values: Record<string, Array<number | string>>,
  directStyles: Record<string, string | number>,
  coordinate: Coordinate,
) {
  const defaults = { rotate: 0, fontSize: 14, fontWeight: 'normal' };
  const { x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [], fontWeight: FW = [] } = values;

  return Array.from(I, (i) => {
    return textShape(renderer, coordinate, {
      ...directStyles,
      ...channelStyles(i, values),
      x: X[i],
      y: Y[i],
      rotate: R[i] ?? defaults.rotate,
      fontSize: FS[i] ?? defaults.fontSize,
      fontWeight: FW[i] ?? defaults.fontWeight,
      text: T[i],
    });
  });
}

export const text = createGeometry(channels, renderer);
