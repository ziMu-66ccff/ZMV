import { createSVGElement, mount } from '@utils/index';

export function createContext(width: number | string, height: number | string) {
  const svg = createSVGElement('svg');
  svg.setAttribute('width', width.toString());
  svg.setAttribute('height', height.toString());
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const g = createSVGElement('g');
  mount(svg, g);

  return {
    node: svg,
    g: g,
  };
}
