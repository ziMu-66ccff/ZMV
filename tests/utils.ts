export function createDiv(): HTMLElement {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

export function mount(
  parentNode: HTMLElement | SVGElement,
  childNode: HTMLElement | SVGElement,
): void {
  parentNode?.appendChild(childNode);
}

export function getAttributes(
  node: SVGElement,
  attributes: string[],
): Record<string, string | null> {
  return attributes.reduce((total, cur) => {
    (total as Record<string, any>)[cur] = node.getAttribute(cur);
    return total;
  }, {});
}
