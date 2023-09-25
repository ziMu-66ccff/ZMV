import { createSVGElement, mount } from '@utils/index';

export function createContext(width: number, height: number) {
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
