import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../validators/password.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  userPassword = {};
  userPasswordData = this.getSavedUserPassword();

  passwordForm = new FormGroup({
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        PasswordValidators.containSpecialCharacter,
        PasswordValidators.containUpperCase,
        PasswordValidators.containNumber,
        PasswordValidators.noSpaces
      ]
    ),
    confirmPw: new FormControl('',
      [
        Validators.required,
      ]
    ),
  },
    PasswordValidators.matchPassword
  );

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.userPasswordData) {
      this.passwordForm.patchValue(this.userPasswordData);
    }
  }

  get password() {
    return this.passwordForm.get(['password']);
  }
  get confirmPw() {
    return this.passwordForm.get(['confirmPw']);
  }
  saveUserPassword() {
    this.userPassword = Object.assign(this.userPassword, this.passwordForm.value);
    localStorage.setItem('userPassword', JSON.stringify(this.userPassword));
  }
  getSavedUserPassword() {
    const stringData = localStorage.getItem('userPassword');
    if (stringData) {
      return JSON.parse(stringData);
    }
    return null;
  }
  back() {
    this.router.navigate(['/country']);
  }
  next() {
    this.saveUserPassword();
    this.router.navigate(['/sign-up'])
  }
}
