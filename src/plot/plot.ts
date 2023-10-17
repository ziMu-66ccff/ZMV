import type {
  CoordinatesOptions,
  GeometryOptions,
  GuidesOptions,
  ScaleOptions,
  ZMVNode,
  CharNode,
} from '@/types/plot';
import type { Renderer, Scale } from '@/types';
import type { createGuide } from './create';
import { assignDefined, bfs, identity, map } from '@/utils';
import { createViews } from '@/view';
import { createRenderer } from '@/renderer';
import { initialize } from './geometry';
import { applyScales, inferScales } from './scale';
import { inferGuides } from './guide';
import { create } from './create';
import { createCoordinate } from '@/coordinate';

export function plot(root: ZMVNode) {
  const { width = 640, height = 480, renderer: plugin } = root;
  const renderer = createRenderer(width, height, plugin);
  flow(root);
  const views = createViews(root);

  for (const [view, nodes] of views) {
    const { transform = identity, ...dimensions } = view;
    const geometries: GeometryOptions[] = [];
    const scales: ScaleOptions = {};
    const guides: GuidesOptions = {};
    let coordinates: CoordinatesOptions = [];
    const charNodes = nodes.filter(({ type }) => isCharNode(type)) as CharNode[];

    for (const options of charNodes) {
      const {
        scales: s = {},
        guides: g = {},
        coordinates: c = [],
        transforms = [],
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        ...geometrie
      } = options;
      assignDefined(scales, s);
      assignDefined(guides, g);
      assignDefined(dimensions, { paddingLeft, paddingRight, paddingBottom, paddingTop });
      if (c) coordinates = c;
      geometries.push({ ...geometrie, transforms: [transform, ...transforms] });
    }
    plotView({ renderer, scales, guides, coordinates, geometries, ...dimensions });
  }

  return renderer.node();
}

function plotView({
  renderer,
  scales: scalesOptions,
  guides: guidesOptions,
  coordinates: coordinatesOptions,
  geometries: geomertriesOptions,
  width,
  height,
  x,
  y,
  paddingLeft = 45,
  paddingRight = 45,
  paddingBottom = 45,
  paddingTop = 60,
}: {
  renderer: Renderer;
  scales: ScaleOptions;
  guides: GuidesOptions;
  coordinates: CoordinatesOptions;
  geometries: GeometryOptions[];
  width: number | string;
  height: number | string;
  x: number | string;
  y: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingTop?: number | string;
}) {
  const geometries = geomertriesOptions.map(initialize);
  const channels = geometries.map((geomertry) => geomertry.channels);
  const scaleDescriptors = inferScales(channels, scalesOptions);
  const guidesDescriptors = inferGuides(scaleDescriptors, { x, y, paddingLeft }, guidesOptions);

  const scales: Record<string, Scale> = map(scaleDescriptors, create);
  const guides: Record<string, ReturnType<typeof createGuide>> = map(guidesDescriptors, create);

  const transforms = inferCoordinates(coordinatesOptions).map(create);
  const coordinate = createCoordinate({
    x: Number(x) + Number(paddingLeft),
    y: Number(y) + Number(paddingTop),
    width: Number(width) - Number(paddingLeft) - Number(paddingRight),
    height: Number(height) - Number(paddingTop) - Number(paddingBottom),
    transforms,
  });

  for (const [key, guide] of Object.entries(guides)) {
    const scale = scales[key];
    guide(renderer, scale, coordinate);
  }

  for (const { index, geometry, channels, styles } of geometries) {
    const values = applyScales(channels, scales);
    geometry(renderer, index, scales, values, styles, coordinate);
  }
}

function isCharNode(type?: string) {
  switch (type) {
    case 'layer':
    case 'col':
    case 'row':
      return false;
    default:
      return true;
  }
}

function flow(root: ZMVNode) {
  bfs(root, ({ type, children, ...options }) => {
    if (isCharNode(type)) return;
    if (!children || children.length === 0) return;
    const keyDescriptors = [
      'o:scales',
      'o:encodings',
      'o:guides',
      'o:styles',
      'a:coordinates',
      'a:statistics',
      'a:transforms',
      'a:data',
    ];
    for (const child of children) {
      for (const descriptor of keyDescriptors) {
        const [type, key] = descriptor.split(':');
        if (type === 'o') {
          child[key] = { ...options[key], ...child[key] };
        } else {
          child[key] = child[key] ? child[key] : options[key];
        }
      }
    }
  });
}

function inferCoordinates(coordinates: CoordinatesOptions) {
  return [...coordinates, { type: 'cartesian' }];
}
