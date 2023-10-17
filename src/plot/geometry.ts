import { compose, indexOf } from '@/utils';
import { create } from './create';
import { inferEncodings, valueOf } from './endoings';
import type { GeometryOptions } from '@/types/plot';
import type { area, cell, interval, line, link, path, point, rect, text } from '@/geometry';
import type { Channel } from '@/types';

export function initialize({
  data = [],
  type,
  encodings: E = {},
  statistics: StatisticsOptions = [],
  transforms: TransformsOptions = [],
  styles,
}: GeometryOptions) {
  // apply transform
  const transform = compose(...TransformsOptions.map(create));
  const transformedData: Array<Record<string, any>> = transform(data);
  const index = indexOf(transformedData);

  // apply valueOf
  const encodings = inferEncodings(type, transformedData, E);
  const constants: Record<string, string> = {};
  const values: Record<string, any[]> = {};
  for (const [key, encoding] of Object.entries(encodings)) {
    if (encoding) {
      const { type, value } = encoding;
      if (type === 'constant') constants[key] = value;
      else
        values[key] = valueOf(
          transformedData,
          encoding as {
            type: 'transform' | 'value' | 'field';
            value: any;
          },
        );
    }
  }

  // apply statistics
  const statistic = compose(...StatisticsOptions.map(create));
  const { values: transformedValues, index: I } = statistic({ index, values });

  // create channels
  const geometry:
    | typeof interval
    | typeof line
    | typeof area
    | typeof text
    | typeof link
    | typeof cell
    | typeof rect
    | typeof point
    | typeof path = create({ type });
  const channels: Record<string, ReturnType<typeof createChannel>> = {};
  for (const [key, channel] of Object.entries(geometry.channels())) {
    const values = transformedValues[key];
    const { optional } = channel;
    if (values) {
      channels[key] = createChannel(channel, values, encodings[key]);
    } else if (!optional) {
      throw new Error(`Missing values for channel ${key}`);
    }
  }

  return { index: I, geometry, channels, styles: { ...styles, ...constants } };
}

function createChannel(
  channel: Channel,
  values: any[],
  encoding?: {
    type: 'transform' | 'value' | 'field' | 'constant';
    value: any;
  },
) {
  const { type, value } = encoding ?? {};
  return {
    ...channel,
    ...(type === 'field' && { field: value as string }),
    values,
  };
}
