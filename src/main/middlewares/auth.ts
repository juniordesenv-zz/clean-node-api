import { adaptMiddleware } from '~/main/adapters/expressMiddlewareAdapter';
import { makeAuthMiddleware } from '~/main/factories/middlewares/authMiddlewareFactory';

export const auth = adaptMiddleware(makeAuthMiddleware());
