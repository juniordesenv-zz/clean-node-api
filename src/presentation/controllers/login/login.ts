import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badRequest } from '../../helpers/httpHelper';
import { MissingParamError } from '../../errors';

export class LoginController implements Controller {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
  }
}
