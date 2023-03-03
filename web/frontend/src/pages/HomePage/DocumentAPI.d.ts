export interface DocumentsResponse {
  data: {
    items: DocumentsData[];
  };
  message: string;
  status: string;
}

export interface DocumentsData {
  id: string;
  title: string;
  content: string;
  startsAt: string;
  status: string;
}
