import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NameValidators {

    static onlyAlphabet(control: AbstractControl): ValidationErrors | null {
        let regexp = /^[a-zA-Z]*$/;
        if (!control.value.match(regexp)) {
            return ({ onlyAlphabet: true });
        }
        return null;
    }
}