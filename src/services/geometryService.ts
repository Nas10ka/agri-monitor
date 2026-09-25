import type { FieldFeature, GeoPosition } from '../domain/models';

const EPSILON = 1e-10;

const isPointOnSegment = (
  x: number,
  y: number,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): boolean  => {
  const crossProduct = (y - startY) * (endX - startX) - (x - startX) * (endY - startY);

  if (Math.abs(crossProduct) > EPSILON) {
    return false;
  }

  const withinLongitude = x >= Math.min(startX, endX) - EPSILON && x <= Math.max(startX, endX) + EPSILON;
  const withinLatitude = y >= Math.min(startY, endY) - EPSILON && y <= Math.max(startY, endY) + EPSILON;

  return withinLongitude && withinLatitude;
}

export const isPositionInsideField = (position: GeoPosition, field: FieldFeature): boolean => {
  const ring = field.geometry.coordinates[0];

  if (!ring || ring.length < 4) {
    return false;
  }

  const x = position.longitude;
  const y = position.latitude;
  let isInside = false;

  for (let currentIndex = 0, previousIndex = ring.length - 1; currentIndex < ring.length; previousIndex = currentIndex++) {
    const current = ring[currentIndex];
    const previous = ring[previousIndex];

    if (!current || !previous) {
      continue;
    }

    const [currentX, currentY] = current;
    const [previousX, previousY] = previous;

    if (isPointOnSegment(x, y, currentX, currentY, previousX, previousY)) {
      return true;
    }

    const intersects =
      currentY > y !== previousY > y &&
      x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX;

    if (intersects) {
      isInside = !isInside;
    }
  }

  return isInside;
}

export const toLeafletPositions = (field: FieldFeature): [number, number][] => {
  const ring = field.geometry.coordinates[0] ?? [];
  return ring.map(([longitude, latitude]) => [latitude, longitude]);
}
