import type { Coordinate, Scale } from '@/types';
import { gridCircular, gridHorizontal, gridRay, gridVertical } from './grid';
import { tickCircular, ticksBottom, ticksLeft } from './ticks';
import { labelBottomRight, labelLeftDown } from './label';
import { createAxis } from './axis';

export const axisXComponents = {
  '00': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      Number(scale(d)) + Number(offset),
      1,
    ],
    end: (coordinate: Coordinate) => coordinate([0, 0]),
    grid: gridVertical,
    ticks: ticksBottom,
    label: labelBottomRight,
  },
  '01': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      Number(scale(d)) + Number(offset),
      1,
    ],
    end: (coordinate: Coordinate) => coordinate([0, 0]),
    grid: gridHorizontal,
    ticks: ticksLeft,
    label: labelLeftDown,
  },
  '10': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      Number(scale(d)) + Number(offset),
      0,
    ],
    end: (coordinate: Coordinate) => coordinate.center(),
    grid: gridRay,
    ticks: tickCircular,
    label: undefined,
  },
  '11': {
    start: (d: number | string, scale: Scale, offset: number | string) => [
      Number(scale(d)) + Number(offset),
      1,
    ],
    end: (coordinate: Coordinate) => coordinate.center(),
    grid: gridCircular,
    ticks: ticksLeft,
    label: undefined,
  },
};

export const axisX = createAxis(axisXComponents);
