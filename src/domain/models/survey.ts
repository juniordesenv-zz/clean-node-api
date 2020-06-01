export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
};

type SurveyAnswerModel = {
  image?: string
  answer: string
};
