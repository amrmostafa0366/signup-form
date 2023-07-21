import { AbstractControl, ValidationErrors } from "@angular/forms";

export class BirthDateValidators {

    static notUnderAge(control: AbstractControl): ValidationErrors | null {
        let startDate = new Date(control.value);
        let endDate = new Date();
        if (startDate <= endDate) {
            const diffMilliseconds = endDate.getTime() - startDate.getTime();
            const diffYears = diffMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
            if (Math.floor(diffYears) < 18) {
                return ({ notUnderAge: true });
            }
        }
        return null;
    }

    static notOverage(control: AbstractControl): ValidationErrors | null {
        let startDate = new Date(control.value);
        let endDate = new Date();
        if (startDate <= endDate) {
            const diffMilliseconds = endDate.getTime() - startDate.getTime();
            const diffYears = diffMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
            if (Math.floor(diffYears) >= 60) {
                return ({ notOverage: true });
            }
        }
        return null;
    }
    
    static notOverDate(control: AbstractControl): ValidationErrors | null {
        let startDate = new Date(control.value);
        let endDate = new Date();
        if (startDate > endDate) {
            return ({ notOverDate: true });
        }

        return null;
    }
}