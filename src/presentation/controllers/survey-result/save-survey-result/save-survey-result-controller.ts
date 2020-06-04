import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id';
import { forbiden, serverError } from '~/presentation/helpers/http/http-helper';
import { InvalidParamError } from '~/presentation/errors';

export class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body;
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (survey) {
        const answers = survey.answers.map((a) => a.answer);
        if (!answers.includes(answer)) {
          return forbiden(new InvalidParamError('answer'));
        }
      } else {
        return forbiden(new InvalidParamError('surveyId'));
      }
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
