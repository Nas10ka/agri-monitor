import type { FieldFeature } from '../../domain/models';

interface FieldDetailsProps {
  field: FieldFeature;
}

export const FieldDetails = ({ field }: FieldDetailsProps) => {
  const { name, area, crop } = field.properties;

  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm">
      <div className="col-span-2">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Активне поле</p>
        <p className="mt-1 font-semibold text-slate-900">{name}</p>
      </div>
      <div>
        <p className="text-xs text-slate-500">Культура</p>
        <p className="font-medium text-slate-800">{crop}</p>
      </div>
      <div>
        <p className="text-xs text-slate-500">Площа</p>
        <p className="font-medium text-slate-800">{area.toFixed(1)} га</p>
      </div>
    </div>
  );
}
