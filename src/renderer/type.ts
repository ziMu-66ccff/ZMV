export interface SvgSuperContext {
  node: SVGElement
  g: SVGElement
}

export interface Renderer {
  node: () => SVGElement
  g: () => SVGElement
}
