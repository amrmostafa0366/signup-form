import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NameValidators } from '../validators/name.validators';
import { PasswordValidators } from '../validators/password.validators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { BirthDateValidators } from '../validators/birthdate.validators';
import { PhoneValidators } from '../validators/phone.validators';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  citiesByCountry: { [country: string]: string[] } = {
    "Afghanistan": ["Kabul", "Herat", "Mazar-i-Sharif"],
    "Albania": ["Tirana", "Durrës", "Vlorë"],
    "Egypt": ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh"],
    "Zimbabwe": ["Harare", "Bulawayo", "Chitungwiza"],
  };
  user: any = {};
  userData = this.getUserFromLocalStorage();

  constructor(private dialog: MatDialog) { }

  form = new FormGroup({
    name: new FormControl('',
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
        // PasswordValidators.matchPassword
      ]
    ),
    phone: new FormControl('',
      PhoneValidators.numericFormat,

    ),
    country: new FormControl(''),
    city: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    gender: new FormControl('', Validators.required),
    militarySt: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    birthdate: new FormControl('',
      [
        Validators.required,
        BirthDateValidators.notUnderAge,
        BirthDateValidators.notOverage,
        BirthDateValidators.notOverDate,

      ],
    ),
  },
    PasswordValidators.matchPassword
  );


  get name() {
    return this.form.get(['name']);
  }
  get email() {
    return this.form.get(['email']);
  }
  get password() {
    return this.form.get(['password']);
  }
  get confirmPw() {
    return this.form.get(['confirmPw']);
  }
  get country() {
    return this.form.get(['country']);
  }
  get city() {
    return this.form.get(['city']);
  }
  get gender() {
    return this.form.get(['gender']);
  }
  get militarySt() {
    return this.form.get(['militarySt']);
  }
  get birthdate() {
    return this.form.get(['birthdate']);
  }
  get phone() {
    return this.form.get(['phone']);
  }

  ngOnInit(): void {
    if (this.userData) {
      this.form.patchValue({
        name: this.userData.userName.firstName +this.userData.userName.lastName,
        email: this.userData.userName.email,
        password: this.userData.userPassword.password,
        confirmPw: this.userData.userPassword.confirmPw,
        phone: this.userData.userCountry.phone,
        country: this.userData.userCountry.country,
        city: this.userData.userCountry.city,
        birthdate: this.userData.userBirth.birthdate,
        gender: this.userData.userBirth.gender,
        militarySt: this.userData.userBirth.militarySt,
      });
    }
  }

  changeCountry() {
    this.disableCity();
    return this.citiesByCountry[this.country?.value];
  }

  disableCity() {
    if (this.country?.value === '') {
      this.city?.disable();
    } else {
      this.city?.enable();
    }
  }

  changeGender() {
    if (this.gender?.value === 'male') {
      this.militarySt?.enable();
    } else {
      this.militarySt?.disable();
    }
  }


  // setUserToLocalStorage() {
  //   this.user = Object.assign(this.user, this.form.value);
  //   localStorage.setItem('user', JSON.stringify(this.user));
  // }

  getUserFromLocalStorage() {
    const userName = localStorage.getItem('userName');
    const userBirth = localStorage.getItem('userBirth');
    const userCountry = localStorage.getItem('userCountry');
    const userPassword = localStorage.getItem('userPassword');
    if (userName && userBirth && userCountry && userPassword) {
      const userData = {
        userName: JSON.parse(userName),
        userBirth: JSON.parse(userBirth),
        userCountry: JSON.parse(userCountry),
        userPassword: JSON.parse(userPassword),
      };
      return userData;
    }
    return null;
  }

  reset() {
    this.form.reset({
      name: '',
      email: '',
      password: '',
      confirmPw: '',
      phone: '',
      country: '',
      city: '',
      gender: '',
      militarySt: '',
      birthdate: '',
    });
  }

  openDialog() {
    // this.setUserToLocalStorage();
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        form: this.form,
      }
    });
  }
}
