import { Middleware } from '~/presentation/protocols';
import { AuthMiddleware } from '~/presentation/middlewares/authMiddleware';
import { makeDbLoadAccountByToken } from '~/main/factories/usescases/account/loadAccountByToken/dbLoadAccountByTokenFactory';

export const makeAuthMiddleware = (role?: string): Middleware => new AuthMiddleware(
  makeDbLoadAccountByToken(),
  role,
);
