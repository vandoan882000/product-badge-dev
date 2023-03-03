import { SettingsBadge } from './BadgeAPI';

export interface Params {
  slug: string[];
  config: SettingsBadge[];
  ids: string[];
}

export interface ResponseError {
  message: string;
  code: number;
}

interface DataResponseSuccess {
  id: string;
  slug: string;
  date: string;
}

export interface ResponseSuccess {
  data: {
    items: DataResponseSuccess[];
  };
  status: string;
  message: string;
}
