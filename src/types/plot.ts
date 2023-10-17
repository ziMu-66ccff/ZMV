import type { RenderPlugin } from '.';

export interface ZMVNode {
  renderer?: RenderPlugin;
  width?: number | string;
  height?: number | string;
  type?: ContainnerType | CharType;
  data?: Array<Record<string, any>>;
  transforms?: TransformsOptions;
  encodings?: EncodingsOptions;
  scales?: ScaleOptions;
  statistics?: StatisticsOptions;
  coordinates?: CoordinatesOptions;
  guides?: GuidesOptions;
  styles?: StyleOptions;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  children?: ZMVNode[];
  [key: string]: any;
}

export interface CharNode {
  type?: CharType;
  data?: Array<Record<string, any>>;
  transforms?: TransformsOptions;
  encodings?: EncodingsOptions;
  scales?: ScaleOptions;
  statistics?: StatisticsOptions;
  coordinates?: CoordinatesOptions;
  guides?: GuidesOptions;
  styles?: StyleOptions;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  [key: string]: any;
}

export type ScaleOptions = Record<
  string,
  {
    type?: string;
    domain?: any[];
    range?: Array<string | number>;
    label?: string | null;
    nice?: boolean;
    tickCount?: number;
    padding?: number;
    margin?: number;
    zero?: boolean;
    interpolate?: (...args: any[]) => any;
  }
>;

export type StatisticsOptions = Array<
  | {
      type: 'stackY' | 'normalizeY' | 'symmetryY';
    }
  | { type: 'binX'; channel?: string; count?: number }
>;

export type CoordinatesOptions = Array<{
  type: 'transpose' | 'polar' | 'cartesian';
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}>;

export type EncodingsOptions = Record<string, any>;

export interface GuidesOptions {
  x?: {
    type?: 'axisX' | 'axisY';
    domain?: any[];
    label?: string;
    display?: boolean;
    grid?: boolean;
    tick?: boolean;
    tickCount?: number;
    formatter?: (d: any) => any;
  };
  y?: {
    type?: 'axisX' | 'axisY';
    domain?: any[];
    label?: string;
    display?: boolean;
    grid?: boolean;
    tick?: boolean;
    tickCount?: number;
    formatter?: (d: any) => any;
  };
  color?:
    | {
        type?: 'legendRamp';
        domain?: any[];
        label?: string;
        display?: boolean;
        x?: number | string;
        y?: number | string;
        width?: number | string;
        height?: number | string;
        tickCount?: number | string;
        tickLength?: number | string;
        fontSize?: number | string;
        formatter?: (d: any) => any;
      }
    | {
        type?: 'legendSwatches';
        domain?: any[];
        label?: string;
        display?: boolean;
        x?: number | string;
        y?: number | string;
        width?: number | string;
        marginLeft?: number | string;
        swatcherSize?: number | string;
        fontSize?: number | string;
        formatter?: (d: any) => any;
      };
}

export type TransformsOptions = Array<(data: any) => any>;

export type StyleOptions = Record<string, any>;

export type ContainnerType = 'layer' | 'col' | 'row';
export type CharType =
  | 'area'
  | 'cell'
  | 'interval'
  | 'line'
  | 'link'
  | 'point'
  | 'rect'
  | 'text'
  | 'facet';

export interface GeometryOptions {
  type?: CharType;
  data?: Array<Record<string, any>>;
  encodings?: EncodingsOptions;
  statistics?: StatisticsOptions;
  transforms?: TransformsOptions;
  styles?: StyleOptions;
}
