import {
  AbstractControlOptions,
  AsyncValidatorFn,
  ValidatorFn,
  Validators,
} from '@angular/forms';

// import { FormControl, Validators } from '@angular/forms';
export interface Fields {
  [key: string]: Field;
}

export interface Field {
  label: string;
  field: string;
  readonly: boolean;
  required: boolean;
}

export interface Controls {
  [key: string]: [
    { value: null | string | undefined | number | any; disabled: boolean },
    [
      Validators,
      Validators?,
      Validators?,
      Validators?,
      Validators?,
      Validators?
    ]
  ];
}
