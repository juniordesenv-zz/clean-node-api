import { LoadAccountByToken } from '~/domain/usecases/loadAccountByToken';
import { DbLoadAccountByToken } from '~/data/usecases/loadAccountByToken/dbLoadAccountByToken';
import { AccountMongoRepository } from '~/infra/db/mongodb/account/accountMongoRepository';
import { JwtAdapter } from '~/infra/criptography/jwtAdapter/jwtAdapter';
import env from '~/main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
