import { useMemo, useState } from 'react';
import type { PointFilters as PointFiltersValue } from '../../domain/models';
import { selectVisiblePoints } from '../../domain/monitoringPointSelectors';
import { useFarmStore } from '../../store/useFarmStore';
import { EmptyState } from '../ui/EmptyState';
import { Panel } from '../ui/Panel';
import { PointFilters } from './PointFilters';
import { PointListItem } from './PointListItem';

const INITIAL_FILTERS: PointFiltersValue = {
  type: 'all',
  search: '',
  sortDirection: 'newest',
};

export const PointsPanel = () => {
  const points = useFarmStore((state) => state.points);
  const deletePoint = useFarmStore((state) => state.deletePoint);
  const [filters, setFilters] = useState<PointFiltersValue>(INITIAL_FILTERS);

  const visiblePoints = useMemo(
    () => selectVisiblePoints(points, filters),
    [filters, points],
  );

  return (
    <Panel
      title="Моніторингові точки"
      subtitle={`${visiblePoints.length} з ${points.length} доданих точок`}
    >
      <PointFilters value={filters} onChange={setFilters} />
      <div className="mt-4 max-h-[430px] space-y-2 overflow-y-auto pr-1 lg:max-h-[calc(100vh-33rem)] lg:min-h-40">
        {visiblePoints.length === 0 ? (
          <EmptyState
            title="Точки не знайдено"
            description="Клікніть всередині активного поля на карті або змініть фільтри."
          />
        ) : (
          visiblePoints.map((point) => (
            <PointListItem key={point.id} point={point} onDelete={deletePoint} />
          ))
        )}
      </div>
    </Panel>
  );
}
