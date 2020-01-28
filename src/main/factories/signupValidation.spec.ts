import { makeSignUpValidation } from './signupValidation';
import { ValidationComposite } from '../../presentation/helpers/validators/validationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/requiredFieldValidation';
import { CompareFieldValidation } from '../../presentation/helpers/validators/compareFieldsValidation';
import { Validation } from '../../presentation/helpers/validators/validation';

jest.mock('../../presentation/helpers/validators/validationComposite');

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
