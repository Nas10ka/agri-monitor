import type { MonitoringPoint, PointFilters } from './models';

export const selectVisiblePoints = (
  points: readonly MonitoringPoint[],
  filters: PointFilters,
): MonitoringPoint[] => {
  const normalizedSearch = filters.search.trim().toLocaleLowerCase('uk-UA');

  return [...points]
    .filter((point) => filters.type === 'all' || point.type === filters.type)
    .filter((point) =>
      normalizedSearch.length === 0
        ? true
        : point.description.toLocaleLowerCase('uk-UA').includes(normalizedSearch),
    )
    .sort((left, right) => {
      const difference = Date.parse(right.createdAt) - Date.parse(left.createdAt);
      return filters.sortDirection === 'newest' ? difference : -difference;
    });
}
