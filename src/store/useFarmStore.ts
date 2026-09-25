import { create } from 'zustand';
import { FIELDS } from '../data/fields';
import type { MonitoringPoint } from '../domain/models';

interface FarmState {
  activeFieldId: string;
  points: MonitoringPoint[];
  setActiveField: (fieldId: string) => void;
  addPoint: (point: MonitoringPoint) => void;
  deletePoint: (pointId: string) => void;
}

const initialField = FIELDS[0];

if (!initialField) {
  throw new Error('At least one field is required to initialize the application.');
}

export const useFarmStore = create<FarmState>((set) => ({
  activeFieldId: initialField.properties.id,
  points: [],
  setActiveField: (fieldId) => set({ activeFieldId: fieldId }),
  addPoint: (point) => set((state) => ({ points: [...state.points, point] })),
  deletePoint: (pointId) =>
    set((state) => ({ points: state.points.filter((point) => point.id !== pointId) })),
}));
