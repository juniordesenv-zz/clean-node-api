
import {
  badRequest, serverError, ok, forbiden,
} from '~/presentation/helpers/http/http-helper';
import {
  HttpRequest, Validation,
} from '~/presentation/protocols';
import { Authentication } from '~/domain/usecases/account/authentication';
import { EmailInUseError, MissingParamError, ServerError } from '~/presentation/errors';
import { AddAccount } from '~/domain/usecases/account/addAccount';
import { SignupController } from '~/presentation/controllers/authentication/signup/signup-controller';
import { throwError } from '~/domain/test';
import { mockAddAccount, mockAuthentication, mockValidation } from '~/presentation/test';


const mockFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_email',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

type SutTypes = {
  sut: SignupController,
  addAccountStub: AddAccount,
  validationStub: Validation
  authenticationStub: Authentication
};

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignupController(addAccountStub, validationStub, authenticationStub);
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub,
  };
};

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');

    await sut.handle(mockFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_email',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });


  test('Should return 500 if AddAccounts throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => new Promise((resolve, reject) => reject(new Error())));

    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('Should return 403 if AddAcount returns null', async () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(new Promise((resolve) => resolve(null)));

    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(forbiden(new EmailInUseError()));
  });

  test('Should return 200 if valid data is correct', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token',
    }));
  });

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');

    const httpRequest = mockFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if valid returns an error', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockFakeRequest());
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' });
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
