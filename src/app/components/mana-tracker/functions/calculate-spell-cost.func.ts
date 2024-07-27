import {ManaTrackerSpellSpecForm} from "../models/mana-tracker-spell-spec.form";

export const calculateSpellCost =
  ({baseCostSum, range, complexity}: Omit<ManaTrackerSpellSpecForm, 'cost'>): number =>
    Math.floor(baseCostSum * complexity * (range != 0
      ? 1 + Math.floor((range - 1) / 10) / 10
      : 1
    ))
