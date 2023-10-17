import type { ZMVNode } from '@/types/plot';
import type { Area } from '@/types/view';

export function computeFlexViews(view: Area, node: ZMVNode): Area[] {
  const { children = [], padding = 40, type, flex = children.map(() => 1) } = node;
  const [mainStart, mainSize, crossStart, crossSize] =
    type === 'col' ? ['y', 'height', 'x', 'width'] : ['x', 'width', 'y', 'height'];
  const sum: number = flex.reduce((total: number, value: number) => total + value);
  const totalSize = Number(view[mainSize]) - Number(padding) * (children.length - 1);
  const sizes: number[] = flex.map((i: number) => totalSize * (i / sum));

  const childrenViews: Area[] = [];
  for (
    let i = 0, next = Number(view[mainStart]);
    i < children.length;
    next += sizes[i] + Number(padding), i++
  ) {
    childrenViews.push({
      [mainStart]: next,
      [mainSize]: sizes[i],
      [crossStart]: view[crossStart],
      [crossSize]: view[crossSize],
    } as Area);
  }

  return childrenViews;
}
