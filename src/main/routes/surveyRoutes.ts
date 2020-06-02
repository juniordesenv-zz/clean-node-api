import { Router } from 'express';


import { makeLoadSuerveysController } from '~/main/factories/controllers/survey/loadSurveys/loadSurveysControllerFactory';
import { adminAuth, auth } from '~/main/middlewares';
import { makeAddSuerveyController } from '~/main/factories/controllers/survey/addSurvey/addSurveyControllerFactory';
import { adaptRoute } from '~/main/adapters/expressRouteAdapter';


export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSuerveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSuerveysController()));
};
