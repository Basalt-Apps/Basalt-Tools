import { ManaTrackerSpellSpecForm } from '../models/mana-tracker-spell-spec.form';

export const calculateSpellCost = ({
  baseCostSum,
  range,
  patterns,
}: Omit<ManaTrackerSpellSpecForm, 'cost'>): number =>
  Math.floor(
    baseCostSum *
      patternCountToComplexityMod(patterns) *
      (range != 0 ? 1 + Math.floor((range - 1) / 10) / 10 : 1),
  );

const patternCountToComplexityMod = (patternCount: number): number =>
  patternCount == 1
    ? 1
    : patternCount == 2
      ? 1.2
      : patternCount == 3
        ? 1.5
        : 2.0;
