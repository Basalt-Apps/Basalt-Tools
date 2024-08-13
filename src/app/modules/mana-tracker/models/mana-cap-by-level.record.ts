import { ManaTrackerMaxManaForm } from './mana-tracker-form.interface';

export const ManaCapacityByLevel: Record<number, number> = {
  1: 1000,
  2: 1200,
  3: 1400,
  4: 1600,
  5: 1800,
  6: 2250,
  7: 2700,
  8: 3150,
  9: 3600,
  10: 4050,
  11: 4800,
  12: 5550,
  13: 6300,
  14: 7050,
  15: 7800,
  16: 8800,
  17: 9800,
  18: 10800,
  19: 11800,
  20: 12800,
};

export const ManaMultiplierByBlessing: Record<
  ManaTrackerMaxManaForm['blessing'],
  number
> = {
  gluttony: 0.5,
  greed: 2,
  none: 1,
};
