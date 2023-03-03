export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: Data;
  message: string;
  status: string;
  code: number;
}

export interface Data {
  id: string;
  date: string;
  description: string;
}

export interface Params {
  title: string;
  config: any[];
  postType: string;
  tagSelected: string;
  description: string;
  status?: 'active' | 'deactive';
}
