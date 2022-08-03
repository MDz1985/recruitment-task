export enum InputNameEnum {
  name = 'name',
  surname = 'surname',
  password = 'password'
}

export enum AdditionalInputNameEnum {
  phone = 'phone',
  email = 'email',
  hobby = 'hobby'
}

export enum ErrorCodeEnum {
  required = 'required',
  minlength = 'minlength',
  maxlength = 'maxlength',
  email = 'email',
  pattern = 'pattern'
}

export enum PasswordTypeEnum {
  password = 'password',
  text = 'text'
}

export enum IconVisibilityStatusEnum {
  visibility = 'visibility',
  visibility_off = 'visibility_off'
}

export const passwordValidatorRegex: RegExp = /(?=.*[@$!%*#?&])(?=.*[A-Z])/;
export const phoneValidatorRegex: RegExp = /^\+?\d+$/;
export const maxHobbyInputLength = 100;


