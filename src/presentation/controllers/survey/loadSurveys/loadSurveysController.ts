import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';

export class LoadSurveysController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return null;
  }
}
