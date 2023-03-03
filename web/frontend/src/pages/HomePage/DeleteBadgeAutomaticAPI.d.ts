export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: Data;
  message: string;
  status: string;
}

export interface Data {
  id: string;
  description: string;
  urlImage: string;
}

export interface Params {
  id: string;
  postType: string;
}
