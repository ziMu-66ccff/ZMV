import type { Coordinate, Scale } from '@/types';
import { gridCircular, gridHorizontal, gridRay, gridVertical } from './grid';
import { tickCircular, ticksLeft, ticksTop } from './ticks';
import { labelLeftUp, labelTopRight } from './label';
import { createAxis } from './axis';

export const axisYComponents = {
  '00': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      0,
      Number(scale(d)) + Number(offset),
    ],
    end: (coordinate: Coordinate) => coordinate([1, 0]),
    grid: gridHorizontal,
    ticks: ticksLeft,
    label: labelLeftUp,
  },
  '01': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      0,
      Number(scale(d)) + Number(offset),
    ],
    end: (coordinate: Coordinate) => coordinate([1, 0]),
    grid: gridVertical,
    ticks: ticksTop,
    label: labelTopRight,
  },
  '10': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      0,
      Number(scale(d)) + Number(offset),
    ],
    end: (coordinate: Coordinate) => coordinate.center(),
    grid: gridCircular,
    ticks: ticksLeft,
    label: undefined,
  },
  '11': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      0,
      Number(scale(d)) + Number(offset),
    ],
    end: (coordinate: Coordinate) => coordinate.center(),
    grid: gridRay,
    ticks: tickCircular,
    label: undefined,
  },
};

export const axisY = createAxis(axisYComponents);
