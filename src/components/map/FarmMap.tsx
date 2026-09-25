import { useEffect } from 'react';
import L, { type LeafletMouseEvent } from 'leaflet';
import { MapContainer, Polygon, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { DEFAULT_MAP_CENTER } from '../../constants';
import { FIELDS } from '../../data/fields';
import type { FieldFeature, GeoPosition, MonitoringPoint } from '../../domain/models';
import { isPositionInsideField, toLeafletPositions } from '../../services/geometryService';
import { MonitoringMarker } from './MonitoringMarker';
import 'leaflet/dist/leaflet.css';

interface FarmMapProps {
  activeField: FieldFeature;
  points: readonly MonitoringPoint[];
  onFieldSelect: (fieldId: string) => void;
  onAddPointRequest: (position: GeoPosition) => void;
  onInvalidPointRequest: () => void;
}

interface MapClickHandlerProps {
  activeField: FieldFeature;
  onAddPointRequest: (position: GeoPosition) => void;
  onInvalidPointRequest: () => void;
}

const MapClickHandler = ({ activeField, onAddPointRequest, onInvalidPointRequest }: MapClickHandlerProps) => {
  useMapEvents({
    click(event) {
      const position = { latitude: event.latlng.lat, longitude: event.latlng.lng };

      if (!isPositionInsideField(position, activeField)) {
        onInvalidPointRequest();
        console.log('test')
        return;
      }

      onAddPointRequest(position);
    },
  });

  return null;
}

const ActiveFieldViewport = ({ field }: { field: FieldFeature }) => {
  const map = useMap();

  useEffect(() => {
    const positions = toLeafletPositions(field);

    if (positions.length === 0) {
      return;
    }

    const bounds = L.latLngBounds(positions);
    map.flyToBounds(bounds, { padding: [42, 42], maxZoom: 15, duration: 0.6 });
  }, [field, map]);

  return null;
}

export const FarmMap = ({
  activeField,
  points,
  onFieldSelect,
  onAddPointRequest,
  onInvalidPointRequest,
}: FarmMapProps) => (
    <div className="h-[460px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-panel lg:h-[calc(100vh-8.5rem)] lg:min-h-[620px]">
      <MapContainer center={DEFAULT_MAP_CENTER} zoom={13} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution="Tiles &copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {FIELDS.map((field) => {
          const isActive = field.properties.id === activeField.properties.id;

          return (
            <Polygon
              key={field.properties.id}
              positions={toLeafletPositions(field)}
              pathOptions={{
                color: isActive ? '#047857' : '#64748b',
                weight: isActive ? 4 : 2,
                fillColor: isActive ? '#34d399' : '#cbd5e1',
                fillOpacity: isActive ? 0.38 : 0.2,
              }}
              eventHandlers={{
                click: (event: LeafletMouseEvent) => {
                  L.DomEvent.stopPropagation(event.originalEvent);

                  if (!isActive) {
                    onFieldSelect(field.properties.id);
                    return;
                  }

                  onAddPointRequest({
                    latitude: event.latlng.lat,
                    longitude: event.latlng.lng,
                  });
                },
              }}
            />
          );
        })}

        {points.map((point) => (
          <MonitoringMarker key={point.id} point={point} />
        ))}

        <ActiveFieldViewport field={activeField} />
        <MapClickHandler
          activeField={activeField}
          onAddPointRequest={onAddPointRequest}
          onInvalidPointRequest={onInvalidPointRequest}
        />
      </MapContainer>
    </div>
  );

