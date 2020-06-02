import { HttpResponse } from '../../protocols/http';
import { ServerError, UnauthorizedError } from '../../errors';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbiden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (data: any): HttpResponse => ({
  statusCode: 204,
  body: data,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});
