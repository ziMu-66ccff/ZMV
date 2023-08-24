import { normalize } from './utils'

export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}: {
  domain: [number | string, number | string]
  range: [any, any]
  interpolate: (t: number, start: any, stop: any) => number
}) {
  return (x: number | string) => {
    const t = normalize(x, d0, d1)
    return interpolate(t, r0, r1)
  }
}

export function interpolateNumber(t: number, start: number | string, stop: number | string) {
  return Number(start) * (1 - t) + Number(stop) * t
}

export function interfaceColor(
  t: number,
  start: Array<number | string>,
  stop: Array<number | string>,
) {
  const r = interpolateNumber(t, start[0], stop[0])
  const g = interpolateNumber(t, start[1], stop[1])
  const b = interpolateNumber(t, start[2], stop[2])
  if (start[3] && stop[3]) {
    const a = interpolateNumber(t, start[3], stop[3])
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return `rgb(${r}, ${g}, ${b})`
}
