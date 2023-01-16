import {NextFunction, Request, Response} from "express";
import {ScraperException} from "./scraper.exception";
import {UnexpectedError} from "../error";

export class ExceptionHandler {
  static handle(error: Error | ScraperException, _request: Request, response: Response, next: NextFunction) {
    let err;

    response.statusCode = 500;
    if (error instanceof ScraperException) {
      if (error.statusCode) response.statusCode = error.statusCode;
      err = {
        code: error.code,
        message: error.message
      }
    } else {
      err = {
        code: UnexpectedError.code,
        message: UnexpectedError.message
      }
    }

    response.json(err);
    next(error);
  }
}