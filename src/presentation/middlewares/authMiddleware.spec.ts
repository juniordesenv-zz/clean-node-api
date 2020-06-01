import { HttpRequest } from '../protocols';
import { forbiden } from '~/presentation/helpers/http/httpHelper';
import { AccessDeniedError } from '~/presentation/errors';
import { AuthMiddleware } from '~/presentation/middlewares/authMiddleware';
import { LoadAccountByToken } from '~/domain/usecases/loadAccountByToken';
import { AccountModel } from '~/domain/models';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
});

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    Authorization: 'any_token',
  },
});

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByTokenStub();
};

interface SutTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
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
    const { loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
