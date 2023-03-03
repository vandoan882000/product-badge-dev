export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  message: string;
  status: string;
}

export interface Params {
  priority: string;
}
