import { applyAttributes, createSVGElement, mount } from './utils'
import type { SvgSuperContext } from './type'

export function shape(
  type: keyof SVGElementTagNameMap,
  context: SvgSuperContext,
  attributes: Record<string, string | number>,
): SVGElement {
  const { g } = context
  const el = createSVGElement(type)
  applyAttributes(el, attributes)
  mount(g, el)
  return el
}

export function line(
  context: SvgSuperContext,
  attributes: Record<string, string | number>,
): SVGElement {
  return shape('line', context, attributes)
}

export function rect(
  context: SvgSuperContext,
  attributes: Record<string, string | number>,
): SVGElement {
  const { width, height, x, y } = attributes
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(Number(width)),
    height: Math.abs(Number(height)),
    x: Number(width) > 0 ? x : Number(x) + Number(width),
    y: Number(height) > 0 ? y : Number(y) + Number(height),
  })
}

export function circle(
  context: SvgSuperContext,
  attributes: Record<string, string | number>,
): SVGElement {
  return shape('circle', context, attributes)
}

export function text(
  context: SvgSuperContext,
  attributes: Record<string, string | number>,
): SVGElement {
  const { text, ...rest } = attributes
  const el = shape('text', context, rest)
  el.textContent = text.toString()
  return el
}
