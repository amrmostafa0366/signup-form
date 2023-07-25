import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneValidators } from '../validators/phone.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-phone',
  templateUrl: './country-phone.component.html',
  styleUrls: ['./country-phone.component.css']
})
export class CountryPhoneComponent {

  userCountry = {};
  userCountryData = this.getSavedUserCountry();

  countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  citiesByCountry: { [country: string]: string[] } = {
    "Afghanistan": ["Kabul", "Herat", "Mazar-i-Sharif"],
    "Albania": ["Tirana", "Durrës", "Vlorë"],
    "Egypt": ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh"],
    "Zimbabwe": ["Harare", "Bulawayo", "Chitungwiza"],
  };

  countryForm = new FormGroup({
    country: new FormControl(''),
    city: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    phone: new FormControl('',
      PhoneValidators.numericFormat,
    ),

  });
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.userCountryData) {
      this.countryForm.patchValue(this.userCountryData);
    }
  }

  get country() {
    return this.countryForm.get(['country']);
  }
  get city() {
    return this.countryForm.get(['city']);
  }
  get phone() {
    return this.countryForm.get(['phone']);
  }


  saveUserCountry() {
    this.userCountry = Object.assign(this.userCountry, this.countryForm.value);
    localStorage.setItem('userCountry', JSON.stringify(this.userCountry));
  }
  getSavedUserCountry() {
    const stringData = localStorage.getItem('userCountry');
    if (stringData) {
      return JSON.parse(stringData);
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

  back() {
    this.router.navigate(['/birthdate']);
  }
  next() {
    this.router.navigate(['/password'])
    this.saveUserCountry();
  }
}