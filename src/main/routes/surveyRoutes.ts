import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';

import { makeAddSuerveyController } from '../factories/controllers/survey/addSurveyControllerFactory';
import { makeAuthMiddleware } from '~/main/factories/middlewares/authMiddlewareFactory';
import { adaptMiddleware } from '~/main/adapters/expressMiddlewareAdapter';


export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
  router.post('/surveys', adminAuth, adaptRoute(makeAddSuerveyController()));
};
