
import {
  badRequest, serverError, ok, forbiden,
} from '~/presentation/helpers/http/http-helper';
import { EmailInUseError } from '~/presentation/errors';
import {
  Controller, HttpRequest, HttpResponse, Validation,
} from '~/presentation/protocols';
import { Authentication } from '~/domain/usecases/account/authentication';
import { AddAccount } from '~/domain/usecases/account/addAccount';


export class SignupController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const {
        name, email, password,
      } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      if (!account) return forbiden(new EmailInUseError());
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      return ok({
        accessToken,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}