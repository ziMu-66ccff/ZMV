import type { Renderer } from '@/types';

export function labelLeftUp(
  renderer: Renderer,
  label: string,
  { x, y }: { x: number | string; y: number | string; text?: string },
  { isOridinal, fontSize }: { isOridinal: boolean; fontSize: number | string; [key: string]: any },
) {
  const text = isOridinal ? `${label}` : `👆 ${label}`;
  renderer.text({
    text,
    x,
    y,
    dy: '-1em',
    textAnchor: 'end',
    class: 'label',
    fontWeight: 'bold',
    fontSize,
  });
}

export function labelLeftDown(
  renderer: Renderer,
  label: string,
  { x, y }: { x: number | string; y: number | string; text?: string },
  { isOridinal, fontSize }: { isOridinal: boolean; fontSize: number | string; [key: string]: any },
) {
  const text = isOridinal ? `${label}` : `👇 ${label}`;
  renderer.text({
    text,
    x,
    y,
    dy: '2.2em',
    textAnchor: 'end',
    class: 'label',
    fontWeight: 'bold',
    fontSize,
  });
}

export function labelBottomRight(
  renderer: Renderer,
  label: string,
  { x, y }: { x: number | string; y: number | string; text?: string },
  {
    isOridinal,
    fontSize,
    tickLength,
  }: {
    isOridinal: boolean;
    fontSize: number | string;
    tickLength: number | string;
    [key: string]: any;
  },
) {
  const ty = Number(y) + Number(tickLength);
  const text = isOridinal ? `${label}` : `${label} 👉`;
  renderer.text({
    text,
    x,
    y: ty,
    dy: '2.2em',
    textAnchor: 'end',
    class: 'label',
    fontWeight: 'bold',
    fontSize,
  });
}

export function labelTopRight(
  renderer: Renderer,
  label: string,
  { x, y }: { x: number | string; y: number | string; text?: string },
  {
    isOridinal,
    fontSize,
    tickLength,
  }: {
    isOridinal: boolean;
    fontSize: number | string;
    tickLength: number | string;
    [key: string]: any;
  },
) {
  const ty = Number(y) - Number(tickLength);
  const text = isOridinal ? `${label}` : `${label} 👉`;
  renderer.text({
    text,
    x,
    y: ty,
    dy: '-1.2em',
    textAnchor: 'end',
    class: 'label',
    fontWeight: 'bold',
    fontSize,
  });
}
