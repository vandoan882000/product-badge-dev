export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: {
    items: Data[];
    hasNextPage: boolean;
  };
  message: string;
  status: string;
}

export interface Data {
  cursor: string;
  node: string;
}
