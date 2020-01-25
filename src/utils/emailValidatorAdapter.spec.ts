import validator from 'validator';
import { EmailValidatorAdapter } from './emailValidator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));


describe('EmailValidator Adapter', () => {
  test('Shoul return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  test('Shoul return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });
});
