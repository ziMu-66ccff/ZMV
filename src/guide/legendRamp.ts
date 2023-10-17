import type { Coordinate, Renderer, Scale } from '@/types';
import { firstOf, identity, lastOf } from '@/utils';
import { createLinear } from '../scale';
import { ticksBottom } from './ticks';

export function legendRamp(
  renderer: Renderer,
  scale: Scale,
  coordinate: Coordinate,
  {
    x,
    y,
    width = 120,
    height = 10,
    domain,
    tickCount = 5,
    tickLength = Number(height) + 5,
    formatter = identity,
    fontSize = 10,
    label,
  }: {
    x: number | string;
    y: number | string;
    width?: number | string;
    height?: number | string;
    domain: Array<number | string>;
    tickCount?: number | string;
    tickLength?: number | string;
    formatter?: (arr: any) => any;
    fontSize?: number | string;
    label?: string;
  },
) {
  renderer.save();
  renderer.translate(x, y);

  if (label) {
    renderer.text({
      x: 0,
      y: 0,
      text: label,
      fontWeight: 'blod',
      fontSize,
      textAnchor: 'start',
      dy: '1em',
    });
  }

  const legendY = label ? Number(height) * 2 : 0;
  const domainValues: [any, any] = [firstOf(domain), lastOf(domain)];
  const value = createLinear({ domain: [0, width], range: domainValues });
  for (let i = 0; i < Number(width); i++) {
    const stroke = scale(value(i));
    renderer.line({ x1: i, y1: legendY, x2: i, y2: legendY + Number(height), stroke });
  }

  const position = createLinear({ domain: domainValues, range: [0, width] });

  const values = (scale as any).thresholds
    ? [domainValues[0], ...(scale as any).thresholds(), domainValues[1]]
    : (position as any).ticks(tickCount);

  const ticks = values.map((d: number | string) => ({
    x: position(d),
    y: legendY,
    text: formatter(d),
  }));
  ticksBottom(renderer, ticks, { tickLength, fontSize });

  renderer.restore();
}
