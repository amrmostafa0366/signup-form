import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameValidators } from '../validators/name.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent {

  username = {};
  userNameData = this.getSavedUserName();

  nameForm = new FormGroup({
    firstName: new FormControl('',
      [
        Validators.required,
        NameValidators.onlyAlphabet,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]
    ),
    lastName: new FormControl('',
      [
        Validators.required,
        NameValidators.onlyAlphabet,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]
    ), 
    email: new FormControl('',
    [
      Validators.required,
      Validators.email
    ]
  ),
    
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.userNameData) {
      this.nameForm.patchValue(this.userNameData);
    }
  }

  get firstName() {
    return this.nameForm.get(['firstName']);
  }
  get lastName() {
    return this.nameForm.get(['lastName']);
  }
  get email(){
    return this.nameForm.get(['email']);

  }

  next() {
    this.saveUserName();
    this.router.navigate(['/birthdate']);
  }

  saveUserName() {
    this.username = Object.assign(this.username, this.nameForm.value);
    localStorage.setItem('userName', JSON.stringify(this.username));
  }
  getSavedUserName() {
    const stringData = localStorage.getItem('userName');
    if (stringData) {
      return JSON.parse(stringData);
    }
    return null;
  }

}
