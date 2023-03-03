export interface ServerUploadFileResponse {
  data: MyMedia;
  message: string;
  status: string;
}

export interface MyMedia {
  url: string;
  id: string;
}

export interface ServerGetMediaResponse {
  data: {
    items: MyMedia[];
    maxPages: number;
    currentPage: number;
  };
  message: string;
  status: string;
}

export interface VuongKMAGetMediaResponse {
  data: {
    items: {
      id: string;
      urlImage: string;
    }[];
    maxPages: number;
    currentPage: number;
  };
  message: string;
  status: string;
}
