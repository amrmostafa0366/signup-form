import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  
  form!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<ConfirmationDialogComponent>){
    this.form = data.form;
  }
  
  submit(){
    console.log(this.form.value);
    this.dialogRef.close();
    this.reset();
  }
  cancel(){
    this.dialogRef.close();
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
    });
  }
}
