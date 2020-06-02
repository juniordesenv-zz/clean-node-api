import { makeAddSurveyValidation } from './addSurveyValidationFactory';
import { Validation } from '~/presentation/protocols';
import { RequiredFieldValidation, ValidationComposite } from '~/validation/validators';


jest.mock('~/validation/validators/validationComposite');

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
