import { POINT_TYPE_OPTIONS } from '../../constants';
import type { PointFilters as PointFiltersValue, PointType, SortDirection } from '../../domain/models';

interface PointFiltersProps {
  value: PointFiltersValue;
  onChange: (filters: PointFiltersValue) => void;
}

export function PointFilters({ value, onChange }: PointFiltersProps) {
  return (
    <div className="space-y-2">
      <input
        type="search"
        value={value.search}
        onChange={(event) => onChange({ ...value, search: event.target.value })}
        placeholder="Пошук за описом..."
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
      <div className="grid grid-cols-2 gap-2">
        <select
          value={value.type}
          onChange={(event) => onChange({ ...value, type: event.target.value as PointType | 'all' })}
          aria-label="Фільтр за типом"
          className="min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="all">Усі типи</option>
          {POINT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select
          value={value.sortDirection}
          onChange={(event) => onChange({ ...value, sortDirection: event.target.value as SortDirection })}
          aria-label="Сортування за датою"
          className="min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="newest">Спочатку нові</option>
          <option value="oldest">Спочатку старі</option>
        </select>
      </div>
    </div>
  );
}
