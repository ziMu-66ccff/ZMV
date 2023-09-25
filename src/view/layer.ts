import type { Area, ViewTree } from '@/types/view';

export function computeLayerViews(view: Area, node: ViewTree): Area[] {
  const { children } = node;
  return new Array(children?.length).fill(0).map(() => ({ ...view }));
}
