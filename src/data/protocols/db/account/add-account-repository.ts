import { AddAccountParams } from '~/domain/usecases/account/addAccount';
import { AccountModel } from '~/domain/models/account';

export interface AddAccountRepository {
  add(accountData: AddAccountParams): Promise<AccountModel>
}
