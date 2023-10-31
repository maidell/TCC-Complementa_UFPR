import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const senhaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
  return senhaRegex.test(control.value) ? null : { customError: true };
};
