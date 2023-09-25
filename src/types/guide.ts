import type { createAxis } from '@/guide';
import type { axisXComponents } from '@/guide/axisX';
import type { axisYComponents } from '@/guide/axisY';

export type AxisComponents = typeof axisXComponents | typeof axisYComponents;
export type TransformType = `00` | `01` | `10` | `11`;
export type Axis = ReturnType<typeof createAxis>;
