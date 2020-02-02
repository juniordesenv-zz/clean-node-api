import { AccountModel } from '../../../domain/models';
import { LoadAccountByEmailRepository } from '../../protocols/loadAccountByEmailRepository';
import { DbAuthentication } from './dbAuthentication';
import { AuthenticationModel } from '../../../domain/usecases/authentication';

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password',
});

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_passowrd',
});

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      const account: AccountModel = makeFakeAccount();
      return new Promise((resolve) => resolve(account));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

interface SutTypes {
  sut: DbAuthentication,
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);

  return {
    sut,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Sould call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');

    await sut.auth(makeFakeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
