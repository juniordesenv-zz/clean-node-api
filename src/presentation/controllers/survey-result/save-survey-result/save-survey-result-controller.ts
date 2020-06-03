import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.loadSurveyById.loadById(httpRequest.params.surveyId);
    return null;
  }
}
