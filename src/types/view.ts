import type { ZMVNode } from './plot';

export interface Area {
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
  [key: string]: any;
}

export type ViewsComputer = (view: Area, node: ZMVNode) => Area[];
