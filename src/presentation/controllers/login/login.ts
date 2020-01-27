import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badRequest } from '../../helpers/httpHelper';
import { MissingParamError } from '../../errors';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
    if (!httpRequest.body.password) return new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))));
    return new Promise((resolve) => resolve());
  }
}
