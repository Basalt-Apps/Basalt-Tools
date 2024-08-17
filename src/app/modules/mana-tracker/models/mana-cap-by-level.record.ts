import { ManaTrackerMaxManaForm } from './mana-tracker-form.interface';

export const ManaCapacityByLevel: Record<number, number> = {
  1: 10,
  2: 12,
  3: 14,
  4: 16,
  5: 18,
  6: 22,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 48,
  12: 56,
  13: 64,
  14: 70,
  15: 78,
  16: 88,
  17: 98,
  18: 108,
  19: 118,
  20: 128,
};

export const ManaMultiplierByBlessing: Record<
  ManaTrackerMaxManaForm['blessing'],
  number
> = {
  gluttony: 0.5,
  greed: 2,
  none: 1,
};
