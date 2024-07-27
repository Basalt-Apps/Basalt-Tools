import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {ControlsOf} from "../../models/controls-of.type";
import {ManaTrackerMaxManaForm} from "./models/mana-tracker-form.interface";
import {ManaTrackerFormHelperService} from "./services/mana-tracker-form-helper.service";
import {map, Observable} from "rxjs";
import {ManaCapacityByLevel, ManaMultiplierByBlessing} from "./models/mana-cap-by-level.record";
import {ManaTrackerSpellSpecForm} from "./models/mana-tracker-spell-spec.form";
import {SpellCostValidator} from "./validators/spell-cost.validator";
import {calculateSpellCost} from "./functions/calculate-spell-cost.func";
import {RouterLink} from "@angular/router";
import {publicPoolByLevel} from "./models/mana-tracker-public-pool";

@Component({
  selector: 'app-mana-tracker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './mana-tracker.component.html',
  styleUrl: './mana-tracker.component.scss'
})
export class ManaTrackerComponent implements OnInit {
  public maxManaForm!: FormGroup<ControlsOf<ManaTrackerMaxManaForm>>;
  public spellSpecForm!: FormGroup<ControlsOf<ManaTrackerSpellSpecForm>>;
  public addRemoveForm!: FormControl<number>;

  private maxManaOldValue!: ManaTrackerMaxManaForm;
  private spellSpecOldValue!: ManaTrackerSpellSpecForm;

  constructor(
    private formHelperService: ManaTrackerFormHelperService,
  ) {
  }

  public ngOnInit(): void {
    this.maxManaForm = this.formHelperService.makeMaxManaForm();
    this.spellSpecForm = this.formHelperService.makeSpellSpecForm();

    this.addRemoveForm = new FormControl<number>(0, {
      nonNullable: true, validators: [
        Validators.required, Validators.min(0),
      ]
    })

    this.loadValuesFromLocalStorage();

    this.maxManaForm.controls.maxMana.setValue(this.getMaxMana(this.maxManaForm.getRawValue()));
    this.spellSpecForm.setValidators(
      SpellCostValidator(this.maxManaForm.controls.currentMana.getRawValue()) as ValidatorFn
    )
    this.maxManaOldValue = this.maxManaForm.getRawValue();
    this.spellSpecOldValue = this.spellSpecForm.getRawValue();
    this.getMaxManaFormChanges().subscribe((changes: Partial<ManaTrackerMaxManaForm>) => {
      if (changes.level !== undefined) {
        const control = this.maxManaForm.controls.level;
        const value = control.getRawValue() as number | null;

        if (!value) {
          control.setValue(1);
          return this.recalculateMaxMana()
        }
        else if (value < 1 || value > 20) {
          control.setValue(value < 1 ? 1 : value > 20 ? 20 : value);
          return this.recalculateMaxMana()
        }
      }

      if (changes.currentMana !== undefined) {
        const control = this.maxManaForm.controls.currentMana;
        const value = control.getRawValue() as number | null;

        if (!value || value < 0) {
          control.setValue(0);
          return this.recalculateMaxMana()
        }
      }

      if (changes.extraManaMax !== undefined) {
        const control = this.maxManaForm.controls.extraManaMax;
        let value = control.getRawValue() as number | null;

        if (!value || value < 0) {
          control.setValue(0);
          return this.recalculateMaxMana()
        }
      }

      if (changes.level
        || changes.extraManaMax
        || changes.blessing
      ) this.recalculateMaxMana()

      if (changes.maxMana !== undefined) {
        const control = this.maxManaForm.controls.currentMana;
        if (control.getRawValue() > changes.maxMana) control.setValue(changes.maxMana)
      }

      if (changes.currentMana !== undefined) {
        const control = this.maxManaForm.controls.currentMana;
        let value = control.getRawValue() as number | null;

        const max = this.maxManaForm.controls.maxMana.getRawValue();
        const blessing = this.maxManaForm.controls.blessing.getRawValue();

        if (!value) return control.setValue(0);
        else if (value < 0) return control.setValue(0);
        else if (blessing != 'gluttony' && value > max)
          return control.setValue(max);

        this.spellSpecForm.clearValidators();
        this.spellSpecForm.setValidators(SpellCostValidator(changes.currentMana) as ValidatorFn)
        this.spellSpecForm.setValue(this.spellSpecForm.getRawValue())
      }

      this.saveValuesToLocalStorage(this.maxManaForm.getRawValue());
    })

    this.getSpellSpecFormChanges().subscribe((changes: Partial<ManaTrackerSpellSpecForm>) => {
      if (changes.range !== undefined) {
        const control = this.spellSpecForm.controls.range;
        const value = control.getRawValue();

        if (!value || value < 0) {
          control.setValue(0);
          return this.recalculateCost()
        }
      }

      if (changes.baseCostSum !== undefined) {
        const control = this.spellSpecForm.controls.baseCostSum;
        const value = control.getRawValue();

        if (!value || value < 0) {
          control.setValue(0);
          return this.recalculateCost()
        }
      }

      if (changes.patterns !== undefined) {
        const control = this.spellSpecForm.controls.patterns;
        const value = control.getRawValue();

        if (!value || value < 1) {
          control.setValue(1);
          return this.recalculateCost()
        }
      }

      if (changes.patterns
        || changes.baseCostSum
        || changes.range
      ) this.recalculateCost()
    });

    this.addRemoveForm.valueChanges.subscribe((value: number) => {
      if (!value) this.addRemoveForm.setValue(0);
      if (value < 0) this.addRemoveForm.setValue(0);
    })
  }

  private recalculateCost(): void {
    const controls = this.spellSpecForm.controls;

    const complexity = controls.patterns.getRawValue();
    const baseCostSum = controls.baseCostSum.getRawValue();
    const range = controls.range.getRawValue();

    controls.cost.setValue(calculateSpellCost({patterns: complexity, baseCostSum, range}))
  }

  private recalculateMaxMana(): void {
    const controls = this.maxManaForm.controls;

    const level = controls.level.getRawValue();
    const blessing = controls.blessing.getRawValue();
    const extraManaMax = controls.extraManaMax.getRawValue();

    controls.maxMana.setValue(this.getMaxMana({level, blessing, extraManaMax}))
  }

  public addRemove(mult: -1 | 1): void {
    if (this.addRemoveForm.invalid) return;

    const change = this.addRemoveForm.getRawValue();
    const old = this.maxManaForm.controls.currentMana.getRawValue();
    let newValue = old + change * mult;

    if (newValue < 0) return;
    const max = this.maxManaForm.controls.maxMana.getRawValue();

    this.addRemoveForm.setValue(0);

    if (this.maxManaForm.controls.blessing.getRawValue() !== 'gluttony')
      newValue = newValue > max ? max : newValue
    this.maxManaForm.controls.currentMana.setValue(newValue);
  }

  private getMaxManaFormChanges(): Observable<Partial<ManaTrackerMaxManaForm>> {
    return this.maxManaForm.valueChanges.pipe(map((values: Partial<ManaTrackerMaxManaForm>) => {
        const changes = {};

        for (const value in values) {
          const valueKey = value as keyof Partial<ManaTrackerMaxManaForm>;

          if (values[valueKey] !== this.maxManaOldValue[valueKey]) {
            // @ts-ignore
            changes[valueKey] = values[valueKey];
            // @ts-ignore
            this.maxManaOldValue[valueKey] = values[valueKey]
          }
        }

        return changes;
      })
    )
  }

  private getSpellSpecFormChanges(): Observable<Partial<ManaTrackerSpellSpecForm>> {
    return this.spellSpecForm.valueChanges.pipe(map((values: Partial<ManaTrackerSpellSpecForm>) => {
        const changes = {};

        for (const value in values) {
          const valueKey = value as keyof Partial<ManaTrackerSpellSpecForm>;

          if (values[valueKey] !== this.spellSpecOldValue[valueKey]) {
            // @ts-ignore
            changes[valueKey] = values[valueKey];
            // @ts-ignore
            this.spellSpecOldValue[valueKey] = values[valueKey]
          }
        }

        return changes;
      })
    )
  }

  public OnResetMana(): void {
    const controls = this.maxManaForm.controls

    controls.currentMana.setValue(controls.maxMana.getRawValue())
  }

  public onTurnEnd(): void {
    const controls = this.maxManaForm.controls;

    const current = controls.currentMana.getRawValue();
    const level = controls.level.getRawValue()

    controls.currentMana.setValue(current + publicPoolByLevel[level])
  }

  public onCastSpell(): void {
    if (this.spellSpecForm.invalid) return;

    const current = this.maxManaForm.controls.currentMana.getRawValue();
    const cost = this.spellSpecForm.controls.cost.getRawValue();

    this.maxManaForm.controls.currentMana.setValue(current - cost)
  }

  private getMaxMana(values: Omit<ManaTrackerMaxManaForm, 'maxMana' | 'currentMana'>): number {
    return ManaCapacityByLevel[values.level]
      * ManaMultiplierByBlessing[values.blessing]
      + values.extraManaMax;
  }

  private loadValuesFromLocalStorage(): void {
    const valuesRaw = localStorage.getItem('manaTrackerFormValues');
    if (!valuesRaw) return;

    this.maxManaForm.setValue(JSON.parse(valuesRaw));
  }

  private saveValuesToLocalStorage(values: ManaTrackerMaxManaForm) {
    const valuesJson = JSON.stringify(values);
    localStorage.setItem('manaTrackerFormValues', valuesJson)
  }

  protected readonly Math = Math;
}
