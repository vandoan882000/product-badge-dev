import { ReportService } from 'services/ReportService/@types/ReportService';

export class Local implements ReportService {
  createReportError: ReportService['createReportError'] = async ({ error, positionError, additionalData }) => {
    console.log(`----- START - ErrorReport ${positionError} -----`);
    console.log(error);
    console.log(additionalData);
    console.log(`----- END - ErrorReport ${positionError} -----`);
    return true;
  };
}
