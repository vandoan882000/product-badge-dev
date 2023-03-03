export interface Params {
  limit: number;
  page: number;
  s: string;
  pluck?: string;
  taxSlugs?: string;
  taxName?: string;
}

export interface ResponseError {
  message: string;
  code: number;
}

export interface ResponseSuccess {
  data: {
    items: Data[];
    maxPage: number;
    page: number;
  };
  message: string;
  status: string;
}

export interface Data {
  id: string;
  UrlImage: string;
}

export interface SettingsBadge {
  id: string;
  urlImage: string;
  taxonomy: {
    name: string;
    slugs: string[];
  };
  size: number;
  animation: string;
  placement: string;
  texts: SvgType[];
  html: string;
  minWidth: number;
}

export interface SvgType {
  id: string;
  content: string;
  color: string;
  size: string;
}

interface Output_Config {
  urlImage: string;
  badge_id: string;
  taxonomy: {
    name: string;
    slugs: string[];
  };
  size: number;
  animation: string;
  placement: string;
  texts: SvgType[];
  minWidth: number;
}
