import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule,} from '@angular/forms';
import {BehaviorSubject} from "rxjs";
import {NgChanges} from "../../models/ng-changes.type";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'basalt-number-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
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
export class NumberInputComponent implements ControlValueAccessor, OnChanges, OnInit {
  @ViewChild('inputElement') public inputElement!: ElementRef<HTMLInputElement>;

  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public step?: number;
  @Input() public disabled = false;
  @Input() public value: number = 0;

  @Output() public focusLost = new EventEmitter<void>;
  @Output() public valueChange = new EventEmitter<number>;
  @Output() public submit = new EventEmitter<void>;

  public value$ = new BehaviorSubject<number>(0);
  public disabled$ = new BehaviorSubject<boolean>(false);

  public touch?: () => void;
  public change?: (value: number) => void

  public ngOnInit(): void {
    if (this.min && this.value$.value < this.min) this.value$.next(this.min);
    if (this.max && this.value$.value > this.max) this.value$.next(this.max);
  }

  public ngOnChanges(changes: NgChanges<NumberInputComponent>): void {
    if (changes.disabled) this.disabled$.next(changes.disabled.currentValue);
    if (changes.value) this.writeValue(changes.value.currentValue);
  }

  public writeValue(value: number): void {
    this.value$.next(value);
    this.fieldChange(value)
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.change = (value: number): void => fn(value);
  }

  public registerOnTouched(fn: () => void): void {
    this.touch = fn
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled$.next(isDisabled);
  }

  public input(target: EventTarget | null) {
    if (!target) return;
    const {value: rawValue} = target as HTMLInputElement;

    if (rawValue == '') {
      let newVal = 0;
      if (this.min !== undefined && newVal < this.min) newVal = this.min;
      if (this.max !== undefined && newVal > this.max) newVal = this.max;
      this.fieldChange(newVal);
    }

    let value = +rawValue;

    if (this.min !== undefined && (value < this.min)) {
      value = this.min
      this.fieldChange(value);
    }
    if (this.max !== undefined && value > this.max) {
      value = this.max;
      this.fieldChange(value)
    }
    if (this.step !== undefined && +rawValue % this.step !== 0) {
      value -= value % this.step;
      const newValue = +rawValue - +rawValue % this.step;
      this.fieldChange(newValue)
    }

    this.change?.(value);
    this.valueChange.emit(value);
    this.writeValue(value);
  }

  private fieldChange(num: number): void {
    if (this.inputElement) this.inputElement.nativeElement.value = `${num}`
  }

  public onSubmit(): void {
    this.submit.emit();
  }
}
