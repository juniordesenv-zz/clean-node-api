import { makeAddSurveyValidation } from './addSurveyValidationFactory';
import {
  ValidationComposite, RequiredFieldValidation,
} from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols/validation';

jest.mock('../../../../validation/validators/validationComposite');

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
