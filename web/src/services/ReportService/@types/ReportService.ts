import { AxiosError } from 'axios';

export interface CreateReportError_BEExpectParams {
  error: Error | AxiosError;
  positionError: string;
  additionalData?: string;
}

export interface ReportService {
  createReportError: (params: CreateReportError_BEExpectParams) => Promise<boolean>;
}
