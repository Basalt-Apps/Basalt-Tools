import {FormGroup} from "@angular/forms";
import {ControlsOf} from "../../../models/controls-of.type";
import {ManaTrackerSpellSpecForm} from "../models/mana-tracker-spell-spec.form";
import {calculateSpellCost} from "../functions/calculate-spell-cost.func";

export const SpellCostValidator = (max: number) => {
  console.log('reset', max)

  return (form: FormGroup<ControlsOf<ManaTrackerSpellSpecForm>>): { [key: string]: any } | null => {
    const { cost } = form.getRawValue()

    console.log('wah', max, cost, form.getRawValue())

    if (cost > max) {
      return {tooMuch: true}
    }

    return null
  };
}
