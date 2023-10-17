import type { GuidesOptions } from '@/types';

export function inferGuides(
  scales: Record<
    string,
    {
      type: string;
      domain: any[];
      range: Array<string | number>;
      label: string;
      nice?: boolean;
      tickCount?: number;
      padding?: number;
      margin?: number;
      zero?: boolean;
      interpolate?: (...args: any[]) => any;
    }
  >,
  dimensions: {
    x: number | string;
    y: number | string;
    paddingLeft: number | string;
  },
  options: GuidesOptions,
) {
  const { x: xScale, y: yScale, color: colorScale } = scales;
  const { x = {}, y = {}, color = {} } = options;
  const { display: dx = true } = x;
  const { display: dy = true } = y;
  const { display: dc = true } = color;

  return {
    ...(dx && xScale && { x: { ...merge(x, xScale), type: 'axisX' } }),
    ...(dy && yScale && { y: { ...merge(y, yScale), type: 'axisY' } }),
    ...(dc &&
      colorScale && {
        color: {
          // 位置
          ...merge(color, colorScale),
          ...inferPosition(dimensions),
          type: inferLegendType(colorScale),
        },
      }),
  };
}

function merge(
  options:
    | {
        type?: 'axisX' | 'axisY';
        domain?: any[];
        label?: string;
        display?: boolean;
        grid?: boolean;
        tick?: boolean;
        tickCount?: number;
        formatter?: (d: any) => any;
      }
    | {
        type?: 'legendRamp';
        domain?: any[];
        label?: string;
        display?: boolean;
        width?: number | string;
        height?: number | string;
        tickCount?: number | string;
        tickLength?: number | string;
        fontSize?: number | string;
        formatter?: (d: any) => any;
      }
    | {
        type?: 'legendSwatches';
        domain?: any[];
        label?: string;
        display?: boolean;
        width?: number | string;
        marginLeft?: number | string;
        swatcherSize?: number | string;
        fontSize?: number | string;
        formatter?: (d: any) => any;
      },
  {
    domain,
    label,
  }: {
    type: string;
    domain: any[];
    range: Array<string | number>;
    label: string;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  return { ...options, label, domain };
}

function inferLegendType({
  type,
}: {
  type: string;
  domain: any[];
  range: Array<string | number>;
  label: string;
  nice?: boolean;
  tickCount?: number;
  padding?: number;
  margin?: number;
  zero?: boolean;
  interpolate?: (...args: any[]) => any;
}) {
  switch (type) {
    case 'linear':
    case 'log':
    case 'time':
    case 'threshold':
    case 'quantile':
    case 'quantize':
      return 'legendRamp';
    default:
      return 'legendSwatches';
  }
}

function inferPosition({
  x,
  y,
  paddingLeft,
}: {
  x: number | string;
  y: number | string;
  paddingLeft: number | string;
}) {
  return { x: Number(x) + Number(paddingLeft), y };
}
