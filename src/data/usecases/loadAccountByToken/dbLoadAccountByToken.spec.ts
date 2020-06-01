import { Decrypter } from '~/data/protocols/cryptography/decrypter';
import { DbLoadAccountByToken } from '~/data/usecases/loadAccountByToken/dbLoadAccountByToken';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_data'));
    }
  }
  return new DecrypterStub();
};

interface SutTypes {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);
  return {
    sut,
    decrypterStub,
  };
};

describe('DbLoadAccountBYToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
