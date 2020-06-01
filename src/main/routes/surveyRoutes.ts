import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';

import { makeAddSuerveyController } from '../factories/controllers/survey/addSurveyControllerFactory';


export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSuerveyController()));
};
