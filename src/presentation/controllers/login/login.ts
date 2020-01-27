import {
  Controller, HttpRequest, HttpResponse, Authentication,
} from './login-protocols';
import { badRequest, serverError, unauthorized } from '../../helpers/httpHelper';
import { MissingParamError, InvalidParamError } from '../../errors';

import { EmailValidator } from '../signup/signup-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly authentication: Authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return new Promise((resolve) => resolve(badRequest(new InvalidParamError('email'))));
      }
      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }
      return new Promise((resolve) => resolve());
    } catch (error) {
      return serverError(error);
    }
  }
}
