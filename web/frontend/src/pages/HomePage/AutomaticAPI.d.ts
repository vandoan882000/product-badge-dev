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
  items: Items[];
  maxPages: number;
}

export interface Items {
  id: string;
  config: Config[] | null;
  badge_id: string;
  urlImage: string;
  title: string;
  postType: string;
  description: string;
  isSelected: boolean;
  tagSelected: string;
  isDefault: boolean;
}

export interface Config {
  placement: string;
  size: number;
  texts: any[];
  animation: string;
  minWidth: number;
}
