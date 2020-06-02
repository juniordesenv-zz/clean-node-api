import {
  forbiden,
  LoadAccountByToken,
  ok,
  serverError,
} from './authMiddlewareProtocols';
import { HttpRequest, Middleware } from '~/presentation/protocols';
import { AccessDeniedError } from '~/presentation/errors';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const accessToken = httpRequest.headers?.authorization;
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role);
        if (account) {
          return ok({
            accountId: account.id,
          });
        }
      }
      return forbiden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
