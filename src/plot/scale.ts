import type { ScaleOptions } from '@/types/plot';
import type { Scale } from '@/types';
import { defined, firstOf, group, lastOf, map } from '@/utils';
import { categoricalColors, ordinalColors } from './theme';
import { interpolateColor, interpolateNumber } from '@/scale';

export function inferScales(
  channels: Array<
    Record<
      string,
      {
        values: any[];
        field?: string;
        name: string;
        optional: boolean;
        scale?: string;
      }
    >
  >,
  options: ScaleOptions,
) {
  const scaleChannels: Map<
    string,
    Array<
      [
        string,
        {
          values: any[];
          field?: string | undefined;
          name: string;
          optional: boolean;
          scale: string | undefined;
        },
      ]
    >
  > = group(channels.flatMap(Object.entries), ([name]) => scaleName(name));
  const scales: Record<
    string,
    {
      type: string;
      domain: any[];
      range: Array<number | string>;
      label: string;
      nice?: boolean;
      tickCount?: number;
      padding?: number;
      margin?: number;
      zero?: boolean;
      interpolate?: (...args: any[]) => any;
    }
  > = {};
  for (const [name, channels] of scaleChannels) {
    const channel = mergeChannels(name, channels);
    const o = options[name] || {};
    const type = inferScaleType(channel, o);
    scales[name] = {
      ...o,
      ...inferScaleOptions(type, channel, o),
      domain: inferScaleDomain(type, channel, o),
      range: inferScaleRange(type, channel, o),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      label: inferScaleLabel(type, channel, o)!,
      type,
    };
  }
  return scales;
}

export function applyScales(
  channels: Record<
    string,
    {
      values: any[];
      field?: string | undefined;
      name: string;
      optional: boolean;
      scale: string | undefined;
    }
  >,
  scales: Record<string, Scale>,
) {
  return map(channels, ({ values, name }) => {
    const scale = scales[scaleName(name)];
    return values.map(scale);
  });
}

function scaleName(name: string) {
  if (name.startsWith('x')) return 'x';
  if (name.startsWith('y')) return 'y';
  if (isColor(name)) return 'color';
  return name;
}

function mergeChannels(
  name: string,
  channels: Array<
    [
      string,
      {
        values: any[];
        field?: string | undefined;
        name: string;
        optional: boolean;
        scale: string | undefined;
      },
    ]
  >,
) {
  const values: any[] = [];
  let scale;
  let field;
  for (const [, { values: v = [], scale: s, field: f }] of channels) {
    values.push(...v);
    if (!scale && s) scale = s;
    if (!field && f) field = f;
  }
  return { name, values, scale, field };
}

function inferScaleType(
  {
    name,
    scale,
    values,
  }: {
    name: string;
    values: any[];
    scale?: string;
    field?: string;
  },
  {
    type,
    domain,
    range,
  }: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  if (scale) return scale;
  if (type) return type;
  if ((domain ?? range ?? []).length > 2) return asOrdinalType(name);

  // inferScaleType from domain
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    if (isTemporal(domain)) return 'time';
    return 'linear';
  }

  // inferScaleType from values
  if (isOrdinal(values)) return asOrdinalType(name);
  if (isTemporal(values)) return 'time';
  if (isUnique(values)) return 'identity';
  return 'linear';
}

function inferScaleDomain(
  type: string,
  {
    values,
  }: {
    name: string;
    values: any[];
    scale: string | undefined;
    field: string | undefined;
  },
  {
    domain,
    ...options
  }: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  if (domain) return domain;
  switch (type) {
    case 'linear':
    case 'log':
    case 'quantize':
      return inferDomainQ(values, options);
    case 'ordinal':
    case 'dot':
    case 'band':
      return inferDomainC(values);
    case 'quantile':
      return inferDomainO(values);
    case 'time':
      return inferDomainT(values, options);
    default:
      return [];
  }
}

function inferScaleRange(
  type: string,
  {
    name,
  }: {
    name: string;
    values: any[];
    scale: string | undefined;
    field: string | undefined;
  },
  {
    range,
  }: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  if (range) return range;
  switch (type) {
    case 'linear':
    case 'log':
    case 'time':
    case 'band':
    case 'dot':
      return inferRangeQ(name);
    case 'ordinal':
      return categoricalColors;
    case 'quantile':
    case 'quantize':
    case 'threshold':
      return ordinalColors;
    default:
      return [];
  }
}

function inferScaleOptions(
  type: string,
  {
    name,
  }: {
    name: string;
    values: any[];
    scale: string | undefined;
    field: string | undefined;
  },
  {
    padding,
    margin,
    interpolate,
  }: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  switch (type) {
    case 'linear':
    case 'log':
      if (interpolate) return { interpolate };
      return { interpolate: name === 'color' ? interpolateColor : interpolateNumber };
    case 'band':
      return { padding: padding !== undefined ? padding : 0.1 };
    case 'dot':
      return { margin: margin !== undefined ? margin : 0.5 };
    default:
      return {};
  }
}

function inferScaleLabel(
  type: string,
  {
    field,
  }: {
    name: string;
    values: any[];
    scale?: string;
    field?: string;
  },
  {
    label,
  }: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  if (label !== undefined) return label;
  return field;
}

function asOrdinalType(name: string) {
  if (isPosition(name)) return 'dot';
  return 'ordinal';
}

function isPosition(name: string) {
  return name === 'x' || name === 'y';
}

function isColor(name: string) {
  return name === 'fill' || name === 'stroke';
}

function isOrdinal(values: any[]) {
  return values.some((v) => {
    const type = typeof v;
    return type === 'string' || type === 'boolean';
  });
}

function isTemporal(values: any[]) {
  return values.some((v) => v instanceof Date);
}

function isUnique(values: any[]) {
  return Array.from(new Set(values)).length === 1;
}

function inferDomainQ(
  values: any[],
  {
    zero = false,
  }: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  } = {},
) {
  const definedValues = values.filter(defined);
  if (definedValues.length === 0) return [];
  const min = Math.min(...definedValues);
  const max = Math.max(...definedValues);
  return [zero ? 0 : min, max];
}

function inferDomainC(values: any[]) {
  return Array.from(new Set(values.filter(defined)));
}

function inferDomainO(values: any[]) {
  return inferDomainC(values).sort((a, b) => a - b);
}

function inferDomainT(
  values: any[],
  options: {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  },
) {
  return inferDomainQ(values, options).map((d) => new Date(d));
}

function inferRangeQ(name: string) {
  if (name === 'y') return [1, 0];
  if (name === 'color') return [firstOf(ordinalColors), lastOf(ordinalColors)];
  return [0, 1];
}
