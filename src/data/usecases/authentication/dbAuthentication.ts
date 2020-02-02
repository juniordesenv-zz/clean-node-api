import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication';
import { LoadAccountByEmailRepository } from '../../protocols/loadAccountByEmailRepository';

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;

  constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email);
    return null;
  }
}
