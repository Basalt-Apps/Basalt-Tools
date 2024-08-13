import { FormControl } from '@angular/forms';

export type ControlsOf<T extends object> = {
  [K in keyof T]: FormControl<T[K]>;
};
