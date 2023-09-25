export function channelStyles(index: number, values: Record<string, Array<number | string>>) {
  const { stroke: S, fill: F } = values;
  // 只有当 stroke 和 fill 这两个通道被指定的时候才会有用
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
}

export function groupChannelStyles(
  [index]: [number],
  values: Record<string, Array<number | string>>,
) {
  return channelStyles(index, values);
}
