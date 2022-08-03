import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  IconVisibilityStatusEnum,
  AdditionalInputNameEnum,
  passwordValidatorRegex,
  PasswordTypeEnum,
  phoneValidatorRegex,
  InputNameEnum, ErrorCodeEnum, maxHobbyInputLength
} from '../../models/form.model';

export class FormErrorStateMatcher
  implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  formGroup: FormGroup | null = null;
  matcher: FormErrorStateMatcher | null = null;
  readonly inputName: typeof InputNameEnum = InputNameEnum;
  readonly additionalInputName: typeof AdditionalInputNameEnum = AdditionalInputNameEnum;
  readonly errorCode: typeof ErrorCodeEnum = ErrorCodeEnum;
  readonly maxHobbyInputLength: number = maxHobbyInputLength;
  passwordType: PasswordTypeEnum = PasswordTypeEnum.password;
  iconVisibilityStatus: IconVisibilityStatusEnum = IconVisibilityStatusEnum.visibility;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(passwordValidatorRegex)]],
    });
    this.matcher = new FormErrorStateMatcher();
  }

  addInput(inputName: AdditionalInputNameEnum, event: Event): void {
    if (event.currentTarget && this.formGroup) {
      const target = event.currentTarget as HTMLButtonElement;
      target.disabled = true;
      switch (inputName) {
        case AdditionalInputNameEnum.phone:
          this.formGroup.addControl(AdditionalInputNameEnum.phone, new FormControl('', [Validators.pattern(phoneValidatorRegex)]));
          break;
        case AdditionalInputNameEnum.email:
          this.formGroup.addControl(AdditionalInputNameEnum.email, new FormControl('', [Validators.email]));
          break;
        case AdditionalInputNameEnum.hobby:
          this.formGroup.addControl(AdditionalInputNameEnum.hobby, new FormControl('', [Validators.maxLength(100)]));
          break;
        default:
          break;
      }
    }
  }

  changePasswordVisibility(): void {
    this.passwordType = this.passwordType === PasswordTypeEnum.password ? PasswordTypeEnum.text : PasswordTypeEnum.password;
    this.iconVisibilityStatus =
      this.passwordType === PasswordTypeEnum.text ? IconVisibilityStatusEnum.visibility_off : IconVisibilityStatusEnum.visibility;
  }

  changeRequiredStatus(formControlName: AdditionalInputNameEnum): void {
    if (this.formGroup) {
      const formControl = this.formGroup.controls[formControlName];
      formControl.hasValidator(Validators.required) ?
        formControl.removeValidators(Validators.required) :
        formControl.addValidators(Validators.required);
      formControl.updateValueAndValidity();
    }
  }

}
