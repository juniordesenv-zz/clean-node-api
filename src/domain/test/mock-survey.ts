import { AddSurveyParams } from '~/domain/usecases/survey/add-survey';
import { SurveyModel } from '~/domain/models';

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  createdAt: new Date(),
});


export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
    },
    {
      answer: 'other_answer',
      image: 'any_image',
    },
  ],
  createdAt: new Date(),
});


export const mockSurveysModel = (): SurveyModel[] => [
  {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    createdAt: new Date(),
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer',
      },
    ],
    createdAt: new Date(),
  },
];
