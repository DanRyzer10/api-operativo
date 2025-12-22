export interface FlowNode {
    id:string;
    name: string;
    content: string | null;
    typeCode: string;
    order: number;
    configuration: any;
}

export interface DynamicFLow {
    id: string;
    name: string;
    nodes: FlowNode[];
}

export interface FlowRepository {
    getActiveFlowByBotId(botId: string): Promise<DynamicFLow | null>;
}