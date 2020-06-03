import { SurveyModel } from '~/domain/models';
import { LoadSurveysRepository } from '~/data/protocols/db/survey/load-surveys-repository';
import { LoadSurveys } from '~/domain/usecases/survey/load-surveys';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {
  }

  async load(): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll();
  }
}
