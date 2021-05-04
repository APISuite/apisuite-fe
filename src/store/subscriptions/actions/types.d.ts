import { GET_APIS, GET_APIS_SUCCESS, GET_APIS_ERROR } from "./getAPIs";

export interface ApisResponse {
  pagination: {
    page: number,
    pageCount: number,
    pageSize: number,
    rowCount: number,
  },
  rows: ApiResponse[],
}

export interface GetAPIsAction extends Action {
  type: typeof GET_APIS,
}

export interface GetAPIsSuccessAction extends Action {
  type: typeof GET_APIS_SUCCESS,
  apis: ApiResponse[],
}

export interface GetAPIsErrorAction extends Action {
  type: typeof GET_APIS_ERROR,
}
