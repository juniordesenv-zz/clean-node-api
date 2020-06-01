import { Middleware, HttpRequest } from '~/presentation/protocols';
import { forbiden } from '~/presentation/helpers/http/httpHelper';
import { AccessDeniedError } from '~/presentation/errors';

export class AuthMiddleware implements Middleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest) {
    return forbiden(new AccessDeniedError());
  }
}
