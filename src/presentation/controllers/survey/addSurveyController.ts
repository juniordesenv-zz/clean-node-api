import {
  AddSurvey,
  Controller, HttpRequest, HttpResponse, Validation,
} from './addSurveyControllerProtocols';
import { badRequest, ok, serverError } from '../../helpers/http/httpHelper';

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
      });
      return ok(survey);
    } catch (error) {
      return serverError(error);
    }
  }
}
