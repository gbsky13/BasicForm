import { FormControl } from '@angular/forms';

export interface BasicTypedFormModel {
  firstName: FormControl<String | null>;
  lastName: FormControl<String | null>;
  gender: FormControl<String | null>;
  birthday: FormControl<Date | null>;
  phone: FormControl<String | null>;
  email: FormControl<String | null>;
  weight: FormControl<Number | null>;
  height: FormControl<Number | null>;
  cvaccine: FormControl<String | null>;
}
