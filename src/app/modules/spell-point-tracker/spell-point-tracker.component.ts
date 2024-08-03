import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NumberInputComponent
} from '../shared/components/number-input/number-input.component';

@Component({
  selector: 'basalt-spell-point-tracker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NumberInputComponent
  ],
  templateUrl: './spell-point-tracker.component.html',
  styleUrl: './spell-point-tracker.component.scss'
})
export class SpellPointTrackerComponent implements OnInit {
  public control!: FormControl<boolean>;

  public ngOnInit(): void {
    this.control = new FormControl<boolean>(true, { nonNullable: true, validators: Validators.required })
  }
}
