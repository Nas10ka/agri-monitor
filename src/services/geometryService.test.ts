import { describe, expect, it } from 'vitest';
import { FIELDS } from '../data/fields';
import { isPositionInsideField } from './geometryService';

const field = FIELDS[0];

if (!field) {
  throw new Error('Test field is missing.');
}

describe('isPositionInsideField', () => {
  it('returns true for a position inside the polygon', () => {
    expect(
      isPositionInsideField(
        {
          latitude: 50.267785,
          longitude: 31.048291,
        },
        field,
      ),
    ).toBe(true);
  });

  it('treats a boundary position as inside', () => {
    expect(
      isPositionInsideField(
        {
          latitude: 50.268372,
          longitude: 31.031403,
        },
        field,
      ),
    ).toBe(true);
  });

  it('returns false for a position outside the polygon', () => {
    expect(
      isPositionInsideField(
        {
          latitude: 50.29,
          longitude: 31.1,
        },
        field,
      ),
    ).toBe(false);
  });
});