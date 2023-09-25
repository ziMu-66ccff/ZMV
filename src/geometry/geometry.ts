import type { createBand } from '@/scale';
import type { Coordinate, channels, Scale, Renderer } from '@/types';

export function createGeometry(
  channels: channels,
  render: (
    renderer: Renderer,
    I: number[],
    scales: Record<string, Scale>,
    values: Record<string, Array<number | string>>,
    directStyles: Record<string, string>,
    coordinate: Coordinate,
  ) => any,
) {
  const geometry = (
    renderer: Renderer,
    I: number[],
    scales: Record<string, Scale>,
    values: Record<string, Array<number | string>>,
    directStyles: Record<string, string>,
    coordinate: Coordinate,
  ) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      if (!optional) {
        if (!values[key]) throw new Error(`Missing channel: ${key}`);
        if (
          scale === 'band' &&
          (!scales[key] || !(scales[key] as ReturnType<typeof createBand>).bandWidth)
        ) {
          throw new Error(`${key} channal need a band scale`);
        }
      }
    }
    return render(renderer, I, scales, values, directStyles, coordinate);
  };
  geometry.channels = () => channels;
  return geometry;
}
