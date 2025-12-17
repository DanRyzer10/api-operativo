export interface ReportDispatcher {
    dispatch(data: any): Promise<void>;
}
