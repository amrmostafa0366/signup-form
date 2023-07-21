import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {

    static containSpecialCharacter(control: AbstractControl): ValidationErrors | null {
        let regexp = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
        if (!control.value.match(regexp)) {
            return ({ containSpecialCharacter: true });
        }
        return null;
    }
    static containUpperCase(control: AbstractControl): ValidationErrors | null {
        let regexp = /[A-Z]/;
        if (!control.value.match(regexp)) {
            return ({ containUpperCase: true });
        }
        return null;
    }
    static containNumber(control: AbstractControl): ValidationErrors | null {
        let regexp = /[0-9]/;
        if (!control.value.match(regexp)) {
            return ({ containNumber: true });
        }
        return null;
    }

    // static matchPassword(control: AbstractControl): ValidationErrors | null{
    static matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        let password = control.get('password');
        let confirmPw = control.get('confirmPw');
        if (confirmPw?.value !== password?.value) {
            return ({ matchPassword: true });
        }
        return null;
    }
}