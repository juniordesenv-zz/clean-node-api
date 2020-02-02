import { ValidationComposite } from '../../../presentation/helpers/validators/validationComposite';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/requiredFieldValidation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { EmailValidation } from '../../../presentation/helpers/validators/emailValidation';
import { EmailValidatorAdapter } from '../../../utils/emailValidatorAdapter';


export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
