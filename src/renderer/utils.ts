export function createSVGElement(type: keyof SVGElementTagNameMap): SVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', type)
}

export function createDiv(): HTMLElement {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return div
}

export function applyAttributes(
  element: SVGElement,
  attributes: Record<string, string | number>,
): void {
  for (const [key, value] of Object.entries(attributes)) {
    const attribute = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`)
    element.setAttribute(attribute, value.toString())
  }
}

export function mount(
  parentNode: HTMLElement | SVGElement,
  childNode: HTMLElement | SVGElement,
): void {
  parentNode?.appendChild(childNode)
}
