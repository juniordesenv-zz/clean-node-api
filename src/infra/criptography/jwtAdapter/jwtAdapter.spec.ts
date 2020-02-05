import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwtAdapter';

const makeSut = () => new JwtAdapter('secret');

describe('JWT ADapter', () => {
  test('Shoud call sign with correct', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
