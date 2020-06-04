import MockDate from 'mockdate';
import {
  HttpRequest, Validation,
} from '~/presentation/protocols';
import { badRequest, ok, serverError } from '~/presentation/helpers/http/http-helper';
import { AddSurvey } from '~/domain/usecases/survey/add-survey';
import { AddSurveyController } from '~/presentation/controllers/survey/add-survey/add-survey-controller';
import { mockSurveyModel, throwError } from '~/domain/test';
import { mockAddSurvey, mockValidation } from '~/presentation/test';

const mockFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    createdAt: new Date(),
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
});

type SutTypes = {
  sut: AddSurveyController;
  validationStub: Validation;
  addSurveyStub: AddSurvey;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidation();
  const addSurveyStub = mockAddSurvey();
  const sut = new AddSurveyController(validationStub, addSurveyStub);
  return {
    sut,
    validationStub,
    addSurveyStub,
  };
};

describe('AddSurvery Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValue(new Error());
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });


  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = mockFakeRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 200 if valid data is correct', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(ok({
      ...mockSurveyModel(),
    }));
  });


  test('Should return 500 if Validation fails', async () => {
    const { sut, addSurveyStub } = makeSut();
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
