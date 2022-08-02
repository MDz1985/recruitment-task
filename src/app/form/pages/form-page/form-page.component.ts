import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FormErrorStateMatcher
  implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

type InputName = 'phone' | 'email' | 'hobby'

@Component({
  selector: 'app-form',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  formGroup: FormGroup | null = null;
  matcher: FormErrorStateMatcher | null = null;
  isPhoneVisible: boolean = false;
  isEmailVisible: boolean = false;
  isHobbyVisible: boolean = false;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/(?=.*[@$!%*#?&])(?=.*[A-Z])/)]],
      phone: ['', Validators.pattern(/(^[+]?)(?=.*[0-9]$)/)],
      email: ['', Validators.email],
      hobby: ['', Validators.maxLength(100)]
    });
    this.matcher = new FormErrorStateMatcher();
  }

  addInput(inputName: InputName) {
    switch (inputName){
      case 'phone':
        this.isPhoneVisible = true;
        break;
      case 'email':
        this.isEmailVisible = true;
        break;
      case 'hobby':
        this.isHobbyVisible = true;
        break;
    }
  }

}
