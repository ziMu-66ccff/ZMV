export function createChannel({
  name,
  optional = true,
  scale,
}: {
  name: string;
  optional?: boolean;
  scale?: string;
}) {
  return { name, optional, scale };
}

export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }),
    y: createChannel({ name: 'y', optional: false }),
    stroke: createChannel({ name: 'stroke' }),
    fill: createChannel({ name: 'fill' }),
    ...options,
  };
}
