import * as core from 'express-serve-static-core';
export interface IRequest<Param = any, Body = any>
  extends core.Request<Param, any, Body> {}
export interface IResponse<Body = any> extends core.Response<Body> {}

export interface IRequestParams {
  id: string;
}
