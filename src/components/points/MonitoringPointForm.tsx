import { useMemo, useState, type FormEvent, type ChangeEvent } from 'react';
import { POINT_TYPE_OPTIONS } from '../../constants';
import type { GeoPosition, MonitoringPoint, PointType } from '../../domain/models';
import { formatCoordinate, toMgrs } from '../../services/coordinateService';

interface MonitoringPointFormProps {
  fieldId: string;
  position: GeoPosition;
  onSubmit: (point: MonitoringPoint) => void;
  onCancel: () => void;
}

export const MonitoringPointForm = ({ fieldId, position, onSubmit, onCancel }: MonitoringPointFormProps) => {
  const [type, setType] = useState<PointType>('soil');
  const [description, setDescription] = useState('');
  const mgrsValue = useMemo(() => toMgrs(position), [position]);

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => setType(event.target.value as PointType);

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      id: crypto.randomUUID(),
      fieldId,
      ...position,
      mgrs: mgrsValue,
      type,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="block text-slate-400">Latitude</span>
            <span className="font-mono">{formatCoordinate(position.latitude)}</span>
          </div>
          <div>
            <span className="block text-slate-400">Longitude</span>
            <span className="font-mono">{formatCoordinate(position.longitude)}</span>
          </div>
        </div>
        <div className="mt-2 border-t border-slate-200 pt-2">
          <span className="block text-slate-400">MGRS</span>
          <span className="break-all font-mono">{mgrsValue}</span>
        </div>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-slate-700">Тип точки</span>
        <select
          value={type}
          onChange={handleTypeChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          {POINT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-slate-700">Опис</span>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          maxLength={300}
          rows={3}
          placeholder="Необов'язково"
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <span className="mt-1 block text-right text-[11px] text-slate-400">{description.length}/300</span>
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Скасувати
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Додати точку
        </button>
      </div>
    </form>
  );
}
