import type {
  createBand,
  createIdentity,
  createLinear,
  createLog,
  createOrdinal,
  createPoint,
  createQuantile,
  createQuantize,
  createThreshold,
  createTime,
} from '@/scale';

export type Scale = ReturnType<
  | typeof createLinear
  | typeof createIdentity
  | typeof createOrdinal
  | typeof createBand
  | typeof createPoint
  | typeof createQuantile
  | typeof createThreshold
  | typeof createQuantize
  | typeof createTime
  | typeof createLog
>;
