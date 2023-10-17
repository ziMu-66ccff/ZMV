// src/renderer/renderer.js

import type { RenderPlugin } from '@/types';
import { createContext } from './context';
import { line, circle, text, rect, path } from './shape';
import { restore, save, scale, translate, rotate } from './transform';

export function createRenderer(
  width: number | string,
  height: number | string,
  {
    line: drawLine = line,
    circle: drawCircle = circle,
    text: drawText = text,
    rect: drawRect = rect,
    path: drawPath = path,
    context: intensifyContext = <T>(d: T) => d,
  }: RenderPlugin = {},
) {
  const context = intensifyContext(createContext(width, height)); // 创建上下文信息
  return {
    line: (options: Record<string, string | number>) => drawLine(context, options),
    circle: (options: Record<string, string | number>) => drawCircle(context, options),
    text: (options: Record<string, string | number>) => drawText(context, options),
    rect: (options: Record<string, string | number>) => drawRect(context, options),
    path: (options: Record<string, string | number | any[]>) => drawPath(context, options),
    restore: () => restore(context),
    save: () => save(context),
    scale: (sx: number | string, sy: number | string) => scale(context, sx, sy),
    rotate: (theta: number | string) => rotate(context, theta),
    translate: (tx: number | string, ty: number | string) => translate(context, tx, ty),
    node: () => context.node,
    g: () => context.g,
  };
}
