import type { Renderer } from '@/types';
import { dist } from '@/utils/vector';

export function gridVertical(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  end: [number | string, number | string],
) {
  const [, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2: x, y2, stroke: '#eee', class: 'grid' });
  }
}

export function gridHorizontal(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  end: [number | string, number | string],
) {
  const [x2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2: y, stroke: '#eee', class: 'grid' });
  }
}

export function gridRay(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  end: [number | string, number | string],
) {
  const [x2, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({ x1: x, y1: y, x2, y2, stroke: '#eee', class: 'grid' });
  }
}

export function gridCircular(
  renderer: Renderer,
  ticks: Array<{ x: number | string; y: number | string; text: string }>,
  end: [number | string, number | string],
) {
  const [cx, cy] = end;
  for (const { x, y } of ticks) {
    const r = dist(end, [x, y]);
    renderer.circle({ cx, cy, r, fill: 'none', stroke: '#eee', class: 'grid' });
  }
}
