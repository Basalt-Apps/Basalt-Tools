import {FormGroup, ValidationErrors} from "@angular/forms";
import {ControlsOf} from "../../../models/controls-of.type";
import {ManaTrackerSpellSpecForm} from "../models/mana-tracker-spell-spec.form";

export const SpellCostValidator = (max: number) => {
  return (form: FormGroup<ControlsOf<ManaTrackerSpellSpecForm>>):
    ValidationErrors | null => {
    const {cost} = form.getRawValue()

    if (cost > max) {
      return {tooMuch: true}
    }

    return null
  };
}
