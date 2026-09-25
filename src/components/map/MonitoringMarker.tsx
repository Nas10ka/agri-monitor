import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { POINT_TYPE_OPTIONS } from '../../constants';
import type { MonitoringPoint } from '../../domain/models';
import { formatCreatedAt } from '../../utils/date';

interface MonitoringMarkerProps {
  point: MonitoringPoint;
}

function createMarkerIcon(point: MonitoringPoint) {
  const option = POINT_TYPE_OPTIONS.find((candidate) => candidate.value === point.type) ?? POINT_TYPE_OPTIONS[3];

  if (!option) {
    throw new Error(`Unsupported monitoring point type: ${point.type}`);
  }

  return L.divIcon({
    className: 'monitoring-marker-wrapper',
    html: `<div class="monitoring-marker ${option.markerClassName}" aria-hidden="true">${option.glyph}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

export function MonitoringMarker({ point }: MonitoringMarkerProps) {
  const type = POINT_TYPE_OPTIONS.find((option) => option.value === point.type);

  return (
    <Marker position={[point.latitude, point.longitude]} icon={createMarkerIcon(point)}>
      <Popup>
        <div className="min-w-48 text-sm">
          <p className="font-semibold">{type?.label ?? 'Моніторингова точка'}</p>
          <p className="mt-1 text-slate-600">{point.description || 'Без опису'}</p>
          <p className="mt-2 text-xs text-slate-500">{formatCreatedAt(point.createdAt)}</p>
          <p className="mt-1 break-all text-xs text-slate-500">MGRS: {point.mgrs}</p>
        </div>
      </Popup>
    </Marker>
  );
}
