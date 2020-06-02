import { Controller } from '~/presentation/protocols';
import { LogControllerDecorator } from '../../decorators/logControllerDecorator';
import { LogMongoRepository } from '~/infra/db/mongodb/log/logMongoRepository';

export const makeLogControlleDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
