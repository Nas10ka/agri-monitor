import type { PointType } from './domain/models';

export interface PointTypeOption {
  value: PointType;
  label: string;
  markerClassName: string;
  glyph: string;
}

export const POINT_TYPE_OPTIONS: readonly PointTypeOption[] = [
  { value: 'soil', label: 'Проба ґрунту', markerClassName: 'marker-soil', glyph: '🌱' },
  { value: 'pests', label: 'Шкідники', markerClassName: 'marker-pests', glyph: '🐛' },
  { value: 'disease', label: 'Хвороби рослин', markerClassName: 'marker-disease', glyph: '🍂' },
  { value: 'other', label: 'Інше', markerClassName: 'marker-other', glyph: '📍' },
] as const;

export const DEFAULT_MAP_CENTER: [number, number] = [50.262, 31.055];
