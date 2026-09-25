import { describe, expect, it } from 'vitest';
import type { MonitoringPoint } from './models';
import { selectVisiblePoints } from './monitoringPointSelectors';

const POINTS: readonly MonitoringPoint[] = [
  {
    id: 'point-soil',
    fieldId: 'field-1',
    latitude: 50.45,
    longitude: 30.52,
    mgrs: '36UUA0000000000',
    type: 'soil',
    description: 'Північна проба ґрунту',
    createdAt: '2026-09-24T10:00:00.000Z',
  },
  {
    id: 'point-pests',
    fieldId: 'field-1',
    latitude: 50.451,
    longitude: 30.521,
    mgrs: '36UUA0000100001',
    type: 'pests',
    description: 'Сліди шкідників',
    createdAt: '2026-09-25T10:00:00.000Z',
  },
  {
    id: 'point-other-field',
    fieldId: 'field-2',
    latitude: 50.452,
    longitude: 30.522,
    mgrs: '36UUA0000200002',
    type: 'soil',
    description: 'Інше поле',
    createdAt: '2026-09-26T10:00:00.000Z',
  },
];

describe('selectVisiblePoints', () => {
  it('filters by type and description', () => {
    const result = selectVisiblePoints(POINTS, {
      type: 'soil',
      search: 'північна',
      sortDirection: 'newest',
    });

    expect(result.map((point) => point.id)).toEqual(['point-soil']);
  });

  it('sorts by creation date', () => {
    const result = selectVisiblePoints(POINTS, {
      type: 'all',
      search: '',
      sortDirection: 'newest',
    });

    expect(result.map((point) => point.id)).toEqual(['point-other-field', 'point-pests', 'point-soil']);
  });
});
