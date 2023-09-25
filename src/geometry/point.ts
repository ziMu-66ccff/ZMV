import type { Coordinate, Scale, Renderer } from '@/types';
import { circle } from './shape';
import { channelStyles } from './style';
import { createChannels, createChannel } from './channel';

export function point(
  renderer: Renderer,
  I: number[],
  scales: Record<string, Scale>,
  values: Record<string, Array<number | string>>,
  directStyles: Record<string, string | number>,
  coordinate: Coordinate,
) {
  const defaults = {
    r: 3,
    fill: 'none',
  };
  const { x: X, y: Y, r: R = [] } = values;
  return Array.from(I, (i) => {
    const { r: dr, ...restDefault } = defaults;
    const r = R[i] ?? dr;
    return circle(renderer, coordinate, {
      ...restDefault,
      ...directStyles,
      ...channelStyles(i, values),
      cx: X[i],
      cy: Y[i],
      r,
    });
  });
}
point.channels = () => createChannels({ r: createChannel({ name: 'r' }) });
