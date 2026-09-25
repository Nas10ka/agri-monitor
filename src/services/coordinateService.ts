import { forward } from 'mgrs';
import type { GeoPosition } from '../domain/models';

export const toMgrs = ({ latitude, longitude }: GeoPosition): string => forward([longitude, latitude], 5);


export const formatCoordinate = (value: number): string => value.toFixed(6);

