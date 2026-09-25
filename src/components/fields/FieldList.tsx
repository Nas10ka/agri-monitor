import { FIELDS } from '../../data/fields';
import { useFarmStore } from '../../store/useFarmStore';
import { Panel } from '../ui/Panel';

export const FieldList = () => {
  const activeFieldId = useFarmStore((state) => state.activeFieldId);
  const setActiveField = useFarmStore((state) => state.setActiveField);
  const points = useFarmStore((state) => state.points);

  return (
    <Panel title="Поля" subtitle="Оберіть поле зі списку або безпосередньо на карті">
      <div className="space-y-2">
        {FIELDS.map((field) => {
          const { id, name, area, crop } = field.properties;
          const isActive = id === activeFieldId;
          const pointCount = points.filter((point) => point.fieldId === id).length;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveField(id)}
              className={`w-full rounded-xl border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{name}</p>
                  <p className="mt-1 text-xs text-slate-500">{crop} · {area.toFixed(1)} га</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                  {pointCount}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
