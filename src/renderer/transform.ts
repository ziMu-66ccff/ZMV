import type { SvgSuperContext } from './type'
import { applyTransform, createSVGElement, mount } from './utils'

export function transform(
  type: 'translate' | 'scale' | 'rotate',
  context: SvgSuperContext,
  ...params: Array<string | number>
) {
  const { g } = context
  applyTransform(g, `${type}(${params.join(', ')})`)
}

export function translate(context: SvgSuperContext, tx: number | string, ty: number | string) {
  transform('translate', context, tx, ty)
}

export function rotate(context: SvgSuperContext, theta: number | string) {
  transform('rotate', context, theta)
}

export function scale(context: SvgSuperContext, sx: number | string, sy: number | string) {
  transform('scale', context, sx, sy)
}

export function save(context: SvgSuperContext): void {
  const { g } = context
  const newG = createSVGElement('g')
  mount(g, newG)
  context.g = newG
}

export function restore(context: SvgSuperContext): void {
  const { g } = context
  const { parentNode } = g
  context.g = parentNode as SVGElement
}
