import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PhoneValidators {

    static numericFormat(control: AbstractControl): ValidationErrors | null {
        let regexp = /^[0-9]*$/;
        if (!control.value.match(regexp)) {
            return ({ numericFormat: true })
        } return null;
    }
}