export interface ManaTrackerMaxManaForm {
  level: number;
  maxMana: number;
  blessing: 'none' | 'greed' | 'gluttony';
  extraManaMax: number;
  currentMana: number;
}
