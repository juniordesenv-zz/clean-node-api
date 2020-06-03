import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id';
import { forbiden } from '~/presentation/helpers/http/http-helper';
import { InvalidParamError } from '~/presentation/errors';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId);
    if (!survey) {
      return forbiden(new InvalidParamError('surveyId'));
    }
    return null;
  }
}
