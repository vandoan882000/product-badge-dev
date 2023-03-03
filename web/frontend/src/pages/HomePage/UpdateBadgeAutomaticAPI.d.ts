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
  date: string;
}

export interface Params {
  id: string;
  title: string;
  config: any[];
  postType: string;
  tagSelected: string;
  description: string;
  status?: 'active' | 'deactive';
}
