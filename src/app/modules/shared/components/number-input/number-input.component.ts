import { Component, Input, OnInit } from '@angular/core';
import { ControlsOf } from '../../models/controls-of.type';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'basalt-number-input',
  standalone: true,
  imports: [],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberInputComponent,
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor, OnInit {
  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public step?: number;
  public disabled = false;

  private value: number = 0;
  private onTouched!: () => void;
  private onChange!: (value: number) => void

  public ngOnInit(): void {


  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: number): void {
    if(value !== undefined && this.value !== value){
      if (this.min && value < this.min) value = this.min;
      if (this.max && value < this.max) value = this.max;

      this.value = value
      this.onChange(value)
      this.onTouched()
    }
  }
}
