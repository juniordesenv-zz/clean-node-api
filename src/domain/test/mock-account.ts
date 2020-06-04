import { AccountModel } from '~/domain/models';
import { AddAccountParams } from '~/domain/usecases/account/addAccount';
import { AuthenticationParams } from '~/domain/usecases/account/authentication';

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  ...mockAddAccountParams(),
});

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});
