import { HttpRequest } from '../protocols';
import { forbiden } from '~/presentation/helpers/http/httpHelper';
import { AccessDeniedError } from '~/presentation/errors';
import { AuthMiddleware } from '~/presentation/middlewares/authMiddleware';

describe('Auth Middleware', () => {
  test('Should return 403 if no Authoriziation exists in headers', async () => {
    const sut = new AuthMiddleware();
    const httpRequest: HttpRequest = {
      headers: {

      },
    };
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()));
  });
});
