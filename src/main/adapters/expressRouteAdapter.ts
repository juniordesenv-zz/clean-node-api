import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';

export const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
  const httpResquest: HttpRequest = {
    body: req.body,
  };
  const httpResponse = await controller.handle(httpResquest);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
