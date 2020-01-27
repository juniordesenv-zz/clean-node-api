import { LogErrorRepository } from '../../../../data/protocols/logErrorRepository';
import { MongoHelper } from '../helpers/mongoHelper';


export class LogMongoRepository implements LogErrorRepository {
  async logError(stackError: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack: stackError,
      date: new Date(),
    });
  }
}
