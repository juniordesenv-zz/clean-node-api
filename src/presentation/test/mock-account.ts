// eslint-disable-next-line max-classes-per-file
import { Authentication, AuthenticationParams } from '~/domain/usecases/account/authentication';
import { AddAccount, AddAccountParams } from '~/domain/usecases/account/addAccount';
import { AccountModel } from '~/domain/models';
import { mockAccountModel } from '~/domain/test';
import { LoadAccountByToken } from '~/domain/usecases/account/loadAccountByToken';

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async auth(authenthication: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new AuthenticationStub();
};


export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};


export const mockLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
