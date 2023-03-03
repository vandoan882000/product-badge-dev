import { Session } from '@shopify/shopify-api';
import { RequestHandler as ExpressRequestHandler, Response as ExpressResponse } from 'express';

/** Custom type request handler của express */
declare global {
  declare namespace Express {
    declare interface BaseResponseError {
      message: string;
      exceptionName: string;
    }

    declare interface LocalsWithSessionVerified {
      shopify: {
        session: Session;
      };
    }

    declare type MutationRequestHandler<
      Response = any,
      RequestBody = any,
      RequestQuery = core.Query,
      RequestParams = core.ParamsDictionary,
    > = ExpressRequestHandler<RequestParams, Response, RequestBody, RequestQuery, LocalsWithSessionVerified>;

    declare type QueryRequestHandler<
      Response = any,
      RequestQuery = core.Query,
      RequestParams = core.ParamsDictionary,
    > = ExpressRequestHandler<RequestParams, Response, any, RequestQuery, LocalsWithSessionVerified>;

    declare type ResponseWithSessionTokenVerified = ExpressResponse<any, LocalsWithSessionVerified>;
  }
}

export {};
