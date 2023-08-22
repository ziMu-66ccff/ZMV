// src/renderer/renderer.js

import { createContext } from './context'
import { line, circle, text, rect, path, ring } from './shape'
// import { restore, save, scale, translate, rotate } from './transform'

export function createRenderer(width: number, height: number) {
  const context = createContext(width, height) // 创建上下文信息
  return {
    line: (options: Record<string, string | number>) => line(context, options),
    circle: (options: Record<string, string | number>) => circle(context, options),
    text: (options: Record<string, string | number>) => text(context, options),
    rect: (options: Record<string, string | number>) => rect(context, options),
    path: (options: Record<string, string | number | any[]>) => path(context, options),
    ring: (options: Record<string, string | number>) => ring(context, options),
    // restore: () => restore(context),
    // save: () => save(context),
    // scale: (...args) => scale(context, ...args),
    // rotate: (...args) => rotate(context, ...args),
    // translate: (...args) => translate(context, ...args),
    context: () => context,
    node: () => context.node, // 下面会讲解
    g: () => context.g, // 下面会讲解
  }
}
