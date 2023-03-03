export interface RecommendItem {
  name: string;
  description: string;
  thumbnailUrl: string;
  btnName: string;
  link: string;
  target: string;
  id: string;
}

export interface Success {
  data: RecommendItem[];
  message: string;
  status: string;
}
