import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BirthDateValidators } from '../validators/birthdate.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'birthdate',
  templateUrl: './birthdate.component.html',
  styleUrls: ['./birthdate.component.css']
})
export class BirthdateComponent {
  userBirth = {};
  userBirthData = this.getSavedUserBirth();

  formBirth = new FormGroup({
    birthdate: new FormControl('',
      [
        Validators.required,
        BirthDateValidators.notUnderAge,
        BirthDateValidators.notOverage,
        BirthDateValidators.notOverDate,
      ],
    ),
    gender: new FormControl('', Validators.required),
    militarySt: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.userBirthData) {
      this.formBirth.patchValue(this.userBirthData);
    }
  }

  get birthdate() {
    return this.formBirth.get(['birthdate']);
  }
  get gender() {
    return this.formBirth.get(['gender']);
  }
  get militarySt() {
    return this.formBirth.get(['militarySt']);
  }

  saveUserBirth() {
    this.userBirth = Object.assign(this.userBirth, this.formBirth.value);
    localStorage.setItem('userBirth', JSON.stringify(this.userBirth));
  }
  getSavedUserBirth() {
    const stringData = localStorage.getItem('userBirth');
    if (stringData) {
      return JSON.parse(stringData);
    }
  }

  changeGender() {
    if (this.gender?.value === 'male') {
      this.militarySt?.enable();
    } else {
      this.militarySt?.disable();
    }
  }
  back() {
    this.router.navigate(['/name']);
  }
  next() {
    this.saveUserBirth();
    this.router.navigate(['/country'])
  }
}
