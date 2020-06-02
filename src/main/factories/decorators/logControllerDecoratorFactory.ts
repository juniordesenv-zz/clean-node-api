import { Controller } from '~/presentation/protocols';
import { LogMongoRepository } from '~/infra/db/mongodb/log/logMongoRepository';
import { LogControllerDecorator } from '~/main/decorators/logControllerDecorator';

export const makeLogControlleDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
