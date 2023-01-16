import {v4} from 'uuid';
import {NextFunction, Request, Response} from "express";

export default function (request: Request, response: Response, next: NextFunction) {
  const requestId: string = request.headers['request-id'] as string || v4();
  response.setHeader('X-Request-Id', requestId);

  next();
}