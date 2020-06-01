import { LoadAccountByToken } from '~/domain/usecases/loadAccountByToken';
import { AccountModel } from '~/domain/models';
import { Decrypter } from '~/data/protocols/cryptography/decrypter';
import { LoadAccountByTokenRepository } from '~/data/protocols/db/account/loadAccountByTokenRepository';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {
  }

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = await this.decrypter.decrypt(accessToken);
    if (accessToken) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role);
    }
    return null;
  }
}
