import { badRequest, ok, serverError } from '~/presentation/helpers/http/http-helper';
import {
  Controller, HttpRequest, HttpResponse, Validation,
} from '~/presentation/protocols';
import { AddSurvey } from '~/domain/usecases/survey/add-survey';

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { question, answers } = httpRequest.body;
      const survey = await this.addSurvey.add({
        question,
        answers,
        createdAt: new Date(),
      });
      return ok(survey);
    } catch (error) {
      return serverError(error);
    }
  }
}
