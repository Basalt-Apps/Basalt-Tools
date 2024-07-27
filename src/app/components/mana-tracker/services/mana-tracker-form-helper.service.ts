import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ControlsOf} from "../../../models/controls-of.type";
import {ManaTrackerMaxManaForm} from "../models/mana-tracker-form.interface";
import {ManaTrackerSpellSpecForm} from "../models/mana-tracker-spell-spec.form";
import {SpellCostValidator} from "../validators/spell-cost.validator";

@Injectable({
  providedIn: 'root'
})
export class ManaTrackerFormHelperService {
  public makeMaxManaForm(): FormGroup<ControlsOf<ManaTrackerMaxManaForm>> {
    return new FormGroup<ControlsOf<ManaTrackerMaxManaForm>>({
      level: new FormControl<number>(1, {nonNullable: true}),
      currentMana: new FormControl<number>(0, {nonNullable: true}),
      extraManaMax: new FormControl<number>(0, {nonNullable: true}),
      maxMana: new FormControl<number>(0, {nonNullable: true}),
      blessing: new FormControl<ManaTrackerMaxManaForm['blessing']>("none", {nonNullable: true})
    })
  }

  public makeSpellSpecForm(): FormGroup<ControlsOf<ManaTrackerSpellSpecForm>> {
    return new FormGroup<ControlsOf<ManaTrackerSpellSpecForm>>({
      baseCostSum: new FormControl<number>(0, {
        nonNullable: true, validators: [Validators.required, Validators.min(0)]
      }),
      range: new FormControl<number>(0, {
        nonNullable: true, validators: [Validators.required, Validators.min(0)]
      }),
      complexity: new FormControl<number>(1, {
        nonNullable: true, validators: [Validators.required, Validators.min(1)]
      }),
      cost: new FormControl<number>(0, {
        nonNullable: true
      }),
    })
  }
}