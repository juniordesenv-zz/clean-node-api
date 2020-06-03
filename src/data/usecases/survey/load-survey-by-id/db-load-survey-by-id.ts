import { SurveyModel } from '~/domain/models';
import { LoadSurveyByIdRepository } from '~/data/protocols/db/survey/load-survey-by-id-repository';
import { LoadSurveyById } from '~/domain/usecases/survey/load-survey-by-id';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(private readonly loadSurveysRepository: LoadSurveyByIdRepository) {
  }

  async loadById(id: string): Promise<SurveyModel> {
    return this.loadSurveysRepository.loadById(id);
  }
}
