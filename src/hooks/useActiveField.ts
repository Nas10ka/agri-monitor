import { FIELDS } from '../data/fields';
import { useFarmStore } from '../store/useFarmStore';

export const useActiveField = () => {
  const activeFieldId = useFarmStore((state) => state.activeFieldId);
  return FIELDS.find((field) => field.properties.id === activeFieldId) ?? FIELDS[0];
}
