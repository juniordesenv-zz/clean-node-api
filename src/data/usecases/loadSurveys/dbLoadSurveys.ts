import { LoadSurveysRepository } from '~/data/protocols/db/survey/loadSurveysRepository';
import { LoadSurveys } from '~/domain/usecases/loadSurveys';
import { SurveyModel } from '~/domain/models';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {
  }

  async load(): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll();
  }
}
