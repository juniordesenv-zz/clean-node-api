import { Authentication, AuthenticationModel } from '~/domain/usecases/authentication';
import { LoadAccountByEmailRepository } from '~/data/protocols/db/account/loadAccountByEmailRepository';
import { HashComparer } from '~/data/protocols/cryptography/hashComparer';
import { Encrypter } from '~/data/protocols/cryptography/encrypter';
import { UpdateAccessTokenRepository } from '~/data/protocols/db/account/updateAccessTokenRepository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password);
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
