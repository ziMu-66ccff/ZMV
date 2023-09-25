import type { createRenderer } from '@/renderer';

export interface SvgSuperContext {
  node: SVGElement;
  g: SVGElement;
}

export type Renderer = ReturnType<typeof createRenderer>;
