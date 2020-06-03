import { HttpRequest, Middleware } from '~/presentation/protocols';
import { LoadAccountByToken } from '~/domain/usecases/account/loadAccountByToken';
import { AccessDeniedError } from '~/presentation/errors/access-denied-error';
import { forbiden, ok, serverError } from '~/presentation/helpers/http/http-helper';

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
