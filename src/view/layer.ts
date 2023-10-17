import type { ZMVNode } from '@/types/plot';
import type { Area } from '@/types/view';

export function computeLayerViews(view: Area, node: ZMVNode): Area[] {
  const { children } = node;
  return new Array(children?.length).fill(0).map(() => ({ ...view }));
}
