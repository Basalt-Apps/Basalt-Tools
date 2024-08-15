import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from '../../shared/models/controls-of.type';
import { SPTForm } from '../models/spt-form.interface';

@Injectable({
  providedIn: 'root',
})
export class SPTFormHelperService {
  public makeForm(): FormGroup<ControlsOf<SPTForm>> {
    return new FormGroup<ControlsOf<SPTForm>>({
      level: new FormControl<number>(1, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(20),
        ],
      }),
      max: new FormControl<number>(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(4),
          Validators.max(999),
        ],
      }),
      current: new FormControl<number>(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(999),
        ],
      }),
    });
  }
}
