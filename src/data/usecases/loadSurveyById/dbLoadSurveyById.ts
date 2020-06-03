import { SurveyModel } from '~/domain/models';
import { LoadSurveyByIdRepository } from '~/data/protocols/db/survey/loadSurveyByIdRepository';
import { LoadSurveyById } from '~/domain/usecases/loadSurveyById';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(private readonly loadSurveysRepository: LoadSurveyByIdRepository) {
  }

  async loadById(id: string): Promise<SurveyModel> {
    return this.loadSurveysRepository.loadById(id);
  }
}
