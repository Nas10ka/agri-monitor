import { useState } from 'react';
import { FieldDetails } from './components/fields/FieldDetails';
import { FieldList } from './components/fields/FieldList';
import { FarmMap } from './components/map/FarmMap';
import { MonitoringPointForm } from './components/points/MonitoringPointForm';
import { PointsPanel } from './components/points/PointsPanel';
import { Panel } from './components/ui/Panel';
import type { GeoPosition } from './domain/models';
import { useActiveField } from './hooks/useActiveField';
import { useFarmStore } from './store/useFarmStore';

export default function App() {
  const activeField = useActiveField();
  const activeFieldId = useFarmStore((state) => state.activeFieldId);
  const points = useFarmStore((state) => state.points);
  const setActiveField = useFarmStore((state) => state.setActiveField);
  const addPoint = useFarmStore((state) => state.addPoint);
  const [draftPosition, setDraftPosition] = useState<GeoPosition | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (!activeField) {
    return null;
  }

  const activePoints = points.filter((point) => point.fieldId === activeFieldId);

  const handleFieldSelect = (fieldId: string) : void => {
    setActiveField(fieldId);
    setDraftPosition(null);
    console.log('handleFieldSelect')
    setNotice(null);
    console.log(notice)
  }

  const handleAddPointRequest = (position: GeoPosition): void => {
    setDraftPosition(position);
    setNotice(null);
  }

  const handleInvalidPointRequest = (): void => {
    setDraftPosition(null);
    setNotice('Точку можна додати лише всередині активного поля.');
    console.log('handleInvalidPointRequest ',notice)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Agri Monitor</p>
            <h1 className="text-xl font-bold tracking-tight text-slate-950">Управління полями</h1>
          </div>
          <div className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:block">
            {activePoints.length} точок на активному полі
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 p-4 sm:p-6 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[290px_minmax(0,1fr)_360px]">
        <aside className="space-y-4">
          <FieldList />
          <Panel title="Інформація про поле">
            <FieldDetails field={activeField} />
          </Panel>
        </aside>

        <section className="min-w-0">
          {notice ? (
            <div role="status" className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice(null)} className="font-semibold underline decoration-amber-400 underline-offset-2">Закрити</button>
            </div>
          ) : null}
          <FarmMap
            activeField={activeField}
            points={points}
            onFieldSelect={handleFieldSelect}
            onAddPointRequest={handleAddPointRequest}
            onInvalidPointRequest={handleInvalidPointRequest}
          />
          <p className="mt-2 px-1 text-xs text-slate-500">Підказка: оберіть поле, а потім клікніть всередині його контуру, щоб створити моніторингову точку.</p>
        </section>

        <aside className="space-y-4 md:col-span-2 lg:col-span-1">
          {draftPosition ? (
            <Panel title="Нова моніторингова точка" subtitle="Координати отримано з кліку на карті">
              <MonitoringPointForm
                fieldId={activeFieldId}
                position={draftPosition}
                onCancel={() => setDraftPosition(null)}
                onSubmit={(point) => {
                  addPoint(point);
                  setDraftPosition(null);
                  setNotice('Моніторингову точку додано.');
                }}
              />
            </Panel>
          ) : (
            <Panel title="Додавання точки" subtitle="Клікніть всередині активного поля на карті">
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                Після кліку тут з'явиться форма з WGS 84 координатами, MGRS, типом точки та описом.
              </div>
            </Panel>
          )}
          <PointsPanel />
        </aside>
      </div>
    </main>
  );
}
