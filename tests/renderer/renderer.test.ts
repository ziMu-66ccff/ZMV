import { createRenderer } from '@/renderer'
import { createDiv, mount } from '@/renderer/utils'

describe('createRenderer', () => {
  test('createContext(width, height) returns expected context.', () => {
    const renderer = createRenderer(600, 400)
    const node = renderer.node()
    const g = renderer.g()

    expect(node.tagName).toBe('svg')
    expect(node.getAttribute('width')).toBe('600')
    expect(node.getAttribute('height')).toBe('400')
    expect(node.getAttribute('viewBox')).toBe('0 0 600 400')

    expect(g.tagName).toBe('g')
    expect(g.parentNode).toBe(node)

    mount(createDiv(), node)
  })
})
