import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from '../shared/components/number-input/number-input.component';
import { ControlsOf } from '../shared/models/controls-of.type';
import { SPTForm } from './models/spt-form.interface';
import { SPTFormHelperService } from './services/spt-form-helper.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SptSlotsByLevel } from './models/spt-slots-by.level';
import { map, Observable } from 'rxjs';
import { SptPointsBySpellLevel } from './models/spt-points-by-spell-level.const';
import { OverlayService } from '../root/services/overlay.service';

@Component({
  selector: 'basalt-spell-point-tracker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NumberInputComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './spell-point-tracker.component.html',
  styleUrl: './spell-point-tracker.component.scss',
})
export class SpellPointTrackerComponent implements OnInit, OnDestroy {
  public form!: FormGroup<ControlsOf<SPTForm>>;
  public maxSignal = signal<number>(0);
  public currentSignal = signal<number>(0);
  public levelSignal = signal<number>(1);
  public spellLevelSignal!: Signal<number>;
  protected readonly SptPointsBySpellLevel = SptPointsBySpellLevel;
  protected readonly Math = Math;
  private oldFormValue!: SPTForm;

  constructor(
    private sptFormHelperService: SPTFormHelperService,
    private overlayService: OverlayService,
  ) {}

  public ngOnInit(): void {
    this.overlayService.setShowOverlays(true);
    this.form = this.sptFormHelperService.makeForm();
    this.loadFromStorage();
    this.oldFormValue = this.form.getRawValue();
    this.maxSignal.set(this.form.controls.max.getRawValue());
    this.currentSignal.set(this.form.controls.current.getRawValue());
    this.levelSignal.set(this.form.controls.level.getRawValue());

    this.spellLevelSignal = computed<number>(() => {
      const sptByLevel = SptSlotsByLevel[this.levelSignal()];
      const current = this.currentSignal();

      const maxSpellSlotLevel = sptByLevel.length;
      if (current < SptPointsBySpellLevel[maxSpellSlotLevel - 1]) {
        const number = SptPointsBySpellLevel.reduce(
          (max: number, currentValue: number) =>
            currentValue > max
              ? currentValue > current
                ? max
                : currentValue
              : max,
          0,
        );

        return SptPointsBySpellLevel.findIndex((num: number) => num === number);
      }

      return maxSpellSlotLevel - 1;
    });

    this.getFormChanges().subscribe((changes: Partial<SPTForm>) => {
      if (changes.max !== undefined) {
        this.maxSignal.set(changes.max);
        if (this.form.controls.current.getRawValue() > changes.max)
          this.form.controls.current.setValue(changes.max);
      }

      if (changes.current !== undefined)
        this.currentSignal.set(changes.current);

      if (changes.level !== undefined) {
        this.levelSignal.set(changes.level);
        const sum = SptSlotsByLevel[changes.level].reduce(
          (acc: number, num: number, i: number) =>
            acc + SptPointsBySpellLevel[i] * num,
          0,
        );
        this.form.controls.max.setValue(sum);
      }

      this.saveToStorage();
    });
  }

  public ngOnDestroy(): void {
    this.overlayService.setShowOverlays(false);
  }

  public onPointReset(): void {
    this.form.controls.current.setValue(this.form.controls.max.getRawValue());
  }

  public onCastSpell(i: number): void {
    const control = this.form.controls.current;

    const newVal = control.getRawValue() - SptPointsBySpellLevel[i];

    control.setValue(newVal);
  }

  private getFormChanges(): Observable<Partial<SPTForm>> {
    return this.form.valueChanges.pipe(
      map((values: Partial<SPTForm>): Partial<SPTForm> => {
        const changes = {};

        for (const value in values) {
          const valueKey = value as keyof Partial<SPTForm>;

          if (values[valueKey] !== this.oldFormValue[valueKey]) {
            // @ts-ignore
            changes[valueKey] = values[valueKey];
            // @ts-ignore
            this.oldFormValue[valueKey] = values[valueKey];
          }
        }

        return changes;
      }),
    );
  }

  private loadFromStorage(): void {
    const valuesRaw = localStorage.getItem('spellPointTrackerFormValues');
    if (!valuesRaw) return;

    this.form.setValue(JSON.parse(valuesRaw));
  }

  private saveToStorage(): void {
    const valuesJson = JSON.stringify(this.form.getRawValue());
    localStorage.setItem('spellPointTrackerFormValues', valuesJson);
  }
}
