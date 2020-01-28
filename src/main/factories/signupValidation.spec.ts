import { makeSignUpValidation } from './signupValidation';
import { ValidationComposite } from '../../presentation/helpers/validators/validationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/requiredFieldValidation';
import { CompareFieldValidation } from '../../presentation/helpers/validators/compareFieldsValidation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { EmailValidation } from '../../presentation/helpers/validators/emailValidation';
import { EmailValidator } from '../../presentation/protocols/emailValidator';

jest.mock('../../presentation/helpers/validators/validationComposite');


const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
