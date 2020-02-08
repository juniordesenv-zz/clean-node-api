import { Router } from 'express';

import { adaptRoute } from '../adapters/express/expressRouteAdapter';

import { makeSignUpController } from '../factories/singup/signupFactory';
import { makeLoginController } from '../factories/login/loginFactory';


export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
