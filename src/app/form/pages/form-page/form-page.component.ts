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

type InputNameType = 'phone' | 'email' | 'hobby';
type PasswordType = 'password' | 'text';
type IconVisibilityStatusType = 'visibility' | 'visibility_off'

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
  passwordType: PasswordType = 'password';
  iconVisibilityStatus: IconVisibilityStatusType = 'visibility';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/(?=.*[@$!%*#?&])(?=.*[A-Z])/)]],
      phone: ['', [Validators.pattern(/(^[+]?)(?=.*[0-9]$)/)]],
      email: ['', Validators.email],
      hobby: ['', Validators.maxLength(100)]
    });
    this.matcher = new FormErrorStateMatcher();
  }

  addInput(inputName: InputNameType, event:Event) {
    if (event.currentTarget){
      const target = event.currentTarget as HTMLButtonElement;
      target.disabled = true;
      switch (inputName) {
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

  changePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.iconVisibilityStatus = this.passwordType === 'password' ? 'visibility' : 'visibility_off';
  }

  changeRequiredStatus(formControlName: InputNameType) {
    if (this.formGroup) {
      this.formGroup.controls[formControlName].hasValidator(Validators.required) ?
        this.formGroup.controls[formControlName].removeValidators(Validators.required) :
        this.formGroup.controls[formControlName].addValidators(Validators.required);
      this.formGroup.controls[formControlName].updateValueAndValidity();
    }
  }

}
