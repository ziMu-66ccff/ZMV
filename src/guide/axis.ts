import type { Coordinate, Renderer, Scale } from '@/types';
import { identity, lastOf } from '@/utils';
import type { createBand, createLinear } from '../scale';
import type { AxisComponents, TransformType } from '@/types/guide';

export function createAxis(components: AxisComponents) {
  return (
    renderer: Renderer,
    scale: Scale,
    coordinate: Coordinate,
    {
      domain,
      label,
      tickCount = 10,
      formatter = identity,
      tickLength = 5,
      grid = false,
      tick = true,
    }: {
      domain?: Array<number | string>;
      label?: string;
      tickCount?: number | string;
      formatter?: (x: any) => any;
      tickLength?: number | string;
      grid?: boolean;
      tick?: boolean;
    },
  ) => {
    if (domain && domain.length === 0) return;
    const fontSize = 10;
    const isOridinal = !!(scale as ReturnType<typeof createBand>).bandWidth;
    const isQuantitative = !!(scale as ReturnType<typeof createLinear>).ticks;
    const offset = isOridinal ? Number((scale as any).bandWidth()) / 2 : 0;
    const values = isQuantitative ? (scale as any).ticks(tickCount) : domain;

    const center = coordinate.center();
    const type = `${+coordinate.isPolar()}${+coordinate.isTranspose()}` as TransformType;
    const options = { tickLength, fontSize, center, isOridinal };

    const { label: Label, ticks: Ticks, grid: Grid, start, end } = components[type];

    const ticks = values.map((d: number | string) => {
      const [x, y] = coordinate(start(d, scale, offset));
      const text = formatter(d);
      return { x, y, text };
    });

    const labelTick = (() => {
      if (!isOridinal) return lastOf(ticks);
      const value = lastOf(values);
      const [x, y] = coordinate(start(value, scale, offset * 2));
      return { x, y };
    })();

    if (grid && Grid) Grid(renderer, ticks, end(coordinate));
    if (tick && Ticks) Ticks(renderer, ticks, options);
    if (label && Label) Label(renderer, label, labelTick, options);
  };
}
