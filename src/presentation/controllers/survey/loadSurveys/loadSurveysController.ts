import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { LoadSurveys } from '~/domain/usecases/loadSurveys';
import { ok, serverError } from '~/presentation/helpers/http/httpHelper';

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
