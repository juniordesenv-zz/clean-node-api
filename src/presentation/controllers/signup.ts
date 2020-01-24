import { HttpResponse, HttpRequest, Controller } from '../protocols';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/httpHelper';


export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
