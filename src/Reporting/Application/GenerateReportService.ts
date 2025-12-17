import { ReportDispatcher } from "../Domain/ReportDispatcher";


export class GenerateReportService {
    constructor (private reportDispatcher: ReportDispatcher) {

    }
    async execute(data: any): Promise<void> {
        await this.reportDispatcher.dispatch(data);
    }
}