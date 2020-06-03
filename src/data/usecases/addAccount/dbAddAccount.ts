import { AddAccount, AddAccountModel } from '~/domain/usecases';
import { Hasher } from '~/data/protocols/cryptography/hasher';
import { AddAccountRepository } from '~/data/protocols/db/account/addAccountRepository';
import { LoadAccountByEmailRepository } from '~/data/protocols/db/account/loadAccountByEmailRepository';
import { AccountModel } from '~/domain/models';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);
    if (account) return null;
    const hashedPassword = await this.hasher.hash(accountData.password);
    const newAccount = await this.addAccountRepository.add({
      ...accountData, password: hashedPassword,
    });
    return newAccount;
  }
}
