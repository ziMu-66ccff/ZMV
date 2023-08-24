export interface SvgSuperContext {
  node: SVGElement;
  g: SVGElement;
}

export interface Renderer {
  line: (options: Record<string, string | number>) => SVGElement;
  rect: (options: Record<string, string | number>) => SVGElement;
  circle: (options: Record<string, string | number>) => SVGElement;
  text: (options: Record<string, string | number>) => SVGElement;
  path: (options: Record<string, string | number | any[]>) => SVGElement;
  node: () => SVGElement;
  g: () => SVGElement;
}
