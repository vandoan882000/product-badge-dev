export interface Params {
  ids: string[];
}

export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  message: string;
  data: {
    id: string;
  };
}
