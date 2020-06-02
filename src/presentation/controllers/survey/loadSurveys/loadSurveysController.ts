import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { LoadSurveys } from '~/domain/usecases/loadSurveys';
import { ok } from '~/presentation/helpers/http/httpHelper';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load();
    return ok(surveys);
  }
}
