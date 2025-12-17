import { ReportDispatcher } from "../Domain/ReportDispatcher";

export class AwsGlueDispatcher implements ReportDispatcher {
    dispatch(data: any): Promise<void> {
        throw new Error("Method not implemented")
    }
}