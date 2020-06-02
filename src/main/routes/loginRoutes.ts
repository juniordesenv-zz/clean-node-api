import { Router } from 'express';
import { adaptRoute } from '~/main/adapters/expressRouteAdapter';
import { makeSignUpController } from '~/main/factories/controllers/login/singup/signupControllerFactory';
import { makeLoginController } from '~/main/factories/controllers/login/login/loginControllerFactory';


export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
