import type { createRenderer } from '@/renderer';
import type { circle, line, path, rect } from '@/renderer/shape';

export interface SvgSuperContext {
  node: SVGElement;
  g: SVGElement;
}

export interface RenderPlugin {
  line?: typeof line;
  circle?: typeof circle;
  text?: typeof circle;
  path?: typeof path;
  rect?: typeof rect;
  context?: (context: any) => any;
}

export type Renderer = ReturnType<typeof createRenderer>;
