import type { Coordinate, Renderer, Scale } from '@/types';
import { identity } from '@/utils';

export function legendSwatches(
  renderer: Renderer,
  scale: Scale,
  coordinate: Coordinate,
  {
    x,
    y,
    width = 64,
    marginLeft = 6,
    swatcherSize = 10,
    fontSize = 10,
    formatter = identity,
    domain,
    label,
  }: {
    x: number | string;
    y: number | string;
    width?: number | string;
    marginLeft?: number | string;
    swatcherSize?: number | string;
    fontSize?: number | string;
    formatter?: (arr: any) => any;
    domain: Array<number | string>;
    label?: string;
  },
) {
  renderer.save();
  renderer.translate(x, y);

  if (label) {
    renderer.text({
      text: label,
      x: 0,
      y: 0,
      fontWeight: 'blod',
      fontSize,
      textAnchor: 'start',
      dy: '1em',
    });
  }

  const legendY = label ? Number(swatcherSize) * 2 : 0;
  for (const [i, label] of Object.entries(domain)) {
    const legendX = Number(width) * Number(i);
    const color = scale(label);
    renderer.rect({
      x: legendX,
      y: legendY,
      width: swatcherSize,
      height: swatcherSize,
      fill: color,
      stroke: color,
    });

    const textX = legendX + Number(swatcherSize) + Number(marginLeft);
    const textY = legendY + Number(swatcherSize);
    renderer.text({ text: formatter(label), x: textX, y: textY, fill: 'currentColor', fontSize });
  }

  renderer.restore();
}
