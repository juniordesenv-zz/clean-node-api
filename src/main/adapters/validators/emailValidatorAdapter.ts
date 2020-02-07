import validator from 'validator';
import { EmailValidator } from '../../../presentation/protocols/emailValidator';

export class EmailValidatorAdapter implements EmailValidator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
