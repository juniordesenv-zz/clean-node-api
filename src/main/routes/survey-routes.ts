import { Router } from 'express';


import { adminAuth, auth } from '~/main/middlewares';
import { adaptRoute } from '~/main/adapters/express-route-adapter';
import { makeLoadSuerveysController } from '~/main/factories/controllers/survey/load-surveys/loadSurveysControllerFactory';
import { makeAddSuerveyController } from '~/main/factories/controllers/survey/add-survey/add-survey-controller-factory';


export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSuerveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSuerveysController()));
};
