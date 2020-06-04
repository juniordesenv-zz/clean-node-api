// eslint-disable-next-line max-classes-per-file
import { AddAccountRepository } from '~/data/protocols/db/account/add-account-repository';
import { AddAccountParams } from '~/domain/usecases/account/addAccount';
import { AccountModel } from '~/domain/models';
import { mockAccountModel } from '~/domain/test';
import { LoadAccountByEmailRepository } from '~/data/protocols/db/account/load-account-by-email-repository';
import { LoadAccountByTokenRepository } from '~/data/protocols/db/account/load-account-by-token-repository';
import { UpdateAccessTokenRepository } from '~/data/protocols/db/account/update-access-token-repository';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(accountData: AddAccountParams): Promise<AccountModel> {
      return new Promise((resolve) => resolve(mockAccountModel()));
    }
  }
  return new AddAccountRepositoryStub();
};


export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByEmail(email: string): Promise<AccountModel> {
      const account: AccountModel = mockAccountModel();
      return new Promise((resolve) => resolve(account));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loadByToken(token: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(mockAccountModel()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateAccessToken(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new UpdateAccessTokenRepositoryStub();
};
