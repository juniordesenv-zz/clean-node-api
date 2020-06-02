import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';

import { makeAddSuerveyController } from '../factories/controllers/survey/addSurvey/addSurveyControllerFactory';
import { makeAuthMiddleware } from '~/main/factories/middlewares/authMiddlewareFactory';
import { adaptMiddleware } from '~/main/adapters/expressMiddlewareAdapter';
import { makeLoadSuerveysController } from '~/main/factories/controllers/survey/loadSurveys/loadSurveysControllerFactory';


export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
  const auth = adaptMiddleware(makeAuthMiddleware());
  router.post('/surveys', adminAuth, adaptRoute(makeAddSuerveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSuerveysController()));
};
