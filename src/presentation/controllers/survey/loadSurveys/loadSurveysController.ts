import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { LoadSurveys } from '~/domain/usecases/loadSurveys';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load();
    return null;
  }
}
