import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';

import { makeSignUpController } from '../factories/controllers/login/singup/signupControllerFactory';
import { makeLoginController } from '../factories/controllers/login/login/loginControllerFactory';


export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
