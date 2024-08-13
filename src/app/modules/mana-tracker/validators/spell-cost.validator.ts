import { FormGroup, ValidationErrors } from '@angular/forms';
import { ManaTrackerSpellSpecForm } from '../models/mana-tracker-spell-spec.form';
import { ControlsOf } from '../../shared/models/controls-of.type';

export const SpellCostValidator = (max: number) => {
  return (
    form: FormGroup<ControlsOf<ManaTrackerSpellSpecForm>>,
  ): ValidationErrors | null => {
    const { cost } = form.getRawValue();

    if (cost > max) {
      return { tooMuch: true };
    }

    return null;
  };
};
