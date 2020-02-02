import { RequiredFieldValidation } from './requiredFieldValidation';
import { MissingParamError } from '../../errors';

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validations fails', () => {
    const sut = new RequiredFieldValidation('any_field');

    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('any_field'));
  });
});
