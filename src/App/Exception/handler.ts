import {NextFunction, Request} from "express";
import {IRequest} from "../Interface/request.interface";

export class ExceptionHandler {
  static logErrors(err: Error, request: IRequest, Response: Response): NextFunction {

  }
}