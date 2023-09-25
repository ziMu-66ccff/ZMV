import type { Area, ViewTree } from '@/types/view';
import { group } from '@/utils';

export function computeFacetView(
  view: Area,
  {
    data,
    encodings = {},
    padding = 0,
    paddingLeft = 45,
    paddingRight = 45,
    paddingTop = 60,
    paddingBottom = 45,
  }: ViewTree,
): Area[] {
  const { x, y } = encodings;
  const rows = y ? Array.from(group(data, (d) => d[y]).keys()) : [undefined];
  const cols = x ? Array.from(group(data, (d) => d[x]).keys()) : [undefined];
  const m = rows.length;
  const n = cols.length;
  const width = Number(view.width) - Number(paddingLeft) - Number(paddingRight);
  const height = Number(view.height) - Number(paddingTop) - Number(paddingBottom);
  const boxWidth = (width - Number(padding) * (n - 1)) / n;
  const boxHeight = (height - Number(padding) * (m - 1)) / m;
  const views: Area[] = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const transform = (data: Array<Record<string, any>>) => {
        const inRows = (d: Record<string, any>) => d[x] === cols[j] || cols[j] === undefined;
        const inCols = (d: Record<string, any>) => d[y] === rows[i] || rows[i] === undefined;
        return data.filter((d) => inRows(d) && inCols(d));
      };
      views.push({
        x: Number(view.x) + Number(paddingLeft) + j * (boxWidth + Number(padding)),
        y: Number(view.y) + Number(paddingTop) + i * (boxHeight + Number(padding)),
        width: boxWidth,
        height: boxHeight,
        transform,
      });
    }
  }

  return views;
}
