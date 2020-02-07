import { Router } from 'express';

import { makeSignUpController } from '../factories/singup/signupFactory';

import { adaptRoute } from '../adapters/expressRouteAdapter';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
