import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';

import { makeAddSuerveyController } from '../factories/controllers/survey/addSurvey/addSurveyControllerFactory';
import { makeLoadSuerveysController } from '~/main/factories/controllers/survey/loadSurveys/loadSurveysControllerFactory';
import { adminAuth, auth } from '~/main/middlewares';


export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSuerveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSuerveysController()));
};
