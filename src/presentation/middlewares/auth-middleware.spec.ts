import { HttpRequest } from '~/presentation/protocols';
import { LoadAccountByToken } from '~/domain/usecases/account/loadAccountByToken';
import { AuthMiddleware } from '~/presentation/middlewares/auth-middleware';
import { AccessDeniedError } from '~/presentation/errors/access-denied-error';
import { forbiden, ok, serverError } from '~/presentation/helpers/http/http-helper';
import { throwError } from '~/domain/test';
import { mockLoadAccountByTokenStub } from '~/presentation/test';

const mockFakeRequest = (): HttpRequest => ({
  headers: {
    authorization: 'any_token',
  },
});


type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Auth Middleware', () => {
  test('Should return 403 if no Authoriziation exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()));
  });


  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role';
    const { loadAccountByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const sut = new AuthMiddleware(loadAccountByTokenStub, role);
    await sut.handle(mockFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()));
  });

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok({
      accountId: 'any_id',
    }));
  });

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
