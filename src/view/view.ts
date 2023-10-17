import type { Area } from '@/types/view';
import type { ZMVNode } from '@/types/plot';
import { descendants, group } from '@/utils';
import { computeLayerViews } from './layer';
import { computeFacetView } from './facet';
import { computeFlexViews } from './flex';

export function createViews(
  root: ZMVNode,
  computes: Record<string, (view: Area, node: ZMVNode) => Area[]> = {
    layer: computeLayerViews,
    row: computeFlexViews,
    col: computeFlexViews,
    facet: computeFacetView,
  },
): Array<[Area, ZMVNode[]]> {
  const nodes: ZMVNode[] = descendants(root);
  const { width = 640, height = 480, x = 0, y = 0 } = root;
  const rootView = { width, height, x, y };
  const nodeViews = new Map<ZMVNode, Area>([[root, rootView]]);

  for (const node of nodes) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const view = nodeViews.get(node)!;
    const { children = [], type } = node;
    const computeChildrenViews = type ? computes[type] : null;
    if (computeChildrenViews) {
      const childrenViews = computeChildrenViews(view, node);
      if (type !== 'facet' && computeChildrenViews !== computeFacetView) {
        for (const [index, child] of Object.entries(children)) {
          nodeViews.set(child, childrenViews[Number(index)]);
        }
      } else {
        for (const child of children) {
          for (const childView of childrenViews) {
            nodeViews.set({ ...child }, childView);
          }
        }
      }
    }
  }

  const key = (d: Area) => `${d.x}-${d.y}-${d.width}-${d.height}`;
  const keyViews: Map<string, Array<[ZMVNode, Area]>> = group(
    Array.from(nodeViews.entries()),
    ([_, view]) => key(view),
  );
  return Array.from(keyViews.values()).map((views) => {
    const view = views[0][1];
    const nodes = views.map((view) => view[0]);
    return [view, nodes];
  });
}
