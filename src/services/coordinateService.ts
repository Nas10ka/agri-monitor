import { forward } from 'mgrs';
import type { GeoPosition } from '../domain/models';

export function toMgrs({ latitude, longitude }: GeoPosition): string {
  return forward([longitude, latitude], 5);
}

export function formatCoordinate(value: number): string {
  return value.toFixed(6);
}
