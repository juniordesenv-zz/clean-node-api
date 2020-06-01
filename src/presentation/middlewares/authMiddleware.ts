import { Middleware, HttpRequest } from '~/presentation/protocols';
import { forbiden } from '~/presentation/helpers/http/httpHelper';
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
      await this.loadAccountByToken.load(accessToken);
    }
    return forbiden(new AccessDeniedError());
  }
}
