export type PointType = 'soil' | 'pests' | 'disease' | 'other';

export type SortDirection = 'newest' | 'oldest';

export interface GeoPosition {
  latitude: number;
  longitude: number;
}

export interface FieldProperties {
  id: string;
  name: string;
  area: number;
  crop: string;
}

export interface FieldFeature {
  type: 'Feature';
  properties: FieldProperties;
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][];
  };
}

export interface MonitoringPoint extends GeoPosition {
  id: string;
  fieldId: string;
  mgrs: string;
  type: PointType;
  description: string;
  createdAt: string;
}

export interface PointFilters {
  type: PointType | 'all';
  search: string;
  sortDirection: SortDirection;
}
