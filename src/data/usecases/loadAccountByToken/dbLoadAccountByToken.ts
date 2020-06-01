import { LoadAccountByToken } from '~/domain/usecases/loadAccountByToken';
import { AccountModel } from '~/domain/models';
import { Decrypter } from '~/data/protocols/cryptography/decrypter';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}
