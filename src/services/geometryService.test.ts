import { describe, expect, it } from 'vitest';
import { FIELDS } from '../data/fields';
import { isPositionInsideField } from './geometryService';

const field = FIELDS[0];

if (!field) {
  throw new Error('Test field is missing.');
}

describe('isPositionInsideField', () => {
  it('returns true for a position inside the polygon', () => {
    expect(isPositionInsideField({ latitude: 50.455, longitude: 30.528 }, field)).toBe(true);
  });

  it('treats a boundary position as inside', () => {
    expect(isPositionInsideField({ latitude: 50.4501, longitude: 30.528 }, field)).toBe(true);
  });

  it('returns false for a position outside the polygon', () => {
    expect(isPositionInsideField({ latitude: 50.47, longitude: 30.55 }, field)).toBe(false);
  });
});
