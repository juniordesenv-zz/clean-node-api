import { LogControllerDecorator } from './log-controller-decorator';
import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols';
import { serverError, ok } from '~/presentation/helpers/http/http-helper';
import { LogErrorRepository } from '~/data/protocols/db/log/log-error-repository';
import { mockAccountModel } from '~/domain/test';
import { mockLogErrorRepository } from '~/data/test';

const mockFakeRequest = (): HttpRequest => (
  {
    body: {
      email: 'any_mail@mail.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    },
  });

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        body: {
          ok: 'ok',
        },
        statusCode: 200,
      };
      return new Promise((resolve) => resolve(ok(mockAccountModel())));
    }
  }
  return new ControllerStub();
};


type SutTypes = {
  sut: LogControllerDecorator,
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository,
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};


describe('LogController decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    await sut.handle(mockFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith(mockFakeRequest());
  });

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok(mockAccountModel()));
  });


  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeServerError())));

    await sut.handle(mockFakeRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
