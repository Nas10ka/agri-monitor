import { POINT_TYPE_OPTIONS } from '../../constants';
import { FIELDS } from '../../data/fields';
import type { MonitoringPoint } from '../../domain/models';
import { formatCoordinate } from '../../services/coordinateService';
import { formatCreatedAt } from '../../utils/date';

interface PointListItemProps {
  point: MonitoringPoint;
  onDelete: (pointId: string) => void;
}

export const PointListItem = ({ point, onDelete }: PointListItemProps) =>  {
  const type = POINT_TYPE_OPTIONS.find((option) => option.value === point.type);
  const fieldName = FIELDS.find((field) => field.properties.id === point.fieldId)?.properties.name ?? point.fieldId;

  const handlePointRemove = () => onDelete(point.id);

  return (
    <article className="rounded-xl border border-slate-200 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${type?.markerClassName ?? 'bg-slate-500'}`}>
              {type?.glyph ?? '•'}
            </span>
            <p className="truncate text-sm font-semibold text-slate-800">{type?.label ?? 'Інше'}</p>
          </div>
          <p className="mt-1 text-[11px] font-medium text-emerald-700">{fieldName}</p>
          <p className="mt-2 text-xs leading-5 text-slate-600">{point.description || 'Без опису'}</p>
        </div>
        <button
          type="button"
          onClick={handlePointRemove}
          className="rounded-lg px-2 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
          aria-label={`Видалити точку ${type?.label ?? point.id}`}
        >
          Видалити
        </button>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
        <div>
          <dt className="text-slate-400">Lat</dt>
          <dd className="font-mono text-slate-600">{formatCoordinate(point.latitude)}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Lng</dt>
          <dd className="font-mono text-slate-600">{formatCoordinate(point.longitude)}</dd>
        </div>
        <div className="col-span-2 mt-1">
          <dt className="text-slate-400">MGRS</dt>
          <dd className="break-all font-mono text-slate-600">{point.mgrs}</dd>
        </div>
        <div className="col-span-2 mt-1">
          <dt className="text-slate-400">Створено</dt>
          <dd className="text-slate-600">{formatCreatedAt(point.createdAt)}</dd>
        </div>
      </dl>
    </article>
  );
}
