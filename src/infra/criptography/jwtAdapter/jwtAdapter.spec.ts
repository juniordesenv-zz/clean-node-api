import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => new Promise((resolve) => resolve('any_token')),
  verify: async (): Promise<string> => new Promise((resolve) => resolve('any_value')),
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('Shoud call sign with correct values', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    test('Shoud return a token on sign success', async () => {
      const sut = makeSut();
      const accessToken = await sut.encrypt('any_id');
      expect(accessToken).toBe('any_token');
    });


    test('Shoud throw if sign throws', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error(); });
      const promise = sut.encrypt('any_id');
      expect(promise).rejects.toThrow();
    });
  });

  describe('verify()', () => {
    test('Shoud call verify with correct values', async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    });
  });
});
