import { applyAttributes, createSVGElement, mount } from '@utils/dom';
import type { SvgSuperContext } from '@/types';

export function shape(
  type: keyof SVGElementTagNameMap,
  context: SvgSuperContext,
  attributes: Record<string, string | number>,
) {
  const { g } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);
  mount(g, el);
  return el;
}

export function line(context: SvgSuperContext, attributes: Record<string, string | number>) {
  return shape('line', context, attributes);
}

export function rect(context: SvgSuperContext, attributes: Record<string, string | number>) {
  const { width, height, x, y } = attributes;
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(Number(width)),
    height: Math.abs(Number(height)),
    x: Number(width) > 0 ? x : Number(x) + Number(width),
    y: Number(height) > 0 ? y : Number(y) + Number(height),
  });
}

export function circle(context: SvgSuperContext, attributes: Record<string, string | number>) {
  return shape('circle', context, attributes);
}

export function text(context: SvgSuperContext, attributes: Record<string, string | number>) {
  const { text, ...rest } = attributes;
  const el = shape('text', context, rest);
  el.textContent = text !== undefined ? text.toString() : '';
  // el.textContent = text.toString();
  return el;
}

export function path(
  context: SvgSuperContext,
  attributes: Record<string, string | number | any[]>,
) {
  const { d } = attributes;
  return shape('path', context, { ...attributes, d: (d as number[] | string[]).flat().join(' ') });
}

export function ring(context: SvgSuperContext, attributes: Record<string, string | number>) {
  const { cx, cy, r1, r2, ...styles } = attributes;
  const { fill, stroke, strokeWidth } = styles;
  const defaultStrokeWidth = 1;

  const innerStroke = circle(context, {
    cx,
    cy,
    r: r1,
    fill: 'transparent',
    stroke: stroke ?? fill,
    strokeWidth: strokeWidth ?? defaultStrokeWidth,
  });
  const outterStoke = circle(context, {
    cx,
    cy,
    r: r2,
    fill: 'transparent',
    stroke: stroke ?? fill,
    strokeWidth: strokeWidth ?? defaultStrokeWidth,
  });
  const ring = circle(context, {
    cx,
    cy,
    r: (Number(r1) + Number(r2)) / 2,
    fill: 'transparent',
    stroke: fill,
    strokeWidth: Number(r2) - Number(r1) - Number(strokeWidth ?? defaultStrokeWidth),
  });

  return [innerStroke, ring, outterStoke];
}
