import { firstOf, map } from '@/utils';
import { categoricalColors } from './theme';

export function inferEncodings(
  type: string | undefined,
  data: Array<Record<string, any>>,
  encodings: Record<string, any>,
): Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined> {
  const typedEncodings: Record<
    string,
    { type: 'transform' | 'value' | 'field' | 'constant'; value: any }
  > = map(encodings, (encoding, key) => ({
    type: inferType(data, encoding, key),
    value: encoding,
  }));

  switch (type) {
    case 'interval':
      return maybeFill(maybeZeroX(maybeZeroY1(typedEncodings)));
    case 'line':
      return maybeStroke(maybeGroup(typedEncodings));
    case 'area':
      return maybeFill(maybeIdentityX(maybeZeroY1(maybeGroup(typedEncodings))));
    case 'link':
      return maybeStroke(maybeIdentityX(typedEncodings));
    case 'point':
      return maybeStroke(maybeZeroY(typedEncodings));
    case 'rect':
      return maybeFill(maybeZeroX1(maybeZeroY1(typedEncodings)));
    case 'cell':
      return maybeFill(typedEncodings);
    default:
      break;
  }
  return typedEncodings;
}

export function valueOf(
  data: Array<Record<string, any>>,
  {
    type,
    value,
  }: {
    type: 'transform' | 'value' | 'field';
    value: any;
  },
) {
  if (type === 'transform') return data.map(value);
  if (type === 'value') return data.map(() => value);
  if (type === 'field') return data.map((d) => d[value]);
  return [];
}

function inferType(data: Array<Record<string, any>>, encoding: any, name: string) {
  if (typeof encoding === 'function') return 'transform';
  if (typeof encoding === 'string') {
    if (data.length && firstOf(data)[encoding] !== undefined) return 'field';
    if (isStyle(name)) return 'constant';
  }
  return 'value';
}

function isStyle(name: string) {
  return name === 'fill' || name === 'stroke';
}

function maybeFill({
  fill = color(),
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { fill, ...rest };
}

function maybeStroke({
  stroke = color(),
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { stroke, ...rest };
}

function maybeZeroX({
  x = zero(),
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { x, ...rest };
}

function maybeZeroY({
  y = zero(),
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { y, ...rest };
}

function maybeZeroX1({
  x1 = zero(),
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { x1, ...rest };
}

function maybeZeroY1({
  y1 = zero(),
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { y1, ...rest };
}

function maybeIdentityX({
  x,
  x1 = x,
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  return { x, x1, ...rest };
}

function maybeGroup({
  fill,
  stroke,
  z,
  ...rest
}: Record<string, { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined>) {
  if (z === undefined) z = maybeField(fill) ?? maybeField(stroke);
  return { fill, stroke, z, ...rest };
}

function maybeField(
  encoding: { type: 'transform' | 'value' | 'field' | 'constant'; value: any } | undefined,
) {
  if (encoding === undefined || encoding.type !== 'field') return undefined;
  return encoding;
}

function zero(): { type: 'value'; value: 0 } {
  return { type: 'value', value: 0 };
}

function color(): { type: 'constant'; value: string } {
  return { type: 'constant', value: categoricalColors[0] };
}
