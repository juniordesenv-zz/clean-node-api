import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { ok, serverError } from '~/presentation/helpers/http/http-helper';
import { LoadSurveys } from '~/domain/usecases/survey/load-surveys';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return ok(surveys);
    } catch (error) {
      return serverError(error);
    }
  }
}
