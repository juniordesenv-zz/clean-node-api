import { AccountModel } from '../../../domain/models';
import { LoadAccountByEmailRepository } from '../../protocols/loadAccountByEmailRepository';
import { DbAuthentication } from './dbAuthentication';

const makeLoadAccountByEmailRepository = () => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
      };
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

  return {
    sut: new DbAuthentication(loadAccountByEmailRepositoryStub),
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Sould call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');

    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_passowrd',
    });

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
