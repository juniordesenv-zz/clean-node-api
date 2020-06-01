import { Middleware, HttpRequest } from '~/presentation/protocols';
import { forbiden, ok, serverError } from '~/presentation/helpers/http/httpHelper';
import { AccessDeniedError } from '~/presentation/errors';
import { LoadAccountByToken } from '~/domain/usecases/loadAccountByToken';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
  ) {
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const accessToken = httpRequest.headers?.Authorization;
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken);
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
