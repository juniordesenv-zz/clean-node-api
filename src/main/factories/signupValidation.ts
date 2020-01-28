import { ValidationComposite } from '../../presentation/helpers/validators/validationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/requiredFieldValidation';
import { Validation } from '../../presentation/helpers/validators/validation';


export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
