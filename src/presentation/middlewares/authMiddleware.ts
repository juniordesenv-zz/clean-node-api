import { Middleware, HttpRequest } from '~/presentation/protocols';
import { forbiden, ok } from '~/presentation/helpers/http/httpHelper';
import { AccessDeniedError } from '~/presentation/errors';
import { LoadAccountByToken } from '~/domain/usecases/loadAccountByToken';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
  ) {
  }

  async handle(httpRequest: HttpRequest) {
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
  }
}
